using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Threading;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RealWorthspace.Data;
using RealWorthspace.Models;

// Service class to fetch exchange rate data from an external API
namespace RealWorthspace.Services
{
    public class ExchangeRateService : BackgroundService
    {
        private readonly ILogger<ExchangeRateService> _logger;
        private readonly IServiceProvider _services;

        public ExchangeRateService(ILogger<ExchangeRateService> logger, IServiceProvider services)
        {
            _logger = logger;
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Exchange rate service is starting.");
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Fetching exchange rates at: {time}", DateTimeOffset.Now);
                await UpdateExchangeRatesAsync();
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
            }
            _logger.LogInformation("Exchange rate service is stopping.");
        }

        private async Task UpdateExchangeRatesAsync()
        {
            using var scope = _services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            try
            {
                var rates = await FetchLatestExchangeRatesAsync();
                foreach (var rate in rates)
                {
                    // check if the currency exists in the database
                    var existingRate = await dbContext.ExchangeRates.FindAsync(rate.currency_code);
                    if (existingRate == null)
                    {
                        // add the new rate to the database
                        dbContext.ExchangeRates.Add(rate);
                    }
                    else
                    {
                        // update the existing rate in the database
                        existingRate.rate = rate.rate;
                        existingRate.timestamp = rate.timestamp;
                    }
                }
                await dbContext.SaveChangesAsync();
                _logger.LogInformation("Exchange rates updated: {0}", rates[0].timestamp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating exchange rates.");
            }
        }

        private async Task<List<ExchangeRate>> FetchLatestExchangeRatesAsync()
        {
            var apiUrl = "https://api.fxratesapi.com/latest?api_key=fxr_live_f614b306997535b9e54e14bf56c90a371059";

            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Failed to fetch exchange rates from the API. Status code: " + response.StatusCode);
            }

            var content = await response.Content.ReadAsStringAsync();

            // Deserialize the JSON response into ExchangeRate objects
            var ratesData = JsonSerializer.Deserialize<ExchangeRatesResponse>(content);

            if (ratesData == null || !ratesData.Success)
            {
                throw new Exception("Failed to parse exchange rates data from the API.");
            }

            var rates = new List<ExchangeRate>();

            foreach (var rate in ratesData.Rates)
            {
                rates.Add(new ExchangeRate
                {
                    currency_code = rate.Key,
                    rate = rate.Value,
                    timestamp = ratesData.Date
                });
            }
            return rates;
        }
    }
}
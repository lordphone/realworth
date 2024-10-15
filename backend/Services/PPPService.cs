using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Threading;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RealWorthspace.Data;
using RealWorthspace.Models;

// Service class to fetch PPP data from an external API
namespace RealWorthspace.Services
{
    public class PPPService : BackgroundService
    {
        private readonly ILogger<PPPService> _logger;
        private readonly IServiceProvider _services;

        public PPPService(ILogger<PPPService> logger, IServiceProvider services)
        {
            _logger = logger;
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("PPP service is starting.");
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Fetching PPP data at: {time}", DateTimeOffset.Now);
                // TODO: Implement the UpdatePPPDataAsync method
                // await UpdatePPPDataAsync();
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
            }
            _logger.LogInformation("PPP service is stopping.");
        }

        private async Task UpdatePPPDataAsync()
        {
            using var scope = _services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            try
            {
                var pppData = await FetchLatestPPPDataAsync();
                foreach (var ppp in pppData)
                {
                    // TODO update the properties based on the actual response structure

                    // check if the PPP data exists in the database
                    var existingPPP = await dbContext.PPPData.FindAsync(ppp.area);
                    if (existingPPP == null)
                    {
                        // add the new PPP data to the database
                        dbContext.PPPData.Add(ppp);
                    }
                    else
                    {
                        // update the existing PPP data in the database
                        existingPPP.rate = ppp.rate;
                        existingPPP.year = ppp.year;
                    }
                }
                await dbContext.SaveChangesAsync();
                _logger.LogInformation("PPP data updated: {0}", pppData[0].year);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating PPP data.");
            }
        }

        private async Task<List<PPPData>> FetchLatestPPPDataAsync()
        {
            var apiUrl = "https://sdmx.oecd.org/public/rest/data/OECD.SDD.NAD,DSD_NAMAIN10@DF_TABLE4,1.0/A....PPP_B1GQ.......?startPeriod=2023&format=jsondata";

            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Failed to fetch PPP data from the API. Status code: " + response.StatusCode);
            }

            var content = await response.Content.ReadAsStringAsync();

            // Deserialize the JSON response into PPPData objects
            var pppDataResponse = JsonSerializer.Deserialize<PPPDataResponse>(content);

            if (pppDataResponse == null)
            {
                throw new Exception("Failed to parse PPP data from the API.");
            }

            var pppData = new List<PPPData>();

            // TODO: Implement the mapping of PPPDataResponse to PPPData objects
            
            return pppData;
        }
    }
}
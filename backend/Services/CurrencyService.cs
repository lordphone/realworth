using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using Newtonsoft.Json;

// This class provides currency exchange rate services
public class CurrencyService
{
    // HttpClient instance to make HTTP requests
    private readonly HttpClient _httpClient;

    // Constructor to initialize the HttpClient instance
    public CurrencyService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    // Asynchronous method to get the exchange rate from one currency to another
    public async Task<decimal> GetExchangeRateAsync(string fromCurrency, string toCurrency)
    {
        // Make an HTTP GET request to the exchange rate API
        var response = await _httpClient.GetAsync($"https://api.exchangerate-api.com/v4/latest/{fromCurrency}");
        
        // Ensure the HTTP request was successful
        response.EnsureSuccessStatusCode();
        
        // Read the response content as a string
        var responseStream = await response.Content.ReadAsStringAsync();
        
        // Deserialize the JSON response to an ExchangeRates object
        var exchangeRates = JsonConvert.DeserializeObject<ExchangeRates>(responseStream);
        
        // Return the exchange rate for the target currency
        return exchangeRates.Rates[toCurrency];
    }
}

// Class to represent the exchange rates data structure
public class ExchangeRates
{
    // Dictionary to hold the exchange rates for different currencies
    public Dictionary<string, decimal> Rates { get; set; }
}
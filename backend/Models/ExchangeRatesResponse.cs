using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RealWorthspace.Models
{
    public class ExchangeRatesResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
        [JsonPropertyName("terms")]
        public string Terms { get; set; }
        [JsonPropertyName("privacy")]
        public string Privacy { get; set; }
        [JsonPropertyName("timestamp")]
        public long Timestamp { get; set; }
        [JsonPropertyName("date")]
        public DateTime Date { get; set; }
        [JsonPropertyName("base")]
        public string Base { get; set; }
        [JsonPropertyName("rates")]
        public Dictionary<string, decimal> Rates { get; set; }
    }
}
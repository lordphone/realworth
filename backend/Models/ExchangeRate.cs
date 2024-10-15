using System;
using System.ComponentModel.DataAnnotations;

namespace RealWorthspace.Models
{
    public class ExchangeRate
    {
        [Key]
        [Required]
        public required string currency_code { get; set; } // base currency is USD, target currency is three letters such as "EUR"
        [Required]
        public decimal rate { get; set; } // 1 USD = Rate target currency
        [Required]
        public DateTime timestamp { get; set; }
    }
}
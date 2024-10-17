using System.ComponentModel.DataAnnotations;

namespace RealWorthspace.Models
{
    public class ExchangePppRate
    {
        // [Key]
        // public int Id { get; set; }
        // public string Area { get; set; }
        // public string CurrencyName { get; set; }
        // public string CurrencyCode { get; set; }
        // public decimal ExchangeRate { get; set; }
        // public decimal PppRate { get; set; }

        [Key]
        public int id { get; set; }
        public string area { get; set; }
        public string currency_name { get; set; }
        public string currency_code { get; set; }
        public decimal exchange_rate { get; set; }
        public decimal ppp_rate { get; set; }
    }
}
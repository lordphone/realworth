using System;
using System.ComponentModel.DataAnnotations;

namespace RealWorthspace.Models
{
    public class PPPData
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string currency_name { get; set; }

        [Required]
        public string area { get; set; }

        [Required]
        public decimal rate { get; set; }

        [Required]
        public string currency_code { get; set; }

        [Required]
        public int year { get; set; }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RealWorthspace.Models;
using RealWorthspace.Data;

namespace RealWorthspace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExchangePppRatesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExchangePppRatesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ExchangePppRates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExchangePppRate>>> GetExchangePppRates()
        {
            var rates = await _context.exchange_ppp_rates.ToListAsync();
            return Ok(rates);
        }

        // GET: api/ExchangePppRates/{area}
        [HttpGet("{area}")]
        public async Task<ActionResult<ExchangePppRate>> GetExchangePppRate(string area)
        {
            var rates = await _context.exchange_ppp_rates.Where(e => e.area == area).ToListAsync();
            if (!rates.Any())
            {
                return NotFound();
            }
            return Ok(rates);
        }
    }
}
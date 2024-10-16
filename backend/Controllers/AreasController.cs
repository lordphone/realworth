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
    public class AreasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AreasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Areas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetAreas()
        {
            var areas = await _context.PPP
                .Select(p => p.area)
                .Distinct()
                .OrderBy(a => a)
                .ToListAsync();
            return Ok(areas);
        }
    }
}
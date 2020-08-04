using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MIT.Data;
using MIT.Repositories;

namespace MIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalController : ControllerBase

    {
         private readonly HospitalRepository _hospitalRepository;

      public HospitalController(ApplicationDbContext context)
    {
        _hospitalRepository = new HospitalRepository(context);
       

    }

    [HttpGet]
        public IActionResult Get()
        {
            return Ok(_hospitalRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var hospital = _hospitalRepository.GetById(id);
            if (hospital == null)
            {
                return NotFound();
            }
            return Ok(hospital);
        }
    }
}


using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using MIT.Data;
using MIT.Models;
using MIT.Repositories;

namespace MIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidentController : ControllerBase
    {


        private readonly IncidentRepository _incidentRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly IndividualTranscriptRepository _individualTranscriptRepository;

        public IncidentController(ApplicationDbContext context)
        {
            _incidentRepository = new IncidentRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _individualTranscriptRepository = new IndividualTranscriptRepository(context);

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var incident = _incidentRepository.GetById(id);
            if (incident == null)
            {
                return NotFound();
            }
            return Ok(incident);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_incidentRepository.GetByUserProfileId(id));
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Incident incident)
        {
            if (id != incident.Id)
            {
                return BadRequest();
            }

            _incidentRepository.Update(incident);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _incidentRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q, bool sortDesc)
        {
            var user = GetCurrentUserProfile();
            var userId = user.Id;
            return Ok(_incidentRepository.Search(q, sortDesc, userId));
        }

        [HttpPost]
        public IActionResult Post(Incident incident)
        {
            var currentUserProfile = GetCurrentUserProfile();

            incident.UserProfileId = currentUserProfile.Id;
            _incidentRepository.Add(incident);
            return CreatedAtAction(nameof(Get), new { id = incident.Id }, incident);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }



    }
}

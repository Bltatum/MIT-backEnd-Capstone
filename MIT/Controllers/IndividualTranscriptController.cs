﻿
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using MIT.Data;
using MIT.Models;
using MIT.Repositories;

namespace MIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndividualTranscriptController : ControllerBase
    {


        private readonly IncidentRepository _incidentRepository;
        private readonly UserProfileRepository _userProfileRepository;
        private readonly IndividualTranscriptRepository _individualTranscriptRepository;

        public IndividualTranscriptController(ApplicationDbContext context)
        {
            _incidentRepository = new IncidentRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
            _individualTranscriptRepository = new IndividualTranscriptRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_individualTranscriptRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(IndividualTranscript individualTranscript)
        {
            var currentUserProfile = GetCurrentUserProfile();

            individualTranscript.UserProfileId = currentUserProfile.Id;
            _individualTranscriptRepository.Add(individualTranscript);
            return CreatedAtAction(nameof(Get), new { id = individualTranscript.Id }, individualTranscript);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }



    }
}

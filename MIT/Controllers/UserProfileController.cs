using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using MIT.Data;
using MIT.Models;
using MIT.Repositories;

namespace MIT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {

        private readonly UserProfileRepository _userProfileRepository;
        public UserProfileController(ApplicationDbContext context)
        {
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("getuserprofilebyid/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetByUserId(id));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpPut("updateuserprofile/{id}")]
        public IActionResult UpdateUserProfile(UserProfile userProfile, int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
                if (id != userProfile.Id)
                {
                    return BadRequest();
                }
                _userProfileRepository.Update(userProfile, currentUserProfile);
                return NoContent();
        }
    }
}

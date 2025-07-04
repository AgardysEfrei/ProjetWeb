using backend.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("webapp/api/")]
    public class Controller : ControllerBase
    {
        private readonly IDatabaseApplication _databaseApplication;
        public Controller(IDatabaseApplication databaseApplication)
        {
            _databaseApplication = databaseApplication;
        }

        [HttpPost("users")]
        public bool CreateUser(CreateUserArgs request)
        {
            try
            {
                _databaseApplication.AddUser(request);
                return true;
            }
            catch
            {
                return false;
            }
            
        }

        [HttpGet("users/{userId:int}")]
        public void GetUser(int userId)
        {
            throw new NotImplementedException();
        }

        [HttpPatch("users/{userId:int}")]
        public void UpdateUser(UpdateUserArgs request, int userId)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("users/{userId:int}")]
        public void DeleteUser(int userId)
        {
            throw new NotImplementedException();
        }

        [HttpPost("users/{userId:int}/mails")]
        public bool SaveMail(CreateMailArgs request)
        {
            try
            {
                _databaseApplication.AddMail(request);
                return true;
            }
            catch
            {
                return false;
            }
        }

        [HttpGet("users/{userId:int}/mails")]
        public void GetUserMails(int userId)
        {
            throw new NotImplementedException();
        }

        [HttpGet("users/{userId:int}/mails/{mailId:int}")]
        public void GetMail(int userId, int mailId)
        {
            throw new NotImplementedException();
        }

        [HttpPatch("users/{userId:int}/mails/{mailId:int}")]
        public void UpdateMail(UpdateMailArgs request, int userId, int mailId)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("users/{userId:int}/mails/{mailId:int}")]
        public void DeleteMail(int userId, int mailId)
        {
            throw new NotImplementedException();
        }
    }
}
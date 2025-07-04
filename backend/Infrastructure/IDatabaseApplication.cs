using backend.Controllers;

namespace backend.Infrastructure
{
    public interface IDatabaseApplication
    {
        public Task AddUser(CreateUserArgs request);
        public Task AddMail(CreateMailArgs request);
    }
}
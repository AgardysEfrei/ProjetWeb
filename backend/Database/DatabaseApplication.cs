using backend.Controllers;
using backend.Infrastructure;
using Dapper;
using Npgsql;

namespace backend.Database
{
    public class DatabaseApplication : IDatabaseApplication
    {
        private readonly string _connectionString;

        public DatabaseApplication(IConfiguration configuration)
        {
            _connectionString = configuration["database"]
            ?? throw new ArgumentNullException("configuration.database", "DB_STRING_NULL");
        }

        public async Task AddUser(CreateUserArgs request)
        {
            try
            {
                using var con = DatabaseApplicationUtils.DatabaseConnection(_connectionString);

                await con.QueryAsync(DatabaseApplicationUtils.AddUser(request));
            }
            catch (Exception ex)
            {
                throw new NpgsqlException(ex.Message);
            }
        }

        public async Task AddMail(CreateMailArgs request)
        {
            try
            {
                using var con = DatabaseApplicationUtils.DatabaseConnection(_connectionString);

                await con.QueryAsync(DatabaseApplicationUtils.AddMail(request));
            }
            catch (Exception ex)
            {
                throw new NpgsqlException(ex.Message);
            }
        }
    }
}
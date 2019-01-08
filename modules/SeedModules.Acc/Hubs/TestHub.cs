using Microsoft.AspNetCore.SignalR;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Acc.Hubs
{
    public class TestHub : Hub
    {
        readonly IDbContext _db;

        public TestHub(IDbContext db)
        {
            _db = db;
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}

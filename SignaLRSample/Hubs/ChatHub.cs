using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignaLRSample.Data;

namespace SignaLRSample.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _db;
        public ChatHub(ApplicationDbContext db)
        {
            _db = db;            
        }
        [Authorize]
        public async Task SendMessageToAll(string user, string message)
        {
            await Clients.All.SendAsync("MessageReceived",user, message);
        }

        [Authorize]
        public async Task SendMessageToReceiver(string sender,string receiver, string message)
        {
            var userId = _db.Users.FirstOrDefault(u => u.Email.ToLower() ==receiver.ToLower()).Id;
            if (!string.IsNullOrEmpty(userId))
            {
                await Clients.User(userId).SendAsync("MessageReceived", sender, message);
            }
            
        }
    }
}

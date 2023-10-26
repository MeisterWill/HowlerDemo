using Microsoft.AspNetCore.SignalR;

namespace SignalR.Messages
{
    class MessageHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}

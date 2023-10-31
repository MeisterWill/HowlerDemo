using HowlerDemo.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Messages
{
    class MessageHub : Hub
    {
        public async Task SendMessage(MessageParams parameters)
        {
            await Clients.All.SendAsync("ReceiveMessage", parameters);
        }

        public async Task SendSound(MessageParams parameters)
        {
            await Clients.All.SendAsync("ReceiveSound", parameters);
        }

        public async Task SendAddTimedSound(MessageParams parameters)
        {
            await Clients.All.SendAsync("ReceiveAddTimedSound", parameters);
        }
    }
}

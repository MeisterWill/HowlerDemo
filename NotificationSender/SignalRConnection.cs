using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationSender
{
    internal class SignalRConnection
    {
        private HubConnection HubConnection { get; set; }

        public SignalRConnection(string hostname) {
            HubConnection = new HubConnectionBuilder().WithUrl(hostname).Build();
        }

        public async Task ConnectAsync()
        {
            await HubConnection.StartAsync();
        }

        public void Dispose()
        {
            HubConnection.StopAsync();
        }

        public void Invoke(string command, string parameter)
        {
            HubConnection.InvokeAsync(command, parameter);
        }

        public void AddHandler(string command, Action<string> handler)
        {
            HubConnection.On(command, handler);
        }

        public void ClearHandlers(string command)
        {
            HubConnection.Remove(command);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationSender
{
    internal class InvocationTimer
    {
        private int count = 0;
        private List<Notification> Invocations = new List<Notification>();
        private SignalRConnection Connection;

        public InvocationTimer(SignalRConnection connection) {
            Connection = connection;
        }

        public void AddInvocation(string command, string message, int interval)
        {
            Invocations.Add(new Notification(command, message, interval));
        }

        public void RemoveInvocation(string command, string message)
        {
            Invocations.RemoveAll(notification => notification.Command == command && notification.Message == message);
        }

        public void Tick()
        {
            foreach(var invocation in Invocations)
            {
                if (invocation.Tick())
                {
                    Connection.Invoke(invocation.Command, invocation.Message);
                }
            }
        }
    }    
}

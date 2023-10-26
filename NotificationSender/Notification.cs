using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotificationSender
{
    internal class Notification
    {
        public string Command { get; set; }
        public string Message { get; set; }
        public int Interval { get; }
        private int counter = 0;

        public Notification(string command, string message, int interval) {
            if (interval < 1) interval = 1;
            
            Command = command;
            Message = message;
            Interval = interval;
        }

        public bool Tick()
        {
            if (++counter == Interval)
            {
                counter = 0;
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}

using NotificationSender;

Console.WriteLine("Starting new SignalR");
string Hostname = "https://localhost:7099/messageHub";


Thread.Sleep(1000); //Make sure ASP.Net app can start first
var connection = new SignalRConnection(Hostname);
await connection.ConnectAsync();



connection.Invoke("SendMessage", "Server Connected");
Console.WriteLine($"Connected to {Hostname}");

var invocationTimer = new InvocationTimer(connection);

connection.AddHandler("ReceiveMessage", message =>
{
    if (message == "StopHappyBirthday")
    {
        invocationTimer.RemoveInvocation("SendSound", "HappyBirthday.mp3");
        Console.WriteLine("Received command to stop sending HappyBirthday");
    }
});

invocationTimer.AddInvocation("SendSound", "HappyBirthday.mp3", 10);
invocationTimer.AddInvocation("SendSound", "Mario.mp3", 12);


for (; ;)
{
    Thread.Sleep(1000);
    invocationTimer.Tick();
}
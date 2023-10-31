using NotificationSender;

Console.WriteLine("Starting new SignalR");
string Hostname = "https://localhost:7099/messageHub";


Thread.Sleep(1000); //Make sure ASP.Net app can start first
var connection = new SignalRConnection(Hostname);
await connection.ConnectAsync();



connection.Invoke("SendMessage", new HowlerDemo.Hubs.MessageParams { Message = $"Connected to {Hostname}"});
Console.WriteLine($"Connected to {Hostname}");

var invocationTimer = new InvocationTimer(connection);

connection.AddHandler("ReceiveMessage", parameters =>
{
    if (parameters.Message == "StopHappyBirthday")
    {
        invocationTimer.RemoveInvocation("SendSound", "HappyBirthday.mp3");
        Console.WriteLine("Received command to stop sending HappyBirthday");
    }   else if (parameters.Message == "RequestSpaceMystery")
    {
        Console.WriteLine("Received command to send SpaceMystery");
        connection.Invoke("SendSound", new HowlerDemo.Hubs.MessageParams { Message = "SpaceMystery.mp3" });
    }
});

connection.AddHandler("ReceiveAddTimedSound", (parameters) =>
{
    Console.WriteLine($"Received command to play {parameters.Message} every {parameters.Number} seconds.");
    invocationTimer.AddInvocation("SendSound", parameters.Message, parameters.Number);
});

invocationTimer.AddInvocation("SendSound", "HappyBirthday.mp3", 10);
invocationTimer.AddInvocation("SendSound", "Mario.mp3", 12);


for (; ;)
{
    Thread.Sleep(1000);
    invocationTimer.Tick();
}
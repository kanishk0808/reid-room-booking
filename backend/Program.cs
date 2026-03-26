var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var rooms = new List<string>
{
    "Room A",
    "Room B",
    "Room C"
};

app.MapGet("/", () => "Hello World!");


app.MapGet("/rooms", () => rooms);

app.Run();

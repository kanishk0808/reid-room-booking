using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=rooms.db"));
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

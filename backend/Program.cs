var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/rooms", () =>
{
    var rooms = new[]
    {
        new { Id = 1, Name = "Room A", Capacity = 4}, 
        new { Id = 2, Name = "Room B", Capacity = 6}
    };
    return rooms;
});

app.Run();

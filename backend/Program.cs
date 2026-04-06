using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=rooms.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

var app = builder.Build();

app.UseCors("AllowFrontend");

var rooms = new List<string>
{
    "Room A",
    "Room B",
    "Room C"
};

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Rooms.Any())
    {
        db.Rooms.AddRange(
            new Room { Name = "Room A", Capacity = 4 },
            new Room { Name = "Room B", Capacity = 6 },
            new Room { Name = "Room C", Capacity = 8 }
        );
        db.SaveChanges();
    }
}

app.MapGet("/rooms", async (AppDbContext db) =>
{
    return await db.Rooms.ToListAsync();
});

app.MapGet("/bookings", async (AppDbContext db) =>
{
    return await db.Bookings.Include(b => b.Room).ToListAsync();
});

app.MapPost("/bookings", async (Booking booking, AppDbContext db) =>
{
    var overlap = await db.Bookings.AnyAsync(b =>
        b.RoomId == booking.RoomId &&
        booking.StartTime < b.EndTime &&
        booking.EndTime > b.StartTime
    );

    if (overlap)
    {
        return Results.BadRequest("Room already booked for this time.");
    }

    db.Bookings.Add(booking);
    await db.SaveChangesAsync();

    return Results.Ok(booking);
});

app.MapDelete("/bookings/{id}", async (int id, AppDbContext db) =>
{
    var booking = await db.Bookings.FindAsync(id);
    if (booking is null)
    {
        return Results.NotFound("Booking not found.");
    }

    db.Bookings.Remove(booking);
    await db.SaveChangesAsync();

    return Results.Ok("Booking cancelled successfully.");
});

app.Run();

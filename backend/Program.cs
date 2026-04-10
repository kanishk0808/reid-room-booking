using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlite("Data Source=rooms.db"));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()));

var app = builder.Build();

app.UseCors("AllowFrontend");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.EnsureCreatedAsync();

    if (!await db.Rooms.AnyAsync())
    {
        db.Rooms.AddRange(
            new Room { Name = "Eucalypt", Capacity = 4, Amenities = ["Projector", "Whiteboard", "TV", "Video Call"] },
            new Room { Name = "Room B", Capacity = 6, Amenities = [] },
            new Room { Name = "Room C", Capacity = 8, Amenities = [] }
        );
        await db.SaveChangesAsync();
    }
}

app.MapGet("/rooms", (AppDbContext db) => db.Rooms.AsNoTracking().ToListAsync());

app.MapGet("/bookings", (AppDbContext db) => 
    db.Bookings.AsNoTracking().Include(b => b.Room).ToListAsync());

app.MapPost("/bookings", async (Booking booking, AppDbContext db) =>
{
    var hasOverlap = await db.Bookings.AnyAsync(b =>
        b.RoomId == booking.RoomId &&
        booking.StartTime < b.EndTime &&
        booking.EndTime > b.StartTime);

    if (hasOverlap)
        return Results.BadRequest("Room already booked for this time.");

    db.Bookings.Add(booking);
    await db.SaveChangesAsync();
    return Results.Ok(booking);
});

app.MapDelete("/bookings/{id}", async (int id, AppDbContext db) =>
{
    var deleted = await db.Bookings.Where(b => b.Id == id).ExecuteDeleteAsync();
    return deleted > 0 
        ? Results.Ok("Booking cancelled successfully.") 
        : Results.NotFound("Booking not found.");
});

app.Run();
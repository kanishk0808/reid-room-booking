using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
}
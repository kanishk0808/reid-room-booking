public class Room
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Capacity { get; set; }
    public int Floor { get; set; } = 1;
    public List<string> Amenities { get; set; } = [];
}
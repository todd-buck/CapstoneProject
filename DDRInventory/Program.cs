using DDRInventory.Models;

Database.RefreshAsync();
Database initializer = new Database();
initializer.Init();

var builder = WebApplication.CreateBuilder(args);

//Database catalog = new Database();
//catalog.Close();

// Add services to the container.

builder.Services.AddControllers();
builder.WebHost.UseKestrel();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod())
);

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "OK",
            api = "AccessHub API",
            documentation = "/swagger",
            message = "API running. Access the documentation at /swagger",
            time = DateTime.UtcNow
        });
    }
}
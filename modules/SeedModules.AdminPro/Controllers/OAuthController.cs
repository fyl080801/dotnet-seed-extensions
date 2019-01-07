using System;
using System.Net.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SeedModules.AdminPro.Controllers
{
    [Route("api/oauth")]
    public class OAuthController : Controller
    {
        [HttpGet("callback")]
        public async void GiteeCallback([FromQuery]string code)
        {
            var s = code;
            HttpClient client = new HttpClient();
            var client_id = "3fa59d9d2ffdf2cb9059e2012b05a0652514e14e0725abee3adf6e0e585cd2f1";
            var client_secret = "be57950f7bae9a1f2b045a92c9d18ef05ba2384f6fb7dd499e055dda92006fc9";
            var redirect_uri = "http%3A%2F%2Flocalhost%3A5000%2Fapi%2Foauth%2Fcallback";
            try
            {
                var result = await client.PostAsync(
                    $"https://gitee.com/oauth/token?grant_type=authorization_code&code={code}&client_id={client_id}&redirect_uri={redirect_uri}&client_secret={client_secret}",
                    new StringContent("", Encoding.UTF8));

                Console.WriteLine(await result.Content.ReadAsStringAsync());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        [HttpGet("token")]
        public void TokenCallback()
        {
            var xxx = this.HttpContext.Request;
        }
    }
}
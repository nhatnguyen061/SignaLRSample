using Microsoft.AspNetCore.SignalR;

namespace SignaLRSample.Hubs
{
    public class DeathlyHallowsHub :Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {

            return SD.DealthyHallowRace;
        }
    }
}

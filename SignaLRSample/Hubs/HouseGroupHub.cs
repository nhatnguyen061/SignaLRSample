using Microsoft.AspNetCore.SignalR;

namespace SignaLRSample.Hubs
{
    public class HouseGroupHub : Hub
    {
        public static List<string> GroupsJoined { get; set; } = new List<string>();

        public async Task JoinHouse(string houseName)
        {
            if (!GroupsJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupsJoined.Add(Context.ConnectionId + ":" + houseName);
                //thêm một connect mới vào group mà thuộc nhà nào đó
                //mỗi tab sẽ có một connection id riêng
                
                //truyền danh sách house đã đăng ký của một client(1 tab) vào strGrouphouse
                string houseList = "";
                foreach (var house in GroupsJoined)
                {
                    if (house.Contains(Context.ConnectionId))
                    {
                        houseList += house.Split(':')[1] + " ";
                    }
                }
                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, true);
                await Clients.Others.SendAsync("newMemberAddedToHouse", houseName);
                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task LeaveHouse(string houseName)
        {
            if (GroupsJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupsJoined.Remove(Context.ConnectionId + ":" + houseName);
                //thêm một connect mới vào group mà thuộc nhà nào đó
                //mỗi tab sẽ có một connection id riêng
                string houseList = "";
                foreach (var house in GroupsJoined)
                {
                    if (house.Contains(Context.ConnectionId))
                    {
                        houseList += house.Split(':')[1] + " ";
                    }
                }
                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, false);
                await Clients.Others.SendAsync("newMemberRemovedFromHouse", houseName);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task TriggerHouseNotify(string houseName)
        {
            await Clients.Group(houseName).SendAsync("triggerHouseNotification", houseName);
        }
    }
}

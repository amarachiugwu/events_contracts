var fs = require('fs');

for (var i = 0; i < 5; i++) {
  var json = {}
  json.name = "Ticket #" + i;
  json.description = "This is event Ticket #" + i;
  json.image = "ipfs://bafybeiduad2mphfd2kvhjavwrqvrohluqna24xipcqwtzxewtykmhqiqbi/" + i + ".png";

  fs.writeFileSync('' + i, JSON.stringify(json));
}
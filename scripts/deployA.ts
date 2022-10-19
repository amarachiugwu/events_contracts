import { ethers } from "hardhat";

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const mintPrice = ethers.utils.parseEther("0.01");
  const maxSupply = 10;

  const EventTicket = await ethers.getContractFactory("EventTicket");
  const eventTicket = await EventTicket.deploy(mintPrice, maxSupply);

  await eventTicket.deployed();
  
  console.log(`EventTicket contract address:  ${eventTicket.address}`);


  
  const ticket = eventTicket.address;
  
  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy(
    "Event 1",
    "Event 1 description",
    1666129834,
    mintPrice,
    "Venue 1",
    ticket
  );
  
  await event.deployed();

  console.log(`Event contract address:  ${event.address}`);

//   console.log(`address 1> ${addr1.address}`);

//   const register = await event.connect(addr1).register({value: mintPrice});
//   await register.wait();

    const register = await event.register({value: mintPrice});
    await register.wait();

  const addr1_balance = await eventTicket.balanceOf(owner.address);
  console.log(`addr1 Balance: ${addr1_balance}`);
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

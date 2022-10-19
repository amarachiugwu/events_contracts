import { ethers } from "hardhat";

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const mintPrice = ethers.utils.parseEther("0.01");
  const maxSupply = 10;

  const EventTicket = await ethers.getContractFactory("EventTicket");
  const eventTicket = await EventTicket.deploy(mintPrice, maxSupply);

  await eventTicket.deployed();
  
  console.log(`EventTicket contract address:  ${eventTicket.address}`);

  // // using JsonRpcProvider
  // const ALCHEMY_GOERLI_API_KEY_URL = process.env.ALCHEMY_GOERLI_API_KEY_URL;
  // // const provider = new ethers.providers.JsonRpcProvider()
  // const provider = new ethers.providers.JsonRpcProvider(`${ALCHEMY_GOERLI_API_KEY_URL}`)
  // const signer = provider.getSigner();
  // const signerAddress = await signer.getAddress();

  // // using Wallet
  // const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
  // const wallet = new ethers.Wallet(`${ACCOUNT_PRIVATE_KEY}`);
  // const signerAddress = wallet.address;
  // console.log(signerAddress);

  const mintTx = await eventTicket.safeMint(owner.address, {value: mintPrice});
  await mintTx.wait();

  const signerAddress = await eventTicket.ownerOf(0);
  console.log(`Signer Address: ${signerAddress}`);
  console.log(`Owner Address: ${owner.address} == Signer Address: ${signerAddress}`);

  const balance = await eventTicket.balanceOf(owner.address);
  console.log(`owner Balance: ${balance}`);

  const contractBalance = await ethers.provider.getBalance(eventTicket.address);
  console.log(`Contract balance: ${contractBalance.toString()}`);


  
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

  const register = await event.connect(addr1).register({value: mintPrice});
  const Register = await event.connect(addr1).attend();
  const _register = await Register.wait();
  console.log(_register);

  const addr1_balance = await eventTicket.balanceOf(addr1.address);
  console.log(`addr1 Balance: ${addr1_balance}`);
  const Attend1 = await event.connect(addr1).attend();
  const attend1 = await Attend1.wait();
  // console.log(attend1);

  const buyForFriend = await event.connect(addr1).buyForFriend(addr2.address, {value: mintPrice});
  await buyForFriend.wait();

  const addr2_balance = await eventTicket.balanceOf(addr2.address);
  console.log(`addr2 Balance: ${addr2_balance}`);

}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

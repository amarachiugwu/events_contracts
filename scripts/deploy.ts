import { ethers } from "hardhat";

async function main() {

  const mintPrice = ethers.utils.parseEther("0.01");
  const maxSupply = 10;

  const EventTicket = await ethers.getContractFactory("EventTicket");
  const eventTicket = await EventTicket.deploy(mintPrice, maxSupply);

  await eventTicket.deployed();
  
  console.log(`EventTicket contract address:  ${eventTicket.address}`);

  // // using JsonRpcProvider
  // const ALCHEMY_GOERLI_API_KEY_URL = process.env.ALCHEMY_GOERLI_API_KEY_URL;
  // const provider = new ethers.providers.JsonRpcProvider()
  // // const provider = new ethers.providers.JsonRpcProvider(`${ALCHEMY_GOERLI_API_KEY_URL}`)
  // const signer = provider.getSigner();
  // const signerAddress = await signer.getAddress();

  // // using Wallet
  // const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
  // const wallet = new ethers.Wallet(`${ACCOUNT_PRIVATE_KEY}`);
  // const signerAddress = wallet.address;
// console.log(signerAddress);

  const mintTx = await eventTicket.safeMint({value: mintPrice});
  await mintTx.wait();

  const signerAddress = await eventTicket.ownerOf(0);
  console.log(`Signer Address: ${signerAddress}`);

  const balance = await eventTicket.balanceOf(signerAddress);
  console.log(`Balance: ${balance}`);

  const contractBalance = await ethers.provider.getBalance(eventTicket.address);
  console.log(`Contract balance: ${contractBalance.toString()}`);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

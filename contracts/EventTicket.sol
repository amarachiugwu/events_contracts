// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EventTicket is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint public mintPrice;
    uint public maxSupply;

    constructor(uint _mintPrice, uint _maxSupply) ERC721("EventTicket", "EVT") {
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeiduad2mphfd2kvhjavwrqvrohluqna24xipcqwtzxewtykmhqiqbi/";
    }

    function safeMint() public payable{
        require(msg.value >= mintPrice, "Not enough ETH");
        require(_tokenIdCounter.current() < maxSupply, "No more tickets left");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function editMintPrice(uint _mintPrice) public onlyOwner {
        maxSupply = _mintPrice;
    }

    function editmaxSupply(uint _maxSupply) public onlyOwner {
        maxSupply = _maxSupply;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(msg.sender).transfer(balance);
    }
}
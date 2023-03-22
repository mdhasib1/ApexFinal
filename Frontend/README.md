# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// contract ApexNFTCard is ERC721URIStorage {
// using Counters for Counters.Counter;
// Counters.Counter private \_tokenIds;
// Counters.Counter private \_itemsSold;

// uint256 public listingPrice = 0.001 ether;
// uint256 public ownerPercentage = 10; // 5% owner fee
// address payable owner;
// address payable public highestBidder;

// mapping(uint256 => MarketItem) private idToMarketItem;
// mapping(uint256 => bool) private \_isItemSold;
// mapping(uint256 => address) private \_escrow;
// mapping(uint256 => Bid[]) private idToBids;
// mapping(address => bool) public hasNewMessage;

// struct Bid {
// address bidder;
// uint256 amount;
// }

// struct MarketItem {
// uint256 tokenId;
// address payable seller;
// address payable owner;
// uint256 price;
// bool sold;
// address author;
// string nftcollection;
// string name;
// string description;
// uint256 endTime; // <-- new field
// }

// event MarketItemCreated(
// uint256 indexed tokenId,
// address indexed seller,
// uint256 price,
// address indexed author,
// string nftcollection,
// string name,
// string description
// );
// event MarketItemDeleted(
// uint256 indexed tokenId,
// address indexed seller,
// uint256 price,
// address indexed author,
// string nftcollection,
// string name,
// string description
// );
// event MarketItemSold(
// uint256 indexed tokenId,
// address indexed seller,
// address indexed owner,
// uint256 price,
// address author,
// string nftcollection,
// string name,
// string description
// );

// modifier onlyOwner() {
// require(
// msg.sender == owner,
// "Only the contract owner can call this function."
// );
// \_;
// }

// constructor() ERC721("ApexNFTCard", "ANC") {
// owner = payable(msg.sender);
// }

// function sendMessage(address recipient) public {
// // Send message logic here
// hasNewMessage[recipient] = true;
// }

// function checkForNewMessages() public view returns (bool) {
// return hasNewMessage[msg.sender];
// }

// function clearNewMessages() public {
// hasNewMessage[msg.sender] = false;
// }

// /_ Updates the listing price of the contract _/
// function updateListingPrice(uint256 \_listingPrice) public {
// require(
// msg.sender == owner,
// "Only marketplace owner can update listing price."
// );
// listingPrice = \_listingPrice;
// }

// /_ Updates the owner percentage of the contract _/
// function updateOwnerPercentage(uint256 \_newPercentage) public onlyOwner {
// require(
// \_newPercentage >= 0 && \_newPercentage <= 100,
// "Percentage must be between 0 and 100"
// );
// ownerPercentage = \_newPercentage;
// }

// function deleteNFT(uint256 \_tokenId) public {
// require(msg.sender == owner, "Only Marketplace owner can delete NFT.");
// require(\_exists(\_tokenId), "Token does not exist.");
// MarketItem memory item = idToMarketItem[_tokenId];
// require(item.owner == address(this), "Token not in marketplace.");
// \_burn(\_tokenId);
// delete idToMarketItem[_tokenId];
// emit MarketItemDeleted(
// \_tokenId,
// item.seller,
// item.price,
// item.author,
// item.nftcollection,
// item.name,
// item.description
// );
// }

// function getCurrentHighestBid(uint256 \_tokenId)
// public
// view
// returns (uint256)
// {
// require(\_exists(\_tokenId), "Token does not exist");

// Bid[] storage bids = idToBids[_tokenId];
// return bids.length > 0 ? bids[bids.length - 1].amount : 0;
// }

// /_ Returns the listing price of the contract _/
// function getListingPrice() public view returns (uint256) {
// return listingPrice;
// }

// /_ Mints a token and lists it in the marketplace _/
// function createToken(
// string memory tokenURI,
// uint256 price,
// address author,
// string memory nftcollection,
// string memory name,
// string memory description,
// uint256 endTime
// ) public payable returns (uint256) {
// \_tokenIds.increment();
// uint256 newTokenId = \_tokenIds.current();

// \_mint(msg.sender, newTokenId);
// \_setTokenURI(newTokenId, tokenURI);
// createMarketItem(
// newTokenId,
// price,
// author,
// nftcollection,
// name,
// description,
// endTime
// );
// return newTokenId;
// }

// function createMarketItem(
// uint256 tokenId,
// uint256 price,
// address author,
// string memory nftcollection,
// string memory name,
// string memory description,
// uint256 endTime // <-- new parameter
// ) private {
// require(price > 0, "Price must be at least 1 wei");
// idToMarketItem[tokenId] = MarketItem({
// tokenId: tokenId,
// seller: payable(msg.sender),
// owner: payable(address(this)),
// price: price,
// sold: false,
// author: author,
// nftcollection: nftcollection,
// name: name,
// description: description,
// endTime: endTime
// });

// \_transfer(msg.sender, address(this), tokenId);
// emit MarketItemCreated(
// tokenId,
// msg.sender,
// price,
// author,
// nftcollection,
// name,
// description
// );
// }

// function getNFTOwner(uint256 tokenId) public view returns (address) {
// require(\_exists(tokenId), "Token does not exist");
// return ownerOf(tokenId) == msg.sender ? msg.sender : address(0);
// }

// /_ Returns all unsold items _/
// function fetchMarketItems() public view returns (MarketItem[] memory) {
// uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;

// MarketItem[] memory items = new MarketItem[](itemCount);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (idToMarketItem[i].sold == false) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// }
// }
// return items;
// }

// /_ Returns only the items that a user has purchased _/
// function fetchMyNFTs() public view returns (MarketItem[] memory) {
// uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;

// MarketItem[] memory items = new MarketItem[](itemCount);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (idToMarketItem[i].owner == msg.sender) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// }
// }
// return items;
// }

// function buyNFT(uint256 tokenId) public payable {
// require(\_exists(tokenId), "Token does not exist");
// require(!\_isItemSold[tokenId], "Item is already sold");

// MarketItem memory item = idToMarketItem[tokenId];
// require(msg.value >= item.price, "Insufficient funds");

// \_isItemSold[tokenId] = true;
// \_escrow[tokenId] = msg.sender;
// idToMarketItem[tokenId].sold = true;
// item.owner.transfer(msg.value);
// \_transfer(address(this), msg.sender, tokenId);
// }

// function confirmReceived(uint256 tokenId) public {
// require(\_isItemSold[tokenId], "Item is not sold");
// require(\_escrow[tokenId] == msg.sender, "Only buyer can confirm");

// \_escrow[tokenId] = address(0);
// }

// function getMarketItem(uint256 tokenId)
// public
// view
// returns (MarketItem memory)
// {
// return idToMarketItem[tokenId];
// }

// /_ Returns all unsold items for a given nftcollection _/
// function fetchlistedNFTs(string memory nftcollection)
// public
// view
// returns (MarketItem[] memory)
// {
// uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;

// MarketItem[] memory items = new MarketItem[](itemCount);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (
// keccak256(bytes(idToMarketItem[i].nftcollection)) ==
// keccak256(bytes(nftcollection)) &&
// idToMarketItem[i].sold == false
// ) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// }
// }
// return items;
// }

// function resale(uint256 tokenId, uint256 newPrice) public {
// require(\_exists(tokenId), "Token does not exist");
// require(ownerOf(tokenId) == msg.sender, "Only the owner can resell");
// require(newPrice > 0, "Price must be at least 1 wei");
// MarketItem storage item = idToMarketItem[tokenId];
// require(
// item.seller == msg.sender,
// "Only the original seller can resale"
// );
// item.price = newPrice;
// }

// /_ Returns only the items a user has created _/
// function fetchMyNFTsCreated() public view returns (MarketItem[] memory) {
// uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;

// MarketItem[] memory items = new MarketItem[](itemCount);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (idToMarketItem[i].seller == msg.sender) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// }
// }
// return items;
// }

// function fetchMarketItemsByAuthor(address \_author)
// public
// view
// returns (MarketItem[] memory)
// {
// // uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;
// uint256 maxItems = 10;

// MarketItem[] memory items = new MarketItem[](maxItems);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (
// idToMarketItem[i].sold == false &&
// idToMarketItem[i].author == \_author
// ) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// if (currentIndex == maxItems) {
// break;
// }
// }
// }
// return items;
// }

// /_ Places a bid for an NFT _/
// function placeBid(uint256 \_tokenId) public payable {
// require(\_exists(\_tokenId), "Token does not exist");
// require(msg.value > 0, "Bid amount must be greater than 0");

// // Get the current highest bid for the item
// Bid[] storage bids = idToBids[_tokenId];
// uint256 highestBid = bids.length > 0 ? bids[bids.length - 1].amount : 0;

// // Make sure the new bid is higher than the current highest bid
// require(
// msg.value > highestBid,
// "Bid must be higher than current highest bid"
// );

// // Add the new bid to the list
// Bid memory newBid = Bid({bidder: msg.sender, amount: msg.value});
// idToBids[_tokenId].push(newBid);
// }

// function fetchNFTsByOwner(address \_owner)
// public
// view
// returns (MarketItem[] memory)
// {
// uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;

// MarketItem[] memory items = new MarketItem[](itemCount);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (idToMarketItem[i].owner == \_owner) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// }
// }
// return items;
// }

// function fetchNFTsByCollection(string memory collection)
// public
// view
// returns (MarketItem[] memory)
// {
// uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;

// MarketItem[] memory items = new MarketItem[](itemCount);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (
// keccak256(bytes(idToMarketItem[i].nftcollection)) ==
// keccak256(bytes(collection))
// ) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// }
// }
// return items;
// }

// function fetchNFTsBelowPrice(uint256 price)
// public
// view
// returns (MarketItem[] memory)
// {
// uint256 itemCount = \_tokenIds.current() - \_itemsSold.current();
// uint256 currentIndex = 0;

// MarketItem[] memory items = new MarketItem[](itemCount);
// for (uint256 i = 1; i <= \_tokenIds.current(); i++) {
// if (
// idToMarketItem[i].price < price &&
// idToMarketItem[i].sold == false
// ) {
// MarketItem storage currentItem = idToMarketItem[i];
// items[currentIndex] = currentItem;
// currentIndex += 1;
// }
// }
// return items;
// }

// function acceptBid(uint256 tokenId) public payable {
// require(\_exists(tokenId), "Token does not exist");
// MarketItem storage item = idToMarketItem[tokenId];
// require(
// msg.sender == item.owner,
// "Only the token owner can accept a bid"
// );
// require(highestBidder != address(0), "No bid has been made yet");

// Bid[] storage bids = idToBids[tokenId];
// require(bids.length > 0, "There are no bids for this token");

// uint256 highestBid = bids[bids.length - 1].amount;
// item.sold = true;
// address payable ownerAddress = payable(item.owner);
// ownerAddress.transfer((highestBid _ ownerPercentage) / 100);
// item.seller.transfer(highestBid - (highestBid _ ownerPercentage) / 100);
// \_isItemSold[tokenId] = true;
// \_itemsSold.increment();
// transferFrom(address(this), msg.sender, tokenId);

// emit MarketItemSold(
// tokenId,
// item.seller,
// msg.sender,
// highestBid,
// item.author,
// item.nftcollection,
// item.name,
// item.description
// );
// }

// /_ Withdraws the balance of the contract to the owner's address _/
// function withdrawBalance() external onlyOwner {
// payable(owner).transfer(address(this).balance);
// }
// }

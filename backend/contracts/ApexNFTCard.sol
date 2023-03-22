// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ApexNFTCard is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 public listingPrice = 0.001 ether;
    uint256 public ownerPercentage = 10; // 5% owner fee
    address payable owner;
    address payable public highestBidder;

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => bool) private _isItemSold;
    mapping(uint256 => address) private _escrow;
    mapping(uint256 => Bid[]) private idToBids;
    mapping(address => bool) public hasNewMessage;

    struct Bid {
        address bidder;
        uint256 amount;
    }

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        address author;
        string nftcollection;
        string name;
        string description;
        uint256 endTime;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price,
        address indexed author,
        string nftcollection,
        string name,
        string description
    );
    event MarketItemDeleted(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price,
        address indexed author,
        string nftcollection,
        string name,
        string description
    );
    event MarketItemSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed owner,
        uint256 price,
        address author,
        string nftcollection,
        string name,
        string description
    );
    event AuctionExtended(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 newEndTime
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function."
        );
        _;
    }

    constructor() ERC721("ApexNFTCard", "ANC") {
        owner = payable(msg.sender);
    }

    function sendMessage(address recipient) public {
        // Send message logic here
        hasNewMessage[recipient] = true;
    }

    function checkForNewMessages() public view returns (bool) {
        return hasNewMessage[msg.sender];
    }

    function clearNewMessages() public {
        hasNewMessage[msg.sender] = false;
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice) public {
        require(
            msg.sender == owner,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    /* Updates the owner percentage of the contract */
    function updateOwnerPercentage(uint256 _newPercentage) public onlyOwner {
        require(
            _newPercentage >= 0 && _newPercentage <= 100,
            "Percentage must be between 0 and 100"
        );
        ownerPercentage = _newPercentage;
    }

    function deleteNFT(uint256 _tokenId) public {
        require(msg.sender == owner, "Only Marketplace owner can delete NFT.");
        require(_exists(_tokenId), "Token does not exist.");
        MarketItem memory item = idToMarketItem[_tokenId];
        require(
            item.owner == address(this),
            "Marketplace does not own this NFT."
        );
        _deleteMarketItem(_tokenId);
        _burn(_tokenId);
    }

    function getNFTOwner(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Token does not exist");
        return ownerOf(tokenId) == msg.sender ? msg.sender : address(0);
    }

    // Modify the createToken function to include isAuction parameter
    function createToken(
        string memory tokenURI,
        uint256 price,
        address author,
        string memory nftcollection,
        string memory name,
        string memory description,
        bool isAuction // <-- new parameter
    ) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(
            newTokenId,
            price,
            author,
            nftcollection,
            name,
            description,
            isAuction
        );
        return newTokenId;
    }

    // Modify the createMarketItem function to include the isAuction parameter
    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        address author,
        string memory nftcollection,
        string memory name,
        string memory description,
        bool isAuction // <-- new parameter
    ) private {
        require(price > 0, "Price must be at least 1 wei");
        idToMarketItem[tokenId] = MarketItem({
            tokenId: tokenId,
            seller: payable(msg.sender),
            owner: payable(address(this)),
            price: price,
            sold: false,
            author: author,
            nftcollection: nftcollection,
            name: name,
            description: description,
            endTime: isAuction ? block.timestamp + 1 days : 0 // <-- set endTime if isAuction is true
        });

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            price,
            author,
            nftcollection,
            name,
            description
        );
    }

    // Add a new function to enable auction later
    function enableAuction(uint256 tokenId, uint256 endTime) public {
        require(_exists(tokenId), "Token does not exist.");
        require(
            msg.sender == idToMarketItem[tokenId].seller,
            "Only the seller can enable the auction."
        );
        require(
            idToMarketItem[tokenId].endTime == 0,
            "Auction already enabled."
        );
        require(endTime > block.timestamp, "End time must be in the future.");

        idToMarketItem[tokenId].endTime = endTime;
    }

function buyMarketItem(uint256 tokenId) public payable {
    MarketItem memory item = idToMarketItem[tokenId];
    require(_exists(tokenId), "Token does not exist.");
    require(!item.sold, "Item already sold.");
    require(msg.value >= item.price, "Insufficient payment.");

    _markAsSold(tokenId);
    _transfer(item.owner, msg.sender, tokenId);

    uint256 ownerFee = (item.price * ownerPercentage) / 100;
    uint256 sellerProceeds = item.price - ownerFee;

    bool success;
    bytes memory result;

    (success, result) = item.seller.call{value: sellerProceeds}("");
    require(success, string(result));

    (success, result) = owner.call{value: ownerFee}("");
    require(success, string(result));

    emit MarketItemSold(
        tokenId,
        item.seller,
        msg.sender,
        item.price,
        item.author,
        item.nftcollection,
        item.name,
        item.description
    );
}


    function resellNFT(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId), "Token does not exist.");
        require(
            msg.sender == ownerOf(tokenId),
            "Only token owner can resell NFT."
        );
        require(!_isItemSold[tokenId], "Item has already been sold.");

        idToMarketItem[tokenId].price = price;
    }

    function createBid(uint256 tokenId) public payable {
        require(_exists(tokenId), "Token does not exist.");
        require(!idToMarketItem[tokenId].sold, "Item already sold.");
        require(msg.value > 0, "Bid amount must be greater than 0");

        MarketItem memory item = idToMarketItem[tokenId];

        // Check if the auction has ended
        if (block.timestamp >= item.endTime) {
            if (idToBids[tokenId].length > 0) {
                Bid memory lastBid = idToBids[tokenId][
                    idToBids[tokenId].length - 1
                ];
                _transfer(item.owner, lastBid.bidder, tokenId);

                _markAsSold(tokenId);

                uint256 ownerFee = (item.price * ownerPercentage) / 100;
                uint256 sellerProceeds = item.price - ownerFee;

                (bool success, ) = item.seller.call{value: sellerProceeds}("");
                require(success, "Transaction failed.");
                (success, ) = owner.call{value: ownerFee}("");
                require(success, "Transaction failed.");

                emit MarketItemSold(
                    tokenId,
                    item.seller,
                    lastBid.bidder,
                    lastBid.amount,
                    item.author,
                    item.nftcollection,
                    item.name,
                    item.description
                );
            }
        } else {
            if (idToBids[tokenId].length == 0) {
                require(
                    msg.value >= idToMarketItem[tokenId].price,
                    "Bid must be at least the starting price."
                );
            } else {
                require(
                    msg.value >
                        idToBids[tokenId][idToBids[tokenId].length - 1].amount,
                    "Bid must be greater than the previous bid."
                );
                Bid memory lastBid = idToBids[tokenId][
                    idToBids[tokenId].length - 1
                ];
                (bool success, ) = lastBid.bidder.call{value: lastBid.amount}(
                    ""
                );
                require(success, "Transfer failed.");
            }
            Bid memory newBid = Bid({bidder: msg.sender, amount: msg.value});

            idToBids[tokenId].push(newBid);

            emit AuctionExtended(tokenId, item.seller, item.endTime);
        }
    }

    function endAuction(uint256 tokenId) public {
        MarketItem memory item = idToMarketItem[tokenId];
        require(_exists(tokenId), "Token does not exist.");
        require(!item.sold, "Item already sold.");
        require(block.timestamp >= item.endTime, "Auction not yet ended.");
        if (idToBids[tokenId].length == 0) {
            _transfer(item.owner, item.seller, tokenId);
        } else {
            Bid memory lastBid = idToBids[tokenId][
                idToBids[tokenId].length - 1
            ];
            _transfer(item.owner, lastBid.bidder, tokenId);

            _markAsSold(tokenId);

            uint256 ownerFee = (item.price * ownerPercentage) / 100;
            uint256 sellerProceeds = item.price - ownerFee;

            (bool success, ) = item.seller.call{value: sellerProceeds}("");
            require(success, "Transaction failed.");
            (success, ) = owner.call{value: ownerFee}("");
            require(success, "Transaction failed.");

            emit MarketItemSold(
                tokenId,
                item.seller,
                lastBid.bidder,
                lastBid.amount,
                item.author,
                item.nftcollection,
                item.name,
                item.description
            );
        }
    }

    function _deleteMarketItem(uint256 tokenId) private {
        MarketItem memory item = idToMarketItem[tokenId];
        delete idToMarketItem[tokenId];
        _isItemSold[tokenId] = false;
        _itemsSold.decrement();
        emit MarketItemDeleted(
            tokenId,
            item.seller,
            item.price,
            item.author,
            item.nftcollection,
            item.name,
            item.description
        );
    }

    function getOwnedNFTs(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);

        if (tokenCount == 0) {
            // Return an empty array
            return new uint256[](0);
        } else {
            uint256[] memory ownedTokenIds = new uint256[](tokenCount);
            uint256 currentIndex = 0;

            for (uint256 i = 1; i <= _tokenIds.current(); i++) {
                if (ownerOf(i) == owner) {
                    ownedTokenIds[currentIndex] = i;
                    currentIndex += 1;
                }
            }

            return ownedTokenIds;
        }
    }

    function getMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current() - _itemsSold.current();
        uint256 unsoldItemCount = itemCount - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (!idToMarketItem[i + 1].sold) {
                MarketItem storage currentItem = idToMarketItem[i + 1];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function cancelBid(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist.");
        require(!idToMarketItem[tokenId].sold, "Item already sold.");

        Bid[] storage bids = idToBids[tokenId];
        require(bids.length > 0, "No bids have been placed.");

        Bid storage lastBid = bids[bids.length - 1];
        require(
            lastBid.bidder == msg.sender,
            "You are not the highest bidder."
        );

        uint256 refundAmount = lastBid.amount;
        highestBidder = payable(address(0));
        idToBids[tokenId].pop();

        (bool success, ) = msg.sender.call{value: refundAmount}("");
        require(success, "Refund failed.");

        emit AuctionExtended(
            tokenId,
            idToMarketItem[tokenId].seller,
            block.timestamp
        );
    }

    function extendAuction(uint256 tokenId, uint256 duration) public {
        require(_exists(tokenId), "Token does not exist.");
        require(!idToMarketItem[tokenId].sold, "Item already sold.");
        require(
            msg.sender == idToMarketItem[tokenId].seller,
            "Only the seller can extend the auction."
        );
        require(duration > 0, "Duration must be greater than 0");

        idToMarketItem[tokenId].endTime += duration;

        emit AuctionExtended(
            tokenId,
            idToMarketItem[tokenId].seller,
            idToMarketItem[tokenId].endTime
        );
    }

    function getMarketItem(uint256 tokenId)
        public
        view
        returns (
            uint256,
            address,
            address,
            uint256,
            bool,
            address,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        require(_exists(tokenId), "Token does not exist.");

        MarketItem memory item = idToMarketItem[tokenId];
        return (
            item.tokenId,
            item.seller,
            item.owner,
            item.price,
            item.sold,
            item.author,
            item.nftcollection,
            item.name,
            item.description,
            item.endTime
        );
    }

    function getBids(uint256 tokenId) public view returns (Bid[] memory) {
        return idToBids[tokenId];
    }

    function _markAsSold(uint256 tokenId) private {
        idToMarketItem[tokenId].sold = true;
        _isItemSold[tokenId] = true;
        _itemsSold.increment();
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdraw failed.");
    }
}

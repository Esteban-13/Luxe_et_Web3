// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC5192 {
    function locked(uint256 tokenId) external view returns (bool);
    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);
}

contract LuxuryWatch is ERC721, Ownable, IERC5192 {

    struct Watch {
        string serialNumber;
        string model;
        string metadataURI;
        uint256 price;
        bool forSale;
        bool sold;
    }

    mapping(uint256 => Watch) public watches;
    uint256 private _tokenIdCounter;

    constructor() ERC721("LuxuryWatch", "LXW") Ownable(msg.sender) {}

    // La marque liste une montre en vente
    function listWatch(
        string memory _serialNumber,
        string memory _model,
        string memory _metadataURI,
        uint256 _price
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        watches[tokenId] = Watch({
            serialNumber: _serialNumber,
            model: _model,
            metadataURI: _metadataURI,
            price: _price,
            forSale: true,
            sold: false
        });

        emit Locked(tokenId);
        return tokenId;
    }

    // Le client achète → on mint directement à son adresse
    function buyWatch(uint256 tokenId, address buyer) public onlyOwner {
        require(watches[tokenId].forSale, "Montre non disponible");
        require(!watches[tokenId].sold, "Montre deja vendue");
        
        watches[tokenId].forSale = false;
        watches[tokenId].sold = true;

        _safeMint(buyer, tokenId);
        emit Locked(tokenId);
    }

    // ERC-5192
    function locked(uint256) external pure override returns (bool) {
        return true;
    }

    // Bloquer les transferts après achat
    function transferFrom(address, address, uint256) public pure override {
        revert("Certificat non transferable");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert("Certificat non transferable");
    }

    // Récupérer les infos d'une montre
    function getWatch(uint256 tokenId) public view returns (
        string memory, string memory, string memory, address, bool
    ) {
        require(tokenId <= _tokenIdCounter, "Cette montre n'existe pas");
        Watch memory w = watches[tokenId];
        
        // Si pas encore vendue, pas de propriétaire
        address owner = w.sold ? ownerOf(tokenId) : address(0);
        
        return (w.serialNumber, w.model, w.metadataURI, owner, w.forSale);
    }

    function totalWatches() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
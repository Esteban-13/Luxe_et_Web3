// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LuxuryWatch is ERC721, Ownable {

    struct Watch {
        string serialNumber;
        string model;
        string metadataURI;
    }

    mapping(uint256 => Watch) public watches;
    uint256 private _tokenIdCounter;

    constructor() ERC721("LuxuryWatch", "LXW") Ownable(msg.sender) {}

    function mintWatch(
        address to,
        string memory _serialNumber,
        string memory _model,
        string memory _metadataURI
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _safeMint(to, tokenId);

        watches[tokenId] = Watch({
            serialNumber: _serialNumber,
            model: _model,
            metadataURI: _metadataURI
        });

        return tokenId;
    }

    function getWatch(uint256 tokenId) public view returns (
        string memory, string memory, string memory, address
    ) {
        require(tokenId <= _tokenIdCounter, "Cette montre n'existe pas");
        Watch memory w = watches[tokenId];
        return (w.serialNumber, w.model, w.metadataURI, ownerOf(tokenId));
    }
}
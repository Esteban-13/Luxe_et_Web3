// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Interface officielle ERC-5192
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
    }

    mapping(uint256 => Watch) public watches;
    uint256 private _tokenIdCounter;

    constructor() ERC721("LuxuryWatch", "LXW") Ownable(msg.sender) {}

    // Mint un nouveau certificat NFT
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

        // Le certificat est verrouillé dès la création
        emit Locked(tokenId);

        return tokenId;
    }

    // ERC-5192 : le certificat est toujours verrouillé
    function locked(uint256 tokenId) external pure override returns (bool) {
        return true;
    }

    // Bloquer tous les transferts
    function transferFrom(address, address, uint256) public pure override {
        revert("Certificat non transferable");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert("Certificat non transferable");
    }

    // Récupérer les infos d'une montre
    function getWatch(uint256 tokenId) public view returns (
        string memory, string memory, string memory, address
    ) {
        require(tokenId <= _tokenIdCounter, "Cette montre n'existe pas");
        Watch memory w = watches[tokenId];
        return (w.serialNumber, w.model, w.metadataURI, ownerOf(tokenId));
    }
}
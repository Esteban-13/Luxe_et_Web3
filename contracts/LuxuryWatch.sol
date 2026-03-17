// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LuxuryWatch {

    // La structure d'une montre
    struct Watch {
        string serialNumber;   // Numéro de série
        string model;          // Modèle de la montre
        address owner;         // Propriétaire actuel
        bool exists;           // Est-ce que la montre existe ?
    }

    // Une liste de toutes les montres enregistrées
    mapping(uint256 => Watch) public watches;

    // Un compteur pour donner un ID à chaque montre
    uint256 public watchCount;

    // Enregistrer une nouvelle montre
    function registerWatch(string memory _serialNumber, string memory _model) public {
        watchCount++;
        watches[watchCount] = Watch({
            serialNumber: _serialNumber,
            model: _model,
            owner: msg.sender,
            exists: true
        });
    }

    // Récupérer les infos d'une montre
    function getWatch(uint256 _id) public view returns (string memory, string memory, address) {
        require(watches[_id].exists, "Cette montre n'existe pas");
        Watch memory w = watches[_id];
        return (w.serialNumber, w.model, w.owner);
    }
}
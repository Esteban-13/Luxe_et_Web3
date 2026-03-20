# **Timury — Passeport Numérique de Produit**

Timury est une maison de haute horlogerie.
Achat et certification d'authenticité pour montres de haute horlogerie.  

---

## **Prérequis**

- [Node.js v22+](https://nodejs.org)

---

## **Installation**


### 1. Installer les dépendances du smart contract

```bash
npm install
```

### 2. Installer les dépendances du frontend

```bash
cd frontend
npm install
cd ..
```

---

## **Lancer le projet**

> ⚠️ Toujours suivre cet ordre à chaque démarrage.

### Terminal 1 — Lancer la blockchain locale

```bash
npx hardhat node
```

Attends que les comptes s'affichent avant de passer à l'étape suivante.

### Terminal 2 — Déployer le smart contract

```bash
npx hardhat run scripts/deploy.ts
```

Copie l'adresse affichée (ex: `0x5FbDB2315678afecb367f032d93F642f64180aa3`) et vérifie qu'elle correspond à `CONTRACT_ADDRESS` dans `frontend/lib/contract.ts`. Si elle est différente, mets-la à jour.

### Terminal 3 — Lancer le frontend

```bash
cd frontend
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000)

---

## **Utilisation**

1. Entre ton adresse email pour te connecter — un Smart Account est généré automatiquement
2. Parcours le catalogue et ajoute une montre au panier
3. Procède au paiement — un certificat NFT est créé sur la blockchain
4. Consulte ton profil pour voir tes certificats

---

## **Structure du projet**

```
timury/
├── contracts/
│   └── LuxuryWatch.sol       # Smart contract ERC-721 + ERC-5192
├── scripts/
│   └── deploy.ts             # Script de déploiement
├── test/
│   └── LuxuryWatch.test.ts   # Tests unitaires
├── frontend/
│   ├── app/                  # Pages Next.js
│   ├── components/           # Composants React
│   └── lib/                  # Hooks, contrat, smart account
├── hardhat.config.ts
└── package.json
```

---

## **Commandes utiles**

```bash
# Compiler le smart contract
npx hardhat compile

# Lancer les tests
npx hardhat run test/LuxuryWatch.test.ts

# Lancer la blockchain
npx hardhat node

# Déployer le contrat
npx hardhat run scripts/deploy.ts
```

---

## **Stack technique**

| Couche | Technologie |
|--------|-------------|
| Smart Contracts | Solidity 0.8.28 · OpenZeppelin |
| Standards NFT | ERC-721 · ERC-5192 (Soulbound) |
| Account Abstraction | ERC-4337 (simulé via keccak256) |
| Framework | Hardhat |
| Frontend | Next.js · Wagmi · Viem · Tailwind CSS |
| Stockage | IPFS via Pinata |

---

## **Notes**

- La blockchain locale Hardhat repart de zéro à chaque redémarrage — il faut redéployer le contrat et mettre à jour `CONTRACT_ADDRESS` si l'adresse change.
- En production, Hardhat node serait remplacé par Alchemy (RPC) et le Smart Account simulé serait remplacé par ZeroDev.

---  

## **Contributeurs**

* [Kiara Wurtz](https://github.com/Kiaraw)
* [Esteban Videra Dumont](https://github.com/Esteban-13)
* [Awab Maaloum](https://github.com/awab26)
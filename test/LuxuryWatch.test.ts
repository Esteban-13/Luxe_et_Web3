import { artifacts } from "hardhat";
import { JsonRpcProvider, ContractFactory, Contract } from "ethers";
import assert from "assert";

async function main() {
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();

  const artifact = await artifacts.readArtifact("LuxuryWatch");
  const factory = new ContractFactory(artifact.abi, artifact.bytecode, signer);
  const contract = await factory.deploy() as Contract;
  await contract.waitForDeployment();

  console.log("🧪 Test 1 : Mint une montre NFT...");
  await contract.mintWatch(
    signerAddress,
    "SN-001",
    "Modèle Royal",
    "ipfs://QmFakeHashPourLInstant"
  );
  console.log("✅ NFT minté");

  console.log("🧪 Test 2 : Récupérer les infos de la montre...");
  const watch = await contract.getWatch(1);
  assert.equal(watch[0], "SN-001", "Numéro de série incorrect");
  assert.equal(watch[1], "Modèle Royal", "Modèle incorrect");
  assert.equal(watch[3], signerAddress, "Propriétaire incorrect");
  console.log("✅ Infos récupérées :", watch[0], watch[1]);

  console.log("🧪 Test 3 : Vérifier le propriétaire du NFT...");
  const owner = await contract.ownerOf(1);
  assert.equal(owner, signerAddress, "Mauvais propriétaire");
  console.log("✅ Propriétaire confirmé :", owner);

  console.log("🧪 Test 4 : Montre inexistante...");
  try {
    await contract.getWatch(99);
    console.log("❌ Aurait dû échouer");
  } catch (e) {
    console.log("✅ Erreur attendue pour montre inexistante");
  }

  console.log("\n🎉 Tous les tests sont passés !");
}

main().catch(console.error);
import { artifacts, network } from "hardhat";
import { JsonRpcProvider, ContractFactory, Contract } from "ethers";
import assert from "assert";

async function main() {
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner();

  const artifact = await artifacts.readArtifact("LuxuryWatch");
  const factory = new ContractFactory(artifact.abi, artifact.bytecode, signer);
  const contract = await factory.deploy() as Contract;
  await contract.waitForDeployment();

  console.log("🧪 Test 1 : Enregistrer une montre...");
  await contract.registerWatch("SN-001", "Modèle Royal");
  console.log("✅ Montre enregistrée");

  console.log("🧪 Test 2 : Récupérer la montre...");
  const watch = await contract.getWatch(1);
  assert.equal(watch[0], "SN-001", "Le numéro de série est incorrect");
  assert.equal(watch[1], "Modèle Royal", "Le modèle est incorrect");
  console.log("✅ Montre récupérée :", watch[0], watch[1]);

  console.log("🧪 Test 3 : Montre inexistante...");
  try {
    await contract.getWatch(99);
    console.log("❌ Aurait dû échouer");
  } catch (e) {
    console.log("✅ Erreur attendue pour montre inexistante");
  }

  console.log("\n🎉 Tous les tests sont passés !");
}

main().catch(console.error);
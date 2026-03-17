import { artifacts, network } from "hardhat";
import { JsonRpcProvider, ContractFactory } from "ethers";

async function main() {
  console.log("Déploiement de LuxuryWatch...");

  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner();

  const artifact = await artifacts.readArtifact("LuxuryWatch");
  const factory = new ContractFactory(artifact.abi, artifact.bytecode, signer);
  const contract = await factory.deploy();

  await contract.waitForDeployment();
  console.log("✅ Contrat déployé à l'adresse :", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
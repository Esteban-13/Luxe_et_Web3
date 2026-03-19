import { artifacts } from "hardhat";
import { JsonRpcProvider, ContractFactory } from "ethers";

async function main() {
  console.log("Déploiement de Timury...");

  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();

  const artifact = await artifacts.readArtifact("LuxuryWatch");
  const factory = new ContractFactory(artifact.abi, artifact.bytecode, signer);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log("✅ Contrat déployé à :", await contract.getAddress());

  const montres = [
    { id: "001", modele: "Modèle Royal",        cid: "bafkreihf6bwstny3vn4mhjh5jkvvt23ncmhef6skhv5afhhfwowriqcqpe" },
    { id: "002", modele: "Édition Noire",        cid: "bafkreid4oa6n5ohhzem5yeh4any372db6kqjn3bgapgqqiofbee52cazwi" },
    { id: "003", modele: "Grande Complication",  cid: "bafkreid2zkv25y7sff4yhch2xc6tk4rcdpmi6htzzedl5jdg756qqagsei" },
    { id: "004", modele: "Héritage Classique",   cid: "bafkreiek666pjeu6w62osdytgh34rasr52l65t27ton246ptvc7pf4unju" },
    { id: "005", modele: "Tourbillon Céleste",   cid: "bafkreib7iknzw5sv3etkpo53byn3rozcgwlysj56jbzwazbdpyq4bmqcme" },
    { id: "006", modele: "Chrono Sport",         cid: "bafkreihsejvqxvu26xckaflv4mob4bibvd7lc4hzc4s5v5raebgc25wrby" },
  ];

  for (const montre of montres) {
    await contract.mintWatch(
      signerAddress,
      `SN-${montre.id}`,
      montre.modele,
      `ipfs://${montre.cid}`
    );
    console.log(`✅ Timury #${montre.id} — ${montre.modele} mintée !`);
  }

  console.log("\n🎉 Les 6 montres Timury sont mintées !");
}

main().catch(console.error);
import { ethers } from "hardhat";

async function main() {
  const vaultManagerFactory = await ethers.getContractFactory("VaultManager");
  const priceFeedFactory = await ethers.getContractFactory("PriceFeed");

  const vaultManager = await vaultManagerFactory.deploy();
  await vaultManager.waitForDeployment();

  const priceFeed = await priceFeedFactory.deploy();
  await priceFeed.waitForDeployment();

  console.log(`Vault Manager deployed at ${vaultManager.target}`);
  console.log(`Price Feed deployed at ${priceFeed.target}`);

  const receipt1 = await priceFeed.setAddresses("0x694AA1769357215DE4FAC081bf1f309aDC325306"); // chainlink on eth sepolia

  console.log(`Price Feed initialized through txn: ${receipt1.hash}`);

  const receipt2 = await vaultManager.initialize(priceFeed.target);
  console.log(`Vault Manager initialized through txn: ${receipt2.hash}`);

  // const receipt3 = await priceFeed.updatePrice();
  // console.log(`Price feed updated through txn: ${receipt3.hash}`);

  // For non chainlink networks
  const receipt4 = await priceFeed.setPriceForced(220000000000);
  console.log(`Price feed updated through txn: ${receipt4.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

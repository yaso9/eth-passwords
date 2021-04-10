const hre = require("hardhat");

async function main() {
  const PasswordStore = await hre.ethers.getContractFactory("PasswordStore");
  const passwordStore = await PasswordStore.deploy();

  await passwordStore.deployed();

  console.log("PasswordStore deployed to:", passwordStore.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

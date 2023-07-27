const {ethers}  = require('hardhat');

async function main() {
  const Orphans = await ethers.getContractFactory('Orphans');
  const target = 1000; // Set your desired target amount
  const deadline = 86400; // Set your desired deadline in seconds 

  // Deploy the contract
  const orphans = await Orphans.deploy(target, deadline);

  await orphans.deployed();

  console.log('Orphans contract deployed to:', orphans.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


//   const hre = require("hardhat");

// async function main() {
//   let target = 1000; // Set your desired target amount
//   let deadline = 86400;
//   const chai = await hre.ethers.getContractFactory("Orphans");
//   const contract = await chai.deploy(target, deadline); //instance of contract

//   await contract.deployed();
//   console.log("Address of contract:", contract.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
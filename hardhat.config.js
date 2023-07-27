// require("@nomicfoundation/hardhat-toolbox");

// require("dotenv").config();
// /** @type import('hardhat/config').HardhatUserConfig */

// const SEPOLIA_URL = process.env.SEPOLIA_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     sepolia: {
//       url: SEPOLIA_URL,
//       accounts: [PRIVATE_KEY],
      
//     },
//   },
// };


/**
 * @type import('hardhat/config').HardhatUserConfig
 */


require("@nomiclabs/hardhat-waffle");

const INFURA_PROJECT_ID = '4fb7a731e89445f3b8879311477c8121';
const PRIVATE_KEY = '467449874136b97c8317c47ec589f50ee304dacb772d8625ecab0a65611e8c59';

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    sepolia: {
      url: 'https://sepolia.infura.io/v3/4fb7a731e89445f3b8879311477c8121',
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
};

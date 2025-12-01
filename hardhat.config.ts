import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {}, // default
    bsc_test: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: ['8b0400d02241bdd6e6e03dc44abce9aafbb1a343a9b742df21e5756bbc9a218d'],
    },
    celo_test: {
      url: "https://rpc.ankr.com/celo_sepolia",
      chainId: 11142220,
      accounts: ['8b0400d02241bdd6e6e03dc44abce9aafbb1a343a9b742df21e5756bbc9a218d'],
    },
    hoodi_test: {
      url: 'https://rpc-hoodi.morphl2.io',
      chainId: 2910,
      accounts: ['8b0400d02241bdd6e6e03dc44abce9aafbb1a343a9b742df21e5756bbc9a218d'],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;

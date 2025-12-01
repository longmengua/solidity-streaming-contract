import { ethers, config } from "hardhat";
import { ContractFactory } from "ethers";

async function main() {
  // 取得部署帳戶
  const [deployer] = await ethers.getSigners();
  console.log("Deploying account address:", deployer.address);

  // 檢查餘額
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

  if (balance.lte(ethers.utils.parseEther("0.01"))) { // 設定最小餘額門檻
    throw new Error("Insufficient funds for deployment. Please fund your account.");
  }

  // 取得合約工廠
  const Token: ContractFactory = await ethers.getContractFactory("TestToken");

  // 部署合約，固定 gasPrice 和 gasLimit 避免估算錯誤
  const token = await Token.deploy(
    "Test Token",
    "TT",
    "1000000000000000",
  );

  await token.deployed();
  console.log("Token deployed to:", token.address);

  // 查詢部署帳戶在合約中的 Token 餘額
  const tokenBalance = await token.balanceOf(deployer.address);
  console.log(
    `Token balance of deployer (${deployer.address}):`,
    tokenBalance.toString()
  );

  // 查詢合約總供應量
  const totalSupply = await token.totalSupply();
  console.log("Token total supply:", totalSupply.toString());
}

// 捕獲錯誤
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

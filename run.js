"use strict";
const env = require("./env.json");
const fetch = require("node-fetch");
Object.assign(process.env, env);

const ethers = require("ethers");
let timer;

const bscRyzr = "0x5A9F325209743B6fF75d2E9545D84929e50e8ac6";
const bscBridge = "0x4021f441B11e2A2E982665F950724DacD816b88c";
const bscRouter = "0x46Ab076929E4fbdFBA490D96D44a47Cf7FCeD06c";

const ethRyzr = "0x5A9F325209743B6fF75d2E9545D84929e50e8ac6";
const ethBridge = "0x4021f441B11e2A2E982665F950724DacD816b88c"; 
const ethRouter = "0x3e74f784Ccb536C0cD25F589a4EcC1DC35f0C894";

const polygonRyzr = "0x5A9F325209743B6fF75d2E9545D84929e50e8ac6";
const polygonBridge = "0x4021f441B11e2A2E982665F950724DacD816b88c";
const polygonRouter = "0x56a20168571ef89F87Bb21f55daFb0413eaD8e79";

const avaxRyzr = "0x5A9F325209743B6fF75d2E9545D84929e50e8ac6";
const avaxBridge = "0x4021f441B11e2A2E982665F950724DacD816b88c";
const avaxRouter = "0x964f1497B8Af8fC7420D1C33FE6B9516EE759c95";

const croRyzr = "0x5A9F325209743B6fF75d2E9545D84929e50e8ac6";
const croBridge = "0x4021f441B11e2A2E982665F950724DacD816b88c";
const croRouter = "0x694C2d76e6A4aF3E515bdA7b57014f909Ec388e5";

const ftmRyzr = "0x5A9F325209743B6fF75d2E9545D84929e50e8ac6";
const ftmBridge = "0x4021f441B11e2A2E982665F950724DacD816b88c";
const ftmRouter = "0x989979Ba6a12F2228dA2C53CD617a3d42e12AaeA";

const bridgeWallet = "0x35d69366932a89483BD77946847Fc6a5730366BC";
const bridgeMaster = "0x5baE3EF5d9F6319dc53F6f50AdDAE668f293Bd88";
const feeReceiver = "0xD0b5B5c4e04D67096dDa0b779a5dF5DA8eE4e047";

const bwKey = process.env.BRIDGE_WALLET_KEY;
const bmKey = process.env.BRIDGE_MASTER_KEY;
const frKey = process.env.FEE_RECEIVER_KEY;

const routerAbi = new ethers.utils.Interface(require("./abis/ryzrRouter.json"));
const routerAbiAVAX = new ethers.utils.Interface(
  require("./abis/ryzrRouterAVAX.json")
);
const tokenAbi = new ethers.utils.Interface(require("./abis/ryzr.json"));
const bridgeAbi = new ethers.utils.Interface(require("./abis/bridgeAbi.json"));

const bscProvider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed1.defibit.io/"
);
const bscSigner = new ethers.Wallet(bwKey, bscProvider);
const bscMasterSigner = new ethers.Wallet(bmKey, bscProvider);
const bscFeeSigner = new ethers.Wallet(frKey, bscProvider);

const ethProvider = new ethers.providers.JsonRpcProvider(
  "https://cloudflare-eth.com"
);
const ethSigner = new ethers.Wallet(bwKey, ethProvider);
const ethMasterSigner = new ethers.Wallet(bmKey, ethProvider);
const ethFeeSigner = new ethers.Wallet(frKey, ethProvider);

const polygonProvider = new ethers.providers.JsonRpcProvider(
  "https://polygon-rpc.com/"
);
const polygonSigner = new ethers.Wallet(bwKey, polygonProvider);
const polygonMasterSigner = new ethers.Wallet(bmKey, polygonProvider);
const polygonFeeSigner = new ethers.Wallet(frKey, polygonProvider);

const avaxProvider = new ethers.providers.JsonRpcProvider(
  "https://api.avax.network/ext/bc/C/rpc"
);
const avaxSigner = new ethers.Wallet(bwKey, avaxProvider);
const avaxMasterSigner = new ethers.Wallet(bmKey, avaxProvider);
const avaxFeeSigner = new ethers.Wallet(frKey, avaxProvider);

const croProvider = new ethers.providers.JsonRpcProvider(
  "https://evm.cronos.org"
);
const croSigner = new ethers.Wallet(bwKey, croProvider);
const croMasterSigner = new ethers.Wallet(bmKey, croProvider);
const croFeeSigner = new ethers.Wallet(frKey, croProvider);

const ftmProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/fantom"
);
const ftmSigner = new ethers.Wallet(bwKey, ftmProvider);
const ftmMasterSigner = new ethers.Wallet(bmKey, ftmProvider);
const ftmFeeSigner = new ethers.Wallet(frKey, ftmProvider);

const bscRouterInstance = new ethers.Contract(
  bscRouter,
  routerAbi,
  bscFeeSigner
);
const bscTokenInstance = new ethers.Contract(bscRyzr, tokenAbi, bscSigner);
const bscBridgeInstance = new ethers.Contract(
  bscBridge,
  bridgeAbi,
  bscMasterSigner
);

const ethRouterInstance = new ethers.Contract(
  ethRouter,
  routerAbi,
  ethFeeSigner
);
const ethTokenInstance = new ethers.Contract(ethRyzr, tokenAbi, ethSigner);
const ethBridgeInstance = new ethers.Contract(
  ethBridge,
  bridgeAbi,
  ethMasterSigner
);

const polygonRouterInstance = new ethers.Contract(
  polygonRouter,
  routerAbi,
  polygonFeeSigner
);
const polygonTokenInstance = new ethers.Contract(
  polygonRyzr,
  tokenAbi,
  polygonSigner
);
const polygonBridgeInstance = new ethers.Contract(
  polygonBridge,
  bridgeAbi,
  polygonMasterSigner
);

const avaxRouterInstance = new ethers.Contract(
  avaxRouter,
  routerAbiAVAX,
  avaxFeeSigner
);
const avaxTokenInstance = new ethers.Contract(avaxRyzr, tokenAbi, avaxSigner);
const avaxBridgeInstance = new ethers.Contract(
  avaxBridge,
  bridgeAbi,
  avaxMasterSigner
);

const croRouterInstance = new ethers.Contract(
  croRouter,
  routerAbi,
  croFeeSigner
);
const croTokenInstance = new ethers.Contract(croRyzr, tokenAbi, croSigner);
const croBridgeInstance = new ethers.Contract(
  croBridge,
  bridgeAbi,
  croMasterSigner
);

const ftmRouterInstance = new ethers.Contract(
  ftmRouter,
  routerAbi,
  ftmFeeSigner
);
const ftmTokenInstance = new ethers.Contract(ftmRyzr, tokenAbi, ftmSigner);
const ftmBridgeInstance = new ethers.Contract(
  ftmBridge,
  bridgeAbi,
  ftmMasterSigner
);

const handleFeesBNB = async () => {
  try {
    const bnbFeeBalance = await bscTokenInstance.balanceOf(feeReceiver);
    const formattedBnbFeeBalance = ethers.utils.formatUnits(bnbFeeBalance, "9");
    console.log(formattedBnbFeeBalance + " BSC fee receiver RYZR token balance");

    // BSC - deals with selling fee receiver's tokens
    if (Number(formattedBnbFeeBalance) > 1000) {
      const tradeAmount = ethers.utils.parseUnits("1000", "9");
      const sellTokens =
        await bscRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [bscRyzr, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            gasPrice: ethers.utils.parseUnits("5.1", "gwei"),
          }
        );
      await bscProvider.waitForTransaction(sellTokens.hash);
      const receipt = await bscProvider.getTransactionReceipt(sellTokens.hash);
      console.log(sellTokens.hash);
      if (receipt.status !== 1) {
        console.log("Selling tokens on BSC failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const hanldeFeesETH = async () => {
  try {
    // ETH gwei
    let gasEstimate = await ethProvider.getFeeData();
    const maxFeePerGas = ethers.utils.formatUnits(
      gasEstimate.maxFeePerGas,
      "gwei"
    ) * 1.2;

    const ethFeeBalance = await ethTokenInstance.balanceOf(feeReceiver);
    const formattedEthFeeBalance = ethers.utils.formatUnits(ethFeeBalance, "9");
    console.log(formattedEthFeeBalance + " ETH fee receiver RYZR token balance");

    // ETH - deals with selling fee receiver's tokens
    if (Number(formattedEthFeeBalance) > 10000) {
      const tradeAmount = ethers.utils.parseUnits("10000", "9"); 
      const sellTokens =
        await ethRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [ethRyzr, "0xc778417E063141139Fce010982780140Aa0cD5Ab"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            maxFeePerGas: ethers.utils.parseUnits(maxFeePerGas.toFixed(1), "gwei"),
            maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2", "gwei"),
          }
        );
      await ethProvider.waitForTransaction(sellTokens.hash);
      const receipt = await ethProvider.getTransactionReceipt(sellTokens.hash);
      console.log(sellTokens.hash);
      if (receipt.status !== 1) {
        console.log("Selling tokens on ETH failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const hanldeFeesMATIC = async () => {
  try {
    // POLYGON gwei
    const response = await fetch(
      "https://gasstation-mainnet.matic.network/v2",
      {}
    );
    const json = await response.json();
    const baseFee = await json.safeLow.maxFee;
    let maticGwei = Number(baseFee) * 1.2;

    const maticFeeBalance = await polygonTokenInstance.balanceOf(feeReceiver);
    const formattedMaticFeeBalance = ethers.utils.formatUnits(
      maticFeeBalance,
      "9"
    );
    console.log(formattedMaticFeeBalance + " MATIC fee receiver RYZR token balance");
    // POLYGON - deals with selling fee receiver's tokens
    if (Number(formattedMaticFeeBalance) > 1000) {
      const tradeAmount = ethers.utils.parseUnits("1000", "9"); 
      const sellTokens =
        await polygonRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [polygonRyzr, "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            maxFeePerGas: ethers.utils.parseUnits(maticGwei.toFixed(1), "gwei"),
            maxPriorityFeePerGas: ethers.utils.parseUnits(
              maticGwei.toFixed(1),
              "gwei"
            ),
          }
        );
      await polygonProvider.waitForTransaction(sellTokens.hash);
      const receipt = await polygonProvider.getTransactionReceipt(
        sellTokens.hash
      );
      console.log(sellTokens.hash);
      if (receipt.status !== 1) {
        console.log("Selling tokens on POLYGON failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const handleFeesAVAX = async () => {
  try {
    // AVAX gwei
    let gasEstimate = await avaxProvider.getFeeData();
    let avaxGwei = ethers.utils.formatUnits(gasEstimate.gasPrice, "gwei") * 1.2;
    const avaxFeeBalance = await avaxTokenInstance.balanceOf(feeReceiver);
    const formattedAvaxFeeBalance = ethers.utils.formatUnits(
      avaxFeeBalance,
      "9"
    );
    console.log(formattedAvaxFeeBalance + " AVAX fee receiver RYZR token balance");
    // AVAX - deals with selling fee receiver's tokens
    if (Number(formattedAvaxFeeBalance) > 600) {
      const tradeAmount = ethers.utils.parseUnits("600", "9");
      const sellTokens =
        await avaxRouterInstance.swapExactTokensForAVAXSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [avaxRyzr, "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            maxFeePerGas: ethers.utils.parseUnits(avaxGwei.toFixed(0), "gwei"),
          }
        );
      await avaxProvider.waitForTransaction(sellTokens.hash);
      const receipt = await avaxProvider.getTransactionReceipt(sellTokens.hash);
      console.log(sellTokens.hash);
      if (receipt.status !== 1) {
        console.log("Selling tokens on AVAX failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const handleFeesCRO = async () => {
  try {
    // CRO gwei
    let gasEstimateCRO = await croProvider.getFeeData();
    let newGwei = ethers.utils.formatUnits(gasEstimateCRO.gasPrice, "gwei");
    let gweiCRO = Number(newGwei) * 1.2;
    const croFeeBalance = await croTokenInstance.balanceOf(feeReceiver);
    const formattedCroFeeBalance = ethers.utils.formatUnits(croFeeBalance, "9");
    console.log(formattedCroFeeBalance + " CRO fee receiver RYZR token balance");
    // CRO - deals with selling fee receiver's tokens
    if (Number(formattedCroFeeBalance) > 1000) {
      const tradeAmount = ethers.utils.parseUnits("1000", "9");
      const sellTokens =
        await croRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [croRyzr, "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            maxFeePerGas: ethers.utils.parseUnits(gweiCRO.toFixed(1), "gwei"),
          }
        );
      await croProvider.waitForTransaction(sellTokens.hash);
      const receipt = await croProvider.getTransactionReceipt(sellTokens.hash);
      console.log(sellTokens.hash);
      if (receipt.status !== 1) {
        console.log("Selling tokens on CRO failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const handleFeesFTM = async () => {
  try {
    // FTM gwei
    let gasEstimateFTM = await ftmProvider.getFeeData();
    let newGweiFTM =
      ethers.utils.formatUnits(gasEstimateFTM.gasPrice, "gwei") * 1.2;

    const ftmFeeBalance = await ftmTokenInstance.balanceOf(feeReceiver);
    const formattedFtmFeeBalance = ethers.utils.formatUnits(ftmFeeBalance, "9");
    console.log(formattedFtmFeeBalance + " FTM fee receiver RYZR token balance");
    // FTM - deals with selling fee receiver's tokens
    if (Number(formattedFtmFeeBalance) > 1000) {
      const tradeAmount = ethers.utils.parseUnits("1000", "9"); 
      const sellTokens =
        await ftmRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [ftmRyzr, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            // gasLimit: ethers.utils.parseUnits("200000", "wei"),
            gasPrice: ethers.utils.parseUnits(newGweiFTM.toFixed(1), "gwei"),
          }
        );
      await ftmProvider.waitForTransaction(sellTokens.hash);
      const receipt = await ftmProvider.getTransactionReceipt(sellTokens.hash);
      console.log(sellTokens.hash);
      if (receipt.status !== 1) {
        console.log("Selling tokens on FTM failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const resupplyBNB = async () => {
  try {
    const bnbBalance = await bscProvider.getBalance(bridgeWallet);
    const formattedBnbBal = ethers.utils.formatEther(bnbBalance);
    console.log(formattedBnbBal + " BNB left in Bridge Wallet");

    // resupplies BNB to bridge ethers.Wallet
    if (Number(formattedBnbBal) < 0.05) {
      const bnbNeeded = 0.1 - Number(formattedBnbBal); // fills bridgeWallet to 0.1 BNB
      const transferBNB = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(bnbNeeded.toFixed(9), "18"),
      };

      const txn = await bscFeeSigner
        .sendTransaction(transferBNB)
        .then((transaction) => {
          let myHash = transaction.hash;
          return myHash;
        });

      await bscProvider.waitForTransaction(txn);
      const receipt = await bscProvider.getTransactionReceipt(txn);
      console.log(txn);
      if (receipt.status !== 1) {
        console.log("BNB transfer failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const resupplyETH = async () => {
  try {
    // ETH gwei
    let gasEstimate = await ethProvider.getFeeData();
    const maxFeePerGas = ethers.utils.formatUnits(
      gasEstimate.maxFeePerGas,
      "gwei"
    ) * 1.2;


    const ethBalance = await ethProvider.getBalance(bridgeWallet);
    const formattedEthBal = ethers.utils.formatEther(ethBalance);
    console.log(formattedEthBal + " ETH left in Bridge Wallet");


    // resupplies ETH to bridge ethers.Wallet
    if (Number(formattedEthBal) < 0.05) {
      const ethNeeded = 0.1 - Number(formattedEthBal); // fills bridgeWallet to .1 ETH
      const transferETH = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(ethNeeded.toFixed(9), "18"),
        maxFeePerGas: ethers.utils.parseUnits(maxFeePerGas.toFixed(1), "gwei"),
        maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2", "gwei"),
      };

      const txn = await ethFeeSigner
        .sendTransaction(transferETH)
        .then((transaction) => {
          let myHash = transaction.hash;
          return myHash;
        });

      await ethProvider.waitForTransaction(txn);
      const receipt = await ethProvider.getTransactionReceipt(txn);
      console.log(txn);
      if (receipt.status !== 1) {
        console.log("ETH transfer failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const resupplyMATIC = async () => {
  try {
    // POLYGON gwei
    const response = await fetch(
      "https://gasstation-mainnet.matic.network/v2",
      {}
    );
    const json = await response.json();
    const baseFee = await json.safeLow.maxFee;
    let maticGwei = Number(baseFee) * 1.2;

    const maticBalance = await polygonProvider.getBalance(bridgeWallet);
    const formattedMaticBal = ethers.utils.formatEther(maticBalance);
    console.log(formattedMaticBal + " MATIC left in Bridge Wallet");

    // resupplies MATIC to bridge ethers.Wallet
    if (Number(formattedMaticBal) < 10) {
      const maticNeeded = 15 - Number(formattedMaticBal); // fills bridgeWallet to 15 MATIC
      const transferMATIC = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(maticNeeded.toFixed(9), "18"),
        maxFeePerGas: ethers.utils.parseUnits(maticGwei.toFixed(0), "gwei"),
        maxPriorityFeePerGas: ethers.utils.parseUnits(
          maticGwei.toFixed(0),
          "gwei"
        ),
      };

      const txn = await polygonFeeSigner
        .sendTransaction(transferMATIC)
        .then((transaction) => {
          let myHash = transaction.hash;
          return myHash;
        });

      await polygonProvider.waitForTransaction(txn);
      const receipt = await polygonProvider.getTransactionReceipt(txn);
      console.log(txn);
      if (receipt.status !== 1) {
        console.log("MATIC transfer failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const resupplyAVAX = async () => {
  try {
    // AVAX gwei
    let gasEstimate = await avaxProvider.getFeeData();
    let avaxGwei = ethers.utils.formatUnits(gasEstimate.gasPrice, "gwei") * 1.2;

    const avaxBalance = await avaxProvider.getBalance(bridgeWallet);
    const formattedAvaxBal = ethers.utils.formatEther(avaxBalance);
    console.log(formattedAvaxBal + " AVAX left in Bridge Wallet");

    // resupplies AVAX to bridge ethers.Wallet
    if (Number(formattedAvaxBal) < 0.25) {
      const avaxNeeded = .5 - Number(formattedAvaxBal); // fills bridgeWallet to .3 AVAX
      const transferAVAX = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(avaxNeeded.toFixed(9), "18"),
        maxFeePerGas: ethers.utils.parseUnits(avaxGwei.toFixed(0), "gwei"),
      };

      const txn = await avaxFeeSigner
        .sendTransaction(transferAVAX)
        .then((transaction) => {
          let myHash = transaction.hash;
          return myHash;
        });

      await avaxProvider.waitForTransaction(txn);
      const receipt = await avaxProvider.getTransactionReceipt(txn);
      console.log(txn);
      if (receipt.status !== 1) {
        console.log("AVAX transfer failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const resupplyCRO = async () => {
  try {
    // CRO gwei
    let gasEstimateCRO = await croProvider.getFeeData();
    let newGwei = ethers.utils.formatUnits(gasEstimateCRO.gasPrice, "gwei");
    let gweiCRO = Number(newGwei) * 1.2;

    const croBalance = await croProvider.getBalance(bridgeWallet);
    const formattedCroBal = ethers.utils.formatEther(croBalance);
    console.log(formattedCroBal + " CRO left in Bridge Wallet");

    // resupplies CRO to bridge ethers.Wallet
    if (Number(formattedCroBal) < 25) {
      const croNeeded = 50 - Number(formattedCroBal); // fills bridgeWallet to 50 CRO
      const transferCRO = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(croNeeded.toFixed(9), "18"),
        gasLimit: ethers.utils.parseUnits("250000", "wei"),
        maxFeePerGas: ethers.utils.parseUnits(gweiCRO.toFixed(0), "gwei"),
      };

      const txn = await croFeeSigner
        .sendTransaction(transferCRO)
        .then((transaction) => {
          let myHash = transaction.hash;
          return myHash;
        });
      console.log("here");

      await croProvider.waitForTransaction(txn);
      const receipt = await croProvider.getTransactionReceipt(txn);
      console.log(txn);
      if (receipt.status !== 1) {
        console.log("CRO transfer failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const resupplyFTM = async () => {
  try {
    // FTM gwei
    let gasEstimateFTM = await ftmProvider.getFeeData();
    let newGweiFTM =
      ethers.utils.formatUnits(gasEstimateFTM.gasPrice, "gwei") * 1.2;

    const ftmBalance = await ftmProvider.getBalance(bridgeWallet);
    const formattedFtmBal = ethers.utils.formatEther(ftmBalance);
    console.log(formattedFtmBal + " FTM left in Bridge Wallet");

    // resupplies FTM to bridge ethers.Wallet
    if (Number(formattedFtmBal) < 25) {
      const ftmNeeded = 50 - Number(formattedFtmBal); // fills bridgeWallet to 50 FTM
      const transferFTM = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(ftmNeeded.toFixed(9), "18"),
        gasPrice: ethers.utils.parseUnits(newGweiFTM.toFixed(1), "gwei"),
      };

      const txn = await ftmFeeSigner
        .sendTransaction(transferFTM)
        .then((transaction) => {
          let myHash = transaction.hash;
          return myHash;
        });

      await ftmProvider.waitForTransaction(txn);
      const receipt = await ftmProvider.getTransactionReceipt(txn);
      console.log(txn);
      if (receipt.status !== 1) {
        console.log("FTM transfer failed!!!");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const handleTokensBSC = async () => {
  try {
    const bscTokenBal = await bscTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalBsc = ethers.utils.formatUnits(bscTokenBal, "9");
    console.log(formattedTokenBalBsc + " RYZR held in Bridge Wallet on Binance");

    // mints tokens to bridge ethers.Wallet - BSC
    if (Number(formattedTokenBalBsc).toFixed(0) < "25000") {
      const tokensNeeded = 25000 - Number(formattedTokenBalBsc);
      const mintBsc = await bscBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9")
      );
      console.log("Minting " + tokensNeeded.toFixed(0) + " RYZR on Binance")
      await bscProvider.waitForTransaction(mintBsc.hash);
      const receipt = await bscProvider.getTransactionReceipt(mintBsc.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - BSC
    if (Number(formattedTokenBalBsc).toFixed(0) > "25000") {
      const tokenOverflow = Number(formattedTokenBalBsc) - 25000;

      const burnTokens = async () => {
        const burnBsc = await bscTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9")
        );
        console.log("Burning " + tokenOverflow.toFixed(0) + " RYZR on Binance")
        await bscProvider.waitForTransaction(burnBsc.hash);
        const receiptBurn = await bscProvider.getTransactionReceipt(
          burnBsc.hash
        );
        console.log(receiptBurn.status);
        if (receiptBurn.status !== 1) {
          console.log("Burning failed!!!");
        }
      };
      setTimeout(burnTokens, 10000);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleTokensETH = async () => {
  try {
    // ETH gwei
    let gasEstimate = await ethProvider.getFeeData();
    const maxFeePerGas = ethers.utils.formatUnits(
      gasEstimate.maxFeePerGas,
      "gwei"
    ) * 1.2;

    const ethTokenBal = await ethTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalEth = ethers.utils.formatUnits(ethTokenBal, "9");
    console.log(formattedTokenBalEth + " RYZR held in Bridge Wallet on Ethereum");

    // mints tokens to bridge ethers.Wallet - ETH
    if (Number(formattedTokenBalEth).toFixed(0) < "25000") {
      const tokensNeeded = 25000 - Number(formattedTokenBalEth);
      console.log(tokensNeeded);
      const mintEth = await ethBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9"),
        {
          maxFeePerGas: ethers.utils.parseUnits(maxFeePerGas.toFixed(1), "gwei"),
          // maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2.5", "gwei"),
        }
      );
      console.log("Minting " + tokensNeeded.toFixed(0) + " RYZR on Ethereum")
      await ethProvider.waitForTransaction(mintEth.hash);
      const receipt = await ethProvider.getTransactionReceipt(mintEth.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
        
      }
    }
    // burns tokens from bridge ethers.Wallet - ETH
    if (Number(formattedTokenBalEth).toFixed(0) > "25000") {
      const tokenOverflow = Number(formattedTokenBalEth) - 25000;
      const burnTokens = async () => {
        const burnEth = await ethTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9"),
          {
            maxFeePerGas: ethers.utils.parseUnits(maxFeePerGas.toFixed(1), "gwei"),
            maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2", "gwei"),
          }
        );
        console.log("Burning " + tokenOverflow.toFixed(0) + " RYZR on Ethereum")
        await ethProvider.waitForTransaction(burnEth.hash);
        const receiptBurn = await ethProvider.getTransactionReceipt(
          burnEth.hash
        );
        console.log(receiptBurn.status);
        if (receiptBurn.status !== 1) {
          console.log("Burning failed!!!");
        }
      };
      setTimeout(burnTokens, 10000);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleTokensMATIC = async () => {
  try {
    // POLYGON gwei
    const response = await fetch(
      "https://gasstation-mainnet.matic.network/v2",
      {}
    );
    const json = await response.json();
    const baseFee = await json.safeLow.maxFee;
    let maticGwei = Number(baseFee) * 1.2;

    const polygonTokenBal = await polygonTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalPolygon = ethers.utils.formatUnits(
      polygonTokenBal,
      "9"
    );
    console.log(formattedTokenBalPolygon + " RYZR held in Bridge Wallet on Polygon")

    // mints tokens to bridge ethers.Wallet - POLYGON
    if (Number(formattedTokenBalPolygon).toFixed(0) < "25000") {
      const tokensNeeded = 25000 - Number(formattedTokenBalPolygon);
      console.log(tokensNeeded);
      const mintPolygon = await polygonBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9"),
        {
          maxFeePerGas: ethers.utils.parseUnits(maticGwei.toFixed(0), "gwei"),
          maxPriorityFeePerGas: ethers.utils.parseUnits(
            maticGwei.toFixed(0),
            "gwei"
          ),
        }
      );
      console.log("Minting " + tokensNeeded.toFixed(0) + " RYZR on Polygon")
      await polygonProvider.waitForTransaction(mintPolygon.hash);
      const receipt = await polygonProvider.getTransactionReceipt(
        mintPolygon.hash
      );
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - POLYGON
    if (Number(formattedTokenBalPolygon).toFixed(0) > "25000") {
      const tokenOverflow = Number(formattedTokenBalPolygon) - 25000;
      const burnTokens = async () => {
        const burnPolygon = await polygonTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9"),
          {
            maxFeePerGas: ethers.utils.parseUnits(maticGwei.toFixed(0), "gwei"),
            maxPriorityFeePerGas: ethers.utils.parseUnits(
              maticGwei.toFixed(0),
              "gwei"
            ),
          }
        );
        console.log("Burning " + tokenOverflow.toFixed(0) + " RYZR on Polygon")
        await polygonProvider.waitForTransaction(burnPolygon.hash);
        const receiptBurn = await polygonProvider.getTransactionReceipt(
          burnPolygon.hash
        );
        console.log(receiptBurn.status);
        if (receiptBurn.status !== 1) {
          console.log("Burning failed!!!");
        }
      };
      setTimeout(burnTokens, 10000);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleTokensAVAX = async () => {
  try {
    // AVAX gwei
    let gasEstimate = await avaxProvider.getFeeData();
    let avaxGwei = ethers.utils.formatUnits(gasEstimate.gasPrice, "gwei") * 1.2;

    const avaxTokenBal = await avaxTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalAvax = ethers.utils.formatUnits(avaxTokenBal, "9");
    console.log(formattedTokenBalAvax + " RYZR held in Bridge Wallet on Avalanche");

    // mints tokens to bridge ethers.Wallet - AVAX
    if (Number(formattedTokenBalAvax).toFixed(0) < "25000") {
      const tokensNeeded = 25000 - Number(formattedTokenBalAvax);
      console.log(tokensNeeded);
      const mintAvax = await avaxBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9"),
        {
          maxFeePerGas: ethers.utils.parseUnits(avaxGwei.toFixed(0), "gwei"),
          // maxPriorityFeePerGas: ethers.ethers.utils.parseUnits(
          //   avaxGwei.toFixed(0),
          //   "gwei"
          // ),
        }
      );
      console.log("Minting " + tokensNeeded.toFixed(0) + " RYZR on Avalanche")
      await avaxProvider.waitForTransaction(mintAvax.hash);
      const receipt = await avaxProvider.getTransactionReceipt(mintAvax.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - AVAX
    if (Number(formattedTokenBalAvax).toFixed(0) > "25000") {
      const tokenOverflow = Number(formattedTokenBalAvax) - 25000;
      const burnTokens = async () => {
        const burnAvax = await avaxTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9"),
          {
            maxFeePerGas: ethers.utils.parseUnits(avaxGwei.toFixed(0), "gwei"),
            //   maxPriorityFeePerGas: ethers.ethers.utils.parseUnits(
            //     avaxGwei.toFixed(0),
            //     "gwei"
            //   ),
          }
        );
        console.log("Burning " + tokenOverflow.toFixed(0) + " RYZR on Avalanche")
        await avaxProvider.waitForTransaction(burnAvax.hash);
        const receiptBurn = await avaxProvider.getTransactionReceipt(
          burnAvax.hash
        );
        console.log(receiptBurn.status);
        if (receiptBurn.status !== 1) {
          console.log("Burning failed!!!");
        }
      };
      setTimeout(burnTokens, 10000);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleTokensCRO = async () => {
  try {
    // CRO gwei
    const croTokenBal = await croTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalCro = ethers.utils.formatUnits(croTokenBal, "9");
    console.log(formattedTokenBalCro + " RYZR held in Bridge Wallet on Cronos");

    // mints tokens to bridge ethers.Wallet - CRO
    if (Number(formattedTokenBalCro).toFixed(0) < "25000") {
      const tokensNeeded = 25000 - Number(formattedTokenBalCro);
      const mintCRO = await croBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9")
      );
      console.log("Minting " + tokensNeeded.toFixed(0) + " RYZR on Cronos")
      await croProvider.waitForTransaction(mintCRO.hash);
      const receipt = await croProvider.getTransactionReceipt(mintCRO.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - CRO
    if (Number(formattedTokenBalCro).toFixed(0) > "25000") {
      const tokenOverflow = Number(formattedTokenBalCro) - 25000;

      const burnTokens = async () => {
        const burnCRO = await croTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9")
        );
        console.log("Burning " + tokenOverflow.toFixed(0) + " RYZR on Cronos")
        await croProvider.waitForTransaction(burnCRO.hash);
        const receiptBurn = await croProvider.getTransactionReceipt(
          burnCRO.hash
        );
        console.log(receiptBurn.status);
        if (receiptBurn.status !== 1) {
          console.log("Burning failed!!!");
        }
      };
      setTimeout(burnTokens, 10000);
    }
  } catch (err) {
    console.log(err);
  }
};

const handleTokensFTM = async () => {
  try {
    // FTM gwei
    let gasEstimateFTM = await ftmProvider.getFeeData();
    let newGweiFTM =
      ethers.utils.formatUnits(gasEstimateFTM.gasPrice, "gwei") * 1.2;

    const ftmTokenBal = await ftmTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalFtm = ethers.utils.formatUnits(ftmTokenBal, "9");
    console.log(formattedTokenBalFtm + " RYZR held in Bridge Wallet on Fantom");

    // mints tokens to bridge ethers.Wallet - FTM
    if (Number(formattedTokenBalFtm).toFixed(0) < "25000") {
      const tokensNeeded = 25000 - Number(formattedTokenBalFtm);
      const mintFtm = await ftmBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9"),
        {
          // gasLimit: ethers.ethers.utils.parseUnits("250000", "wei"),
          gasPrice: ethers.utils.parseUnits(newGweiFTM.toFixed(1), "gwei"),
        }
      );
      console.log("Minting " + tokensNeeded.toFixed(0) + " RYZR on Fantom")
      await ftmProvider.waitForTransaction(mintFtm.hash);
      const receipt = await ftmProvider.getTransactionReceipt(mintFtm.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - FTM
    if (Number(formattedTokenBalFtm).toFixed(0) > "25000") {
      const tokenOverflow = Number(formattedTokenBalFtm) - 25000;

      const burnTokens = async () => {
        const burnFtm = await ftmTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9"),
          {
            // gasLimit: ethers.ethers.utils.parseUnits("250000", "wei"),
            gasPrice: ethers.utils.parseUnits(newGweiFTM.toFixed(1), "gwei"),
          }
        );
        console.log("Burning " + tokenOverflow.toFixed(0) + " RYZR on Fantom")
        await ftmProvider.waitForTransaction(burnFtm.hash);
        const receiptBurn = await ftmProvider.getTransactionReceipt(
          burnFtm.hash
        );
        console.log(receiptBurn.status);
        if (receiptBurn.status !== 1) {
          console.log("Burning failed!!!");
        }
      };
      setTimeout(burnTokens, 10000);
    }
  } catch (err) {
    console.log(err);
  }
};

const runBridge = () => {
  handleFeesBNB();
  hanldeFeesETH();
  hanldeFeesMATIC();
  handleFeesAVAX();
  handleFeesCRO();
  handleFeesFTM();
  resupplyBNB();
  resupplyETH();
  resupplyMATIC();
  resupplyAVAX();
  resupplyCRO();
  resupplyFTM();
  handleTokensBSC();
  handleTokensETH();
  handleTokensMATIC();
  handleTokensAVAX();
  handleTokensCRO();
  handleTokensFTM();
};
setTimeout(runBridge, 5000);
timer = setInterval(runBridge, 120000);

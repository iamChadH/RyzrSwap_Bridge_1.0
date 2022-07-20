"use strict";
const env = require("./env.json");
const fetch = require("node-fetch");
Object.assign(process.env, env);

const ethers = require("ethers");
let timer;

const bscRouter = "0x46Ab076929E4fbdFBA490D96D44a47Cf7FCeD06c";
const bscRyzr = "0x5291259eD925Cd5EF21A025077d51e0b41D06A60";
const bscBridge = "0xc1fDFd9b75E7C6ea0E3a217838f3A641076552aF";

const ethRouter = "0x694C2d76e6A4aF3E515bdA7b57014f909Ec388e5";
const ethRyzr = "0xe15cde69078a5ccFf4A686EC19cE0365ae97668E";
const ethBridge = "0xE4Ec7257F47348507456803Be3068781f5D88369";

const polygonRyzr = "0xE743A706227d30131309a96c61409dd9764A95d4";
const polygonBridge = "0xa06137e8eD81fE2382aca6202194ddD2263e2dbb";
const polygonRouter = "0x56a20168571ef89F87Bb21f55daFb0413eaD8e79";

const avaxRyzr = "0x12Dbbf2A3446fe7D6BBebD66B8d7a13C3B0C35B9";
const avaxBridge = "0x39FE10b7C3C0Be3586821e6B1Bc5893075B6F62B";
const avaxRouter = "0x964f1497B8Af8fC7420D1C33FE6B9516EE759c95";

const croRyzr = "0xe15cde69078a5ccFf4A686EC19cE0365ae97668E";
const croBridge = "0xE4Ec7257F47348507456803Be3068781f5D88369";
const croRouter = "0x694C2d76e6A4aF3E515bdA7b57014f909Ec388e5";

const ftmRyzr = "0xE4Ec7257F47348507456803Be3068781f5D88369";
const ftmBridge = "0x863D0312510df0dF087BF2362C89892Be00fAE77";
const ftmRouter = "0x694C2d76e6A4aF3E515bdA7b57014f909Ec388e5";

const bridgeWallet = "0xbc744b31cf49d3e065bc7571bc7bff40fd92dbbd";
const bridgeMaster = "0x72314d50E29fE4C57c656489aA8eF95A16a18FA3";
const feeReceiver = "0x329f5712d601F32a73CEA18C893fCF37B204261c";

const bwKey = process.env.BRIDGE_Wallet_KEY;
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
  "https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c"
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
    console.log(formattedBnbFeeBalance + " bnb fee balance");

    // BSC - deals with selling fee receiver's tokens
    if (Number(formattedBnbFeeBalance) > 200) {
      // change to 1000
      const tradeAmount = ethers.utils.parseUnits("200", "9"); // change from 200 to 1000
      const sellTokens =
        await bscRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [bscRyzr, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            gasPrice: ethers.utils.parseUnits("5", "gwei"),
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
    // let gwei = ethers.utils.formatUnits(gasEstimate.gasPrice, "gwei") * 1.15;
    const gwei = ethers.utils.formatUnits("20000000000", "gwei"); // change this
    const maxFeePerGas = ethers.utils.formatUnits(
      gasEstimate.maxFeePerGas,
      "gwei"
    );
    const maxPriority = ethers.utils.formatUnits(
      gasEstimate.maxPriorityFeePerGas,
      "gwei"
    );
    console.log(
      gwei + " eth gwei ",
      maxFeePerGas + " eth maxFeePerGas " + maxPriority + " eth max priority"
    );

    const ethFeeBalance = await ethTokenInstance.balanceOf(feeReceiver);
    const formattedEthFeeBalance = ethers.utils.formatUnits(ethFeeBalance, "9");
    console.log(formattedEthFeeBalance + " eth fee balance");
    // ETH - deals with selling fee receiver's tokens
    if (Number(formattedEthFeeBalance) > 200) {
      // change to 1000
      const tradeAmount = ethers.utils.parseUnits("200", "9"); // change from 200 to 1000
      const sellTokens =
        await ethRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [ethRyzr, "0xc778417E063141139Fce010982780140Aa0cD5Ab"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            maxFeePerGas: ethers.utils.parseUnits("30", "gwei"),
            maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2.5", "gwei"),
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
    console.log(formattedMaticFeeBalance);
    // POLYGON - deals with selling fee receiver's tokens
    if (Number(formattedMaticFeeBalance) > 200) {
      // change to 1000
      const tradeAmount = ethers.utils.parseUnits("200", "9"); // change from 200 to 1000
      const sellTokens =
        await polygonRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [polygonRyzr, "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            maxFeePerGas: ethers.utils.parseUnits(maticGwei.toFixed(0), "gwei"),
            maxPriorityFeePerGas: ethers.utils.parseUnits(
              maticGwei.toFixed(0),
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
    console.log(formattedAvaxFeeBalance);
    // AVAX - deals with selling fee receiver's tokens
    if (Number(formattedAvaxFeeBalance) > 200) {
      // change to 1000
      const tradeAmount = ethers.utils.parseUnits("200", "9"); // change from 200 to 1000
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
    console.log(formattedCroFeeBalance);
    // CRO - deals with selling fee receiver's tokens
    if (Number(formattedCroFeeBalance) > 200) {
      // change to 1000
      const tradeAmount = ethers.utils.parseUnits("200", "9"); // change from 200 to 1000
      const sellTokens =
        await croRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [croRyzr, "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            //   gasLimit: ethers.ethers.utils.parseUnits("500000", "wei"),
            maxFeePerGas: ethers.utils.parseUnits(gweiCRO.toFixed(0), "gwei"),
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
      ethers.utils.formatUnits(gasEstimateFTM.gasPrice, "gwei") * 1.15;
    // let maxGwei = ethers.ethers.utils.formatUnits(gasEstimateFTM.maxFeePerGas, "gwei");
    // let gweiFTM = (Number(newGweiFTM) + Number(maxGwei)) / 2;

    const ftmFeeBalance = await ftmTokenInstance.balanceOf(feeReceiver);
    const formattedFtmFeeBalance = ethers.utils.formatUnits(ftmFeeBalance, "9");
    console.log(formattedFtmFeeBalance);
    // FTM - deals with selling fee receiver's tokens
    if (Number(formattedFtmFeeBalance) > 200) {
      // change to 1000
      const tradeAmount = ethers.utils.parseUnits("200", "9"); // change from 200 to 1000
      const sellTokens =
        await ftmRouterInstance.swapExactTokensForETHSupportingFeeOnTransferTokens(
          tradeAmount,
          "0",
          [ftmRyzr, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"],
          feeReceiver,
          Date.now() + 1000 * 20,
          {
            //   gasLimit: ethers.ethers.utils.parseUnits("500000", "wei"),
            gasPrice: ethers.utils.parseUnits(newGweiFTM.toFixed(1), "gwei"),
          }
        );
      await ftmProvider.waitForTransaction(sellTokens.hash);
      const receipt = await ftmProvider.getTransactionReceipt(sellTokens.hash);
      console.log(sellTokens.hash);
      if (receipt.status !== 1) {
        console.log("Selling tokens on BSC failed!!!");
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
    console.log(formattedBnbBal);

    // resupplies BNB to bridge ethers.Wallet
    if (Number(formattedBnbBal) < 0.03) {
      const bnbNeeded = 0.05 - Number(formattedBnbBal); // fills bridgeWallet to 0.05 BNB
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
    // let gwei = ethers.utils.formatUnits(gasEstimate.gasPrice, "gwei") * 1.15;
    const gwei = ethers.utils.formatUnits("20000000000", "gwei"); // change this

    const ethBalance = await ethProvider.getBalance(bridgeWallet);
    const formattedEthBal = ethers.utils.formatEther(ethBalance);
    console.log(formattedEthBal);

    // resupplies ETH to bridge ethers.Wallet
    if (Number(formattedEthBal) < 0.05) {
      const ethNeeded = 0.07 - Number(formattedEthBal); // fills bridgeWallet to .07 ETH
      const transferETH = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(ethNeeded.toFixed(9), "18"),
        // maxFeePerGas: ethers.utils.parseUnits(gwei.toFixed(0), "gwei"),
        // maxFeePerGas: ethers.utils.parseUnits(gwei, "gwei"),

        // maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2.5", "gwei"),
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
    console.log(formattedMaticBal);

    // resupplies MATIC to bridge ethers.Wallet
    if (Number(formattedMaticBal) < 4) {
      const maticNeeded = 5 - Number(formattedMaticBal); // fills bridgeWallet to 5 MATIC
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
    console.log(formattedAvaxBal);

    // resupplies AVAX to bridge ethers.Wallet
    if (Number(formattedAvaxBal) < 0.15) {
      const avaxNeeded = 0.3 - Number(formattedAvaxBal); // fills bridgeWallet to .3 AVAX
      const transferAVAX = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(avaxNeeded.toFixed(9), "18"),
        maxFeePerGas: ethers.utils.parseUnits(avaxGwei.toFixed(0), "gwei"),
        //   maxPriorityFeePerGas: ethers.ethers.utils.parseUnits(
        //     maticGwei.toFixed(0),
        //     "gwei"
        //   ),
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
    console.log(formattedCroBal);

    // resupplies CRO to bridge ethers.Wallet
    if (Number(formattedCroBal) < 10) {
      const croNeeded = 15 - Number(formattedCroBal); // fills bridgeWallet to 15 CRO
      const transferCRO = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(croNeeded.toFixed(9), "18"),
        gasLimit: ethers.utils.parseUnits("500000", "wei"),
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
      ethers.utils.formatUnits(gasEstimateFTM.gasPrice, "gwei") * 1.15;
    // let maxGwei = ethers.ethers.utils.formatUnits(gasEstimateFTM.maxFeePerGas, "gwei");
    // let gweiFTM = (Number(newGweiFTM) + Number(maxGwei)) / 2;

    const ftmBalance = await ftmProvider.getBalance(bridgeWallet);
    const formattedFtmBal = ethers.utils.formatEther(ftmBalance);
    console.log(formattedFtmBal);

    // resupplies FTM to bridge ethers.Wallet
    if (Number(formattedFtmBal) < 5) {
      const ftmNeeded = 8 - Number(formattedFtmBal); // fills bridgeWallet to 8 FTM
      const transferFTM = {
        from: feeReceiver,
        to: bridgeWallet,
        value: ethers.utils.parseUnits(ftmNeeded.toFixed(9), "18"),
        // gasLimit: ethers.ethers.utils.parseUnits("500000", "wei"),
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
    console.log(formattedTokenBalBsc);

    // mints tokens to bridge ethers.Wallet - BSC
    if (Number(formattedTokenBalBsc) < 50000) {
      const tokensNeeded = 50000 - Number(formattedTokenBalBsc);
      const mintBsc = await bscBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9")
      );
      await bscProvider.waitForTransaction(mintBsc.hash);
      const receipt = await bscProvider.getTransactionReceipt(mintBsc.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - BSC
    if (Number(formattedTokenBalBsc) > 50000) {
      const tokenOverflow = Number(formattedTokenBalBsc) - 50000;

      const burnTokens = async () => {
        const burnBsc = await bscTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9")
        );
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
    // let gwei = ethers.utils.formatUnits(gasEstimate.gasPrice, "gwei") * 1.15;
    const gwei = ethers.utils.formatUnits("20000000000", "gwei"); // change this

    const ethTokenBal = await ethTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalEth = ethers.utils.formatUnits(ethTokenBal, "9");
    console.log(formattedTokenBalEth);

    // mints tokens to bridge ethers.Wallet - ETH
    if (Number(formattedTokenBalEth) < 50000) {
      const tokensNeeded = 50000 - Number(formattedTokenBalEth);
      console.log(tokensNeeded);
      const mintEth = await ethBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9"),
        {
          // maxFeePerGas: ethers.utils.parseUnits(gwei.toFixed(0), "gwei"),
          // maxFeePerGas: ethers.utils.parseUnits(gwei, "gwei"),

          // maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2.5", "gwei"),
        }
      );
      console.log(mintEth.hash);
      await ethProvider.waitForTransaction(mintEth.hash);
      const receipt = await ethProvider.getTransactionReceipt(mintEth.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - ETH
    if (Number(formattedTokenBalEth) > 50000) {
      const tokenOverflow = Number(formattedTokenBalEth) - 50000;
      const burnTokens = async () => {
        const burnEth = await ethTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9"),
          // {
          //   maxFeePerGas: ethers.utils.parseUnits(gwei, "gwei"),
          //   maxPriorityFeePerGas: ethers.ethers.utils.parseUnits("2.5", "gwei"),
          // }
        );
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
    console.log(formattedTokenBalPolygon);

    // mints tokens to bridge ethers.Wallet - POLYGON
    if (Number(formattedTokenBalPolygon) < 50000) {
      const tokensNeeded = 50000 - Number(formattedTokenBalPolygon);
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
      console.log(mintPolygon.hash);
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
    if (Number(formattedTokenBalPolygon) > 50000) {
      const tokenOverflow = Number(formattedTokenBalPolygon) - 50000;
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
    console.log(formattedTokenBalAvax);

    // mints tokens to bridge ethers.Wallet - AVAX
    if (Number(formattedTokenBalAvax) < 50000) {
      const tokensNeeded = 50000 - Number(formattedTokenBalAvax);
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
      console.log(mintAvax.hash);
      await avaxProvider.waitForTransaction(mintAvax.hash);
      const receipt = await avaxProvider.getTransactionReceipt(mintAvax.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - AVAX
    if (Number(formattedTokenBalAvax) > 50000) {
      const tokenOverflow = Number(formattedTokenBalAvax) - 50000;
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
    let gasEstimateCRO = await croProvider.getFeeData();
    let newGwei = ethers.utils.formatUnits(gasEstimateCRO.gasPrice, "gwei");
    let gweiCRO = Number(newGwei) * 1.2;

    const croTokenBal = await croTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalCro = ethers.utils.formatUnits(croTokenBal, "9");
    console.log(formattedTokenBalCro);

    // mints tokens to bridge ethers.Wallet - CRO
    if (Number(formattedTokenBalCro) < 50000) {
      const tokensNeeded = 50000 - Number(formattedTokenBalCro);
      const mintCRO = await croBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9")
      );
      await croProvider.waitForTransaction(mintCRO.hash);
      const receipt = await croProvider.getTransactionReceipt(mintCRO.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - CRO
    if (Number(formattedTokenBalCro) > 50000) {
      const tokenOverflow = Number(formattedTokenBalCro) - 50000;

      const burnTokens = async () => {
        const burnCRO = await croTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9")
        );
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
      ethers.utils.formatUnits(gasEstimateFTM.gasPrice, "gwei") * 1.15;
    // let maxGwei = ethers.ethers.utils.formatUnits(gasEstimateFTM.maxFeePerGas, "gwei");
    // console.log(newGweiFTM, maxGwei)
    // let gweiFTM = (Number(newGweiFTM) + Number(maxGwei)) / 2;

    const ftmTokenBal = await ftmTokenInstance.balanceOf(bridgeWallet);
    const formattedTokenBalFtm = ethers.utils.formatUnits(ftmTokenBal, "9");
    console.log(formattedTokenBalFtm);

    // mints tokens to bridge ethers.Wallet - FTM
    if (Number(formattedTokenBalFtm) < 50000) {
      const tokensNeeded = 50000 - Number(formattedTokenBalFtm);
      const mintFtm = await ftmBridgeInstance.mint(
        bridgeWallet,
        ethers.utils.parseUnits(tokensNeeded.toFixed(0), "9"),
        {
          // gasLimit: ethers.ethers.utils.parseUnits("500000", "wei"),
          gasPrice: ethers.utils.parseUnits(newGweiFTM.toFixed(1), "gwei"),
        }
      );
      await ftmProvider.waitForTransaction(mintFtm.hash);
      const receipt = await ftmProvider.getTransactionReceipt(mintFtm.hash);
      console.log(receipt.status);
      if (receipt.status !== 1) {
        console.log("Minting failed!!!");
      }
    }
    // burns tokens from bridge ethers.Wallet - FTM
    if (Number(formattedTokenBalFtm) > 50001) {
      const tokenOverflow = Number(formattedTokenBalFtm) - 50000;

      const burnTokens = async () => {
        const burnFtm = await ftmTokenInstance.burn(
          ethers.utils.parseUnits(tokenOverflow.toFixed(0), "9"),
          {
            // gasLimit: ethers.ethers.utils.parseUnits("500000", "wei"),
            gasPrice: ethers.utils.parseUnits(newGweiFTM.toFixed(1), "gwei"),
          }
        );
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
timer = setInterval(runBridge, 25000);

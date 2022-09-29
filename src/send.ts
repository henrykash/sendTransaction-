require("dotenv").config();
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

//web3 instance connected to the Alchemy provider
const web3 = createAlchemyWeb3(
  "wss://eth-goerli.g.alchemy.com/v2/0aHuSlzbd5Vvxqr_oCEYZdSyhn9PhiRI"
);
//accessing the wallet address & private key from the .env file
const WALLET_ADDRESS = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const main = async () => {
  try {
    /*get the nonce using web3 getTransactionCount function for the wallet address
    nonce is the number of transactions sent from the wallet address*/
    const nonce = await web3.eth.getTransactionCount(WALLET_ADDRESS!);
    console.log("NOnce", nonce);

    //the wallet address to send the transaction to
    const receiverAddress = "0x266fedED59399AFC982EEa44724fCa7Ba31C054f";

    /* creating the transaction object */
    const transaction = {
      to: receiverAddress,
      value: 0.001 * 1e18,
      gasLimit: 300000,
      nonce: nonce,
    };

    //Signing the traonsaction with the private key

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      PRIVATE_KEY!
    );

    //sending the transaction to the blockchain
    const sendSignedTransaction = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction!,
      function (err: any, hash: any) {
        if (!err) {
          console.log(
            `🎉 The hash of your transaction is: , ${hash}, \n Check Alchemy's Mempool to view the status of your transaction!🔥🔥🔥`
          );
        } else {
          console.log(
            "❗Something went wrong while submitting your transaction:",
            err
          );
        }
      }
    );

    console.log({ sendSignedTransaction });
  } catch (error) {
    console.log("Failed sending  transaction", error);
  }
};

main();

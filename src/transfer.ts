require("dotenv").config();
import { BigNumber, ethers, utils, Wallet } from "ethers";

//main function to send the transaction
const sendTx = async (address: string, amount: BigNumber) => {
  try {
    //provider instance connected to a websocket endpoint
    const provider = new ethers.providers.WebSocketProvider(
      process.env.WSS_URL!
    );

    //creating a wallet instance from the private key
    const account = new Wallet(process.env.PRIVATE_KEY!, provider); //signer

    //creating a transaction object
    const sendTx = {
      to: address,
      value: amount,
    };

    //sending the transaction
    const transactionReceipt = await account.sendTransaction(sendTx);

    console.log("Transaction receipt: ", transactionReceipt);
  } catch (error) {
    console.log("Error sending transaction: ", error);
  }

};

//the person to receive the amount
let receiverAddress = "0x266fedED59399AFC982EEa44724fCa7Ba31C054f"
let ETHER_TO_SEND = 0.001
console.log(`Sending ${utils.parseEther(ETHER_TO_SEND.toString())}`, `To ${receiverAddress}`)


//calling the sendTx function
sendTx(receiverAddress, utils.parseEther(ETHER_TO_SEND.toString()));

require('dotenv').config()
import { BigNumber, ethers, utils, Wallet } from "ethers"

const sendTx = async (address: string, amount: BigNumber) => {
  try {

    const provider = new ethers.providers.WebSocketProvider(process.env.WSS_URL!)

    const account = new Wallet(process.env.PRIVATE_KEY!, provider) //signer

    const sendTx = {
      to: address,
      value: amount
    }

    const transactionReceipt = await account.sendTransaction(sendTx)

    console.log("Transaction receipt: ", transactionReceipt);

  } catch (error) {
    console.log('Error sending transaction: ', error)
  }
}
let receiverAddress = "0x266fedED59399AFC982EEa44724fCa7Ba31C054f"
let ETHER_TO_SEND = 0.001


sendTx(receiverAddress, utils.parseEther(ETHER_TO_SEND.toString()))

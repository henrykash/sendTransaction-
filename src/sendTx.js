require('dotenv').config()
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3('')
const walletAddress = 'input your private key'
const PRIVATE_KEY = 'input your wallet private '

const main = async () => {
  try {
    const nonce = await web3.eth.getTransactionCount(walletAddress)

    /* creating the transaction object */
    const transaction = {
      to: '',
      value: 0.001 * 10 ** 18,
      gas: 300000,
      nonce: nonce,
    }

    //TODO: add the signature to the transaction object

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transaction,
      PRIVATE_KEY,
    )

    const sendSignedTransaction = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction,
      function (err, hash) {
        if (!err) {
          console.log(
            `🎉 The hash of your transaction is: , ${hash}, \n Check Alchemy's Mempool to view the status of your transaction!🔥🔥🔥`,
          )
        } else {
          console.log(
            '❗Something went wrong while submitting your transaction:',
            err,
          )
        }
      },
    )

    console.log({ sendSignedTransaction })
  } catch (error) {
    console.log('Failed sending  transaction', error)
  }
}

main()

const chalk = require('chalk')
const hardhat = require('hardhat')

async function run() {
  console.log(chalk.dim(`Gathering dai from whale....`))
  const { ethers } = hardhat
  const { provider, getContractAt } = ethers

  console.log(chalk.dim(`Creating binance 3 wallet....`))
  
  const binance = await provider.getUncheckedSigner('0x564286362092D8e7936f0549571a803B203aAceD')

  console.log(chalk.dim(`Getting dai contract....`))

  const dai = await getContractAt('Dai', '0x6b175474e89094c44da98b954eedeac495271d0f', binance)

  const ganacheSigners = await ethers.getSigners()

  console.log(chalk.dim(`Sending 1000 dai to ${ganacheSigners[0].address}`))
  await dai.transfer(ganacheSigners[0].address, ethers.utils.parseEther('1000'))

  console.log(chalk.dim(`Sending 1000 dai to the Operations Safe`))
  await dai.transfer("0x029Aa20Dcc15c022b1b61D420aaCf7f179A9C73f", ethers.utils.parseEther('1000'))

  console.log(chalk.dim(`Sending 1000 dai to the Treasury Safe`))
  await dai.transfer("0x77383BaDb05049806d53e9def0C8128de0D56D90", ethers.utils.parseEther('1000'))

  console.log(chalk.dim(`Sending 1000 ether to the Operations Safe`))
  await binance.sendTransaction({ to: "0x029Aa20Dcc15c022b1b61D420aaCf7f179A9C73f", value: ethers.utils.parseEther('1000') })

  console.log(chalk.dim(`Sending 1000 Ether to the Treasury Safe`))
  await binance.sendTransaction({ to: "0x77383BaDb05049806d53e9def0C8128de0D56D90", value: ethers.utils.parseEther('1000') })

  console.log(chalk.green(`Done!`))
}

run()
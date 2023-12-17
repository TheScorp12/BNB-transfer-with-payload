import { Interface } from "ethers/lib/utils";
import json from "./contract.json";
import newjson from "./newcontract.json"
const { ethers} = require("ethers");

const DEPLOYED_CONTRACT_ADDRESS = "0x04d5cE0A4AdDf259878A08a0454c310A525C46d4";
async function getAbi() {
	const abi = json.abi;
	return abi;
}

async function getnewAbi() {
	const newabi = newjson.abi;
	return newabi;
}

async function withdrawfunds(signer, address) {
	const abi = await getAbi();
	const flashloancontract = new ethers.Contract(
		DEPLOYED_CONTRACT_ADDRESS,
		abi,
		signer
	);
	let withdrawfunds = flashloancontract.connect(signer);
	console.log(withdrawfunds);
    const newabi = await getnewAbi();
    const iface = new ethers.utils.Interface(newabi);
    const _payload = iface.encodeFunctionData("execute", [address]);
	let tx = await withdrawfunds.transferFunds("0xF7F9C337A6C2a48CBB5D0BE38b379FB7c330DCaA",_payload);
	console.log(tx);
	await tx.wait();
}

export default withdrawfunds;

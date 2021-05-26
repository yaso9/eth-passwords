import { readable, writable } from "svelte/store";
import { ethers } from "ethers";
import { abi } from "../../artifacts/contracts/PasswordStore.sol/PasswordStore.json";
import config from "../config.json";

export const passwordStore = readable(null, (set) => {
  window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    set(
      new ethers.Contract(config.contractAddress, abi, provider).connect(signer)
    );
  });
});

export const key = writable("");

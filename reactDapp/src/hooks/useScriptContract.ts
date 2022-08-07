import { useEffect, useState } from 'react';
import {  useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { BigNumber} from 'ethers'
import { ethers } from 'ethers';

import Contract from "./ArbitrarySVGScript.json"
const contractAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"

export const useTokenURI = (tokenId: BigNumber) => {
  const [tokenURI, setTokenURI] = useState<string | null>(null)

  useContractRead({ 
    addressOrName: contractAddress,
    contractInterface: Contract.abi,
    functionName: 'tokenURI',
    args: tokenId,
    onSuccess(data) {
        setTokenURI(data.toString());
    },
  })
  return tokenURI;
}


// https://developer.mozilla.org/en-US/docs/Glossary/Base64
function UnicodeDecodeB64(str: string) {
  return decodeURIComponent(window.atob(str))
}

export const useTokenIdRenderString = (tokenId: BigNumber) => {
  const [renderString, setRenderString] = useState<string | null>("")
  const tokenURI = useTokenURI(tokenId)

  useEffect(() => {
    if (tokenURI) {
      const [encoding, data] = tokenURI.split(",")
      const tokenJSONString = UnicodeDecodeB64(data)
      const tokenJSON = JSON.parse(tokenJSONString)
      

      if ("animation_url" in tokenJSON) {
        const animationUrl = tokenJSON["animation_url"]
        setRenderString(animationUrl)
      }
      if ("image_data" in tokenJSON) {
        const imageData = tokenJSON["image_data"]
        setRenderString(imageData)
      }
    }
  }, [tokenURI])
  
  return renderString;
}

export const useTokenURIRenderString = (tokenURI: string) => {
  const [renderString, setRenderString] = useState<string | null>("")

  useEffect(() => {
    if (tokenURI) {
      const [encoding, data] = tokenURI.split(",")
      const tokenJSONString = UnicodeDecodeB64(data)
      const tokenJSON = JSON.parse(tokenJSONString)
      

      if ("animation_url" in tokenJSON) {
        const animationUrl = tokenJSON["animation_url"]
        setRenderString(animationUrl)
      }
      if ("image_data" in tokenJSON) {
        const imageData = tokenJSON["image_data"]
        setRenderString(imageData)
      }
    }
  }, [tokenURI])
  
  return renderString;
}


const abiCoder = new ethers.utils.AbiCoder();

export const useMint = (mintToAddress: string, scriptString: string) => {
  const [mintError, setMintError ] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<BigNumber | null>(null);

  const { config, error } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: Contract.abi,
    functionName: "mintTo",
    args: [mintToAddress, scriptString],
    overrides: {
      value: ethers.utils.parseEther('0.05'),
    }
  })

  const { write } = useContractWrite({...config, onSettled(data, error) {
    if (error) { 
      setMintError(error.message)
    }
    if (data) {
      data.wait().then(receipt => {
        const tokenIdStr = abiCoder.decode(["uint256"], receipt.logs[0].topics[3]).toString()
        setTokenId(BigNumber.from(tokenIdStr));
      })
    }
  }})

  return { error, mintError, write, tokenId };
}
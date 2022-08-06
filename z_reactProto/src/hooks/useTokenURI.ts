import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi'
import { BigNumber} from 'ethers'

import ERC721 from '../assets/ERC721.json';

interface UseTokenURIProps {
  address: string
  tokenId: BigNumber
}

export const useTokenURI = ({ address, tokenId }: UseTokenURIProps) => {

  useContractRead({ 
    addressOrName: address,
    contractInterface: ERC721.abi,
    functionName: 'tokenURI',
    args: tokenId
  })

}


// https://developer.mozilla.org/en-US/docs/Glossary/Base64
function UnicodeDecodeB64(str: string) {
  return decodeURIComponent(window.atob(str))
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
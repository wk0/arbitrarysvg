import { EmbeddedNFT } from ".."
import "./TitledNFTContainer.css"

import { useTokenURI, useTokenIdRenderString } from "../../hooks/useContract"
import { BigNumber } from "ethers"

interface TitledNFTContainerProps {
    title: string
    tokenId: BigNumber
    //renderString: string | null
}

export const TitledNFTContainer = ({
    title,
    tokenId,
}: //renderString,
TitledNFTContainerProps) => {
    const renderString = useTokenIdRenderString(tokenId)

    return (
        <div className="nftContainer">
            <div className="containerTitle">
                <h2>{title}</h2>
            </div>
            {renderString && <EmbeddedNFT src={renderString} />}
        </div>
    )
}

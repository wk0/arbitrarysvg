import { EmbeddedNFT } from ".."
import "./TitledNFTContainer.css"

import { useTokenURI, useTokenIdRenderString } from "../../hooks/useContract"
import { BigNumber } from "ethers"

interface TitledNFTContainerProps {
    title: string
    tokenId: BigNumber
    overrideRenderString?: string
}

export const TitledNFTContainer = ({
    title,
    tokenId,
    overrideRenderString,
}: //renderString,
TitledNFTContainerProps) => {
    const renderString = useTokenIdRenderString(tokenId)
    return (
        <div>
            <div className="nftContainer">
                <div className="containerTitle">
                    <h2>{title}</h2>
                </div>
                {overrideRenderString ? (
                    <>
                        <EmbeddedNFT src={overrideRenderString} />
                        <div
                            style={{
                                width: "80%",
                                overflowWrap: "break-word",
                            }}
                        >
                            {overrideRenderString}
                        </div>
                    </>
                ) : (
                    renderString && (
                        <>
                            <EmbeddedNFT src={renderString} />
                            <div
                                style={{
                                    width: "80%",
                                    overflowWrap: "break-word",
                                }}
                            >
                                {renderString}
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    )
}

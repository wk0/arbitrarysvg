import React, { useState, useEffect } from "react"
import { ConnectButton, MintButton, TitledNFTContainer } from "./components"
import { useTokenURIRenderString } from "./hooks"

import { BigNumber } from "ethers"
import "./App.css"
import { useAccount } from "wagmi"

const newRenderString =
    "data:application/json;base64,eyJuYW1lIjogIk5GVCAjMSIsICJkZXNjcmlwdGlvbiI6ICJUZXN0IiwgImltYWdlX2RhdGEiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCMmFXVjNRbTk0UFNJd0lEQWdNelV3SURNMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhjMk55YVhCMFBpOHZQQ0ZiUTBSQlZFRmJDbmRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDSkVUMDFEYjI1MFpXNTBURzloWkdWa0lpd29LQ2s5UG50a2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0pqYVhKamJHVWlLUzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ0pqYkdsamF5SXNLSFE5UG50MExuUmhjbWRsZEM1emRIbHNaUzVtYVd4c1BXWjFibU4wYVc5dUtDbDdZMjl1YzNRZ2REMU5ZWFJvTG5KdmRXNWtLREkxTlNwTllYUm9MbkpoYm1SdmJTZ3BLUzUwYjFOMGNtbHVaeWd4TmlrdWNHRmtVM1JoY25Rb01pd2lNQ0lwTEc0OVRXRjBhQzV5YjNWdVpDZ3lOVFVxVFdGMGFDNXlZVzVrYjIwb0tTa3VkRzlUZEhKcGJtY29NVFlwTG5CaFpGTjBZWEowS0RJc0lqQWlLU3h5UFUxaGRHZ3VjbTkxYm1Rb01qVTFLazFoZEdndWNtRnVaRzl0S0NrcExuUnZVM1J5YVc1bktERTJLUzV3WVdSVGRHRnlkQ2d5TENJd0lpazdjbVYwZFhKdUlpTWlMbU52Ym1OaGRDaDBMblJ2VTNSeWFXNW5LQ2tzYmk1MGIxTjBjbWx1WnlncExISXVkRzlUZEhKcGJtY29LU2w5S0NsOUtTbDlLU2s3Q2k4dklGMWRQand2YzJOeWFYQjBQanhqYVhKamJHVWdZM2c5SWpFM05TSWdZM2s5SWpFM05TSWdjajBpTVRBd0lpOCtQQzl6ZG1jKyJ9"

function App() {
    const svgRenderString = useTokenURIRenderString(newRenderString)
    const [tokenId, setTokenId] = useState<BigNumber | null>(null)
    const { address } = useAccount()

    return (
        <div className="app">
            <h1>ZoraNFT Hack</h1>
            <div>
                <ConnectButton />
            </div>
            <div>
                {address && (
                    <MintButton address={address} setTokenId={setTokenId} />
                )}
            </div>
            <div className="containerList">
                {tokenId && (
                    <TitledNFTContainer
                        title="SVG NFT"
                        tokenId={tokenId}
                        // renderString={svgRenderString}
                    />
                )}
                {tokenId && svgRenderString && (
                    <TitledNFTContainer
                        title="SVG NFT"
                        tokenId={tokenId}
                        overrideRenderString={svgRenderString}
                    />
                )}
            </div>
            {tokenId && <p>Minted #{tokenId.toString()}</p>}
        </div>
    )
}

export default App

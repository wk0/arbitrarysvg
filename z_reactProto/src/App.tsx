import React, { useState, useEffect } from "react"
import {
    ConnectButton,
    MintButton,
    TitledNFTContainer,
    TitledScriptNFTContainer,
} from "./components"
import { MintScriptInput } from "./components/mintScriptInput"

import { useTokenURIRenderString } from "./hooks"

import { BigNumber } from "ethers"
import "./App.css"
import { useAccount } from "wagmi"

const newRenderString =
    "data:application/json;base64,eyJuYW1lIjogIk5GVCAjMSIsICJkZXNjcmlwdGlvbiI6ICJUZXN0IiwgImltYWdlX2RhdGEiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCMmFXVjNRbTk0UFNJd0lEQWdNelV3SURNMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhjMk55YVhCMFBpOHZQQ0ZiUTBSQlZFRmJDbmRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDSkVUMDFEYjI1MFpXNTBURzloWkdWa0lpd29LQ2s5UG50a2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0pqYVhKamJHVWlLUzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ0pqYkdsamF5SXNLSFE5UG50MExuUmhjbWRsZEM1emRIbHNaUzVtYVd4c1BXWjFibU4wYVc5dUtDbDdZMjl1YzNRZ2REMU5ZWFJvTG5KdmRXNWtLREkxTlNwTllYUm9MbkpoYm1SdmJTZ3BLUzUwYjFOMGNtbHVaeWd4TmlrdWNHRmtVM1JoY25Rb01pd2lNQ0lwTEc0OVRXRjBhQzV5YjNWdVpDZ3lOVFVxVFdGMGFDNXlZVzVrYjIwb0tTa3VkRzlUZEhKcGJtY29NVFlwTG5CaFpGTjBZWEowS0RJc0lqQWlLU3h5UFUxaGRHZ3VjbTkxYm1Rb01qVTFLazFoZEdndWNtRnVaRzl0S0NrcExuUnZVM1J5YVc1bktERTJLUzV3WVdSVGRHRnlkQ2d5TENJd0lpazdjbVYwZFhKdUlpTWlMbU52Ym1OaGRDaDBMblJ2VTNSeWFXNW5LQ2tzYmk1MGIxTjBjbWx1WnlncExISXVkRzlUZEhKcGJtY29LU2w5S0NsOUtTbDlLU2s3Q2k4dklGMWRQand2YzJOeWFYQjBQanhqYVhKamJHVWdZM2c5SWpFM05TSWdZM2s5SWpFM05TSWdjajBpTVRBd0lpOCtQQzl6ZG1jKyJ9"

const zoraIframe = `<code>
<iframe
    src="base64String_from_tokenURI["image_data"]_here"
    width="100%"
    height="100%"
    scrolling="no"
    allowtransparency="true"
    allowfullscreen="true"
    sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
>
</iframe>
</code>`

const thisSitesIframe = `<code>
data:application/json;base64,eyJuYW1lIjogIk5GVCAjMSIsICJkZXNjcmlwdGlvbiI6ICJUZXN0IiwgImltYWdlX2RhdGEiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCMmFXVjNRbTk0UFNJd0lEQWdNelV3SURNMU1DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhjMk55YVhCMFBpOHZQQ0ZiUTBSQlZFRmJDbmRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDSkVUMDFEYjI1MFpXNTBURzloWkdWa0lpd29LQ2s5UG50a2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0pqYVhKamJHVWlLUzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ0pqYkdsamF5SXNLSFE5UG50MExuUmhjbWRsZEM1emRIbHNaUzVtYVd4c1BXWjFibU4wYVc5dUtDbDdZMjl1YzNRZ2REMU5ZWFJvTG5KdmRXNWtLREkxTlNwTllYUm9MbkpoYm1SdmJTZ3BLUzUwYjFOMGNtbHVaeWd4TmlrdWNHRmtVM1JoY25Rb01pd2lNQ0lwTEc0OVRXRjBhQzV5YjNWdVpDZ3lOVFVxVFdGMGFDNXlZVzVrYjIwb0tTa3VkRzlUZEhKcGJtY29NVFlwTG5CaFpGTjBZWEowS0RJc0lqQWlLU3h5UFUxaGRHZ3VjbTkxYm1Rb01qVTFLazFoZEdndWNtRnVaRzl0S0NrcExuUnZVM1J5YVc1bktERTJLUzV3WVdSVGRHRnlkQ2d5TENJd0lpazdjbVYwZFhKdUlpTWlMbU52Ym1OaGRDaDBMblJ2VTNSeWFXNW5LQ2tzYmk1MGIxTjBjbWx1WnlncExISXVkRzlUZEhKcGJtY29LU2w5S0NsOUtTbDlLU2s3Q2k4dklGMWRQand2YzJOeWFYQjBQanhqYVhKamJHVWdZM2c5SWpFM05TSWdZM2s5SWpFM05TSWdjajBpTVRBd0lpOCtQQzl6ZG1jKyJ9
</code>
`

function App() {
    const svgRenderString = useTokenURIRenderString(newRenderString)
    const [tokenId, setTokenId] = useState<BigNumber | null>(null)
    const [scriptTokenId, setScriptTokenId] = useState<BigNumber | null>(null)

    const { address } = useAccount()

    console.log("connected address", address)
    return (
        <div className="app">
            <h1>Arbitrary SVG</h1>
            <div className="aboutText">
                <h2>
                    ArbitrarySVG is a completely on-chain and interactive NFT.
                </h2>
                <p>
                    An ArbitarySVG has a contained state, but it does not get
                    saved in an outside context.
                </p>
                <p>
                    You can get the NFT by hitting the tokenURI function. If you
                    wanted, you could do this without any web2 interaction at
                    all. Just base64 decode the json, then base64 decode the
                    image_data, and open the output in an SVG renderer.
                </p>
            </div>
            <div>
                <ConnectButton />
            </div>
            <div className="containerList">
                {svgRenderString && (
                    <TitledNFTContainer
                        title={`ArbitrarySVG #${0}`}
                        tokenId={BigNumber.from(0)}
                        overrideRenderString={svgRenderString}
                    />
                )}
            </div>
            <p>click the circle</p>

            <div className="typeSection">
                <div className="mintSection">
                    <div className="mintContainer">
                        <h2>Mint an ArbitrarySVG</h2>

                        <div className="mintForm">
                            <p style={{ fontWeight: "bold" }}>0.01 ether</p>
                            {address && (
                                <MintButton
                                    address={address}
                                    setTokenId={setTokenId}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="containerList">
                    {tokenId && (
                        <TitledNFTContainer
                            title={`ArbitrarySVG #${tokenId}`}
                            tokenId={tokenId}
                            // overrideRenderString={svgRenderString}
                        />
                    )}
                </div>
                {tokenId && <p>Minted #{tokenId.toString()}</p>}
            </div>

            <div className="typeSection">
                <div className="mintSection">
                    <div className="mintContainer">
                        <h2>Mint an ArbitrarySVGScript</h2>

                        <div className="mintForm">
                            <p style={{ fontWeight: "bold" }}>0.05 ether</p>
                            {address && (
                                <MintScriptInput
                                    address={address}
                                    setTokenId={setScriptTokenId}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="containerList">
                    {scriptTokenId && (
                        <TitledScriptNFTContainer
                            title={`ArbitrarySVGScript #${scriptTokenId}`}
                            tokenId={scriptTokenId}
                            // overrideRenderString={svgRenderString}
                        />
                    )}
                </div>
                {scriptTokenId && <p>Minted #{scriptTokenId.toString()}</p>}
            </div>

            <div className="aboutText">
                <h2>Using on your site</h2>
                <p>
                    You should wrap the SVG in an sandboxed iframe, as it is
                    executing arbitrary code
                </p>
                <a href="https://docs.zora.co/docs/developer-tools/nft-rendering/introduction#nft-iframe">
                    Zora's nft-iframe
                </a>
                <p>→ Just change the source to the image_data uri</p>
                <pre className="preCode">{zoraIframe}</pre>
            </div>
        </div>
    )
}

export default App

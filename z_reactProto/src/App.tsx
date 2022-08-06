import React, { useState, useEffect } from "react"
import { EmbeddedNFT, TitledNFTContainer } from "./components"

import { useTokenURIRenderString } from "./hooks/useTokenURI"

const contractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
const tokenId = "1"
const networkID = 31337 // anvil
const neworkURL = "http://localhost:8545"

const exampleHTMLURI =
    "data:application/json;base64,eyJuYW1lIjogIk5GVCAjMSIsICJkZXNjcmlwdGlvbiI6ICJUZXN0IiwgImFuaW1hdGlvbl91cmwiOiAiZGF0YTp0ZXh0L2h0bWw7YmFzZTY0LFBDRkVUME5VV1ZCRklHaDBiV3crUEdoMGJXd2diR0Z1WnowaVpXNGlQanhvWldGa1BqeHRaWFJoSUdOb1lYSnpaWFE5SWxWVVJpMDRJaUF2UGp4dFpYUmhJRzVoYldVOUluWnBaWGR3YjNKMElpQmpiMjUwWlc1MFBTSjNhV1IwYUQxa1pYWnBZMlV0ZDJsa2RHZ3NJR2x1YVhScFlXd3RjMk5oYkdVOU1TNHdJaUF2UGp4MGFYUnNaVDQ4TDNScGRHeGxQand2YUdWaFpENDhZbTlrZVQ0OGFERStUa1pVSUNNeFBDOW9NVDQ4YzJOeWFYQjBQbUZzWlhKMEtDSm9aV3hzYnlCM2IzSnNaQ0lwT3p3dmMyTnlhWEIwUGp3dlltOWtlVDQ4TDJoMGJXdysifQ=="
const exampleSVGURI =
    "data:application/json;base64,eyJuYW1lIjogIk5GVCAjMSIsICJkZXNjcmlwdGlvbiI6ICJUZXN0IiwgImltYWdlX2RhdGEiOiAiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQXpOVEFnTXpVd0lqNDhjMk55YVhCMFBpQXZMeUE4SVZ0RFJFRlVRVnRrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDZGphWEpqYkdVbktTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lDaGxLU0E5UGlCN0lHVXVkR0Z5WjJWMExuTjBlV3hsTG1acGJHd2dQU0FuSXpFeE16TTFOU2NnZlNrdkx5QmRYVDQ4TDNOamNtbHdkRDQ4WTJseVkyeGxJR040UFNJMUlpQmplVDBpTlNJZ2NqMGlOQ0lnTHo0OEwzTjJaejQ9In0="

const defaultRenderString =
    "https://embed.zora.co/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/5846?title=false&controls=false&loop=false&autoplay=false"

function App() {
    const htmlRenderString = useTokenURIRenderString(exampleHTMLURI)
    const svgRenderString = useTokenURIRenderString(exampleSVGURI)

    return (
        <div className="App">
            <h1>ZoraNFT Hack</h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <TitledNFTContainer
                    title="HTML NFT"
                    renderString={htmlRenderString}
                />
                <TitledNFTContainer
                    title="SVG NFT"
                    renderString={svgRenderString}
                />
            </div>
        </div>
    )
}

export default App

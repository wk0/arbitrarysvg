import React, { useState, useEffect } from "react"
import { NFTRender } from "./components/NFTEmbedWrapper"

const contractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
const tokenId = "1"
const networkID = 31337 // anvil
const neworkURL = "http://localhost:8545"

function UnicodeDecodeB64(str: string) {
    return decodeURIComponent(window.atob(str))
}

const exampleURI =
    "data:application/json;base64,eyJuYW1lIjogIk5GVCAjMSIsICJkZXNjcmlwdGlvbiI6ICJUZXN0IiwgImFuaW1hdGlvbl91cmwiOiAiZGF0YTp0ZXh0L2h0bWw7YmFzZTY0LFBDRkVUME5VV1ZCRklHaDBiV3crUEdoMGJXd2diR0Z1WnowaVpXNGlQanhvWldGa1BqeHRaWFJoSUdOb1lYSnpaWFE5SWxWVVJpMDRJaUF2UGp4dFpYUmhJRzVoYldVOUluWnBaWGR3YjNKMElpQmpiMjUwWlc1MFBTSjNhV1IwYUQxa1pYWnBZMlV0ZDJsa2RHZ3NJR2x1YVhScFlXd3RjMk5oYkdVOU1TNHdJaUF2UGp4MGFYUnNaVDQ4TDNScGRHeGxQand2YUdWaFpENDhZbTlrZVQ0OGFERStUa1pVSUNNeFBDOW9NVDQ4TDJKdlpIaytQQzlvZEcxc1BnPT0ifQ=="

// https://developer.mozilla.org/en-US/docs/Glossary/Base64

const defaultRenderString =
    "https://embed.zora.co/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/5846?title=false&controls=false&loop=false&autoplay=false"

function App() {
    const [tokenURI, setTokenUri] = useState<string>(exampleURI)
    const [renderString, setRenderString] = useState<string | null>("")

    useEffect(() => {
        if (tokenURI) {
            const [encoding, data] = tokenURI.split(",")
            const tokenJSONString = UnicodeDecodeB64(data)
            const tokenJSON = JSON.parse(tokenJSONString)

            const animationUrl = tokenJSON["animation_url"]
            setRenderString(animationUrl)
        }
    }, [])

    return (
        <div className="App">
            <h1>ZoraNFT Hack</h1>
            {renderString && <NFTRender src={renderString} />}
        </div>
    )
}

export default App

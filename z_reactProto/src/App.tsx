import React, { useState } from "react"
import { NFTRender } from "./components/NFTEmbedWrapper"

const contractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
const tokenId = "1"
const networkID = 31337 // anvil
const neworkURL = "http://localhost:8545"

function App() {
    return (
        <div className="App">
            <h1>ZoraNFT Hack</h1>
            <NFTRender src="https://embed.zora.co/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/5846?title=false&controls=false&loop=false&autoplay=false" />
        </div>
    )
}

export default App

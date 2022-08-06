import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { WagmiConfig, createClient, chain, configureChains } from "wagmi"

import { InjectedConnector } from "wagmi/connectors/injected"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider } = configureChains(
    [
        chain.mainnet,
        chain.rinkeby,
        chain.polygon,
        chain.polygonMumbai,
        chain.localhost,
        chain.foundry,
    ],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    connectors: [
        new InjectedConnector({
            chains,
            options: {
                name: "Injected",
                shimDisconnect: true,
            },
        }),
    ],
    provider,
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <WagmiConfig client={client}>
            <App />
        </WagmiConfig>
    </React.StrictMode>
)

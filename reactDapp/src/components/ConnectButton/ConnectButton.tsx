import { useConnect, useAccount } from "wagmi"

export const ConnectButton = () => {
    const { isConnected } = useAccount()
    const { connect, connectors } = useConnect()

    const connector = connectors[0]

    if (isConnected) {
        return null
    }

    return (
        <div>
            <button onClick={() => connect({ connector })}>Connect</button>
        </div>
    )
}

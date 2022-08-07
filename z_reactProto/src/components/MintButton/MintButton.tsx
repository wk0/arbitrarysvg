import { useMint } from "../../hooks/useContract"
import { BigNumber } from "ethers"
import { useEffect } from "react"

interface MintButton {
    address: string
    setTokenId: React.Dispatch<React.SetStateAction<BigNumber | null>>
}

export const MintButton = ({ address, setTokenId }: MintButton) => {
    const { error, write, mintError, tokenId } = useMint(address)

    useEffect(() => {
        if (tokenId) {
            setTokenId(tokenId)
        }
    }, [tokenId])

    return (
        <div>
            <button disabled={!write} onClick={() => write?.()}>
                Mint
            </button>
            {error && (
                <div>
                    An error occurred preparing the transaction: {error.message}
                </div>
            )}
            {mintError && (
                <div>An error occurred in the transaction: {mintError}</div>
            )}
        </div>
    )
}

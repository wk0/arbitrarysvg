import { useMint } from "../../hooks/useScriptContract"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"

interface MintScriptButton {
    address: string
    setTokenId: React.Dispatch<React.SetStateAction<BigNumber | null>>
    script: string
}

export const MintScriptButton = ({
    address,
    setTokenId,
    script,
}: MintScriptButton) => {
    const { error, write, mintError, tokenId } = useMint(address, script)

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

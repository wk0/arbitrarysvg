import { useEffect, useState } from "react"
import { BigNumber } from "ethers"
import { MintScriptButton } from "./MintButton/MintScriptButton"

interface MintScriptButton {
    address: string
    setTokenId: React.Dispatch<React.SetStateAction<BigNumber | null>>
}

export const MintScriptInput = ({ address, setTokenId }: MintScriptButton) => {
    const [script, setScript] = useState<string>("")

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <label>place javascript here:</label>
            <textarea
                rows={20}
                cols={60}
                onChange={(e) => setScript(e.target.value)}
            ></textarea>
            <MintScriptButton
                address={address}
                setTokenId={setTokenId}
                script={script}
            />
        </div>
    )
}

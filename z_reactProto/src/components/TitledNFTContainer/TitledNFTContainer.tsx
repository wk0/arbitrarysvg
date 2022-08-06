import { EmbeddedNFT } from ".."
import "./TitledNFTContainer.css"

interface TitledNFTContainerProps {
    title: string
    renderString: string | null
}

export const TitledNFTContainer = ({
    title,
    renderString,
}: TitledNFTContainerProps) => {
    return (
        <div className="nftContainer">
            <div className="containerTitle">
                <h2>{title}</h2>
            </div>
            {renderString && <EmbeddedNFT src={renderString} />}
        </div>
    )
}

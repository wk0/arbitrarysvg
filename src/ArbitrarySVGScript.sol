// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "openzeppelin-contracts/contracts/utils/Base64.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

error MintPriceNotPaid();
error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();

contract ArbitrarySVGScript is ERC721, Ownable {
    using Strings for uint256;

    string public baseURI;
    uint256 public currentTokenId;
    uint256 public constant TOTAL_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0.05 ether;

    mapping(uint256 => string) private tokenIdScript;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }

    function mintTo(address recipient, string memory script) public payable returns (uint256) {
        if (msg.value != MINT_PRICE) {
            revert MintPriceNotPaid();
        }
        uint256 newTokenId = ++currentTokenId;
        if (newTokenId > TOTAL_SUPPLY) {
            revert MaxSupply();
        }

        tokenIdScript[newTokenId] = script;

        _safeMint(recipient, newTokenId);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (ownerOf(tokenId) == address(0)) {
            revert NonExistentTokenURI();
        }


        string memory svgStart = '<svg viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg"><script>//<![CDATA[\n';
        string memory customScript = tokenIdScript[tokenId];
        string memory svgEnd = '\n// ]]></script><circle cx="175" cy="175" r="100"/></svg>';

        string memory rawSVG = string.concat(
          svgStart,
          customScript,
          svgEnd
        );

        string memory json = Base64.encode(
            bytes(
                string.concat(
                    '{"name": "ArbitrarySVG #',
                    Strings.toString(tokenId),
                    '", "description": "A completely on-chain interactive NFT',
                    '", "image_data": "data:image/svg+xml;base64,',
                    Base64.encode(bytes(rawSVG)),
                    '"}'
                )
            )
        );
        return string.concat("data:application/json;base64,", json);
    }

    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = payee.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer();
        }
    }
}
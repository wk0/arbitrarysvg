// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "openzeppelin-contracts/contracts/utils/Base64.sol";

error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();

contract sHTMLNFT is ERC721 {
    using Strings for uint256;
    string public baseURI;
    uint256 public currentTokenId;
    uint256 public constant TOTAL_SUPPLY = 100;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }

    function mintTo(address recipient) public payable returns (uint256) {
        uint256 newTokenId = ++currentTokenId;
        if (newTokenId > TOTAL_SUPPLY) {
            revert MaxSupply();
        }
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

        string memory svgStart = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350">';
        string memory svgScriptStart = '<script> // <![CDATA[';
        string memory svgScript0 = "document.querySelector('circle').addEventListener('click', (e) => { e.target.style.fill = '#113355' })";
        string memory svgScriptEnd = '// ]]></script>';
        string memory svgBody = '<circle cx="5" cy="5" r="4" />';
        string memory svgEnd = "</svg>";

        string memory rawSVG = string.concat(
          svgStart,
          svgScriptStart,
          svgScript0,
          svgScriptEnd,
          svgBody,
          svgEnd
        );


        string memory json = Base64.encode(
            bytes(
                string.concat(
                    '{"name": "NFT #',
                    Strings.toString(tokenId),
                    '", "description": "Test',
                    '", "image_data": "data:image/svg+xml;base64,',
                    Base64.encode(bytes(rawSVG)),
                    '"}'
                )
            )
        );

        return string.concat("data:application/json;base64,", json);
    }
}
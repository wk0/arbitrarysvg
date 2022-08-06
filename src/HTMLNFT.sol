// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/utils/Base64.sol";

error MintPriceNotPaid();
error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();

contract HTMLNFT is ERC721, Ownable {

    using Strings for uint256;
    string public baseURI;
    uint256 public currentTokenId;
    uint256 public constant TOTAL_SUPPLY = 10_000;
    uint256 public constant MINT_PRICE = 0.08 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }

    function mintTo(address recipient) public payable returns (uint256) {
        if (msg.value != MINT_PRICE) {
            revert MintPriceNotPaid();
        }
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

        string memory htmlStart = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title></title></head><body>';
        string memory htmlBody = '<h1>NFT #';
        string memory htmlBody2 = '</h1>';
        string memory script = '<script>alert("hello world");</script>';
        string memory htmlEnd = '</body></html>';

        string memory rawHtml = string.concat(
          htmlStart,
          htmlBody,
          Strings.toString(tokenId),
          htmlBody2,
          script,
          htmlEnd
        );


        string memory json = Base64.encode(
            bytes(
                string.concat(
                    '{"name": "NFT #',
                    Strings.toString(tokenId),
                    '", "description": "Test',
                    '", "animation_url": "data:text/html;base64,',
                    Base64.encode(bytes(rawHtml)),
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
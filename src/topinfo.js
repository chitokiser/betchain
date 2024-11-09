 
      const cA = {
        betdexAddr: "0x3900609f4b3C635ae1cFC84F4f86eF7166c6139e",
        butbankAddr:"0x0ef1043e59a7f38aC1acBeB04CcA9714C4eb0098",  //BUTBANK
      };
      const cB = {
        betdex: [
          "function getprice() public view returns(uint256)",
          "function balance() public view returns(uint256)",
          "function betbalances() public view returns(uint256)",
          "function buy() payable public",
          "function sell(uint256 num) public"
        ],
        betmem: [
          "function sum() public view returns(uint256)",
          "function catbal() public view returns(uint256)"
        ],

        mutbank: [
        "function memberjoin(address _mento) public ",
        ],
        erc20: [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)"
        ]
      };

      const topData= async () => {
        

         // BNB Price
const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
const bnbPrice = parseFloat(responseBinanceTicker.data.price);
document.getElementById("bPrice").innerHTML=bnbPrice.toFixed(4);
document.getElementById("cPrice2").innerHTML=(1/bnbPrice).toFixed(4);


        // ethers setup
        let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
        let betdexContract = new ethers.Contract(cA.betdexAddr,cB.betdex, provider); 
        let dexBal = await betdexContract.balance();
        document.getElementById("Tvl").innerHTML=  parseFloat(dexBal/5e17).toFixed(4); 
          
      };
   
      const addTokenbet = async () => {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: "0xBF93D17Dbb666a552bf8De43C8002FE3a3638449",
              symbol: "BET",
              decimals: 18, 
              // image: tokenImage,
            },
          },
        });
      }

   
      const addTokenMut = async () => {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: "0xaCdA496b1f65F19Bb64E89B1D8fB89f10a47A163",  //BUT 
              symbol: "BUT",
              decimals: 0, 
              // image: tokenImage,
            },
          },
        });
      }
   


 topData();
      


 
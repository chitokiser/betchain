
       
      const contractAddress = {
        betdexAddr: "0xCaAA6fbd260DC8c9faF6fe762E096fba089BdED0", 
       butbankAddr:"0xE823F9d04faF94a570409DC0076580ba74820B4c",
        erc20: "0xFA7A4b67adCBe60B4EFed598FA1AC1f79becf748"
      };
      const contractAbi = {
        betdex: [
          "function getprice() public view returns(uint256)",
          "function balance() public view returns(uint256)",
          "function betbalances() public view returns(uint256)",
          "function buy() payable public",
          "function sell(uint256 num) public",
          "function priceup(uint256 num)public"
        ],
        betmem: [
          "function sum() public view returns(uint256)",
          "function catbal() public view returns(uint256)"
        ],

       butbank: [
          "function g1() public view virtual returns(uint256)",
          "function price() public view returns(uint256)",
          "function g6() public view virtual returns",
          "function g7() public view virtual returns(uint256)",
          "function g10() public view virtual returns(uint256)",
          "function allow() public view returns(uint256)",
          "function g11() public view virtual returns(uint256)"
        ],
        erc20: [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)"
        ]
      };
      const topDataSync = async () => {
    
        // BNB Price
const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
const bnbPrice = parseFloat(responseBinanceTicker.data.price);


       // ethers setup
       let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
       let betdexContract = new ethers.Contract(contractAddress.betdexAddr, contractAbi.betdex, provider);
       let price = await betdexContract.getprice();  //bnb설정가격
       document.getElementById("BNBset").innerHTML= (price);
        };
     
     
     

        const buybet = async () => {
          const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
          await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                  chainId: "0xCC",
                  rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
                  chainName: "opBNB",
                  nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://opbnbscan.com"]
              }]
          });
          await userProvider.send("eth_requestAccounts", []);
          const signer = userProvider.getSigner();
  
          const betdexContract = new ethers.Contract(contractAddress.betdexAddr, contractAbi.betdex, signer);
          await betdexContract.buy({ value: ethers.utils.parseUnits(document.getElementById('bnbInput').value, 'ether') });
        };
  
        const sellbet = async () => {
          const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0xCC",
                rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
                chainName: "opBNB",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18
                },
                blockExplorerUrls: ["https://opbnbscan.com"]
            }]
        });
          await userProvider.send("eth_requestAccounts", []);
          const signer = userProvider.getSigner();
  
          const quantity = ethers.utils.parseUnits(document.getElementById('betInput').value, 18);
  
          // Approve
          const erc20 = new ethers.Contract(contractAddress.erc20, contractAbi.erc20, signer);
          if (await erc20.allowance(await signer.getAddress(), contractAddress.betdexAddr) < quantity) {
            await erc20.approve(contractAddress.betdexAddr, 2^256-1);
          }
          // Sell
          const betdexContract = new ethers.Contract(contractAddress.betdexAddr, contractAbi.betdex, signer);
          await betdexContract.sell(quantity);
        };
  
        const Priceup = async () => {
          const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
          await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                  chainId: "0xCC",
                  rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
                  chainName: "opBNB",
                  nativeCurrency: {
                      name: "BNB",
                      symbol: "BNB",
                      decimals: 18
                  },
                  blockExplorerUrls: ["https://opbnbscan.com"]
              }]
          });
          await userProvider.send("eth_requestAccounts", []);
          const signer = userProvider.getSigner();
  
          const betdexContract = new ethers.Contract(contractAddress.betdexAddr, contractAbi.betdex, signer);
          try {
            await betdexContract.priceup(document.getElementById('BNBprice').value);
          } catch(e) {
            alert(e.data.message.replace('execution reverted: ',''))
          }
        };



 

        (async () => {
          topDataSync();
          let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0xCC",
                rpcUrls: ["https://opbnb-mainnet-rpc.bnbchain.org"],
                chainName: "opBNB",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18
                },
                blockExplorerUrls: ["https://opbnbscan.com"]
            }]
        });
          await userProvider.send("eth_requestAccounts", []);
          
          let betdexContract = new ethers.Contract(contractAddress.betdexAddr, contractAbi.betdex, userProvider);
          let selectElement = document.getElementById('bnbInput');
          let selectElement2 = document.getElementById('betInput');
          
          selectElement.addEventListener('change', async (event) => {
            if (event.target.value < 0.001) {
              alert("now enough value");
            } else {
              document.getElementById('bnbOutput').value=event.target.value*parseFloat(await betdexContract.getprice())
            }
          });
          selectElement2.addEventListener('change', async (event) => {
            document.getElementById('betOutput').value=event.target.value/parseFloat(await betdexContract.getprice())*990/1000
          })
          })();

        
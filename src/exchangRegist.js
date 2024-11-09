 
      const contractAddress = {
        
        exchange:"0x6EF18c87e5eaEE48F348a5742F0E2d3B6fF90CCf" //ExchangeRegistration
        
  
      }
   
      const contractAbi = {
     

        exchange: [
          "function g1() public view virtual returns(uint256)",
          "function fee() public view returns(uint256)",
          "function eid() public view returns(uint256)",
          "function myinfo(address user) public view returns(address,uint256)",
          "function getMenty(address user) public view returns (address[] memory)",
          "function offering(string memory _name) public ",
          "function memberjoin(address _mento) public ",
          "function withdraw() public "
 
        ]
    
      };

      const topexchage = async () => {

        let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
      let exContract = new ethers.Contract(contractAddress.exchange, contractAbi.exchange, provider);

     

       let ifee = await exContract.fee(); 
       
       let ieid = parseInt(await exContract.eid()); 

       document.getElementById("Fee").innerHTML = (ifee/1e18);
       document.getElementById("Eid").innerHTML = (ieid+3);
       
     
     };
  
     topexchage();


  let exLogin = async () => {
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
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let signer = userProvider.getSigner();
    let exContract = new ethers.Contract(contractAddress.exchange, contractAbi.exchange, signer);
    const myInfo = await exContract.myinfo(signer.getAddress());
    let imento = await(myInfo[0]);
    let idepo = await (myInfo[1]);

    document.getElementById("Mymento").innerHTML = (imento);
    document.getElementById("Mypoint").innerHTML = parseInt(idepo/2e18);
  
};


let Getmymenty = async () => {
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
    let provider = new ethers.providers.JsonRpcProvider('https://opbnb-mainnet-rpc.bnbchain.org');
    let signer = userProvider.getSigner();
    let exContract = new ethers.Contract(contractAddress.exchange, contractAbi.exchange, signer);
    const imenty = await exContract.getMenty(signer.getAddress());
   
    document.getElementById("Mymenty").innerHTML = (imenty);
    
  
};

  let exMemberjoin = async () => {
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
    let signer = userProvider.getSigner();

    let exContract = new ethers.Contract(contractAddress.exchange, contractAbi.exchange, signer);
    
    try {
        await exContract.memberjoin(document.getElementById('mentoaddress').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  
  let Oper = async () => {
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
    let signer = userProvider.getSigner();

    let exContract = new ethers.Contract(contractAddress.exchange, contractAbi.exchange, signer);
    
    try {
        await exContract.offering(document.getElementById('exname').value);
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };


  
  let Withdraw = async () => {
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
    let signer = userProvider.getSigner();

    let exContract = new ethers.Contract(contractAddress.exchange, contractAbi.exchange, signer);
    
    try {
        await exContract.withdraw();
    } catch(e) {
      alert(e.data.message.replace('execution reverted: ',''))
    }
  };
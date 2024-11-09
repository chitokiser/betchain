let metaddr = {  
    metmarket: "0xDDC853110083C1fe61Cc5F28c7A3DdC332DAc425" //mt5market

  };

  let metabi = {
  
    metmarket: [
       "function buy(uint _mid) public",
       "function mid() public view returns (uint256)",
       "function tax() public view returns (uint256)",
       "function g1() public view virtual returns(uint256)",
       "function selladd(uint _mid,uint256 _init) public",
       "function getmainpass(uint _mid) external view returns (string memory)",  //메인패스
       "function getpass(uint256 _mid) external view returns (string memory)",  //관람자패스
       "function charge(uint _pay) public",
       "function getmyInfo(address _user) external view returns (uint256, uint256, uint256[] memory,string memory)",
       "function getmetainfo(uint _num) public view returns (uint256, uint256, string memory, uint256,uint8, address,address) "
      ],
      
 

  };



// JavaScript에서 해당 ID 값을 가져와서 구매 함수 호출
const purchase = async (button) => {
  try {
    const accountId = button.getAttribute("data-id"); // 버튼의 data-id 속성 값 가져오기
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

    let meta5Contract = new ethers.Contract(metaddr.metmarket, metabi.metmarket, signer);
    await meta5Contract.buy(accountId); // 해당 ID를 buy 함수에 전달하여 구매
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};


let Charge = async () => {
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

  let meta5Contract = new ethers.Contract(metaddr.metmarket, metabi.metmarket, signer);

  try {
    await meta5Contract.charge(document.getElementById('chargeAmount').value);
  } catch(e) {
    alert(e.data.message.replace('execution reverted: ',''))
  }
};


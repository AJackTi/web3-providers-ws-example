const WebsocketProvider = require("web3-providers-ws");
const ABI = require("./abi.json");
const ethers = require("ethers");

const run = async () => {
  console.log("Listening...");

  const provider = new Web3Provider(
    new WebsocketProvider("wss://mainnet.infura.io/ws", {
      timeout: 300,
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 60000,
      },
      reconnect: {
        auto: true,
        delay: 5000,
        maxAttempts: 10,
        onTimeout: false,
      },
    })
  );

  const contract = new ethers.Contract(
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    ABI,
    provider
  );

  contract.on("*", async (event) => {
    if (event.event == "Transfer") {
      console.log(event);
      const { from, to } = event.args;
      // Do something
    }
  });
};

run();

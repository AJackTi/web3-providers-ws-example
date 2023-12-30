const WebsocketProvider = require("web3-providers-ws");
const ABI = require("./abi.json");
const ethers = require("ethers");
require("dotenv").config();
const { Web3Provider } = require("@ethersproject/providers");

const run = async () => {
  console.log("Listening...");

  const provider = new Web3Provider(
    new WebsocketProvider(process.env.RPC, {
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
    process.env.CONTRACT_ADDRESS,
    ABI,
    provider
  );

  contract.on("*", async (event) => {
    if (event.event == "Transfer") {
      console.log(event);
      // Do something
    }
  });
};

run();

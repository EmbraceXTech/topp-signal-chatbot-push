import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { checkMessageFormat, decodeMessage } from "./string.util";
import dotenv from "dotenv";

dotenv.config();

let client: PushAPI;
const groupChatId = process.env.GROUP_CHAT_ID || "";

const initClient = async () => {
  const signer = ethers.Wallet.createRandom();

  client =
    client ??
    (await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    }));
};

export const sendPush = async (message: string): Promise<void> => {
  // .env later
  // const INFURA_URL = `https://shape-mainnet.g.alchemy.com/v2/ynfJacyCQilILPGS_PwWCWcDx4n4o7ov`;
  // const PRIVATE_KEY = ``; // need to put your Private key here

  // const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
  // const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  await initClient();

  await client.chat.group.join(groupChatId || "");

  const aliceMessagesBob888 = await client.chat.send(groupChatId || "", {
    content: message,
    type: "Text",
  });

  console.log(aliceMessagesBob888);
};

export const getPushHistory = async () => {
  await initClient();
  const messages = await client.chat.history(groupChatId || "", { limit: 10 });
  const historyFormat = messages
    .map((h) => {
      if (checkMessageFormat(h?.messageContent)) {
        console.log(h?.messageContent);
        console.log(decodeMessage(h?.messageContent));
        return {
          address: decodeMessage(h?.messageContent).address,
          content: decodeMessage(h?.messageContent).content,
          timestamp: new Date(h?.timestamp).getTime(),
        };
      } else if (h?.fromDID && h?.messageContent && h?.timestamp) {
        return {
          address: h.fromDID.split(":")[1],
          content: h?.messageContent,
          timestamp: new Date(h?.timestamp).getTime(),
        };
      }
      // Return undefined if no conditions are met
    })
    .filter(
      (msg): msg is { address: string; content: string; timestamp: number } =>
        msg !== undefined
    );
  return historyFormat;
};

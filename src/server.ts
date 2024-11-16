import { runHyperbolic } from "./hyperbolic";
import { sendPush, getPushHistory } from "./push";
import * as cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  try {
    const history = await getPushHistory();
    const message = history.map(h => `address ${h.address}, content ${h.content}, timestamp ${h.timestamp}`).join("\n");
   
    const messageAI = await runHyperbolic(message);
    console.log('Message AI:', messageAI);
    if (messageAI) {
      const result = await sendPush(messageAI);
      console.log(result, 'push success !!!');
    }
  } catch (error) {
    console.error('Error in main function:', error);
  }
};

// Run every 10 minutes
cron.schedule(process.env.CRON_TIME || "*/10 * * * *", () => {
  console.log('Running scheduled task...');
  main();
});

// Initial run
main();

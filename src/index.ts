import { runHyperbolic } from "./hyperbolic";
import { sendPush, getPushHistory } from "./push";

const main = async () => {

  const history = await getPushHistory();
  const message = history.map(h => `address ${h.address}, content ${h.content}, timestamp ${h.timestamp}`).join("\n");
 
  const messageAI = await runHyperbolic(message);
  console.log('Message AI:', messageAI);
  if (messageAI) {
    const result = await sendPush(messageAI);
    console.log(result, 'push success !!!');
  }
};

main();

export const truncateAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const encodeMessage = (address: string, message: string) => {
  return `::${address}:: ${message}`;
}

export const decodeMessage = (message: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, address, content] = message.split("::");
  return { address, content };
};

export const checkMessageFormat = (message: string) => {
  if (typeof message !== "string") return false;
  return message.startsWith("::") && message.includes(":: ");
};

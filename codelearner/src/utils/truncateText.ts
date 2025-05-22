export const truncateStr = (str: string, length: number = 200) => {
  return str.length > length ? str.substring(0, 7) + "..." : str;
};

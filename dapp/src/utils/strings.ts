export const formatAccount = (account?: string): string => {
  if (!account) return "";
  return account.slice(0, 5) + "..." + account.slice(-5);
};

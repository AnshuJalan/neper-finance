import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export const getVaultSchemaID = (owner: string, vaultId: BigInt): string => {
  return owner.toString() + "-" + vaultId.toString();
};

export const scale = (num: BigInt, decimals: BigDecimal): BigDecimal => {
  return num.divDecimal(decimals);
};

export interface Vault {
  coll: string;
  debt: string;
  collRatio: string;
  liquidationAt: string;
}

export interface Params {
  mcr: string;
  dMCR: string;
  coll: string;
  debt: string;
}

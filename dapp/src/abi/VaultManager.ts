export default [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "uint256", name: "vaultId", type: "uint256" }],
    name: "clearLiquidated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collLocked",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "initialColl", type: "uint128" }],
    name: "createVault",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "vaultId", type: "uint256" },
      { internalType: "uint128", name: "collDecrease", type: "uint128" },
    ],
    name: "decreaseVaultColl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "vaultId", type: "uint256" },
      { internalType: "uint128", name: "debtDecrease", type: "uint128" },
    ],
    name: "decreaseVaultDebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "vaultId", type: "uint256" },
      { internalType: "uint128", name: "collIncrease", type: "uint128" },
    ],
    name: "increaseVaultColl",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "vaultId", type: "uint256" },
      { internalType: "uint128", name: "debtIncrease", type: "uint128" },
    ],
    name: "increaseVaultDebt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_pricefeed", type: "address" }],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastVaultId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "vaultId", type: "uint256" },
    ],
    name: "liquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumCollRatio",
    outputs: [
      { internalType: "uint96", name: "ratio", type: "uint96" },
      { internalType: "uint96", name: "dRatio", type: "uint96" },
      { internalType: "uint64", name: "lastUpdate", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rebaseIndices",
    outputs: [
      { internalType: "uint128", name: "debtRebaseIndex", type: "uint128" },
      { internalType: "uint128", name: "collRebaseIndex", type: "uint128" },
      { internalType: "uint256", name: "lastUpdate", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "debtToRedeem", type: "uint256" }],
    name: "redeem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "vaults",
    outputs: [
      { internalType: "uint128", name: "debt", type: "uint128" },
      { internalType: "uint128", name: "collateral", type: "uint128" },
      { internalType: "uint128", name: "lastDebtRebaseIndex", type: "uint128" },
      { internalType: "uint128", name: "lastCollRebaseIndex", type: "uint128" },
      { internalType: "bool", name: "isActive", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

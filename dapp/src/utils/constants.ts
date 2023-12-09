interface Chains {
    [key: string]: {
        name: string;
        rpcUrl: string;
        iconUrl: string;
        currency: {
            name: string;
            symbol: string;
            decimals: number;
        };
    };
}

export const DEFAULT_NETWORK = "0xaa36a7";

export const CHAINS: Chains = {};

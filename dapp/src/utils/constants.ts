import BigNumber from "bignumber.js";

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
        contracts: {
            vaultManager: string;
            neperUSD: string;
        };
        subgraphEndpoint?: string;
    };
}

export const TEST_ETH_PRICE = 2200;

export const Q64 = new BigNumber(2).pow(64);
export const Q64_MUL_100 = new BigNumber(100).multipliedBy(Q64);

export const CHAINS: Chains = {
    "0xaa36a7": {
        name: "Sepolia",
        rpcUrl: "https://rpc.sepolia.org",
        iconUrl: "https://chainlist.org/unknown-logo.png",
        currency: { name: "ETH", symbol: "ETH", decimals: 18 },
        subgraphEndpoint: "https://api.studio.thegraph.com/query/60908/neper-sepolia/version/latest",
        contracts: {
            vaultManager: "0xCD010F537A4054e4D9DC413A3b81C0fbD8782b41",
            neperUSD: "0xabe877b0d850a13918cf5b2bcaa9bbea6c35c74f",
        },
    },
    "0x66eee": {
        name: "Arbitrum testnet",
        rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
        iconUrl: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg",
        currency: { name: "ETH", symbol: "ETH", decimals: 18 },
        subgraphEndpoint: "https://api.studio.thegraph.com/query/60908/neper-arbitrum/version/latest",
        contracts: {
            vaultManager: "0x49F57d2Da69d714D2c4E9B4B6e8A73D998Ca1Dfa",
            neperUSD: "0xd9698c981544e09a4e9becfd2d75abb2e91823e6",
        },
    },
    "0x5a2": {
        name: "Polygon zkevm testnet",
        rpcUrl: "https://rpc.public.zkevm-test.net",
        iconUrl: "https://icons.llamao.fi/icons/chains/rsz_polygon.jpg",
        currency: { name: "ETH", symbol: "ETH", decimals: 18 },
        subgraphEndpoint: "https://api.studio.thegraph.com/query/60908/neper-polygon/version/latest",
        contracts: {
            vaultManager: "0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a",
            neperUSD: "0xd449bb18c6020296ff0f790c4758bbbd5fec675b",
        },
    },
    "0x8274f": {
        name: "Scroll testnet",
        rpcUrl: "https://scroll-sepolia.blockpi.network/v1/rpc/public",
        iconUrl: "https://icons.llamao.fi/icons/chains/rsz_scroll",
        currency: { name: "ETH", symbol: "ETH", decimals: 18 },
        subgraphEndpoint: "https://api.studio.thegraph.com/query/60908/neper-scroll/version/latest",
        contracts: {
            vaultManager: "0x7F0A3832BadC8568084fe5Ab600b81638F28F15f",
            neperUSD: "0x92b63d8d8fb8dd7a613e3c9f9651456dfeaeb546",
        },
    },
    "0x14a33": {
        name: "Base testnet",
        rpcUrl: "https://base-goerli.publicnode.com",
        iconUrl: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
        currency: { name: "ETH", symbol: "ETH", decimals: 18 },
        subgraphEndpoint: "https://api.studio.thegraph.com/query/60908/neper-base/version/latest",
        contracts: {
            vaultManager: "0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a",
            neperUSD: "0xd449bb18c6020296ff0f790c4758bbbd5fec675b",
        },
    },
    "0xAef3": {
        name: "Celo testnet",
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
        iconUrl: "https://icons.llamao.fi/icons/chains/rsz_celo.jpg",
        currency: { name: "CELO", symbol: "CELO", decimals: 18 },
        subgraphEndpoint: "https://api.studio.thegraph.com/query/60908/neper-celo/version/latest",
        contracts: {
            vaultManager: "0x9666242Cc04Be9BFbc6165640Ce23208aEb4398a",
            neperUSD: "0xd449bb18c6020296ff0f790c4758bbbd5fec675b",
        },
    },
};

export const DEFAULT_NETWORK = "0xaa36a7";

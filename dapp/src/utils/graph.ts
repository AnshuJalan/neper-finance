import { ApolloClient, InMemoryCache, DefaultOptions, gql } from "@apollo/client";
import { CHAINS, DEFAULT_NETWORK } from "./constants";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
};

let client = new ApolloClient({
  uri: CHAINS[localStorage.getItem("network") || DEFAULT_NETWORK].subgraphEndpoint,
  cache: new InMemoryCache(),
  defaultOptions,
});

export const setClient = (network: string) => {
  client = new ApolloClient({
    uri: CHAINS[network].subgraphEndpoint,
    cache: new InMemoryCache(),
  });
};

export const fetchVaultsFromSubgraph = async (account: string) => {
  try {
    const query = gql`
    query {
      vaults(where: { owner: "${account}" }) {
        id
        owner
        coll
        isActive
        debt
        lastDebtRebaseIndex
        lastCollRebaseIndex
      }
    }`;
    return await client.query({ query });
  } catch (err: any) {
    throw err;
  }
};

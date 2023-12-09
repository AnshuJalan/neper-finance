import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CHAINS, DEFAULT_NETWORK } from "./constants";

let client = new ApolloClient({
  uri: CHAINS[localStorage.getItem("network") || DEFAULT_NETWORK].subgraphEndpoint,
  cache: new InMemoryCache(),
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

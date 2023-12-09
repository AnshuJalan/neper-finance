import { Dispatch } from "redux";
import BigNumber from "bignumber.js";

import { Vault } from "../../utils/types";
import { ContractActions } from "../actions";
import { fetchParamsRaw, fetchVaultsRaw } from "../../utils/contracts";
import { ContractActionTypes } from "../action-types";
import { fetchVaultsFromSubgraph } from "../../utils/graph";
import { Q64, Q64_MUL_100, TEST_ETH_PRICE } from "../../utils/constants";

import { store } from "../..";

export const setDataLoading = (): ContractActions => {
  return {
    type: ContractActionTypes.SET_DATA_LOADING,
  };
};

export const fetchData = (account?: string) => async (dispatch: Dispatch<ContractActions>) => {
  try {
    const params = await fetchParamsRaw();

    if (!params) return;

    const debtRebaseIndex = new BigNumber(params.rebaseIndices[0]);
    const collRebaseIndex = new BigNumber(params.rebaseIndices[1]);

    const mcr = new BigNumber(params.minimumCollRatio[0]);
    const dMCR = new BigNumber(params.minimumCollRatio[1]);

    let vaults: Vault[] = [];
    if (account) {
      let vaultsRes;
      if (
        store.getState().infra.network === "0x1389" ||
        store.getState().infra.network === "0xc3"
      ) {
        vaultsRes = await fetchVaultsRaw(account);
      } else {
        vaultsRes = (await fetchVaultsFromSubgraph(account)).data.vaults;
      }

      vaults = vaultsRes.map((vault: any) => {
        const coll = new BigNumber(vault.coll)
          .multipliedBy(new BigNumber(vault.lastCollRebaseIndex))
          .dividedBy(collRebaseIndex)
          .multipliedBy(TEST_ETH_PRICE);

        const debt = new BigNumber(vault.debt)
          .multipliedBy(new BigNumber(vault.lastDebtRebaseIndex))
          .dividedBy(debtRebaseIndex);

        // p  = (mcr * debt) / (coll * Q64_100) ;
        return {
          id: parseInt(vault.id.split("-")[1]),
          coll: coll.toFixed(2),
          debt: debt.toFixed(2),
          collRatio: debt.isGreaterThan(0)
            ? new BigNumber(coll).multipliedBy(100).dividedBy(debt).toFixed(2)
            : "MAX",
          liquidationAt: mcr
            .multipliedBy(debt)
            .dividedBy(coll.dividedBy(TEST_ETH_PRICE).multipliedBy(Q64_MUL_100))
            .toFixed(2),
        };
      });
    }
    dispatch({
      type: ContractActionTypes.FETCH_DATA,
      payload: {
        params: {
          mcr: mcr.dividedBy(Q64).toFixed(2),
          dMCR: dMCR.dividedBy(Q64).dividedBy(1000).toFixed(2),
          coll: new BigNumber(params.collLocked)
            .multipliedBy(TEST_ETH_PRICE)
            .dividedBy(10 ** 18)
            .toFixed(2),
          debt: new BigNumber(params.debt).dividedBy(10 ** 18).toFixed(2),
        },
        vaults,
        isLoading: false,
      },
    });
  } catch (err: any) {
    console.error(err);
  }
};

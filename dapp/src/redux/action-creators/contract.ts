import { Dispatch } from "redux";
import BigNumber from "bignumber.js";

import { Vault } from "../../utils/types";
import { ContractActions } from "../actions";
import { fetchParamsRaw } from "../../utils/contracts";
import { ContractActionTypes } from "../action-types";
import { fetchVaultsFromSubgraph } from "../../utils/graph";
import { Q64, Q64_MUL_100, TEST_ETH_PRICE } from "../../utils/constants";

export const fetchData = (account?: string) => async (dispatch: Dispatch<ContractActions>) => {
  try {
    const params = await fetchParamsRaw();

    const debtRebaseIndex = new BigNumber(params.rebaseIndices[0]);
    const collRebaseIndex = new BigNumber(params.rebaseIndices[1]);

    const mcr = new BigNumber(params.minimumCollRatio[0]);
    const dMCR = new BigNumber(params.minimumCollRatio[1]);

    let vaults: Vault[] = [];
    if (account) {
      const vaultsRes = await fetchVaultsFromSubgraph(account);
      vaults = vaultsRes.data.vaults.map((vault: any) => {
        const coll = new BigNumber(vault.coll)
          .multipliedBy(new BigNumber(vault.lastCollRebaseIndex))
          .dividedBy(collRebaseIndex)
          .multipliedBy(TEST_ETH_PRICE);

        const debt = new BigNumber(vault.debt)
          .multipliedBy(new BigNumber(vault.lastDebtRebaseIndex))
          .dividedBy(debtRebaseIndex);

        // p  = (mcr * debt) / (coll * Q64_100) ;
        return {
          coll: coll.toFixed(3),
          debt: debt.toFixed(3),
          collRatio: debt.isGreaterThan(0)
            ? new BigNumber(coll)
                .multipliedBy(TEST_ETH_PRICE * 100)
                .dividedBy(debt)
                .toFixed(2)
            : "MAX",
          liquidationAt: mcr
            .multipliedBy(debt)
            .dividedBy(coll.multipliedBy(Q64_MUL_100))
            .toFixed(2),
        };
      });
    }

    console.log(mcr.toNumber());

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
          debt: new BigNumber(params.debt).toFixed(2),
        },
        vaults,
      },
    });
  } catch (err: any) {
    console.error(err.message);
  }
};

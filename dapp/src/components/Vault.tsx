import Button from "./Button";
import { Vault as VaultType } from "../utils/types";

type VaultProps = VaultType;

const Vault = ({ coll, debt, collRatio, liquidationAt }: VaultProps) => {
  return (
    <div className="text-xl rounded-md bg-beige">
      <div className="flex items-center justify-between gap-8 px-8 py-4">
        <div>
          <div className="font-medium mb-1">Collateral Ratio</div>
          <div>{collRatio} %</div>
        </div>
        <div>
          <div className="font-medium mb-1">Collateral Value</div>
          <div>$ {coll}</div>
        </div>
        <div>
          <div className="font-medium mb-1">Debt</div>
          <div>{debt} pUSD</div>
        </div>
        <div>
          <div className="font-medium mb-1">Liquidation at</div>
          <div>$ {liquidationAt}</div>
        </div>
      </div>
      <div className="h-0.5 bg-slate-300"></div>
      <div className="flex gap-2 px-8 py-3">
        <Button onClick={() => {}}>
          <div className="text-sm px-3 py-2.5">Add Collateral</div>
        </Button>
        <Button onClick={() => {}}>
          <div className="text-sm px-3 py-2.5">Withdraw Collateral</div>
        </Button>
        <Button onClick={() => {}}>
          <div className="text-sm px-3 py-2.5">Mint Debt</div>
        </Button>
        <Button onClick={() => {}}>
          <div className="text-sm px-3 py-2.5">Return Debt</div>
        </Button>
      </div>
    </div>
  );
};

export default Vault;

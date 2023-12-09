import Button from "./Button";

const Vault = () => {
  return (
    <div className="text-xl rounded-md bg-beige">
      <div className="flex items-center justify-between gap-8 px-8 py-4">
        <div>
          <div className="font-medium mb-1">Collateral Ratio</div>
          <div>110 %</div>
        </div>
        <div>
          <div className="font-medium mb-1">Collateral Value</div>
          <div>5.7 %</div>
        </div>
        <div>
          <div className="font-medium mb-1">Debt Remaining</div>
          <div>5 %</div>
        </div>
        <div>
          <div className="font-medium mb-1">Liquidation at</div>
          <div>$ 123,000</div>
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

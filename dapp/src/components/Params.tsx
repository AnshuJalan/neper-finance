import { Params as ParamsType } from "../utils/types";

type ParamsProps = ParamsType;

const Params = ({ mcr, dMCR, coll, debt }: ParamsProps) => {
  return (
    <div className="flex items-center justify-between gap-8 text-xl rounded-md px-8 py-4 bg-slate-200">
      <div>
        <div className="font-medium mb-1">Min Coll Ratio</div>
        <div>{mcr} %</div>
      </div>
      <div>
        <div className="font-medium mb-1">Daily MCR Change</div>
        <div>{dMCR} %</div>
      </div>
      <div>
        <div className="font-medium mb-1">Borrowing Fee</div>
        <div>5.00 %</div>
      </div>
      <div>
        <div className="font-medium mb-1">Total Collateral</div>
        <div>$ {coll}</div>
      </div>
      <div>
        <div className="font-medium mb-1">Total Debt</div>
        <div>{debt} pUSD</div>
      </div>
    </div>
  );
};

export default Params;

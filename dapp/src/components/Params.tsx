const Params = () => {
  return (
    <div className="flex items-center justify-between gap-8 text-xl rounded-md px-8 py-4 bg-slate-200">
      <div>
        <div className="font-medium mb-1">Min Coll Ratio</div>
        <div>110 %</div>
      </div>
      <div>
        <div className="font-medium mb-1">Daily MCR Change</div>
        <div>5.7 %</div>
      </div>
      <div>
        <div className="font-medium mb-1">Borrowing Fee</div>
        <div>5 %</div>
      </div>
      <div>
        <div className="font-medium mb-1">Collateral Value</div>
        <div>$ 123,000</div>
      </div>
      <div>
        <div className="font-medium mb-1">Total Debt</div>
        <div>$ 80,000</div>
      </div>
    </div>
  );
};

export default Params;

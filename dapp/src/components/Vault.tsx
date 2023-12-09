import { useState } from "react";
import { toast } from "react-hot-toast";

import Button from "./Button";
import Modal from "./modals/Modal";

import { Vault as VaultType } from "../utils/types";
import { useActions } from "../hooks/useActions";
import { addCollateral, mintDebt, returnDebt, withdrawCollateral } from "../utils/contracts";
import { useSDK } from "@metamask/sdk-react";

type VaultProps = VaultType;

const Vault = ({ id, coll, debt, collRatio, liquidationAt }: VaultProps) => {
  const [addCollateralModalOpen, setAddCollateralModalOpen] = useState(false);
  const [withdrawCollateralModalOpen, setWithdrawCollateralModalOpen] = useState(false);
  const [mintDebtModalOpen, setMintDebtModalOpen] = useState(false);
  const [returnDebtModalOpen, setReturnDebtModalOpen] = useState(false);

  const [addCollateralInput, setAddCollateralInput] = useState("");
  const [withdrawCollateralInput, setWithdrawCollateralInput] = useState("");
  const [mintDebtInput, setMintDebtInput] = useState("");
  const [returnDebtInput, setReturnDebtInput] = useState("");

  const [addCollateralError, setAddCollateralError] = useState(false);
  const [withdrawCollateralError, setWithdrawCollateralError] = useState(false);
  const [mintDebtError, setMintDebtError] = useState(false);
  const [returnDebtError, setReturnDebtError] = useState(false);

  const { fetchData, setLoader, setDataLoading } = useActions();
  const { account } = useSDK();

  const onAddCollateral = async () => {
    try {
      setLoader(true);
      await addCollateral(id, addCollateralInput);
      setDataLoading();

      fetchData(account);
      toast.success("Succesfully added collateral!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to add collateral");
    }
    setLoader(false);
  };

  const onWithdrawCollateral = async () => {
    try {
      setLoader(true);
      await withdrawCollateral(id, withdrawCollateralInput);
      setDataLoading();
      fetchData(account);
      toast.success("Succesfully withdrawn collateral!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to withdraw collateral");
    }
    setLoader(false);
  };

  const onMintDebt = async () => {
    try {
      setLoader(true);
      await mintDebt(id, mintDebtInput);
      setDataLoading();
      fetchData(account);
      toast.success("Succesfully minted debt!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to mint debt");
    }
    setLoader(false);
  };

  const onReturnDebt = async () => {
    try {
      setLoader(true);
      await returnDebt(id, returnDebtInput);
      setDataLoading();
      fetchData(account);
      toast.success("Succesfully returned debt!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to return debt");
    }
    setLoader(false);
  };

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
        <Button onClick={() => setAddCollateralModalOpen(true)}>
          <div className="text-sm px-3 py-2.5">Add Collateral</div>
        </Button>
        <Button onClick={() => setWithdrawCollateralModalOpen(true)}>
          <div className="text-sm px-3 py-2.5">Withdraw Collateral</div>
        </Button>
        <Button onClick={() => setMintDebtModalOpen(true)}>
          <div className="text-sm px-3 py-2.5">Mint Debt</div>
        </Button>
        <Button onClick={() => setReturnDebtModalOpen(true)}>
          <div className="text-sm px-3 py-2.5">Return Debt</div>
        </Button>
      </div>
      {/* Modals */}
      <Modal
        show={addCollateralModalOpen}
        heading="Add Collateral"
        label="Collateral to add"
        placeholder="ETH amount"
        error={addCollateralError}
        value={addCollateralInput}
        onClose={() => setAddCollateralModalOpen(false)}
        onSubmit={onAddCollateral}
        onChange={(v) => setAddCollateralInput(v)}
      />
      <Modal
        show={withdrawCollateralModalOpen}
        heading="Withdraw Collateral"
        label="Collateral to withdraw"
        placeholder="ETH amount"
        error={withdrawCollateralError}
        value={withdrawCollateralInput}
        onClose={() => setWithdrawCollateralModalOpen(false)}
        onSubmit={onWithdrawCollateral}
        onChange={(v) => setWithdrawCollateralInput(v)}
      />
      <Modal
        show={mintDebtModalOpen}
        heading="Mint Debt"
        label="Debt to mint"
        placeholder="pUSD amount"
        error={mintDebtError}
        value={mintDebtInput}
        onClose={() => setMintDebtModalOpen(false)}
        onSubmit={onMintDebt}
        onChange={(v) => setMintDebtInput(v)}
      />
      <Modal
        show={returnDebtModalOpen}
        heading="Return Debt"
        label="Debt to return"
        placeholder="pUSD amount"
        error={returnDebtError}
        value={returnDebtInput}
        onClose={() => setReturnDebtModalOpen(false)}
        onSubmit={onReturnDebt}
        onChange={(v) => setReturnDebtInput(v)}
      />
    </div>
  );
};

export default Vault;

import { useState } from "react";

import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Params from "./components/Params";
import Vault from "./components/Vault";
import Modal from "./components/modals/Modal";

import { useTypedSelector } from "./hooks/useTypedSelector";
import { createVault } from "./utils/contracts";

const App = () => {
  const { params, vaults } = useTypedSelector((state) => state.contract);

  const [createVaultModalOpen, setCreateVaultModalOpen] = useState(false);
  const [createVaultInput, setCreateVaultInput] = useState("");
  const [createVaultError, setCreateVaultError] = useState(false);

  const onCreateVault = async () => {
    try {
      await createVault(createVaultInput);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-8 px-48">
        <Params mcr={params.mcr} coll={params.coll} debt={params.debt} dMCR={params.dMCR} />
        <div className="mt-8">
          <div className="flex justify-between mb-4">
            <div className="text-2xl font-medium">Your Vaults</div>
            <Button onClick={() => setCreateVaultModalOpen(true)}>
              <div className="flex items-center justify-center gap-x-3 px-3 py-2.5 text-sm">
                <i className="bi bi-plus-circle" />
                <span>Create Vault</span>
              </div>
            </Button>
          </div>
          {vaults.map((vault, index) => (
            <div key={index} className="mb-4">
              <Vault
                id={vault.id}
                coll={vault.coll}
                debt={vault.debt}
                collRatio={vault.collRatio}
                liquidationAt={vault.liquidationAt}
              />
            </div>
          ))}
        </div>
        <Modal
          show={createVaultModalOpen}
          heading="Create Vault"
          label="Initial collateral amount"
          placeholder="ETH amount"
          error={createVaultError}
          value={createVaultInput}
          onClose={() => setCreateVaultModalOpen(false)}
          onSubmit={onCreateVault}
          onChange={(v) => setCreateVaultInput(v)}
        />
      </div>
    </div>
  );
};

export default App;

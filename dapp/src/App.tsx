import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Params from "./components/Params";
import Vault from "./components/Vault";
import Modal from "./components/modals/Modal";

import { useTypedSelector } from "./hooks/useTypedSelector";
import { createVault } from "./utils/contracts";
import Loader from "./components/Loader";
import { useActions } from "./hooks/useActions";
import Spinner from "./components/Spinner";
import Landing from "./pages/Landing";

const App = () => {
  const { params, vaults } = useTypedSelector((state) => state.contract);

  const [createVaultModalOpen, setCreateVaultModalOpen] = useState(false);
  const [createVaultInput, setCreateVaultInput] = useState("");
  const [createVaultError, setCreateVaultError] = useState(false);

  const { setLoader } = useActions();
  const { isLoading } = useTypedSelector((state) => state.contract);

  const onCreateVault = async () => {
    try {
      setLoader(true);
      await createVault(createVaultInput);
      toast.success("Succesfully created vault!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to create vault");
    }
    setLoader(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route
          path="/dapp"
          element={
            <>
              <Navbar />
              <Loader />
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
                  {isLoading ? (
                    <div className="w-full text-center mt-20">
                      <Spinner />
                    </div>
                  ) : vaults.length === 0 ? (
                    <div className="w-full text-center mt-20">No vaults to show</div>
                  ) : (
                    vaults.map((vault, index) => (
                      <div key={index} className="mb-4">
                        <Vault
                          id={vault.id}
                          coll={vault.coll}
                          debt={vault.debt}
                          collRatio={vault.collRatio}
                          liquidationAt={vault.liquidationAt}
                        />
                      </div>
                    ))
                  )}
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
                <Toaster />
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

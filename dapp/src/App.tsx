import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Params from "./components/Params";
import Vault from "./components/Vault";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App = () => {
  const { params, vaults } = useTypedSelector((state) => state.contract);

  return (
    <div>
      <Navbar />
      <div className="mt-8 px-48">
        <Params mcr={params.mcr} coll={params.coll} debt={params.debt} dMCR={params.dMCR} />
        <div className="mt-8">
          <div className="flex justify-between mb-4">
            <div className="text-2xl font-medium">Your Vaults</div>
            <Button onClick={() => {}}>
              <div className="flex items-center justify-center gap-x-3 px-3 py-2.5 text-sm">
                <i className="bi bi-plus-circle" />
                <span>Create Vault</span>
              </div>
            </Button>
          </div>
          {vaults.map((vault, index) => (
            <Vault
              key={index}
              coll={vault.coll}
              debt={vault.debt}
              collRatio={vault.collRatio}
              liquidationAt={vault.liquidationAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

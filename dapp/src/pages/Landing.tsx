import Button from "../components/Button";

const Background = require("../assets/background.png");

const Landing = () => {
  return (
    <div
      className="fixed h-screen w-screen"
      style={{ backgroundImage: `url(${Background})`, backgroundSize: "cover" }}
    >
      <div className="text-black py-4 px-48 flex justify-between items-center z-0">
        <div className="flex items-center">
          <img src="/brand.png" alt="brand" className="w-10 mr-2" />
          <span className="text-2xl font-bold">Neper Finance</span>
        </div>

        <div className="flex items-center">
          <Button onClick={() => window.open("/dapp")}>
            <div className="flex items-center justify-center gap-x-3 px-3 py-2.5 text-sm">
              <i className="bi bi-wallet" />
              <span>Enter dapp</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="fixed flex flex-col items-center justify-center h-screen w-screen pb-32">
        <div className="font-semibold text-5xl pb-8 text-center">
          Borrow <span className="text-secondary">USD</span> at the <br />
          <span className="text-secondary">highest Loan to Value</span> against ETH
        </div>
        <Button onClick={() => window.open("/dapp")}>
          <div className="flex items-center justify-center gap-x-3 px-3 py-2.5 text-sm">
            <i className="bi bi-wallet" />
            <div className="text-xl">Enter dapp</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Landing;

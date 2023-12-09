import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";
import Select, { components, SingleValue, StylesConfig } from "react-select";

import Button from "./Button";
import { formatAccount } from "../utils/strings";
import { CHAINS, DEFAULT_NETWORK } from "../utils/constants";
import { switchNetwork } from "../utils/metamask";

const NetworkSelctorOption = (props: any) => (
  <components.Option {...props}>
    <div className="cursor-pointer flex items-center gap-4">
      <img src={props.data.imgSrc} alt="selector" className="w-6" />
      {props.label}
    </div>
  </components.Option>
);

const NetworkSelectedOption = (props: any) => (
  <components.SingleValue {...props}>
    <div className="flex items-center gap-4">
      <img src={props.data.imgSrc} alt="selector" className="w-4" />
      {props.data.label}
    </div>
  </components.SingleValue>
);

interface NetworkOption {
  label: string;
  value: string;
  imgSrc: string;
}

const options = Object.keys(CHAINS).map((chainId) => {
  return {
    label: CHAINS[chainId].name.split(" ")[0],
    value: chainId,
    imgSrc: CHAINS[chainId].iconUrl,
  };
});

const customStyles: StylesConfig<NetworkOption, false> = {
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isSelected || state.isFocused ? "#F8CC81" : "white",
    cursor: "pointer",
  }),
  control: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  input: (provided) => ({
    ...provided,
    color: "transparent",
  }),
};

const Navbar = () => {
  const { sdk, connected, account, chainId } = useSDK();

  const [network, setNetwork] = useState(
    options.find((opt) => opt.value === (localStorage.getItem("network") || DEFAULT_NETWORK))
  );

  useEffect(() => {
    if (!network) {
      return;
    } else if (network.value !== chainId) {
      switchNetwork(network.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNetworkChange = async (option: SingleValue<NetworkOption>) => {
    if (!option) return;

    try {
      await switchNetwork(option.value);
      setNetwork(option);
      localStorage.setItem("network", option.value);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const connectWallet = async () => {
    try {
      if (!connected) {
        await sdk?.connect();
      } else {
        sdk?.disconnect();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <nav className="text-black py-4 px-48 flex justify-between items-center">
      <span className="text-2xl font-bold">Neper Finance</span>

      <div className="flex items-center">
        <Select
          options={options}
          defaultValue={options[0]}
          components={{ Option: NetworkSelctorOption, SingleValue: NetworkSelectedOption }}
          styles={customStyles}
          onChange={handleNetworkChange}
          value={network}
          className="text-black font-medium mr-2"
        />
        <Button onClick={connectWallet}>
          <div className="flex items-center justify-center gap-x-3 px-3 py-2.5 text-sm">
            <i className="bi bi-wallet" />
            <span>{connected ? `${formatAccount(account)}` : "Connect Wallet"}</span>
          </div>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect } from "react";
import { useSDK } from "@metamask/sdk-react";
import Select, { components, SingleValue, StylesConfig } from "react-select";

import Button from "./Button";
import { setClient } from "../utils/graph";
import { formatAccount } from "../utils/strings";
import { useActions } from "../hooks/useActions";
import { switchNetworkMM } from "../utils/metamask";
import { CHAINS, DEFAULT_NETWORK } from "../utils/constants";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setContracts } from "../utils/contracts";

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
    <div className="flex items-center gap-4 min-w-[100px]">
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

const options: { [key: string]: NetworkOption } = {};
Object.keys(CHAINS).map(
  (chainId) =>
    (options[chainId] = {
      label: CHAINS[chainId].name.split(" ")[0],
      value: chainId,
      imgSrc: CHAINS[chainId].iconUrl,
    })
);

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

  const { network } = useTypedSelector((state) => state.infra);
  const { switchNetwork, fetchData, setDataLoading } = useActions();

  useEffect(() => {
    if (!network) {
      return;
    } else if (network !== chainId) {
      switchNetworkMM(network);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      setClient(network);
      await setContracts(network);
      setDataLoading();
      fetchData(account);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  useEffect(() => {
    setDataLoading();
    fetchData(account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fetchData]);

  const handleNetworkChange = async (option: SingleValue<NetworkOption>) => {
    if (!option) return;

    try {
      await switchNetworkMM(option.value);
      switchNetwork(option.value);
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
    <div className="text-black py-4 px-48 flex justify-between items-center z-0">
      <span className="text-2xl font-bold">Neper Finance</span>

      <div className="flex items-center">
        <Select
          options={Object.values(options)}
          defaultValue={options[DEFAULT_NETWORK]}
          components={{ Option: NetworkSelctorOption, SingleValue: NetworkSelectedOption }}
          styles={customStyles}
          onChange={handleNetworkChange}
          value={options[network]}
          className="text-black font-medium mr-2"
        />
        <Button onClick={connectWallet}>
          <div className="flex items-center justify-center gap-x-3 px-3 py-2.5 text-sm">
            <i className="bi bi-wallet" />
            <span>{connected ? `${formatAccount(account)}` : "Connect Wallet"}</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;

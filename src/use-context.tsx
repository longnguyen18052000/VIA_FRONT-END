import { ReactNode, createContext, useContext, useState } from "react";

interface State {
  openOtp: boolean;
  setOpenOtp: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: State = {
  openOtp: false,
  setOpenOtp: () => {},
  type: "",
  setType: () => {},
};

const StateContext = createContext<State>(initialState);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [openOtp, setOpenOtp] = useState(false);
  const [type, setType] = useState("");
  return (
    <StateContext.Provider value={{ openOtp, setOpenOtp, type, setType }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

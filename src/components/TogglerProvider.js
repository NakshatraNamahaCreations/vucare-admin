import { createContext } from "react";
import React, { useState } from "react";


const CreateToggle = createContext();

export default function TogglProvider({ children }) {
  const [light, setLight] = useState(false);
  const [toggle, setToggle] = useState(false);
  const handlehide = () => {
    setToggle(true);
  };
  const handleshow = () => {
    setToggle(false);
  };

  const lighthandler = () => {
    setLight(true);
  };
  const darkhandler = () => {
    setLight(false);
  };
  return (
    <>
      <CreateToggle.Provider
        value={{
          toggle,
          handlehide,
          handleshow,
          light,
          lighthandler,
          darkhandler,
        }}
      >
        {children}
      </CreateToggle.Provider>
    </>
  );
}

export { CreateToggle };

/* eslint-disable react/prop-types */
import { useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
function ContextWrapper({ children }) {
  const [MonthIndex, setMonthIndex] = useState(dayjs().month());

  return (
    <GlobalContext.Provider value={{ MonthIndex, setMonthIndex }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default ContextWrapper;

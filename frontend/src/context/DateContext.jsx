import { createContext, useState } from "react";

export const DateContext = createContext();

const nowDate = new Date();

const DateProvider = ({ children }) => {
  const [year, setYear] = useState(nowDate.getUTCFullYear());
  const [month, setMonth] = useState(nowDate.getUTCMonth());
  const [day, setDay] = useState(nowDate.getUTCDate());

  return (
    <DateContext.Provider
      value={{ year, setYear, month, setMonth, day, setDay }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;

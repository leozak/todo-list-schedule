import { createContext, useState } from "react";

export const DateContext = createContext();

const nowDate = new Date();

const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [year, setYear] = useState<number>(nowDate.getUTCFullYear());
  const [month, setMonth] = useState<number>(nowDate.getUTCMonth());
  const [day, setDay] = useState<number>(nowDate.getUTCDate());

  return (
    <DateContext.Provider
      value={{ year, setYear, month, setMonth, day, setDay }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;

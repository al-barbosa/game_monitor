import React, { createContext, useState } from 'react';

type PropsDateContext = {
  selectDate: Date;
  setSelectDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DEFAULT_VALUE: PropsDateContext = {
  selectDate: new Date(),
  setSelectDate: () => {},
};

export const DateContext = createContext<PropsDateContext>(DEFAULT_VALUE);

export function DateProvider({ children }: { children: React.ReactNode }) {
  const [selectDate, setSelectDate] = useState(DEFAULT_VALUE.selectDate);

  return (
    <DateContext.Provider value={{ selectDate, setSelectDate }}>
      {children}
    </DateContext.Provider>
  );
}

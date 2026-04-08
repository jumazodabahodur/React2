import React, { createContext, useState, ReactNode } from "react";

// 1. Муайян кардани намуди маълумот барои Контекст
interface UserContextType {
  user: string;
  setUser: (name: string) => void;
}

// 2. Сохтани Контекст бо арзиши аввалия (undefined барои бехатарӣ)
export const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Сохтани Провайдер
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>("Баҳодур");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
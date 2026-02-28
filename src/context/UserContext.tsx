import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { getItem } from "../db/firebaseIntegration.ts";

const UserContext = createContext({});

export function UserProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    // getItem('/user', '-O_YE9gl3fCahDPygDf9').then((res) => {
    //   setUser(res)
    // }).catch((err) => {
    //   console.log("Error getting user")
    // })
  }, []);

  return (
    <UserContext.Provider value={[user]}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}


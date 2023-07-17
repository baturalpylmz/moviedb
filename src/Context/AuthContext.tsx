import { User } from "firebase/auth";
import { ReactNode, FC, createContext, useState, useEffect,useContext } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface IAuthContext{
  user:User;
  setUser: any;
}


export const AuthContext = createContext({} as ReturnType<typeof useContext>);

const AuthProvider: FC<ProviderProps> = ({ children }) => {

  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const localUser = (localStorage.getItem("userData"))
    if(localUser)
      setUser(JSON.parse(localUser))
  }, [])
  
  return (
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =():IAuthContext=>{
  return useContext(AuthContext) as IAuthContext
}

export default AuthProvider;

import { createContext } from 'react';
import {useState } from 'react';
export const AuthContext = createContext(null);
export function AuthContextProvider({ children}) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [token,setToken]=useState(null);
    function handleLogin(user,token){
        setUser(user);
        setToken(token);
        setLoggedIn(true);
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
    }
    function getLoggedInUser(){
  const token=localStorage.getItem("token");
  const user=localStorage.getItem("user");
  return {
    token:token,
    user:user?JSON.parse(user):null
  }
}
    const logout = () => {
    setUser(null);
    setLoggedIn(false); 
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return <AuthContext.Provider value={{user,loggedIn , setUser,setLoggedIn,handleLogin,token,logout}}>
    {children}
  </AuthContext.Provider>;
}
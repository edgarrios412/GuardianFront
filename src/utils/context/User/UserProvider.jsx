import { useState } from "react";
import { UserContext } from "./UserContext"
// import { useUsuarios } from "../hooks/useUsuarios";
import axios from "axios"

export const UserProvider = ({children}) => {

    const [usuario, setUsuario] = useState({})
    const updateUsuario = () => {
        const token = localStorage.getItem("token")
        axios.get("/user/token/"+token)
        .then(({data}) => setUsuario(data))
    }
    return (
        <UserContext.Provider value={{usuario, setUsuario, updateUsuario}}>
            {children}
        </UserContext.Provider>
    )
}
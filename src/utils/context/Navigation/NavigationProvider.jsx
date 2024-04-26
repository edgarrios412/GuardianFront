import { useState } from "react";
import { NavigationContext } from "./NavigationContext"

export const NavigationProvider = ({children}) => {
    const [edad,setEdad] = useState(0)

    return (
        <NavigationContext.Provider value={{edad, setEdad}}>
            {children}
        </NavigationContext.Provider>
    )
}
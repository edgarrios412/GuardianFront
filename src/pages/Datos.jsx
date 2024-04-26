import { useParams } from "react-router-dom"
import NavBar from "../components/layout/NavBar"
import { useEffect, useState } from "react"

const Datos = () => {
    const { cedula } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false),3000)
    },[])
    return (
        <>
            <NavBar />
            {loading ? <div className="text-center" style={{marginTop: "200px"}}>
                <div className="spinner-border text-secondary" role="status">
                </div><br></br><br></br>
                <span className="text-secondary">Buscando vigilado<br></br>CC: {cedula}</span>
            </div>
            :
            <div className="text-center" style={{marginTop: "200px"}}>
                <span className="text-secondary">Vigilado no encontrado<br></br>CC: {cedula}</span>
            </div>
            }
        </>
    )
}

export default Datos
import ModalLogin from "@/components/layout/ModalLogin"
import phase from "../../public/phase2.png"

const Login = () => {
    return(
        <div className="flex h-full justify-center items-center gap-40 flex-col lg:flex-row mt-40">
            <div>
                <img src={phase} className="w-60 lg:m-0 m-auto"/>
                <h1 className="text-3xl mt-4 mb-4 lg:text-justify text-center">Software de gestión</h1>
                <p style={{color: "hsl(217, 10%, 50.8%)", fontSize: "1.1rem" }} className="font-[OpenSans] lg:text-justify text-center">
                                    •	Seguridad y Confidencialidad<br></br>
                                    •	Acceso Controlado y Restringido <br></br>
                                    •	Automatización de Procesos <br></br>
                                    •	Integración con Otras Plataformas <br></br>
                                    •	Notificaciones y Alertas <br></br>
                                    •	Soporte Técnico y Actualizaciones Continuas
                                </p>
            </div>
            <ModalLogin open={true} />
        </div>
    )
}

export default Login
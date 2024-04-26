import { Button } from "@/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
    BookText,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/utils/context/User/UserContext";
import axios from "axios";
import SIGC from "./Documentos/SIGC";
import PIND from "./Documentos/PIND";
import SGSI from "./Documentos/SGSI";
import PPDP from "./Documentos/PPDP";
import ABPRC from "./Documentos/ABPRC";

const Politicas = () => {
    const { usuario } = useContext(UserContext);
    const [page, setPage] = useState(1);
    const [sizePanel, setSizePanel] = useState(null);
    const [caducado, setCaducado] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("/user/token/" + token).then(
                () => { },
                (e) => caducarSesion(e)
            );
        } else return caducarSesion();
    }, []);

    const caducarSesion = () => {
        setCaducado(true);
    };

    return (
        <div className="h-[90vh] w-[100%]">
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full rounded-lg border"
            >
                <ResizablePanel
                    defaultSize={20}
                >
                    <div className="flex-row h-full max-w-96 p-2">
                            
                        <Button
                            onClick={() => setPage(1)}
                            className={`font-[OpenSans] h-fit bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${page == 1 ? "bg-blue-200" : "bg-transparent"
                                }`}
                        >
                            <BookText
                                className="mr-4 min-h-4 min-w-4"
                            />
                            <span className="whitespace-normal text-left">
                            Sistema integrado de gestion de calidad
                            </span>
                        </Button>
                        <Button
                            onClick={() => setPage(2)}
                            className={`font-[OpenSans] h-fit bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${page == 2 ? "bg-blue-200" : "bg-transparent"
                                }`}
                        >
                            <BookText
                                className="mr-4 min-h-4 min-w-4"
                            />
                            <span className="whitespace-normal text-left">
                            Política de imparcialidad y no discriminación
                            </span>
                        </Button>
                        <Button
                            onClick={() => setPage(3)}
                            className={`font-[OpenSans] h-fit bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${page == 3 ? "bg-blue-200" : "bg-transparent"
                                }`}
                        >
                            <BookText
                                className="mr-4 min-h-4 min-w-4"
                            />
                            <span className="whitespace-normal text-left">
                            Manual de políticas del sistema de gestión de seguridad de la información
                            </span>
                        </Button>
                        <Button
                            onClick={() => setPage(4)}
                            className={`font-[OpenSans] h-fit bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${page == 4 ? "bg-blue-200" : "bg-transparent"
                                }`}
                        >
                            <BookText
                                className="mr-4 min-h-4 min-w-4"
                            />
                            <span className="whitespace-normal text-left">
                            Manual de política de protección de datos personales
                            </span>
                        </Button>
                        <Button
                            onClick={() => setPage(5)}
                            className={`font-[OpenSans] h-fit bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${page == 5 ? "bg-blue-200" : "bg-transparent"
                                }`}
                        >
                            <BookText
                                className="mr-4 min-h-4 min-w-4"
                            />
                            <span className="whitespace-normal text-left">
                            Formato de acuerdo de buenas prácticas y responsabilidad corporativa
                            </span>
                        </Button>
                    </div>
                </ResizablePanel>
                <ResizablePanel defaultSize={80} className="!overflow-y-auto bg-gray-100">
                    {page == 1 && <SIGC/>}
                    {page == 2 && <PIND/>}
                    {page == 3 && <SGSI/>}
                    {page == 4 && <PPDP/>}
                    {page == 5 && <ABPRC/>}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default Politicas;

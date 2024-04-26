import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Shield,
  FileCode,
  LogOut,
  Archive,
  FlaskConical
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Perfil from "./Profile/Bandeja";
import Servicios from "./Profile/Administracion";
import { Link, useNavigate} from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserContext } from "@/utils/context/User/UserContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import Procedimientos from "./Profile/Procedimientos";
import ModalFormSolicitud from "@/components/layout/ModalFormSolicitud";
import FormSolicitud from "./FormSolicitud";

const Profile = () => {
  // const { usuario } = useContext(UserContext);
  const usuario = JSON.parse(localStorage.getItem("user"))
  const [page, setPage] = useState(1);
  const [sizePanel, setSizePanel] = useState(null);
  const [caducado, setCaducado] = useState(false);
  const [formSolicitud, setFormSolicitud] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("/user/token/" + token).then(
        () => {},
        (e) => caducarSesion(e)
      );
    } else return caducarSesion();
  }, []);

  const caducarSesion = () => {
    setCaducado(true);
  };

  return (
    <div className="h-[100vh] w-[100%]">
      <ModalFormSolicitud open={formSolicitud} setOpen={setFormSolicitud}/>
      <AlertDialog open={false}>
      <AlertDialogContent className="font-[OpenSans]">
        <AlertDialogHeader>
          <AlertDialogTitle>Tu sesión ha caducado</AlertDialogTitle>
          <AlertDialogDescription>
            Por motivos de seguridad, tu sesión caduca automaticamente transcurrido un tiempo,
            te recomendamos iniciar sesion nuevamente para seguir realizando operaciones en el panel
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction onClick={() => {localStorage.removeItem("token"); navigate("/")}}>Ingresar nuevamente</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full rounded-lg border"
      >
        <ResizablePanel
          onResize={(e) => {
            setSizePanel(e);
            console.log(e);
          }}
          defaultSize={20}
          maxSize={20}
          minSize={6}
        >
          <div className="flex-row h-full max-w-96 p-2">
            {sizePanel > 14 ? (
              <div className="mb-2 p-5 justify-start">
                <h2 className="font-[OpenSans] text-xl">
                  Hola <b>{usuario.nombres}!</b>
                </h2>
                <span className="font-[OpenSans] text-xs text-gray-400">
                  Ultima conexión: 19/04/24 12:15
                </span>
              </div>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <FlaskConical
                      className={`${
                        sizePanel < 14 ? "m-auto my-12" : "mr-auto"
                      }`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="p-5 justify-start">
                      <h2 className="font-[OpenSans] text-xl">
                        Hola <b>Edgar!</b>
                      </h2>
                      <span className="font-[OpenSans] text-xs text-gray-400">
                        Ultima conexión: 05/03/24 06:15
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <DropdownMenuSeparator />
            <Button
              onClick={() => setPage(1)}
              className={`font-[OpenSans] bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${
                page == 1 ? "bg-blue-200" : "bg-transparent"
              }`}
            >
              {(sizePanel > 18 || sizePanel < 14) &&
                (sizePanel < 14 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                        <Archive
                          className={`${
                            sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"
                          }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Bandeja</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Archive
                    className={`${sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"}`}
                  />
                ))}
              {sizePanel > 14 && "Bandeja"}
            </Button>
            <Button
              onClick={() => setFormSolicitud(true)}
              className={`font-[OpenSans] bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200`}
            >
              {(sizePanel > 18 || sizePanel < 14) &&
                (sizePanel < 14 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                        <Archive
                          className={`${
                            sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"
                          }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Crear solicitud</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Archive
                    className={`${sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"}`}
                  />
                ))}
              {sizePanel > 14 && "Crear solicitud"}
            </Button>
            {/* {usuario.micompany !== null && <Button
              onClick={() => setPage(2)}
              className={`font-[OpenSans] bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${
                page == 2 ? "bg-blue-200" : "bg-transparent"
              }`}
            >
              {(sizePanel > 18 || sizePanel < 14) &&
                (sizePanel < 14 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                        <FileCode
                          className={`${
                            sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"
                          }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Toma de muestras</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <FlaskConical
                    className={`${sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"}`}
                  />
                ))}
              {sizePanel > 14 && "Toma de muestras"}
            </Button>} */}
            <Button
              onClick={() => setPage(3)}
              className={`font-[OpenSans] bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-blue-200 ${
                page == 3 ? "bg-blue-200" : "bg-transparent"
              }`}
            >
              {(sizePanel > 18 || sizePanel < 14) &&
                (sizePanel < 14 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
                        <Shield
                          className={`${
                            sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"
                          }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Administración</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Shield
                    className={`${sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"}`}
                  />
                ))}
              {sizePanel > 14 && "Administración"}
            </Button>
            <Link to="/">
              <Button
                onClick={() => localStorage.removeItem("token")}
                className="font-[OpenSans] bg-transparent mb-2 justify-start text-black w-full border-2 border-transparent hover:bg-transparent hover:bg-red-200"
              >
                {(sizePanel > 18 || sizePanel < 14) &&
                  (sizePanel < 14 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <LogOut
                            className={`${
                              sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"
                            }`}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Cerrar sesion</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <LogOut
                      className={`${
                        sizePanel < 14 ? "m-auto" : "mr-4 h-4 w-4"
                      }`}
                    />
                  ))}
                {sizePanel > 14 && "Cerrar sesion"}
              </Button>
            </Link>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80} className="!overflow-y-auto bg-gray-100">
          {page == 1 && <Perfil />}
          {page == 2 && <Procedimientos />}
          {page == 3 && <Servicios />}
          {/* {page == 5 && <Soporte />} */}
          {/* {page == 6 && <Ajustes />} */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Profile;

import {
  BellRing,
  Check,
  Send,
  FileQuestion,
  CalendarDays,
  TextSelect,
  X,
  User,
  Users,
  FolderOpen,
  ChevronLeft,
  Mail,
  CircleDot,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import {
  useInView,
  motion,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserContext } from "@/utils/context/User/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatDate } from "@/utils/helpers/formatter";
import QRCode from "react-qr-code";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import PdfViewer from "@/components/layout/PdfViewer";
import { SelectLabel } from "@radix-ui/react-select";
import Word from "@/components/layout/Word";
import ModalFormSolicitud from "@/components/layout/ModalFormSolicitud";

const Bandeja = ({ className, ...props }) => {
  // const { usuario, updateUsuario } = useContext(UserContext);
  const usuario = JSON.parse(localStorage.getItem("user"));
  console.log(usuario)
  const { toast } = useToast();
  const [procedimiento, setProcedimiento] = useState(null);
  const [pacienteOptionId, setPacienteOptionId] = useState(null);
  const [tramites, setTramites] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosByGroup, setUsuariosByGroup] = useState([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState();
  const [documento, setDocumento] = useState(null)
  const [observacion, setObservacion] = useState("")
  const [plantillaSelected, setPlantillaSelected] = useState(null)
  const [rutaArchivo, setRutaArchivo] = useState(null)
  const [formSolicitud, setFormSolicitud] = useState(false)
  const [plantillas, setPlantillas] = useState([])

  useEffect(() => {
    axios
      .get("/tramite/usuario/" + usuario?.id)
      .then(({ data }) => setTramites(data));
    axios.get("/usuario/all").then(({ data }) => setUsuarios(data));
    axios
      .get("/usuario/order/byGroup")
      .then(({ data }) => setUsuariosByGroup(data));
      axios.get("/plantilla").then(({ data }) => setPlantillas(data));
  }, []);

  useEffect(() => {
    if(procedimiento?.documento){
      setRutaArchivo(procedimiento?.documento)
    }
  },[procedimiento])

  const aprobarFlujo = () => {
    const usuarioSelected = usuarios.find((u) => u.id == usuarioAsignado);
    axios
      .put("/tramite/" + procedimiento.id, {
        usuarioAsignado,
        grupoGestion: usuarioSelected.grupoId,
        estado: procedimiento.estado + 1,
        observacion,
        usuarioHistorial: usuario.id
      })
      .then(({ data }) => {
        toast({
          title: "Tramite enviado exitosamente",
          description:`El trámite ahora se encuenta en la bandeja de ${usuarioSelected.nombres}`
        })
        axios
          .get("/tramite/usuario/" + usuario.id)
          .then(({ data }) => setTramites(data));
        setProcedimiento(null);
      });
  };

  const finalizarFlujo = () => {
    axios
      .put("/tramite/" + procedimiento.id, {
        estado: 6,
        observacion,
        usuarioAsignado:null,
        usuarioHistorial: usuario.id
      })
      .then(({ data }) => {
        toast({
          title: "Tramite finalizado",
          description:`El trámite ahora se encuenta en la bandeja de tramites finalizados`
        })
        axios
          .get("/tramite/usuario/" + usuario.id)
          .then(({ data }) => setTramites(data));
        setProcedimiento(null);
      });
  };

  const uploadFile = () => {
    const form = new FormData()
    form.append("file", documento)
    axios.post("/documentos/"+procedimiento.id, form).then(() => toast({
      title: "Documento cargado exitosamente",
      description:"El documento ya está anexado al trámite aunque no lo veas reflejado automaticamente"
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-2 lg:px-20 py-2 lg:py-10"
    >
      <ModalFormSolicitud open={formSolicitud} setOpen={setFormSolicitud}/>
      <div className="flex gap-10">
        {!procedimiento ? (
          <Card className={cn("w-full h-fit pb-6", className)} {...props}>
            <CardHeader className="flex flex-row justify-between">
              <div>
              <CardTitle className="mb-2">Bandeja</CardTitle>
              <CardDescription>
                Tienes {tramites?.length} procedimientos pendientes
              </CardDescription>
              </div>
              <Button
              onClick={() => setFormSolicitud(true)}
            >
              Crear solicitud
            </Button>
            </CardHeader>
            <CardContent className="h-fit">
              <div>
                {!tramites?.length ? (
                  <div className="h-40 text-center">
                    <TextSelect className="m-auto text-gray-300 h-14 w-14 my-4" />
                    <h1 className="text-muted-foreground text-sm">
                      No tienes nada pendiente
                    </h1>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Tramite</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Ver</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tramites.sort((a,b) => a.id-b.id).map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-bold">{t.id}</TableCell>
                          <TableCell>{t.usuario.nombres} {t.usuario.apellidos}</TableCell>
                          <TableCell>{t.listatramite.nombre}</TableCell>
                          <TableCell>
                            <span className="rounded-lg bg-green-600 text-white px-2 py-1">
                            {t.estado == 1 && "Nuevo"}
                            {t.estado == 2 && "Repartido"}
                            {t.estado == 3 && "Proyectado"}
                            {t.estado == 4 && "Revisado"}
                            {t.estado == 5 && "Firmado"}
                            </span>
                            </TableCell>
                          <TableCell>{t.descripcion}</TableCell>
                          <TableCell>
                            <Button onClick={() => setProcedimiento(t)}>
                              Ver
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
            {/* <CardFooter>
              <Button
                className="w-full mt-5"
                onClick={() => alert("Enviando a patologia")}
              >
                <Check className="mr-2 h-4 w-4" /> Enviar a patología
              </Button>
            </CardFooter> */}
          </Card>
        ) : (
          <Card className={cn("w-full h-fit", className)} {...props}>
            <CardHeader>
              <CardTitle>
                <Button onClick={() => setProcedimiento(null)}>Atrás</Button>
              </CardTitle>
              {/* <CardDescription>
                Tienes 0 procedimientos pendientes
              </CardDescription> */}
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-3 gap-10">
                <div>
                  <Label className="font-bold">Usuario</Label>
                  <br></br>
                  <Dialog>
                    <DialogTrigger className="text-left">
                      <p className="font-bold underline">
                        {procedimiento.usuario.nombres} {procedimiento.usuario.apellidos}
                      </p>
                    </DialogTrigger>
                    <DialogContent className="font-[OpenSans]">
                      {!pacienteOptionId && (
                        <div>
                          <DialogTitle>Información</DialogTitle>
                          <DialogDescription
                            className={"font-[OpenSans] text-sm mt-2 mb-4"}
                          >
                            Accede a más información del usuario
                          </DialogDescription>
                          <div className="flex flex-col gap-4">
                            <div
                              onClick={() => setPacienteOptionId(1)}
                              className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                            >
                              <Users />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-bold leading-none">
                                  Datos del usuario
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Observa la información más detallada del
                                  usuario
                                </p>
                              </div>
                              {/* <Button>Ver preguntas comunes</Button> */}
                            </div>
                            <div
                              onClick={() => setPacienteOptionId(2)}
                              className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                            >
                              <FolderOpen />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-bold leading-none">
                                  Historia del usuario
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Acá puedes ver todos los tramites realizados
                                  por el usuario
                                </p>
                              </div>
                            </div>
                            {/* <Button>Ver preguntas comunes</Button> */}
                          </div>
                        </div>
                      )}
                      {pacienteOptionId == 1 && (
                        <div>
                          <DialogTitle className="flex gap-4 items-center">
                            <ChevronLeft
                              className="mt-1 cursor-pointer"
                              onClick={() => setPacienteOptionId(null)}
                            />{" "}
                            Datos del usuario
                          </DialogTitle>
                          <DialogDescription
                            className={"font-[OpenSans] text-sm mt-2 mb-4"}
                          >
                            Observa la información más detallada del usuario
                          </DialogDescription>
                          <div className="flex-row gap-6">
                              <div className="flex gap-3 items-center mb-4">
                              <User className="min-w-5 min-h-5 "/>
                              <span className="font-bold font-[OpenSans]">{procedimiento.usuario.nombres} {procedimiento.usuario.apellidos}</span>
                              </div>
                              <div className="flex gap-3 items-center mb-4">
                              <Mail className="min-w-5 min-h-5 "/>
                              <span className="font-bold font-[OpenSans]">{procedimiento.usuario.email}</span>
                              </div>
                              <div className="flex gap-3 items-center mb-4">
                              <CircleDot className="min-w-5 min-h-5 "/>
                              <span className="font-[OpenSans]">
                                {procedimiento.usuario.rol == 1 && "Repartidor"}
                                {procedimiento.usuario.rol == 2 && "Proyector"}
                                {procedimiento.usuario.rol == 3 && "Revisor"}
                                {procedimiento.usuario.rol == 4 && "Firmante"}
                                </span>
                              </div>
                              <div className="flex gap-3 items-center mb-4">
                              <Users className="min-w-5 min-h-5 "/>
                              <span className="font-[OpenSans]">
                                {procedimiento.usuario.grupoId == 100 && "GRUPO ALMACEN"}
                                {procedimiento.usuario.grupoId == 200 && "GRUPO FINANCIERO"}
                                </span>
                              </div>
                              <div className="flex gap-3 items-center mb-4">
                              <CalendarDays className="min-w-5 min-h-5 "/>
                              <span className="font-light font-[OpenSans]">{formatDate(procedimiento.usuario.createdDate)}</span>
                              </div>
                            </div>
                        </div>
                      )}
                      {pacienteOptionId == 2 && (
                        <div>
                          <DialogTitle className="flex gap-4 items-center">
                            <ChevronLeft
                              className="mt-1 cursor-pointer"
                              onClick={() => setPacienteOptionId(null)}
                            />{" "}
                            Historia del usuario
                          </DialogTitle>
                          <DialogDescription
                            className={"font-[OpenSans] text-sm mt-2 mb-4"}
                          >
                            Acá puedes ver todos los tramites realizados por el
                            usuario
                          </DialogDescription>
                          <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Tramite</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {procedimiento.usuario.tramites.sort((a,b) => a.id-b.id).map((t) => (
                        <TableRow key={t.id}>
                          <TableCell>{formatDate(t.fechaCreacion)}</TableCell>
                          <TableCell><span className="rounded-lg bg-green-600 text-white px-2 py-1">
                            {t.estado == 1 && "Nuevo"}
                            {t.estado == 2 && "Repartido"}
                            {t.estado == 3 && "Proyectado"}
                            {t.estado == 4 && "Revisado"}
                            {t.estado == 5 && "Firmado"}
                            </span></TableCell>
                          <TableCell>{t.descripcion}</TableCell>
                          <TableCell>{t.listatramite.nombre}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <Label className="font-bold">Tramite</Label>
                  <p>{procedimiento.listatramite.nombre}</p>
                </div>
                <div>
                  <Label className="font-bold">Fecha</Label>
                  <p>{formatDate(procedimiento.fechaCreacion)}</p>
                </div>
                <div className="grid col-span-3">
                  <Label className="font-bold mb-2">Descripcion</Label>
                  <p>
                    {procedimiento.descripcion}
                  </p>
                </div>
              </div>
              {usuario.rol > 1 && <Separator />}
              {/* Visor */}
              {/* SI ES REPARTIDOR */}
              {usuario.rol == 1 && <></>}
              {usuario.rol == 2 && (plantillaSelected == null && rutaArchivo == null ? <div>
                <h3 className="text-center font-bold text-xl my-6">Seleccionar plantilla</h3>
                <div className="flex flex-col items-center gap-4 mb-10">
                  {plantillas.map( p => <Button className="lg:w-96 w-fit" onClick={() => setPlantillaSelected(p.path)}>{p.nombre}</Button>)}
                </div>
              </div>:(!rutaArchivo ? <Word pathPlantilla={plantillaSelected} setRutaArchivo={setRutaArchivo} tramiteId={procedimiento.id}/>:<PdfViewer rutaDocumento={rutaArchivo}/>))}
              {usuario.rol == 3 && <PdfViewer rutaDocumento={procedimiento.documento}/>}
              {usuario.rol == 4 && <PdfViewer rutaDocumento={procedimiento.documento} firmar={true}/>}
              {usuario.rol >= 5 && <PdfViewer rutaDocumento={procedimiento.documento}/>}
              <Separator />
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message" className="font-bold mb-2 mt-4">
                  Observaciones
                </Label>
                <Textarea
                  onChange={(e) => setObservacion(e.target.value)}
                  placeholder="Ingresa tu observación acá"
                  id="message"
                />
              </div>
              {usuario.rol < 5 &&<Select
                onValueChange={(e) => setUsuarioAsignado(e)}
                className="w-full font-[OpenSans]"
              >
                <SelectTrigger className="w-full text-left h-fit font-[OpenSans]">
                  <SelectValue placeholder="Asignar usuario" />
                </SelectTrigger>
                <SelectContent className="font-[OpenSans]">
                  {Object.keys(usuariosByGroup).map((key) => (
                    <SelectGroup>
                      <SelectLabel className="font-bold ml-3 text-sm">
                        {key}
                      </SelectLabel>
                      {usuariosByGroup[key].filter(u => {
                        if(procedimiento.estado == 1) return u.rol == 2
                        if(procedimiento.estado == 2) return u.rol == 3
                        if(procedimiento.estado == 3) return u.rol == 4
                        if(procedimiento.estado == 4) return u.rol == 5
                      }).map((u) => (
                        <SelectItem value={u.id}>
                          {u.nombres} {u.apellidos}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>}
            </CardContent>
            <CardFooter className="flex flex-row gap-10">
              <Button
                className="w-full bg-red-600 hover:bg-red-500"
                onClick={() => alert("Rechazar")}
              >
                <X className="mr-2 h-4 w-4" /> Rechazar
              </Button>
              {usuario.rol >= 5 ? <Button className="w-full" onClick={finalizarFlujo}>
                <Check className="mr-2 h-4 w-4" /> Finalizar
              </Button>:<Button className="w-full" onClick={aprobarFlujo}>
                <Check className="mr-2 h-4 w-4" /> Aprobar
              </Button>}
            </CardFooter>
            <Separator />
            <Tabs defaultValue="null" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="documentos" className="w-full">
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="historial" className="w-full">
                  Historial
                </TabsTrigger>
                {/* <TabsTrigger value="other" className="w-full">Otra pestaña</TabsTrigger> */}
              </TabsList>
              <TabsContent value="documentos" className="p-5">
                <h2 className="font-bold mb-2">Documentos cargados</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Este listado te muestra los documentos que han sido cargados
                  en el trámite y los detalles del mismo
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Id</TableHead>
                      <TableHead>Documento</TableHead>
                      {/* <TableHead>Formato</TableHead> */}
                      <TableHead>Tamaño</TableHead>
                      {/* <TableHead>Subido por</TableHead> */}
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procedimiento.documentos.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-bold">{d.id}</TableCell>
                      {/* <TableCell>{d.dsdario}</TableCell> */}
                      <TableCell>{d.file}</TableCell>
                      <TableCell>{d.size}MB</TableCell>
                      <TableCell>
                        <a href={"https://guardianbackend.onrender.com/"+d.path} target="_blank"><Button>Ver</Button></a>
                      </TableCell>
                    </TableRow>
                  ))}
                    {/* <TableRow key={1}>
                      <TableCell className="font-bold">1</TableCell>
                      <TableCell>Paz y salvo 2024</TableCell>
                      <TableCell>PNG</TableCell>
                      <TableCell>1,6MB</TableCell>
                      <TableCell>Edgar Vilchez</TableCell>
                      <TableCell>
                        <Button>Ver</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell className="font-bold">2</TableCell>
                      <TableCell>Captura de pantalla</TableCell>
                      <TableCell>JPG</TableCell>
                      <TableCell>1MB</TableCell>
                      <TableCell>Edgar Vilchez</TableCell>
                      <TableCell>
                        <Button>Ver</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow key={3}>
                      <TableCell className="font-bold">3</TableCell>
                      <TableCell>Grabación de la zona</TableCell>
                      <TableCell>MP4</TableCell>
                      <TableCell>11,2MB</TableCell>
                      <TableCell>Edgar Vilchez</TableCell>
                      <TableCell>
                        <Button>Ver</Button>
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
                <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
                  <Label htmlFor="picture" className="font-bold">Documento</Label>
                  <Input id="picture" type="file" onChange={(e) => setDocumento(e.target.files[0])} />
                </div>
                <Button type="file" onClick={uploadFile}>Subir documento</Button>
              </TabsContent>
              <TabsContent value="historial" className="p-5">
                <h2 className="font-bold mb-2">Historial del trámite</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Este listado te muestra los movimientos que se han realizado
                  en el trámite y la persona que lo realizó
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Id</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Observacion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {procedimiento.historials.sort((a,b) => a.id-b.id).map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-bold">{p.id}</TableCell>
                      <TableCell>{p.fecha}</TableCell>
                      <TableCell>{p.accion}</TableCell>
                      <TableCell>{p.usuario.nombres} {p.usuario.apellidos}</TableCell>
                      <TableCell>{p.observacion}</TableCell>
                    </TableRow>
                  ))}
                    {/* <TableRow key={1}>
                      <TableCell className="font-bold">1</TableCell>
                      <TableCell>21/04/24 13:23</TableCell>
                      <TableCell>Edgar Vilchez</TableCell>
                      <TableCell>Revisó el documento</TableCell>
                      <TableCell>
                        Todo está en orden y puede continuar el procedimiento
                      </TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell className="font-bold">2</TableCell>
                      <TableCell>23/04/24 09:12</TableCell>
                      <TableCell>Edgar Vilchez</TableCell>
                      <TableCell>Aprobó el documento</TableCell>
                      <TableCell>
                        Todo está en orden y puede continuar el procedimiento
                      </TableCell>
                    </TableRow>
                    <TableRow key={3}>
                      <TableCell className="font-bold">3</TableCell>
                      <TableCell>24/04/24 15:50</TableCell>
                      <TableCell>Edgar Vilchez</TableCell>
                      <TableCell>Firmó el documento</TableCell>
                      <TableCell>
                        <p className="text-muted-foreground">Sin observación</p>
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default Bandeja;

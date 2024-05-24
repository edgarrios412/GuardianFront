import {
  BellRing,
  Check,
  Send,
  FileQuestion,
  CalendarDays,
  TextSelect,
  Clock9,
  Mail,
  User,
  ShieldAlert,
  ChevronLeft,
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

const Reportes = ({ className, ...props }) => {
  // const { usuario, updateUsuario } = useContext(UserContext);
  const usuario = JSON.parse(localStorage.getItem("user"));
  console.log(usuario);
  const { toast } = useToast();
  const [reporte, setReporte] = useState(null);
  const [pacienteOptionId, setPacienteOptionId] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosByGroup, setUsuariosByGroup] = useState([]);
  const [usuarioAsignado, setUsuarioAsignado] = useState();
  const [documento, setDocumento] = useState(null);
  const [observacion, setObservacion] = useState("");
  const [plantillaSelected, setPlantillaSelected] = useState(null);
  const [rutaArchivo, setRutaArchivo] = useState(null);
  const [tipo, setTipo] = useState();
  const [detalle, setDetalle] = useState();
  const [coordenadas, setCoordenadas] = useState([]);

  useEffect(() => {
    axios.get(`/reporte/${usuario?.companyId}/all`).then(({ data }) => setReportes(data));
    axios.get("/usuario/all").then(({ data }) => setUsuarios(data));
    axios
      .get("/usuario/order/byGroup")
      .then(({ data }) => setUsuariosByGroup(data));
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoordenadas([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);


  const uploadFile = async () => {
    const form = new FormData();
    form.append("file", documento);
    const {data} = await axios.post("/documentos/null", form)
    return data
  };

  const crearReporte = async (e) => {
    e.preventDefault();
    if(documento){
      uploadFile().then((data) => {
        console.log(data)
        axios
          .post("/reporte", {
            detalle,
            tipo,
            usuarioId: usuario.id,
            coordenadas,
            imagen: data.path
          })
          .then(({ data }) => {
            axios.get(`/reporte/${usuario?.companyId}/all`).then(({ data }) => setReportes(data));
            alert("Reporte creado con éxito");
          });
      })
    }else{
      axios
          .post("/reporte", {
            detalle,
            tipo,
            usuarioId: usuario.id,
            coordenadas,
            imagen: null,
            companyId: usuario?.companyId
          })
          .then(({ data }) => {
            axios.get(`/reporte/${usuario?.companyId}/all`).then(({ data }) => setReportes(data));
            alert("Reporte creado con éxito");
          });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-2 lg:px-20 py-2 lg:py-10"
    >
      <div className="flex gap-10">
        <Card className={cn("w-full h-fit pb-6", className)} {...props}>
          <CardHeader className="flex-row justify-between">
            <div>
              <CardTitle>Reportes</CardTitle>
              <CardDescription className="mt-2">
                Tienes {reportes?.length} reportes en la bandeja
              </CardDescription>
            </div>
            <Dialog id={1}>
              <DialogTrigger>
                <Button>Nuevo reporte</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nuevo reporte</DialogTitle>
                  <DialogDescription className={"font-[OpenSans] text-sm"}>
                    Rellena el formulario para generar un nuevo reporte
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={crearReporte}
                  className={cn(
                    "font-[OpenSans] grid items-start gap-4",
                    className
                  )}
                >
                  <div className="grid gap-2 mt-4">
                    <Label htmlFor="username" className="font-bold">
                      Tipo de reporte
                    </Label>
                    <Select
                      onValueChange={(e) => setTipo(e)}
                      value={tipo}
                      className="w-full font-[OpenSans]"
                    >
                      <SelectTrigger className="w-full text-left h-fit font-[OpenSans]">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent className="font-[OpenSans]">
                        <SelectGroup>
                          <SelectItem value="Incidente">Incidente</SelectItem>
                          <SelectItem value="Asistencia">Asistencia</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="font-bold">
                      Detalles
                    </Label>
                    <Textarea
                      onChange={(e) => setDetalle(e.target.value)}
                      value={detalle}
                      placeholder="Detalla un poco sobre tu reporte"
                      className={"font-[OpenSans] text-sm"}
                      type="text"
                      id="usuario"
                    />
                  </div>
                  <div className="font-[OpenSans] grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture" className="font-bold">
                      Adjuntar imagen
                    </Label>
                    <Input
                      id="picture"
                      type="file"
                      onChange={(e) => setDocumento(e.target.files[0])}
                    />
                  </div>
                  <Button type="submit">Enviar reporte</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="h-fit">
            <div>
              {!reportes?.length ? (
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
                      <TableHead>Fecha</TableHead>
                      <TableHead>Reporte</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Detalle</TableHead>
                      <TableHead>Ver</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportes.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-bold">{r.id}</TableCell>
                        <TableCell>{formatDate(r.fecha)}</TableCell>
                        <TableCell>
                          {r.usuario.nombres} {r.usuario.apellidos}
                        </TableCell>
                        <TableCell>
                          <span className={`${r.tipo == "Incidente" && "bg-red-500"} ${r.tipo == "Asistencia" && "bg-green-600"} font-normal rounded-lg px-2 py-1 text-white text-sm font-[OpenSans]`}>{r.tipo}</span></TableCell>
                        <TableCell>{r.detalle}</TableCell>
                        <TableCell>
                          <Dialog className={"font-[OpenSans]"}>
                            <DialogTrigger>
                              <Button onClick={() => setReporte(r)}>
                                Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
                              <DialogHeader>
                                <DialogTitle>Detalles del reporte</DialogTitle>
                                <DialogDescription className={"font-[OpenSans] text-sm"}>Mira los detalles del reporte realizados por el vigilante para estar al tanto de todo</DialogDescription>
                              </DialogHeader>
                              <div className="flex gap-3 items-center">
                              <User className="min-w-5 min-h-5 "/>
                              <span className="font-bold font-[OpenSans]">{r.usuario.nombres} {r.usuario.apellidos}</span>
                              </div>
                              <div className="flex gap-3 items-center">
                              <ShieldAlert className="min-w-5 min-h-5 "/>
                              <span className={`${r.tipo == "Incidente" && "bg-red-500"} ${r.tipo == "Asistencia" && "bg-green-600"} font-normal rounded-lg px-2 py-1 text-white text-sm font-[OpenSans]`}>{r.tipo}</span>
                              </div>
                              <div className="flex gap-3 items-center">
                              <Clock9 className="min-w-5 min-h-5 "/>
                              <span className="font-light font-[OpenSans]">{formatDate(r.fecha)}</span>
                              </div>
                              {r.detalle && <div className="flex gap-1 items-center">
                              <Mail className="min-w-5 min-h-5 "/>
                              <span className={`font-normal rounded-lg px-2 py-1 font-[OpenSans]`}>{r.detalle}</span>
                              </div>}
                              {r.imagen &&
                              <>
                              <h3 className="font-[OpenSans] text-center font-bold my-4">Adjuntos</h3>
                              <img className="m-auto mb-10 rounded-lg" src={"http://localhost:3001/"+r.imagen}/>
                              </>
                              }
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Reportes;

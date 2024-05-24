import { useInView, motion, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import mastercard from "../../assets/mastercard.png";
import paypal from "../../assets/paypal.png";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreditCard } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/utils/context/User/UserContext";
import axios from "axios";
import  {NumericFormat} from "react-number-format";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "./Mapa.css"
import { formatDate } from "@/utils/helpers/formatter";

const Geolocalizacion = () => {
  const { usuario, updateUsuario } = useContext(UserContext);

  const [position, setPosition] = useState([4.6003052605740455, -74.10983944239631])
  const [reportes, setReportes] = useState([])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
    axios.get(`/reporte/${usuario?.companyId}/all`).then(({ data }) => {
      setReportes(data)
    });
  },[])

  const crearMarkups = (reporte) => {
    return(
      <Marker position={reporte.coordenadas}>
      <Popup>
        <span className={`${reporte.tipo == "Asistencia" ? "bg-green-500": "bg-red-500" } text-white font-bold px-5 py-2 rounded-lg inline-block mb-2`}>{reporte.tipo}</span>
        <br />
        <b>{reporte.usuario.nombres} {reporte.usuario.apellidos}</b> <br /> {reporte.detalle}
        <br /><br />
        <span className="text-gray-500 font-light">Fecha: {formatDate(reporte.fecha)}</span>
      </Popup>
      </Marker>
    )
  }



  return (
    // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-100 font-[OpenSans] px-20 py-10">
    //   <Card className="font-[OpenSans] px-10 py-5">
    //     <div className="p-3.5 flex justify-between">
    //       <div>
    //         <h2 className="text-sm">Tienes balance de</h2>
    //         <h2 className="font-bold text-2xl">${Number(usuario.balance).toLocaleString()}</h2>
    //       </div>
    //       <div className="flex max-w-sm items-left">
    //         {/* <Input type="number" placeholder="Saldo" /> */}
    //         <Sheet onOpenChange={setOpen} open={open}>
    //           <SheetTrigger className="text-left">
    //             <Button type="submit">Recargar saldo</Button>
    //           </SheetTrigger>
    //           <SheetContent className="w-full">
    //             <ScrollArea>
    //               <SheetHeader>
    //                 <SheetTitle>Recargar saldo</SheetTitle>
    //                 <br></br>
    //                 <SheetDescription className={"font-[OpenSans] px-1"}>
    //                   <div className="grid w-full max-w-sm items-center gap-1.5">
    //                     <Label htmlFor="email">Monto a recargar</Label>
    //                     <NumericFormat
    //                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //                       value={monto}
    //                       onValueChange={(values) => {
    //                         console.log(values)
    //                         const { value } = values;
    //                         setMonto(value);
    //                       }}
    //                       thousandSeparator={true}
    //                       isNumericString={true}
    //                       prefix={'$'}
    //                       placeholder="Cantidad"
    //                     />
    //                   </div>

    //                   {/* <Select className="w-full font-[OpenSans]">
    //                     <SelectTrigger className="w-full text-left h-fit my-4">
    //                       <SelectValue placeholder="Metodo de pago" />
    //                     </SelectTrigger>
    //                     <SelectContent className="font-[OpenSans]">
    //                       <SelectGroup>
    //                         <SelectItem value="apple">
    //                           <div className=" transition-all cursor-pointer flex items-center space-x-4 p-4">
    //                             <img src={mastercard} className="w-10" />
    //                             <div className="flex-1 space-y-1">
    //                               <p className="text-sm font-bold leading-none">
    //                                 XXXX-XXXX-XXXX-3527
    //                               </p>
    //                               <p className="text-sm text-muted-foreground">
    //                                 Vencimiento 04/24
    //                               </p>
    //                             </div>
    //                           </div>
    //                         </SelectItem>
    //                         <SelectItem value="banana">
    //                           <div className="transition-all cursor-pointer flex items-center space-x-4 p-4">
    //                             <img src={paypal} className="w-10" />
    //                             <div className="flex-1 space-y-1">
    //                               <p className="text-sm font-bold leading-none">
    //                                 Edgar David Vilchez
    //                               </p>
    //                               <p className="text-sm text-muted-foreground">
    //                                 edgarrios412@gmail.com
    //                               </p>
    //                             </div>
    //                           </div>
    //                         </SelectItem>
    //                       </SelectGroup>
    //                     </SelectContent>
    //                   </Select> */}
    //                   <Button className="w-full mt-5" onClick={pagarAhora}>
    //                     <CreditCard className="mx-2 w-5" />
    //                     Pagar ahora
    //                   </Button>
    //                 </SheetDescription>
    //               </SheetHeader>
    //             </ScrollArea>
    //           </SheetContent>
    //         </Sheet>
    //       </div>
    //     </div>
    //     <p className="text-gray-400 p-3.5 text-sm">
    //       Evita que tus servicios sean suspendidos, mantén siempre tu cuenta con
    //       saldo positivo
    //     </p>
    //     {/* <div className="p-3.5">
    //       <h2 className="font-bold py-3">Metodos de pagos</h2>
    //       <div className="flex flex-col gap-4">
    //         <div className="hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4">
    //           <img src={mastercard} className="w-10" />
    //           <div className="flex-1 space-y-1">
    //             <p className="text-sm font-bold leading-none">
    //               XXXX-XXXX-XXXX-3527
    //             </p>
    //             <p className="text-sm text-muted-foreground">
    //               Vencimiento 04/24
    //             </p>
    //           </div>
    //           <Button className="bg-transparent text-black font-bold hover:bg-gray-300">
    //             Eliminar
    //           </Button>
    //         </div>
    //         <div className="hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4">
    //           <img src={paypal} className="w-10" />
    //           <div className="flex-1 space-y-1">
    //             <p className="text-sm font-bold leading-none">
    //               Edgar David Vilchez
    //             </p>
    //             <p className="text-sm text-muted-foreground">
    //               edgarrios412@gmail.com
    //             </p>
    //           </div>
    //           <Button className="bg-transparent text-black font-bold hover:bg-gray-300">
    //             Eliminar
    //           </Button>
    //         </div>
    //       </div>
    //     </div> */}
    //     <h2 className="font-bold p-3.5">Historial de pagos</h2>
    //     <Table>
    //       <TableCaption>Estos son tus ultimos pagos</TableCaption>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[100px]">Codigo</TableHead>
    //           <TableHead>Estado</TableHead>
    //           <TableHead>Metodo</TableHead>
    //           <TableHead className="text-right">Monto</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {usuario.historypays?.map((historial) => (
    //           <TableRow key={historial.id}>
    //             <TableCell className="font-medium">{historial.id}</TableCell>
    //             <TableCell>
    //               {historial.status ? (
    //                 <p className="bg-green-400 w-fit px-2 py-1 rounded-sm font-semibold text-green-900">
    //                   Pagado
    //                 </p>
    //               ) : (
    //                 <p className="bg-red-400 w-fit px-2 py-1 rounded-sm font-semibold text-red-900">
    //                   Rechazado
    //                 </p>
    //               )}
    //             </TableCell>
    //             <TableCell>{historial.paymentMethod}</TableCell>
    //             <TableCell className="text-right">
    //               {historial.status ? (
    //                 <p className="text-green-900">
    //                   ${Number(historial.amount).toLocaleString()}
    //                 </p>
    //               ) : (
    //                 <p className="text-gray-400">
    //                   ${Number(historial.amount).toLocaleString()}
    //                 </p>
    //               )}
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //       <TableFooter>
    //         <TableRow>
    //           <TableCell colSpan={3}>Total</TableCell>
    //           <TableCell className="text-right">
    //             $
    //             {usuario.historypays
    //               ?.reduce(
    //                 (acc, current) =>
    //                   current.status ? acc + Number(current.amount) : acc,
    //                 0
    //               )
    //               .toLocaleString()}
    //           </TableCell>
    //         </TableRow>
    //       </TableFooter>
    //     </Table>
    //   </Card>
    // </motion.div>
    <MapContainer center={position} zoom={17} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        {usuario.nombres} <br /> Mi ubicación
      </Popup>
    </Marker>
    {reportes.map(d => crearMarkups(d))}
  </MapContainer>
  );
};

export default Geolocalizacion;

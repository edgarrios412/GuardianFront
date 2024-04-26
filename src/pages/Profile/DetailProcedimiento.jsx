import {
  BellRing,
  Check,
  Send,
  FileQuestion,
  CalendarDays,
  TextSelect,
  X,
  Save,
} from "lucide-react";

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

const notifications = [
  {
    title: "Tu cita ha sido agendada con éxito",
    description: "Hace 1 hora",
  },
  {
    title: "Tienes un mensaje de Edgar!",
    description: "Hace 23 horas",
  },
  {
    title: "Tu suscripción expira pronto!",
    description: "Hace 1 mes",
  },
];

const DetailProcedimiento = ({ className, ...props }) => {
  const { usuario, updateUsuario } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState([]);
  const [responseTicket, setResponseTicket] = useState("");
  const [idSelected, setIdSelected] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [documento, setDocumento] = useState(usuario?.documento);
  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [certificacion, setCertificacion] = useState(usuario?.certificacion);
  const { toast } = useToast();

  const editUser = () => {
    console.log(image);
    if (image) {
      const form = new FormData();
      form.append("file", image);
      axios.post("/file/image/upload", form).then(({ data }) => {
        axios
          .put("/user", {
            id: usuario.id,
            documento,
            certificacion,
            image: data.split("/")[1],
          })
          .then(() => {
            updateUsuario();
            toast({
              title: "Datos actualizados",
              description: "Los datos han sido actualizados exitosamente",
            });
          });
      });
    } else {
      axios
        .put("/user", { id: usuario.id, documento, certificacion })
        .then(() => {
          updateUsuario();
          toast({
            title: "Datos actualizados",
            description: "Los datos han sido actualizados exitosamente",
          });
        });
    }
  };

  const createTicket = () => {
    if (message.length < 19)
      return toast({
        variant: "destructive",
        title: "El mensaje es muy corto",
        description:
          "Para crear un ticket, el mensaje debe tener al menos 20 caracteres",
      });
    axios
      .post("/user/ticket", {
        userId: usuario.id,
        message,
      })
      .then(({ data }) => {
        setMessage("");
        toast({
          duration: 3000,
          title: data.response,
          description:
            "En unas horas tu ticket será atendido por el equipo de soporte",
        });
        updateUsuario();
      });
  };

  const passReg = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const updatePassword = () => {
    if (newPassword !== newPassword2)
      return alert("Las contreñas no coinciden");
    if (!passReg.test(newPassword))
      return toast({
        variant: "destructive",
        title:
          "La contraseña debe tener al menos 8 caracteres, una mayúscula y una minúscula",
      });
    axios
      .put("/user/password", {
        userId: usuario.id,
        password: oldPassword,
        newpassword: newPassword,
      })
      .then(
        ({ data }) => {
          setNewPassword2("");
          setNewPassword("");
          setOldPassword("");
          toast({
            duration: 3000,
            title: data.response,
          });
        },
        (e) => {
          alert(e.response.data);
          toast({
            duration: 3000,
            title: e.response.data,
          });
        }
      );
  };

  const handleResponseTicket = () => {
    axios
      .put("/user/ticket/response", {
        id: idSelected,
        response: responseTicket,
      })
      .then(() => {
        toast({
          duration: 3000,
          title: "Ticket respondido exitosamente",
          description: "Se ha enviado una notificación al usuario",
        });
        setResponseTicket("");
        setIdSelected(null);
        getTickets();
      });
  };

  const getTickets = () => {
    axios.get("/user/ticket/listar").then(({ data }) => setTickets(data));
  };

  const readAllNotifications = () => {
    if (!usuario.notifications.filter((n) => !n.read).length)
      return toast({
        variant: "destructive",
        duration: 2000,
        title: "Ya todas tus notificaciones están leidas",
      });
    axios
      .put("/user/notificaciones/readAll", { userId: usuario.id })
      .then(({ data }) => {
        setTimeout(() => updateUsuario(), 1000);
        toast({
          duration: 3000,
          title: "Se han marcado todas tus notificaciones como leídas",
        });
      });
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-20 py-10"
    >
      <div className="flex gap-10">
        <Card className={cn("w-full h-fit", className)} {...props}>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Tienes 0 procedimientos pendientes
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="h-40">
              {false ? (
                <div className="h-36 text-center">
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
                    <TableHead>Nombres</TableHead>
                    <TableHead>Apellidos</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Ver</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={1}>
                      <TableCell className="font-bold">1</TableCell>
                      <TableCell>edgarrios412</TableCell>
                      <TableCell>EDGAR DAVID</TableCell>
                      <TableCell>VILCHEZ RIOS</TableCell>
                      <TableCell>edgarrios412@gmail.com</TableCell>
                      <TableCell><Button>Ver</Button></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={readAllNotifications}>
              <Check className="mr-2 h-4 w-4" /> Enviar a patología
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
};

export default DetailProcedimiento;

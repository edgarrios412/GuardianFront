import React, { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { motion } from "framer-motion";
import { UserContext } from "@/utils/context/User/UserContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { SelectLabel } from "@radix-ui/react-select";

export default ({ open, setOpen, setIsLogged }) => {
  return (
    <Dialog id={1} open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Solicitud</DialogTitle>
          <DialogDescription className={"font-[OpenSans] text-sm"}>
            Para realizar una solicitud llena el formulario que aparece a
            continuación
          </DialogDescription>
        </DialogHeader>
        <LoginForm setIsLogged={setIsLogged} />
      </DialogContent>
    </Dialog>
  );
};

function LoginForm({ className, setIsLogged }) {
  const [descripcion, setDescripcion] = useState("");
  const [tramite, setTramite] = useState()
  const [grupoGestion, setGrupoGestion] = useState()
  const [usuario, setUsuario] = useState(null)
  const [isLoader, setIsLoader] = useState(false);
  const usuarioLogeado = JSON.parse(localStorage.getItem("user"))
  const { toast } = useToast();
  const navigate = useNavigate();

  const createSolicitud = (e) => {
    e.preventDefault();
    setIsLoader(true);
    // return navigate("/panel")
    axios
      .post("/tramite", {
        descripcion,
        tramite,
        usuarioId:usuarioLogeado.id,
        grupoGestion
      })
      .then(
        ({ data }) => {
          console.log(data);
          toast({
            title: "Solicitud enviada con éxito",
          });
          setUsuario("")
          setDescripcion("")
          setTramite("")
          setIsLoader(false)
        },
        (e) => {
          toast({
            variant: "destructive",
            title: e.response.data,
          });
          // alert(e.response.data);
          setIsLoader(false);
        }
      );
  };

  return (
    <form
      onSubmit={createSolicitud}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Documento</Label>
        <Input
          className={"font-[OpenSans] text-sm"}
          onChange={(e) => setUsuario(e.target.value)}
          value={usuario}
          type="number"
          id="usuario"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Solicitud</Label>
        <Select onValueChange={(e) => setTramite(e)} value={tramite} className="w-full font-[OpenSans]">
          <SelectTrigger className="w-full text-left h-fit font-[OpenSans]">
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent className="font-[OpenSans]">
            <SelectGroup>
              <SelectItem value="1">Solicitud de alimentos</SelectItem>
              <SelectItem value="2">Solicitud de insumos</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Grupo dirigido</Label>
      <Select onValueChange={(e) => setGrupoGestion(e)} value={grupoGestion} className="w-full font-[OpenSans]">
          <SelectTrigger className="w-full text-left h-fit font-[OpenSans]">
            <SelectValue placeholder="Seleccionar grupo" />
          </SelectTrigger>
          <SelectContent className="font-[OpenSans]">
            <SelectGroup>
              <SelectItem value="100">ALMACEN</SelectItem>
              <SelectItem value="200">FINANCIERA</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Descripcion</Label>
        <Textarea
          className={"font-[OpenSans] text-sm"}
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
          type="text"
          id="usuario"
        />
      </div>
      {!isLoader ? (
        <Button type="submit">Enviar solicitud</Button>
      ) : (
        <Button type="button">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={1}
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Enviando solicitud
          </motion.span>
        </Button>
      )}
    </form>
  );
}

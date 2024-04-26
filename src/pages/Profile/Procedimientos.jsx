import {
  useInView,
  motion,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FlaskConical, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/utils/context/User/UserContext";

import { useToast } from "@/components/ui/use-toast";

const Procedimientos = () => {
  const [name, setName] = useState("");

  const { usuario, updateUsuario } = useContext(UserContext);
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-20 py-10"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="font-[OpenSans] px-5 py-5">
          <CardHeader>
            <CardTitle>Toma de muestras</CardTitle>
            <CardDescription>
              Rellena el formulario para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
            <div className="grid grid-cols-4 pt-3 gap-10 mt-2">
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Numero de lámina</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Número de factura</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Valor</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Fecha de toma</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="email">Entidad</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Regimen</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Fecha de registro</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
            </div>
            <h3 className="font-bold mb-2 mt-10">Datos personales</h3>
            <Separator />
            <div className="grid grid-cols-3 pt-3 gap-10 mt-2">
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Nombres</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Apellidos</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Tipo de documento</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Numero de documento</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Procedencia de documento</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Fecha de nacimiento</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Edad</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Solicitud de servicio</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Ocupacion</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Estado civil</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Sexo</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Telefono</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Direccion</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Procedencia del paciente</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Celular</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">EPS</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Estrato</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Nombre contacto</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Direccion contacto</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Telefono contacto</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Button onClick={() => alert("Guardar paciente")}>
                  <Save className="w-4 h-4 mr-2"/> Guardar paciente
                </Button>
              </div>
            </div>
            <h3 className="font-bold mb-2 mt-10">Antecedentes ginecológicos</h3>
            <Separator />
            <div className="grid grid-cols-3 pt-3 gap-10 mt-2">
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Ciclo menstrual</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">F.U.R</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">F.U.P</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Edad primer coito</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Numero de partos</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Numero de abortos</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Anticonceptivo actual</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Tiempo</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="email">Observaciones</Label>
                <Input
                  className={"font-[OpenSans] text-sm"}
                  type="text"
                  id="name"
                />
              </div>
            </div>
            <Button
              className="w-full mt-10"
              onClick={() => alert("Enviando toma de muestra")}
            >
              <FlaskConical className="w-4 h-4 mr-2" />
              Enviar toma de muestra
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Procedimientos;

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

import {
  Users,
  FolderOpen,
  Fingerprint,
  PenTool,
  Cctv,
  Cpu,
  ChevronLeft,
  Check,
} from "lucide-react";
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
import PlanCards from "@/components/ui/created/PlanCards";
import { UserContext } from "@/utils/context/User/UserContext";

// GRAFICAS

import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/utils/helpers/formatter";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Administracion = () => {
  const [serviceSelected, setServiceSelected] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grupoGestion, setGrupoGestion] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [rol, setRol] = useState()
  const [auditorias, setAuditorias] = useState([]);

  const { usuario, updateUsuario } = useContext(UserContext);
  const { toast } = useToast();

  const createByUser = () => {
    axios
      .post("/usuario", {
        nombres: name,
        apellidos: lastname,
        email,
        password,
        grupoId: grupoGestion,
        rol
      })
      .then(
        () =>
          toast({
            title: "Usuario creado exitosamente",
          }),
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  };

  useEffect(() => {
    axios.get("/usuario/all").then(({ data }) => {
      setUsuarios(data);
    });
    axios.get("/auditoria/all").then(({ data }) => {
      setAuditorias(data);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-20 py-10"
    >
      {!serviceSelected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle>Administración</CardTitle>
              <CardDescription>
                Administra el software con diferentes modulos que te facilitamos
                para que sea más interactivo el uso del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => setServiceSelected(1)}
                  className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                >
                  <Users />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">Usuarios</p>
                    <p className="text-sm text-muted-foreground">
                      Crea nuevos usuarios, edita usuarios existentes o sanciona
                      usuarios desde éste apartado
                    </p>
                  </div>
                  {/* <Button>Ver preguntas comunes</Button> */}
                </div>
                <div
                  onClick={() => setServiceSelected(2)}
                  className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                >
                  <FolderOpen />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">Auditoría</p>
                    <p className="text-sm text-muted-foreground">
                      Observa todos los movimientos realizados en la plataforma
                    </p>
                  </div>
                </div>
                {/* <Button>Ver preguntas comunes</Button> */}
              </div>
              {/* <p className="text-gray-400 text-sm">
            Evita que tus Administracion sean suspendidos, mantén siempre tu cuenta
            con saldo positivo
          </p> */}
            </CardContent>
            {/* <h2 className="font-bold p-3.5">Historial de pagos</h2> */}
          </Card>
        </motion.div>
      )}
      {serviceSelected == 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center">
                <ChevronLeft
                  className="mt-1 cursor-pointer"
                  onClick={() => setServiceSelected(null)}
                />{" "}
                Usuarios
              </CardTitle>
              <CardDescription>
                En éste apartado puede realizar todas las acciones relacionadas
                con usuarios del sistema, desde crear, editar y borrar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    {/* <TableHead>Usuario<W/TableHead> */}
                    <TableHead>Nombres</TableHead>
                    <TableHead>Apellidos</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Grupo</TableHead>
                    <TableHead>Rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-bold">{u.id}</TableCell>
                      {/* <TableCell>{u.usuario}</TableCell> */}
                      <TableCell>{u.nombres}</TableCell>
                      <TableCell>{u.apellidos}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.grupo.nombre}</TableCell>
                      <TableCell>
                        {u.rol == 1 && "Repartidor"}
                        {u.rol == 2 && "Proyector"}
                        {u.rol == 3 && "Revisor"}
                        {u.rol == 4 && "Firmante"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* <TableRow key={1}>
                      <TableCell className="font-bold">1</TableCell>
                      <TableCell>mb53114778</TableCell>
                      <TableCell>MAGDA LILIANA</TableCell>
                      <TableCell>BARBOSA MORALES</TableCell>
                      <TableCell>magda@gmail.com</TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell className="font-bold">2</TableCell>
                      <TableCell>ev29605603</TableCell>
                      <TableCell>EDGAR DAVID</TableCell>
                      <TableCell>VILCHEZ RIOS</TableCell>
                      <TableCell>edgarrios412@gmail.com</TableCell>
                    </TableRow>
                    <TableRow key={3}>
                      <TableCell className="font-bold">3</TableCell>
                      <TableCell>usuarioprueba</TableCell>
                      <TableCell>USUARIO</TableCell>
                      <TableCell>DE PRUEBA</TableCell>
                      <TableCell>prueba@gmail.com</TableCell>
                    </TableRow> */}
                </TableBody>
              </Table>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-6">Crear usuario</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ingresa los datos</DialogTitle>
                    <DialogDescription
                      className={"font-[OpenSans] text-sm mb-6"}
                    >
                      Ingresa los datos del usuario que deseas registrar en el
                      sistema
                    </DialogDescription>
                    <div className="flex flex-col pt-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Nombres</Label>
                        <Input
                          className={"font-[OpenSans] text-sm"}
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="text"
                          id="name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Apellidos</Label>
                        <Input
                          className={"font-[OpenSans] text-sm"}
                          type="text"
                          onChange={(e) => setLastname(e.target.value)}
                          value={lastname}
                          id="lastname"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          className={"font-[OpenSans] text-sm"}
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          id="email"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="username">Grupo de gestion</Label>
                        <Select
                          onValueChange={(e) => setGrupoGestion(e)}
                          value={grupoGestion}
                          className="w-full font-[OpenSans]"
                        >
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
                        <Label htmlFor="username">Rol</Label>
                        <Select
                          onValueChange={(e) => setRol(e)}
                          value={rol}
                          className="w-full font-[OpenSans]"
                        >
                          <SelectTrigger className="w-full text-left h-fit font-[OpenSans]">
                            <SelectValue placeholder="Seleccionar un rol" />
                          </SelectTrigger>
                          <SelectContent className="font-[OpenSans]">
                            <SelectGroup>
                              <SelectItem value="1">Repartidor</SelectItem>
                              <SelectItem value="2">Proyector</SelectItem>
                              <SelectItem value="3">Revisor</SelectItem>
                              <SelectItem value="4">Firmante</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Contraseña</Label>
                        <Input
                          className={"font-[OpenSans] text-sm"}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          id="password"
                        />
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={createByUser}>Crear usuario</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {serviceSelected == 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center">
                <ChevronLeft
                  className="mt-1 cursor-pointer"
                  onClick={() => setServiceSelected(null)}
                />{" "}
                Auditoría
              </CardTitle>
              <CardDescription>
                Observa los movimientos realizados por los usuarios dentro de la
                plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditorias.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-bold">{u.id}</TableCell>
                      <TableCell>{formatDate(u.fecha)}</TableCell>
                      <TableCell>{u.ip}</TableCell>
                      <TableCell>{u.accion}</TableCell>
                    </TableRow>
                  ))}
                  {/* <TableRow key={1}>
                      <TableCell className="font-bold">1</TableCell>
                      <TableCell>19/04/24 11:35</TableCell>
                      <TableCell>MAGDA LILIANA BARBOSA MORALES</TableCell>
                      <TableCell>Se registró en la plataforma</TableCell>
                    </TableRow>
                    <TableRow key={2}>
                      <TableCell className="font-bold">2</TableCell>
                      <TableCell>19/04/24 11:39</TableCell>
                      <TableCell>EDGAR DAVID VILCHEZ RIOS</TableCell>
                      <TableCell>Se registró en la plataforma</TableCell>
                    </TableRow>
                    <TableRow key={3}>
                      <TableCell className="font-bold">3</TableCell>
                      <TableCell>19/04/24 12:15</TableCell>
                      <TableCell>USUARIO DE PRUEBA</TableCell>
                      <TableCell>Se registró en la plataforma</TableCell>
                    </TableRow> */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Administracion;

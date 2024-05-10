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
  FileText,
  MessageCircleWarning,
  Cctv,
  Cpu,
  ChevronLeft,
  Check,
  LineChart,
  BookUser,
  TextSelect,
  NotebookText,
  FileStack,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FromNumberToNumber from "@/utils/helpers/FromNumberToNumber.jsx";

const Administracion = () => {
  const [serviceSelected, setServiceSelected] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grupoGestion, setGrupoGestion] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [rol, setRol] = useState();
  const [auditorias, setAuditorias] = useState([]);
  const [tramites, setTramites] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const { usuario, updateUsuario } = useContext(UserContext);
  const [reportes, setReportes] = useState([]);
  const { toast } = useToast();
  const [id, setId] = useState();
  const [listaTramites, setListaTramites] = useState([])
  const [plantillas, setPlantillas] = useState([])
  const [file, setFile] = useState()

  const createByUser = () => {
    axios
      .post("/usuario", {
        nombres: name,
        apellidos: lastname,
        email,
        password,
        grupoId: grupoGestion,
        rol,
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
    axios.get("/tramite/all").then(({ data }) => setTramites(data));
    axios.get("/tramite/listaTramites/listar").then(({ data }) => setListaTramites(data));
    axios.get("/grupo").then(({ data }) => setGrupos(data));
    axios.get("/reporte/all").then(({ data }) => setReportes(data));
    axios.get("/plantilla").then(({ data }) => setPlantillas(data));
  }, []);

  const setearValores = (usuario) => {
    setName(usuario.nombres);
    setLastname(usuario.apellidos);
    setEmail(usuario.email);
    setPassword(usuario.password);
    setGrupoGestion(usuario.grupoId);
    setRol(usuario.rol);
  };

  const updateUser = (id) => {
    axios
      .put("/usuario/" + id, {
        nombres: name,
        apellidos: lastname,
        email,
        password,
        grupoId: grupoGestion,
        rol,
      })
      .then(
        () => {
          toast({
            title: "Usuario editado exitosamente",
          });
          axios.get("/usuario/all").then(({ data }) => {
            setUsuarios(data);
          });
        },
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  };

  const banUser = (id, status) => {
    axios
      .put("/usuario/" + id, {
        ban: !status,
      })
      .then(
        () => {
          if (status) {
            toast({
              title: "Usuario desbloqueado exitosamente",
            });
          } else {
            toast({
              title: "Usuario restringido exitosamente",
            });
          }
          axios.get("/usuario/all").then(({ data }) => {
            setUsuarios(data);
          });
        },
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  };

  const crearGrupo = () => {
    axios
      .post("/grupo", {
        nombre: name,
        id: id,
      })
      .then(
        () => {
          axios.get("/grupo").then(({ data }) => setGrupos(data));
          toast({
            title: "Grupo creado exitosamente",
          });
        },
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  };

  const editarGrupo = () => {
    axios
      .put("/grupo/" + id, {
        nombre: name,
      })
      .then(
        () => {
          toast({
            title: "Grupo editado exitosamente",
          });
          axios.get("/grupo").then(({ data }) => setGrupos(data));
        },
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  };

  const editarTramite = () => {
    axios
      .put("/tramite/listaTramite/editar/" + id, {
        nombre: name,
      })
      .then(
        () => {
          toast({
            title: "Tramite editado exitosamente",
          });
          axios.get("/tramite/listaTramites/listar").then(({ data }) => setListaTramites(data));
        },
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  };

  const crearTramite = () => {
    axios
      .post("/tramite/listaTramite/crear", {
        nombre: name,
      })
      .then(
        () => {
          axios.get("/tramite/listaTramites/listar").then(({ data }) => setListaTramites(data));
          toast({
            title: "Tramite creado exitosamente",
          });
        },
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  };

  const uploadFile = async () => {
    const form = new FormData();
    form.append("file", file);
    const {data} = await axios.post("/documentos/null", form)
    return data
  };

  const crearPlantilla = async () => {
    const plantilla = await uploadFile()
    axios
      .post("/plantilla", {
        nombre: name,
        path:plantilla.path
      })
      .then(
        () => {
          axios.get("/plantilla").then(({ data }) => setPlantillas(data));
          toast({
            title: "Plantilla creado exitosamente",
          });
        },
        (e) =>
          toast({
            variant: "destructive",
            title: "Ha ocurrido un error",
            description: e.response.data,
          })
      );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-2 lg:px-20 py-2 lg:py-10"
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
                <div
                  onClick={() => setServiceSelected(3)}
                  className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                >
                  <LineChart />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">
                      Estadisticas
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mira en tiempo real las estadisticas con gráficas
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setServiceSelected(4)}
                  className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                >
                  <FileText />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">Tramites</p>
                    <p className="text-sm text-muted-foreground">
                      Obten información sobre los trámites dentro de la
                      plataforma
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setServiceSelected(5)}
                  className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                >
                  <BookUser />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">Grupos</p>
                    <p className="text-sm text-muted-foreground">
                      Administra los grupos de la plataforma desde éste apartado
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setServiceSelected(6)}
                  className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                >
                  <NotebookText />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">Administrar tramites</p>
                    <p className="text-sm text-muted-foreground">
                      Agrega, edita y borra trámites del sistema
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setServiceSelected(7)}
                  className="hover:border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4"
                >
                  <FileStack />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold leading-none">Plantillas</p>
                    <p className="text-sm text-muted-foreground">
                      Agrega, edita y borra plantillas del sistema
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
                    <TableHead>Acciones</TableHead>
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
                        {u.rol == 5 && "Notificador"}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger>
                            <Button onClick={() => setearValores(u)}>
                              Editar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Ingresa los datos</DialogTitle>
                              <DialogDescription
                                className={"font-[OpenSans] text-sm mb-6"}
                              >
                                Ingresa los datos del usuario que deseas
                                registrar en el sistema
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
                                    onChange={(e) =>
                                      setLastname(e.target.value)
                                    }
                                    value={lastname}
                                    id="lastname"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="email">
                                    Correo electrónico
                                  </Label>
                                  <Input
                                    className={"font-[OpenSans] text-sm"}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    id="email"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="username">
                                    Grupo de gestion
                                  </Label>
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
                                        {grupos.map((g) => (
                                          <SelectItem value={g.id}>
                                            {g.nombre}
                                          </SelectItem>
                                        ))}
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
                                        <SelectItem value={1}>
                                          Repartidor
                                        </SelectItem>
                                        <SelectItem value={2}>
                                          Proyector
                                        </SelectItem>
                                        <SelectItem value={3}>
                                          Revisor
                                        </SelectItem>
                                        <SelectItem value={4}>
                                          Firmante
                                        </SelectItem>
                                        <SelectItem value={5}>
                                          Notificador
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="email">Contraseña</Label>
                                  <Input
                                    className={"font-[OpenSans] text-sm"}
                                    type="password"
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    value={password}
                                    id="password"
                                  />
                                </div>
                              </div>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                className={`${u.ban
                                    ? "bg-green-600 hover:bg-green-800"
                                    : "bg-red-600 hover:bg-red-800"
                                  }`}
                                onClick={() => banUser(u.id, u.ban)}
                              >
                                {u.ban
                                  ? "Habilitar acceso"
                                  : "Restringir acceso"}
                              </Button>
                              <Button onClick={() => updateUser(u.id)}>
                                Editar usuario
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
                              {grupos.map((g) => (
                                <SelectItem value={g.id}>{g.nombre}</SelectItem>
                              ))}
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
                              <SelectItem value="5">Notificador</SelectItem>
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
      {serviceSelected == 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center">
                <ChevronLeft
                  className="mt-1 cursor-pointer"
                  onClick={() => setServiceSelected(null)}
                />{" "}
                Estadisticas
              </CardTitle>
              <CardDescription>
                Observa los movimientos realizados por los usuarios dentro de la
                plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-10">
                <Card className="col-span-5 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
                  <CardHeader>
                    <FileText className="min-w-7 min-h-7" />
                  </CardHeader>
                  <CardContent className="items-center -mt-4 gap-3">
                    <FromNumberToNumber
                      className={"text-center font-bold text-2xl"}
                      from={0}
                      to={tramites?.length}
                    />
                    <CardTitle className="text-lg">Tramites</CardTitle>
                  </CardContent>
                </Card>
                <Card className="col-span-5 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
                  <CardHeader>
                    <Users className="min-w-7 min-h-7" />
                  </CardHeader>
                  <CardContent className="items-center -mt-4 gap-3">
                    <FromNumberToNumber
                      className={"text-center font-bold text-2xl"}
                      from={0}
                      to={usuarios?.length}
                    />
                    <CardTitle className="text-lg">Usuarios</CardTitle>
                  </CardContent>
                </Card>
                <Card className="col-span-5 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
                  <CardHeader>
                    <FolderOpen className="min-w-7 min-h-7" />
                  </CardHeader>
                  <CardContent className="items-center -mt-4 gap-3">
                    <FromNumberToNumber
                      className={"text-center font-bold text-2xl"}
                      from={0}
                      to={auditorias?.length}
                    />
                    <CardTitle className="text-lg">Auditoria</CardTitle>
                  </CardContent>
                </Card>
                <Card className="col-span-5 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
                  <CardHeader>
                    <MessageCircleWarning className="min-w-7 min-h-7" />
                  </CardHeader>
                  <CardContent className="items-center -mt-4 gap-3">
                    <FromNumberToNumber
                      className={"text-center font-bold text-2xl"}
                      from={0}
                      to={reportes?.length}
                    />
                    <CardTitle className="text-lg">Reportes</CardTitle>
                  </CardContent>
                </Card>
                <Card className="col-span-5 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
                  <CardHeader>
                    <MessageCircleWarning className="min-w-7 min-h-7" />
                  </CardHeader>
                  <CardContent className="items-center -mt-4 gap-3">
                    <FromNumberToNumber
                      className={"text-center font-bold text-2xl"}
                      from={0}
                      to={2}
                    />
                    <CardTitle className="text-lg">Grupos</CardTitle>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {serviceSelected == 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center">
                <ChevronLeft
                  className="mt-1 cursor-pointer"
                  onClick={() => setServiceSelected(null)}
                />{" "}
                Tramites
              </CardTitle>
              <CardDescription>
                Obten información sobre los trámites dentro de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                        {/* <TableHead>Ver</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tramites
                        .sort((a, b) => a.id - b.id)
                        .map((t) => (
                          <TableRow key={t.id}>
                            <TableCell className="font-bold">{t.id}</TableCell>
                            <TableCell>
                              {t.usuario.nombres} {t.usuario.apellidos}
                            </TableCell>
                            <TableCell>
                              {t.listatramite.nombre}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`rounded-lg ${t.estado >= 6 ? "bg-green-600" : "bg-blue-600"
                                  } text-white px-2 py-1`}
                              >
                                {t.estado == 1 && "Nuevo"}
                                {t.estado == 2 && "Repartido"}
                                {t.estado == 3 && "Proyectado"}
                                {t.estado == 4 && "Revisado"}
                                {t.estado == 5 && "Firmado"}
                                {t.estado == 6 && "Notificado"}
                              </span>
                            </TableCell>
                            <TableCell>{t.descripcion}</TableCell>
                            {/* <TableCell>
                            <Button onClick={() => setProcedimiento(t)}>
                              Ver
                            </Button>
                          </TableCell> */}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {serviceSelected == 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center">
                <ChevronLeft
                  className="mt-1 cursor-pointer"
                  onClick={() => setServiceSelected(null)}
                />{" "}
                Grupos
              </CardTitle>
              <CardDescription>
                Administra los grupos de la plataforma desde éste apartado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {!grupos?.length ? (
                  <div className="h-40 text-center">
                    <TextSelect className="m-auto text-gray-300 h-14 w-14 my-4" />
                    <h1 className="text-muted-foreground text-sm">
                      No hay grupos registrados
                    </h1>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Miembros</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grupos
                        .sort((a, b) => a.id - b.id)
                        .map((t) => (
                          <TableRow key={t.id}>
                            <TableCell className="font-bold">{t.id}</TableCell>
                            <TableCell>{t.nombre}</TableCell>
                            <TableCell>{t.usuarios.length}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger>
                                  <Button onClick={() => { setName(t.nombre); setId(t.id) }}>Editar</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Editar grupo</DialogTitle>
                                    <DialogDescription
                                      className={"font-[OpenSans] text-sm mb-6"}
                                    >
                                      Cambia los datos que necesites para editar el grupo
                                    </DialogDescription>
                                    <div className="flex flex-col pt-3 gap-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="email">Nombre</Label>
                                        <Input
                                          placeholder="Escribe el nuevo nombre del grupo"
                                          className={"font-[OpenSans] text-sm"}
                                          type="text"
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          value={name}
                                          id="name"
                                        />
                                      </div>
                                    </div>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button onClick={editarGrupo}>
                                      Guardar
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className="mt-5">Crear grupo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ingresa los datos</DialogTitle>
                    <DialogDescription
                      className={"font-[OpenSans] text-sm mb-6"}
                    >
                      Ingresa los datos del grupo que deseas crear en el sistema
                    </DialogDescription>
                    <div className="flex flex-col pt-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">ID</Label>
                        <Input
                          placeholder="Escribe el ID del grupo"
                          className={"font-[OpenSans] text-sm"}
                          onChange={(e) => setId(e.target.value)}
                          value={id}
                          type="number"
                          id="name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Nombre</Label>
                        <Input
                          placeholder="Escribe el nombre del grupo"
                          className={"font-[OpenSans] text-sm"}
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          id="lastname"
                        />
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={crearGrupo}>Crear grupo</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {serviceSelected == 6 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center">
                <ChevronLeft
                  className="mt-1 cursor-pointer"
                  onClick={() => setServiceSelected(null)}
                />{" "}
                Administrar tramites
              </CardTitle>
              <CardDescription>
                Agrega, edita y borra trámites del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {!listaTramites?.length ? (
                  <div className="h-40 text-center">
                    <TextSelect className="m-auto text-gray-300 h-14 w-14 my-4" />
                    <h1 className="text-muted-foreground text-sm">
                      No hay tramites registrados
                    </h1>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {listaTramites
                        .sort((a, b) => a.id - b.id)
                        .map((t) => (
                          <TableRow key={t.id}>
                            <TableCell className="font-bold">{t.id}</TableCell>
                            <TableCell>{t.nombre}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger>
                                  <Button onClick={() => { setName(t.nombre); setId(t.id) }}>Editar</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Editar tramite</DialogTitle>
                                    <DialogDescription
                                      className={"font-[OpenSans] text-sm mb-6"}
                                    >
                                      Cambia los datos que necesites para editar el tramite
                                    </DialogDescription>
                                    <div className="flex flex-col pt-3 gap-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="email">Nombre</Label>
                                        <Input
                                          placeholder="Escribe el nuevo nombre del grupo"
                                          className={"font-[OpenSans] text-sm"}
                                          type="text"
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          value={name}
                                          id="name"
                                        />
                                      </div>
                                    </div>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button onClick={editarTramite}>
                                      Guardar
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className="mt-5">Crear tramite</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ingresa los datos</DialogTitle>
                    <DialogDescription
                      className={"font-[OpenSans] text-sm mb-6"}
                    >
                      Ingresa los datos del tramite que deseas crear en el sistema
                    </DialogDescription>
                    <div className="flex flex-col pt-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Nombre</Label>
                        <Input
                          placeholder="Escribe el nombre del grupo"
                          className={"font-[OpenSans] text-sm"}
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          id="lastname"
                        />
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={crearTramite}>Crear tramite</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {serviceSelected == 7 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="font-[OpenSans] px-5 py-5">
            <CardHeader>
              <CardTitle className="flex gap-4 items-center">
                <ChevronLeft
                  className="mt-1 cursor-pointer"
                  onClick={() => setServiceSelected(null)}
                />{" "}
                Plantillas
              </CardTitle>
              <CardDescription>
                Agrega, edita y borra plantillas del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {!plantillas?.length ? (
                  <div className="h-40 text-center">
                    <TextSelect className="m-auto text-gray-300 h-14 w-14 my-4" />
                    <h1 className="text-muted-foreground text-sm">
                      No hay tramites registrados
                    </h1>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plantillas
                        .sort((a, b) => a.id - b.id)
                        .map((t) => (
                          <TableRow key={t.id}>
                            <TableCell className="font-bold">{t.id}</TableCell>
                            <TableCell>{t.nombre}</TableCell>
                            <TableCell>
                              <a href={"https://guardianbackend.onrender.com/" + t.path}>
                                <Button>Descargar</Button>
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className="mt-5">Nueva plantilla</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ingresa los datos</DialogTitle>
                    <DialogDescription
                      className={"font-[OpenSans] text-sm mb-6"}
                    >
                      Ingresa los datos del tramite que deseas crear en el sistema
                    </DialogDescription>
                    <div className="flex flex-col pt-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Nombre</Label>
                        <Input
                          placeholder="Escribe el nombre del grupo"
                          className={"font-[OpenSans] text-sm"}
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          id="lastname"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col pt-3 gap-4">
                      <div className="grid gap-2">
                      <Label htmlFor="email">Plantilla</Label>
                        <Input type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        ></Input>
                      </div>
                    </div>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={crearPlantilla}>Crear plantilla</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Administracion;

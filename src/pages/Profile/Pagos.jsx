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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Pago",
    totalAmount: "$250.000.00",
    paymentMethod: "Tarjeta de crédito",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pendiente",
    totalAmount: "$150.000.00",
    paymentMethod: "Nequi",
  },
  {
    invoice: "INV003",
    paymentStatus: "No pagado",
    totalAmount: "$350.000.00",
    paymentMethod: "PSE",
  },
  {
    invoice: "INV004",
    paymentStatus: "Pago",
    totalAmount: "$45.000.00",
    paymentMethod: "Tarjeta de crédito",
  },
  {
    invoice: "INV005",
    paymentStatus: "Pago",
    totalAmount: "$550.000.00",
    paymentMethod: "Nequi",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pendiente",
    totalAmount: "$200.000.00",
    paymentMethod: "PSE",
  },
  {
    invoice: "INV007",
    paymentStatus: "No pagado",
    totalAmount: "$300.000.00",
    paymentMethod: "Tarjeta de crédito",
  },
];

const Pagos = () => {
  const { usuario, updateUsuario } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [monto, setMonto] = useState(0);

  useEffect(() => {
    console.log(usuario.historypays);
  }, [usuario]);

  const pagarAhora = () => {
    const reference = new Date().getTime().toString();
    console.log(reference)
    setOpen(false);
    var checkout = new WidgetCheckout({
      currency: "COP",
      amountInCents: monto + "00",
      reference: reference,
      publicKey: "pub_test_w28dxS2v9clmkb8UbFrlkw3GxBUx3bsq",
      redirectUrl: 'http://localhost:5173/perfil'
    });
    console.log(checkout)
    checkout.open(function (result) {
      var transaction = result.transaction;
      console.log(result)
      if (transaction.status == "APPROVED") {
        axios
          .post("/user/historial", {
            paymentMethod: transaction.paymentMethodType,
            amount: transaction.amountInCents / 100,
            status: true,
            userId: usuario.id,
          })
          .then(() => updateUsuario());
      } else {
        axios
          .post("/user/historial", {
            paymentMethod: transaction.paymentMethodType,
            amount: transaction.amountInCents / 100,
            status: false,
            userId: usuario.id,
          })
          .then(() => updateUsuario());
      }
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-100 font-[OpenSans] px-20 py-10">
      <Card className="font-[OpenSans] px-10 py-5">
        <div className="p-3.5 flex justify-between">
          <div>
            <h2 className="text-sm">Tienes balance de</h2>
            <h2 className="font-bold text-2xl">${Number(usuario.balance).toLocaleString()}</h2>
          </div>
          <div className="flex max-w-sm items-left">
            {/* <Input type="number" placeholder="Saldo" /> */}
            <Sheet onOpenChange={setOpen} open={open}>
              <SheetTrigger className="text-left">
                <Button type="submit">Recargar saldo</Button>
              </SheetTrigger>
              <SheetContent className="w-full">
                <ScrollArea>
                  <SheetHeader>
                    <SheetTitle>Recargar saldo</SheetTitle>
                    <br></br>
                    <SheetDescription className={"font-[OpenSans] px-1"}>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Monto a recargar</Label>
                        <NumericFormat
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={monto}
                          onValueChange={(values) => {
                            console.log(values)
                            const { value } = values;
                            setMonto(value);
                          }}
                          thousandSeparator={true}
                          isNumericString={true}
                          prefix={'$'}
                          placeholder="Cantidad"
                        />
                      </div>

                      {/* <Select className="w-full font-[OpenSans]">
                        <SelectTrigger className="w-full text-left h-fit my-4">
                          <SelectValue placeholder="Metodo de pago" />
                        </SelectTrigger>
                        <SelectContent className="font-[OpenSans]">
                          <SelectGroup>
                            <SelectItem value="apple">
                              <div className=" transition-all cursor-pointer flex items-center space-x-4 p-4">
                                <img src={mastercard} className="w-10" />
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-bold leading-none">
                                    XXXX-XXXX-XXXX-3527
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Vencimiento 04/24
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="banana">
                              <div className="transition-all cursor-pointer flex items-center space-x-4 p-4">
                                <img src={paypal} className="w-10" />
                                <div className="flex-1 space-y-1">
                                  <p className="text-sm font-bold leading-none">
                                    Edgar David Vilchez
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    edgarrios412@gmail.com
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select> */}
                      <Button className="w-full mt-5" onClick={pagarAhora}>
                        <CreditCard className="mx-2 w-5" />
                        Pagar ahora
                      </Button>
                    </SheetDescription>
                  </SheetHeader>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <p className="text-gray-400 p-3.5 text-sm">
          Evita que tus servicios sean suspendidos, mantén siempre tu cuenta con
          saldo positivo
        </p>
        {/* <div className="p-3.5">
          <h2 className="font-bold py-3">Metodos de pagos</h2>
          <div className="flex flex-col gap-4">
            <div className="hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4">
              <img src={mastercard} className="w-10" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold leading-none">
                  XXXX-XXXX-XXXX-3527
                </p>
                <p className="text-sm text-muted-foreground">
                  Vencimiento 04/24
                </p>
              </div>
              <Button className="bg-transparent text-black font-bold hover:bg-gray-300">
                Eliminar
              </Button>
            </div>
            <div className="hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer flex items-center space-x-4 rounded-md border p-4">
              <img src={paypal} className="w-10" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold leading-none">
                  Edgar David Vilchez
                </p>
                <p className="text-sm text-muted-foreground">
                  edgarrios412@gmail.com
                </p>
              </div>
              <Button className="bg-transparent text-black font-bold hover:bg-gray-300">
                Eliminar
              </Button>
            </div>
          </div>
        </div> */}
        <h2 className="font-bold p-3.5">Historial de pagos</h2>
        <Table>
          <TableCaption>Estos son tus ultimos pagos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Codigo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Metodo</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuario.historypays?.map((historial) => (
              <TableRow key={historial.id}>
                <TableCell className="font-medium">{historial.id}</TableCell>
                <TableCell>
                  {historial.status ? (
                    <p className="bg-green-400 w-fit px-2 py-1 rounded-sm font-semibold text-green-900">
                      Pagado
                    </p>
                  ) : (
                    <p className="bg-red-400 w-fit px-2 py-1 rounded-sm font-semibold text-red-900">
                      Rechazado
                    </p>
                  )}
                </TableCell>
                <TableCell>{historial.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {historial.status ? (
                    <p className="text-green-900">
                      ${Number(historial.amount).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-gray-400">
                      ${Number(historial.amount).toLocaleString()}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                $
                {usuario.historypays
                  ?.reduce(
                    (acc, current) =>
                      current.status ? acc + Number(current.amount) : acc,
                    0
                  )
                  .toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </motion.div>
  );
};

export default Pagos;

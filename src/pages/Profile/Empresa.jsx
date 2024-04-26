import {
  useInView,
  motion,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/utils/context/User/UserContext";
import { formatDate } from "@/utils/helpers/formatter";
import axios from "axios"

const Empresa = () => {
  const { usuario } = useContext(UserContext);
  const [company, setCompany] = useState({})
  const [owner, setOwner] = useState({})

  useEffect(() => {
    axios.get("/company/"+usuario?.micompany?.id)
    .then(({data}) => {
        setCompany(data)
        axios.get("/user/"+data.owner).then(({data}) => setOwner(data))
    })
  },[])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-100 font-[OpenSans] px-20 py-10"
    >
      <Card className="p-10 font-[OpenSans]">
        <div className="flex gap-6 items-center">
          <img className="h-12" src={`https://back-teldip.onrender.com/uploads/${company?.logo}`}/>
          <div>
            <h2 className="font-semibold text-2xl">{company?.nombre}</h2>
            <p className="text-sm text-gray-400">
              Registrada en {formatDate(company?.createdDate)}
            </p>
          </div>
        </div>
        {/* <h2 className="mt-8 mb-2 font-bold text-lg">Registrada por</h2>
        <Card className="w-fit h-fit p-4">
            <div className="flex gap-3">
                <img className="w-16 h-16 rounded-full" src={owner?.image ? `https://back-teldip.onrender.com/uploads/${owner?.image}`: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}/>
                <div>
                <h2 className="font-bold">{owner?.name} {owner?.lastname}</h2>
                <h2 className="text-gray-500 text-sm">{owner?.email}</h2>
                <h2 className="text-gray-500 text-sm">{owner?.phone}</h2>
                </div>
            </div>
        </Card> */}
        <h2 className="mt-8 mb-2 font-bold text-lg">Miembros registrados</h2>
        <div className="grid grid-cols-2 gap-5">
        {company?.users?.map(u => <a target="_blank" href={"https://teldip.com/qr/"+u.serial}><Card className="w-fit h-fit min-w-80 p-4">
            <div className="flex gap-3">
                <img className="w-16 h-16 rounded-full" src={u.image ? `https://back-teldip.onrender.com/uploads/${u.image}`: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}/>
                <div>
                <h2 className="font-bold">{u.name} {u.lastname}</h2>
                <h2 className="text-gray-500 text-sm">{u.email}</h2>
                <h2 className="text-gray-500 text-sm">{u.phone}</h2>
                </div>
            </div>
        </Card></a>)}
        </div>
      </Card>
    </motion.div>
  );
};

export default Empresa;

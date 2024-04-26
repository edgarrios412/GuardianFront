import { useInView, motion, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const Documentacion = () => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-gray-100 font-[OpenSans] px-20 py-10">
      <Card className="p-10 font-[OpenSans]">
        <h2 className="font-semibold text-xl">API de firma digital</h2>
        <p className="text-sm text-gray-400">
          Firma documentos a través de peticiones HTTPS
        </p>
        <br></br>
        {/* GET */}
        <Accordion type="multiple" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <div>
                <span className="bg-blue-300 text-blue-900 font-bold px-2 py-1 rounded-md text-sm">
                  GET
                </span>
                <span className="font-bold px-2 py-1 rounded-md text-sm">
                  /traer/documento/{`{documentId}`}
                </span>
                <span className="text-gray-600 px-2 py-1 rounded-md text-sm">
                  Obtiene un documento por el ID
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="mt-2 w-[340px] rounded-md bg-slate-800 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify({ x: 600, y: 200, pagina: 1 }, null, 2)}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              <div className="mt-10">
                <span className="bg-green-300 text-green-900 font-bold px-2 py-1 rounded-md text-sm">
                  POST
                </span>
                <span className="font-bold px-2 py-1 rounded-md text-sm">
                  /firmar/documento
                </span>
                <span className="text-gray-600 px-2 py-1 rounded-md text-sm">
                  Firma un documento en Base64
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="mt-2 w-[full] rounded-md bg-slate-800 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify({ x: 600, y: 200, pagina: 1 }, null, 2)}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              <div className="mt-10">
                <span className="bg-orange-300 text-orange-900 font-bold px-2 py-1 rounded-md text-sm">
                  PUT
                </span>
                <span className="font-bold px-2 py-1 rounded-md text-sm">
                  /editar/documento/{`{documentId}`}
                </span>
                <span className="text-gray-600 px-2 py-1 rounded-md text-sm">
                  Edita un documento por el ID
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="mt-2 w-[340px] rounded-md bg-slate-800 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify({ x: 600, y: 200, pagina: 1 }, null, 2)}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2 className="font-semibold text-xl">API de certificado digital</h2>
        <p className="text-sm text-gray-400">
          Firma documentos a través de peticiones HTTPS
        </p>
        <br></br>
        {/* GET */}
        <Accordion type="multiple" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <div>
                <span className="bg-blue-300 text-blue-900 font-bold px-2 py-1 rounded-md text-sm">
                  GET
                </span>
                <span className="font-bold px-2 py-1 rounded-md text-sm">
                  /traer/documento/{`{documentId}`}
                </span>
                <span className="text-gray-600 px-2 py-1 rounded-md text-sm">
                  Obtiene un documento por el ID
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="mt-2 w-[340px] rounded-md bg-slate-800 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify({ x: 600, y: 200, pagina: 1 }, null, 2)}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              <div className="mt-10">
                <span className="bg-green-300 text-green-900 font-bold px-2 py-1 rounded-md text-sm">
                  POST
                </span>
                <span className="font-bold px-2 py-1 rounded-md text-sm">
                  /firmar/documento
                </span>
                <span className="text-gray-600 px-2 py-1 rounded-md text-sm">
                  Firma un documento en Base64
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="mt-2 w-[full] rounded-md bg-slate-800 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify({ x: 600, y: 200, pagina: 1 }, null, 2)}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              <div className="mt-10">
                <span className="bg-orange-300 text-orange-900 font-bold px-2 py-1 rounded-md text-sm">
                  PUT
                </span>
                <span className="font-bold px-2 py-1 rounded-md text-sm">
                  /editar/documento/{`{documentId}`}
                </span>
                <span className="text-gray-600 px-2 py-1 rounded-md text-sm">
                  Edita un documento por el ID
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <pre className="mt-2 w-[340px] rounded-md bg-slate-800 p-4">
                <code className="text-white text-xs">
                  {JSON.stringify({ x: 600, y: 200, pagina: 1 }, null, 2)}
                </code>
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </motion.div>
  );
};

export default Documentacion;

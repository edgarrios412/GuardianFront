import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import document from "/Teldip.pdf";
import axios from "axios";
// Core viewer
import { LocalizationMap, Viewer, Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import es_ES from '@react-pdf-viewer/locales/lib/es_ES.json';
import ModalFirma from "./ModalFirma";
// Create new plugin instance

const PdfViewer = ({ rutaDocumento, firmar = false }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [documento, setDocumento] = useState(rutaDocumento);
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    if(data){
      console.log(data)
      setDocumento(null)
      firmarDocumento(data)
    }
  },[data])

  const firmarDocumento = (data) => {
    axios.post("/tramite/firmarDocumento",{
      x: data.coorX,
      y: data.coorY,
      pagina: data.pagina,
      file: rutaDocumento
    }).then(({data}) => setDocumento(data))
  }

  return (
    <div>

      {documento && <div
        style={{
          height: "80vh",
          display: "flex",
          margin:"auto",
          justifyContent: "center",
        }}
        className="lg:w-[45vw] w-full"
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            localization={es_ES}
            fileUrl={"https://guardianbackend.onrender.com/"+documento}
            plugins={[
              // Register plugins
              defaultLayoutPluginInstance,
            ]}
          />
        </Worker>
      </div>}
          {firmar && <ModalFirma
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                // submit={(e) => {
                //     onSubmit(e);
                //     setIsOpen(false);
                // }}
                setData={setData}
                id={0}
                rutaArchivo={documento}
      />}
    </div>
  );
};

export default PdfViewer;
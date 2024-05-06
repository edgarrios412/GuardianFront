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

const PdfViewer = ({ rutaDocumento }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [documento, setDocumento] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>

      {rutaDocumento && <div
        style={{
          width: "45vw",
          height: "80vh",
          display: "flex",
          margin:"auto",
          justifyContent: "center",
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            localization={es_ES}
            fileUrl={"http://localhost:3001/"+rutaDocumento}
            plugins={[
              // Register plugins
              defaultLayoutPluginInstance,
            ]}
          />
        </Worker>
      </div>}
          {/* <ModalFirma
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                // submit={(e) => {
                //     onSubmit(e);
                //     setIsOpen(false);
                // }}
                // setData={setData}
                id={0}
                rutaArchivo={rutaDocumento}
      /> */}
    </div>
  );
};

export default PdfViewer;
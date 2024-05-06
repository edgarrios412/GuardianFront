import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Example from './Dnd/example';
import { Button } from '../ui/button';

// import './App.css'; // Asegúrate de importar o ajustar tu hoja de estilos según sea necesario



pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const Perfil = ({setCoord, setPage, submit, rutaArchivo}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState()
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
      axios.get("http://localhost:3001/"+rutaArchivo, {responseType: 'arraybuffer'}).then(({data}) => {
        setFile(new File([data], "prueba.pdf", {type: 'application/pdf'}))
      })
  },[])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    console.log(file)
  },[file])

  useEffect(() => {
    setPage(pageNumber)
  },[pageNumber])

  const handleImageDrag = (event,data) => {
	// console.log(event)
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

	console.log(clientX, left)
	console.log(clientY, top)

	console.log(event);
    setCoordinates({ x, y });
  };

  useEffect(() =>{
	console.log(coordinates)
  },[coordinates])

  const handleImageDrop = async (e) => {
	const { left, top } = e.currentTarget.getBoundingClientRect();
	setCoordinates({ x:left, y:top});
    try {
      console.log('Respuesta del servidor:', coordinates);
    } catch (error) {
      console.error('Error al enviar coordenadas:', error);
    }
  };

  return (
    <div style={{position:"relative"}}>
      <Document
        file={"http://localhost:3001/"+rutaArchivo}
        onLoadSuccess={onDocumentLoadSuccess}
		style={{position:"absolute"}}
      >
		<div style={{position:"absolute", zIndex:999, width:"100%", height:"100px"}}>
				<DndProvider backend={HTML5Backend} style={{display:"none"}}>
					<Example setCoord={setCoord} style={{display:"none"}}/>
				</DndProvider>
			</div>
        <Page pageNumber={pageNumber} width={470} />
      </Document>
      <p>
        Página {pageNumber} de {numPages}
      </p>
      <div className='flex gap-4'>
	  <Button onClick={() => setPageNumber(pageNumber !== 1 ? pageNumber-1 : pageNumber)}>Pagina anterior</Button>
	  <Button onClick={() => setPageNumber(pageNumber !== numPages ? pageNumber+1 : pageNumber)}>Siguiente pagina</Button>
    </div>
    </div>
  );
};

export default Perfil;
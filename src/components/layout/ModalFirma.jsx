import { useEffect, useState } from "react";
import Perfil from "./Perfil";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const ModalFirma = ({ isOpen, close, submit, id = 0, rutaArchivo, setData }) => {

    const [coord, setCoord] = useState({})
    const [page, setPage] = useState({})

    const guardarDatos = () => {
      setData({
        coorX:coord.x,
        coorY:Math.floor(coord.y-(coord.y * 0.07)),
        rutaDocumento:rutaArchivo,
        pagina:page,
        tareasInternas:id
      })
      return console.log(coord, page)
      console.log(page)
      axios.put("https://backguardian.supervigilancia.gov.co:8443/guardian/api/v1/flujo-trabajo/subir/"+id, {
        rutaArchivo: rutaArchivo,
        coorX: coord.x,
        coorY:Math.floor(coord.y-(coord.y * 0.07)),
        pagina: page
      },{headers:{Authorization:sessionStorage.getItem("token")}})
      .then(({data}) => {
      Swal.fire("Exitoso", "La firma fue ubicada con exito", "success")
      console.log(data); close()
    })
    }

  return (
    <>
      <Dialog className={"overflow-y-scroll overflow-x-hidden max-h-screen"}>
        <DialogTrigger>
          <Button className="flex m-auto">Firmar</Button>
        </DialogTrigger>
        <DialogContent className={""}>
            {/* <div className="modal-header">
              <h5 className="modal-title">
                Firmar documento
              </h5>
              <button
              onClick={close}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div> */}
            <div>
              <p>
                <Perfil rutaArchivo={rutaArchivo} setCoord={setCoord} setPage={setPage} submit={guardarDatos}/>
              </p>
            </div>
            <div className="flex gap-4">
              {/* <Button
                onClick={close}
              >
                Cerrar
              </Button> */}
              <Button
                onClick={guardarDatos}
              >
                Firmar
              </Button>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalFirma;

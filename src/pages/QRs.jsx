import axios from "axios";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { Contact } from "lucide-react";

const QRs = () => {
  const [usuario, setUsuario] = useState(null);
  const [loader, setLoader] = useState(true);
  const { serial } = useParams();
  useEffect(() => {
    axios.get("/user/qr/" + serial).then(
      ({ data }) => {
        setUsuario(data);
        setLoader(false);
      },
      () => {
        setUsuario(null);
        setLoader(false);
      }
    );
  }, []);

  return (
    <div className="bg-gray-100 h-full absolute w-full font-[OpenSans]">
      {loader ? (
        <div className="flex flex-col items-center m-auto mt-60">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <p className="font-bold mt-4 text-xl">
            Buscando identificación
          </p>
        </div>
      ) : usuario ? (
        (usuario.image && usuario.certificacion && usuario.documento) ? <div className="border-2 h-[580px] w-80 rounded-lg bg-white m-auto mt-16 p-6">
          <img
            src={usuario.company.logo ? `https://back-teldip.onrender.com/uploads/${usuario.company.logo}`: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
            className="h-10 my-4 m-auto"
          ></img>
          <img
            src={usuario.image ? `https://back-teldip.onrender.com/uploads/${usuario.image}`: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
            className="border-2 border-gray-300 rounded-full w-24 h-24 bg-gray-200 m-auto"
          ></img>
          <div className="text-center mt-3">
            <h2 className="text-xl font-bold px-10">
              {usuario.name} {usuario.lastname}
            </h2>
            {/* <h3 className=" text-gray-400 text-sm">Cargo actual</h3> */}
            <div className="text-left mt-4 grid grid-cols-2">
              <div className="ml-6">
                <h4 className="font-bold text-sm">Documento</h4>
                <h4 className="mb-4 text-sm">{usuario.documento}</h4>
              </div>
              <div className="">
                <h4 className="font-bold text-sm">Fecha expedición</h4>
                <h4 className="mb-4 text-sm">16/04/2024</h4>
              </div>
              <div className="ml-6">
                <h4 className="font-bold text-sm">Teléfono</h4>
                <h4 className="mb-4 text-sm">{usuario.phone}</h4>
              </div>
              <div className="">
                <h4 className="font-bold text-sm">Fecha caducidad</h4>
                <h4 className="mb-4 text-sm">16/04/2025</h4>
              </div>
            </div>
            <div className="m-auto">
              <h4 className="font-bold text-sm">Número de certificación</h4>
              <h4 className="mb-4 text-sm">{usuario.certificacion}</h4>
            </div>
            <QRCode
              className="m-auto mt-4"
              size={80}
              // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"https://teldip.com/qr/" + serial}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div> : <div className="flex flex-col items-center m-auto mt-60">
          <Contact className="w-14 h-14 text-gray-900" />
          <p className="font-bold mt-4 text-xl text-black">
            Tarjeta en proceso de validación
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center m-auto mt-60">
          <Contact className="w-14 h-14 text-gray-400" />
          <p className="font-bold mt-4 text-xl text-gray-400">
            Usuario no encontrado
          </p>
        </div>
      )}
    </div>
  );
};

export default QRs;

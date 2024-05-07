
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { Buffer } from 'buffer';
import axios from 'axios';
import { setCulture, L10n } from '@syncfusion/ej2-base';
import json from "./WordEs.json"
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
// import { TitleBar } from './title-bar';
// import './default.component.css';
DocumentEditorContainerComponent.Inject(Toolbar);
// registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhLYVJzWmFZfVpgfF9EaVZRQWYuP1ZhSXxXdkdjUX9Wcn1VQ2JcU0U=");
// tslint:disable:max-line-length
const Word = ({setRutaArchivo, tramiteId, tipoDocumental, id, setData, userId, datosTramite, creado, rutaDocumento, enFirma, setGuardado, documentoId, esFlujo = false }) => {
    // let hostUrl = "https://backguardian.supervigilancia.gov.co:8443/guardian/sync/";
    let container = useRef(null);
    const [isOpen, setIsOpen] = React.useState(false)
    // const [rutaArchivo, setRutaArchivo] = React.useState()
    const [rutaDocumentoActual, setRutaDocumentoActual] = React.useState()
    const [guardando, setGuardando] = React.useState(false)
    const {toast} = useToast()
    const [documento, setDocumento] = React.useState("")
    let titleBar;

    useEffect(() => {
        if (documento?.length) {
            onLoadDefault()
        }
        if (container.current) {
            console.log("EDITOR", container.current.documentEditor.enableTrackChanges)
            container.current.documentEditor.enableTrackChanges = false;
        }
    }, [documento]);

    const items = ['New',
        'Open',
        'Image',
        'Table',
        'Undo',
        'Redo',]

    useEffect(() => {
        setCulture('es');
        L10n.load(json);
        // loadExternalFonts('Montserrat','https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap')
        if (creado) return;
        let usuario;
        // axios.get("/api/v1/usuario/mostrar/" + userId, { headers: { Authorization: sessionStorage.getItem("token") } })
        //     .then(({ data }) => {
        //         usuario = data
        //         axios.put("https://backguardian.supervigilancia.gov.co:8443/guardian/api/v1/flujo-trabajo/editar/rutas/" + id, [{ rutaDocumento: "vacio", rutaArchivoWord:"vacio", tipoDocumento: tipoDocumental }])
        //             .then(({ data }) => {
        //                 axios.get("https://backguardian.supervigilancia.gov.co:8443/guardian/rutasFlujos/consultar/" + data.rutasFlujosDtos.at(-1).id, {headers:{Authorization:sessionStorage.getItem("token")}})
        //                     .then(({ data }) => {
        //                         console.log(data)
        //                         if (usuario.nombreEntidad == null) {
        //                             axios.post("https://backguardian.supervigilancia.gov.co:8443/guardian/plantilla/editar", {
        //                                 ...datosTramite,
        //                                 fecha: new Date().toLocaleString(),
        //                                 nombre: `${usuario.nombre} ${usuario.apellido}`,
        //                                 nombres: `${usuario.nombre} ${usuario.apellido}`,
        //                                 correo: usuario.correoElectronico,
        //                                 direccion: usuario.direccion,
        //                                 nit: usuario.nit,
        //                                 numeroRadicadoSalida:data.numeroRadicadoSalida
        //                             }, {
        //                                 headers: {
        //                                     Authorization: sessionStorage.getItem("token")
        //                                 }
        //                             }).then(({ data }) => {
        //                                 console.log("BASE64", data)
        //                                 const buffer = Buffer.from(data, "base64");
        //                                 const blob = new Blob([buffer], { type: '[content-type]' })
        //                                 console.log(blob)
        //                                 const form = new FormData()
        //                                 form.append("files", blob)
        //                                 axios.post("https://backguardian.supervigilancia.gov.co:8443/guardian/sync/Import", form).then(({ data }) => setDocumento(data.sfdt))
        //                             })
        //                         } else {
        //                             axios.post("https://backguardian.supervigilancia.gov.co:8443/guardian/plantilla/editar", {
        //                                 ...datosTramite,
        //                                 fecha: new Date().toLocaleString(),
        //                                 nombre: data.nombreEntidad,
        //                                 nombres: data.nombreEntidad,
        //                                 correo: data.correoElectronico,
        //                                 direccion: data.direccion,
        //                                 nit: data.nit
        //                             }, {
        //                                 headers: {
        //                                     Authorization: sessionStorage.getItem("token")
        //                                 }
        //                             }).then(({ data }) => {
        //                                 if (container.current) {
        //                                     container.current.documentEditor.enableTrackChanges = false;
        //                                 }
        //                                 console.log("BASE64", data)
        //                                 const buffer = Buffer.from(data, "base64");
        //                                 const blob = new Blob([buffer], { type: '[content-type]' })
        //                                 console.log(blob)
        //                                 const form = new FormData()
        //                                 form.append("files", blob)
        //                                 axios.post("https://backguardian.supervigilancia.gov.co:8443/guardian/sync/Import", form).then(({ data }) => setDocumento(data.sfdt))
        //                             })
        //                         }
        //                     })
        //             })
        //         console.log("PRUEBA", data)
        //     }, () => {
        //         axios.post("https://backguardian.supervigilancia.gov.co:8443/guardian/plantilla/editar", {
        //             ...datosTramite,
        //             fecha: new Date().toLocaleString(),
        //             nombre: "[NOMBRE]",
        //             nombres: "[NOMBRE]",
        //             correo: "[CORREO]",
        //             direccion: "[DIRECCION]",
        //             nit: "[NIT]"
        //         }, {
        //             headers: {
        //                 Authorization: sessionStorage.getItem("token")
        //             }
        //         }).then(({ data }) => {
        //             console.log("BASE64", data)
        //             const buffer = Buffer.from(data, "base64");
        //             const blob = new Blob([buffer], { type: '[content-type]' })
        //             console.log(blob)
        //             const form = new FormData()
        //             form.append("files", blob)
        //             axios.post("https://backguardian.supervigilancia.gov.co:8443/guardian/sync/Import", form).then(({ data }) => setDocumento(data.sfdt))
        //         })
        //     })
    }, [])

    const guardarDatos = () => {
        toast({
            title: "Guardando documento",
            description:"Espera un momento"
          })
            container.current.documentEditor.saveAsBlob('Docx').then((exportedDocument) => {
                const form = new FormData()
                var file = new File([exportedDocument], "word.docx");
                form.append("file", file)
                form.append("tramiteId", tramiteId)
                axios
                    .post(
                        "/documentos/convert/toPdf", form)
                    .then(({data}) => {
                        toast({
                            title: "Documento convertido a PDF exitosamente",
                            description:"Ya puedes aprobar el trámite",
                          })
                        setRutaArchivo(data)
                        return
                    })
            })
    }

    useEffect(() => {
        console.log(rutaDocumento)
        setRutaDocumentoActual(rutaDocumento)
        axios.get("https://backguardian.supervigilancia.gov.co:8443/guardian/api/v1/documentos/mostrar-documento?rutaArchivo=" + rutaDocumento, {
            responseType: 'arraybuffer'
        })
            .then(({ data }) => {
                const form = new FormData()
                const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                console.log(blob)
                form.append("files", blob)
                axios.post("https://backguardian.supervigilancia.gov.co:8443/guardian/sync/Import", form).then(({ data }) => { setDocumento(data.sfdt); console.log(data) })
            })
            .then(arrayBuffer => {
                // Resto del código para subir el archivo...
            });
    }, [rutaDocumento])

    const [convirtiendo, setConvirtiendo] = React.useState(false)


    const ubicarFirma = () => {
        Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire({
            icon: "info",
            title: "Espera un momento mientras cargamos el archivo"
        });
        container.current.documentEditor.saveAsBlob('Docx').then((exportedDocument) => {
            const form = new FormData()
            var file = new File([exportedDocument], "word.docx");
            form.append("file", file)
            form.append("numeroRadicado", "1234512345")
            form.append("flujoTrabajo", 0)
            form.append("idUsuario", 0)
            // GUARDAR EL NUEVO DOCUMENTO EN EL FLUJO DE TRABAJO
            axios
                .post(
                    "https://backguardian.supervigilancia.gov.co:8443/guardian/cargar/archiv", form)
                .then((datos) => {
                    axios.put("https://backguardian.supervigilancia.gov.co:8443/guardian/rutasFlujos/editar/" + documentoId, {
                        rutaArchivoWord: datos.data[0].ruta,
                    }, { headers: { Authorization: sessionStorage.getItem("token") } }).then(({ data }) => {
                        console.log(data)
                    })
                    axios.post("https://backguardian.supervigilancia.gov.co:8443/Firma/api/v1/firmar/convertir", {
                        entrada: datos.data[0].ruta
                    }).then(({ data }) => {
                        axios.post("https://backguardian.supervigilancia.gov.co:8443/Firma/api/v1/firmar/convertir", {
                            entrada: datos.data[0].ruta
                        }).then(({ data }) => {
                            setRutaArchivo(data.url)
                            setIsOpen(true)
                        })
                    })
                })
        });
    }

    const onLoadDefault = () => {
        let defaultDocument = { "sfdt": documento };
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Getting Started";
    };

    const rendereComplete = () => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        // titleBar = new TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true);
        onLoadDefault();
    };


    return (
        <>
            <div className="control-pane">
                <div className="control-section">
                    <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                    <div id="documenteditor_container_body" style={{width:"1000px",height: "900px", margin:"auto" }}>
                        <DocumentEditorContainerComponent
                            // enableTrackChanges={false}
                            id="container" ref={container}
                            style={{ display: "block" }}
                            height={"900px"}
                            className='bg-gray-600'
                            // serviceUrl={hostUrl}
                            // documentEditorSettings={{ fontFamilies: ["Arial", "Montserrat"] }}
                            // documentChange={(e) => e.source.enableTrackChanges = false}
                            // paste={(args) => {
                            //     args.cancel = true;
                            // }}
                            // enableLocalPaste={false}
                            enableToolbar={true}
                            showPropertiesPane={false} locale="es-ES" />
                    </div>
                </div>
                <Button onClick={guardarDatos} className="flex m-auto mt-10">Guardar documento en PDF</Button>
            </div>
        </>);
};

export default Word;
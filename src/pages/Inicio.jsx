import Footer from "../components/layout/Footer"
import style from "./Inicio.module.css"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import certificado from "../assets/certificado.svg"
import biometricos from "../assets/biometricos.svg"
import firma from "../assets/firma.svg"
import tarjeta from "../assets/tarjeta.svg"
import software from "../assets/software.svg"
import code from "../assets/code.svg"
import apis from "../assets/apis.svg"
import security from "../assets/security.svg"
import integration from "../assets/integration.svg"
import animation from "../assets/animation.json"
import { useEffect, useRef, useState } from "react"
import { useInView, motion, useAnimation, AnimatePresence } from "framer-motion"
import Lottie from "lottie-react"
import { Link } from "react-router-dom"
const Inicio = () => {

    const barRef = useRef(null)
    const ref = useRef(null)
    const lottieRef = useRef(null)
    const serviceInView = useInView(ref, { once: false })
    const barInView = useInView(barRef, { once: false })

    const controls = useAnimation()
    const controlsBar = useAnimation()

    useEffect(() => {
        lottieRef?.current?.setSpeed(2)
    },[])

    useEffect(() => {
        if (serviceInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [serviceInView])

    useEffect(() => {
        if (barInView) {
            controlsBar.start("visible")
        } else {
            controlsBar.start("hidden")
        }
    }, [barInView])
    const [index, setIndex] = useState(0)

    const cambiarTexto = () => {
        setTimeout(() => {
            setIndex((prev) => {
                if (prev >= textos.length - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            });
        }, 8000)
    }

    useEffect(() => {
        cambiarTexto()
    }, [index])

    const floatAnimation = {
        y: ["2%", "-2%", "2%"],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        },
     };

    const textos = ["Somos profesionales en el desarrollo de software empresarial", "Comprometidos con la innovación, somos líderes en software empresarial", "Desarrollamos software empresarial, enfocados en el crecimiento de tu negocio"]
    const subtitulos = ["Nos distinguimos por nuestra experiencia y habilidades en el diseño y creación de soluciones de software personalizadas, enfocadas en el crecimiento y la eficiencia de las empresas.",
    "Nos enorgullece ser líderes en el campo de la innovación tecnológica, ofreciendo soluciones de software empresarial que impulsan la transformación digital y el éxito empresarial.",
    "Nuestro enfoque está en el desarrollo de software empresarial que no solo mejora la eficiencia operativa, sino que también impulsa el crecimiento y la expansión de tu negocio en el mercado."]

    return (
        <>
            <div style={{ height: "fit-content" }}>
                <div className="flex flex-col-reverse p-6 items-center lg:flex-row lg:my-32 lg:justify-center text-center m-auto lg:flex gap-10">
                    <motion.div
                        className="max-w-[700px]"
                        initial={{ opacity: 0, x: 75 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0 }}
                    >
                            <motion.p
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                                className="font-bold text-[40px] leading-[45px] lg:text-[56px] text-slate-800 lg:leading-[55px]">{textos[index]}<br></br>
                                {/* <br></br> */}
                            </motion.p>
                        <motion.p 
                        key={index+10}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="font-medium text-[17px] lg:text-xl font-[OpenSans] text-slate-500 mt-5">{subtitulos[index]}</motion.p>
                        <Link to="/contacto">
                        <button
                            className="font-medium text-lg mt-10 text-white p-3 rounded-lg bg-[#20af66]">Ponte en contacto con nosotros</button>
                        </Link>
                    </motion.div>
                    {/* <Lottie lottieRef={lottieRef} animationData={animation} loop={true} /> */}
                    <motion.img
                        initial={{ opacity: 1}}
                        animate={floatAnimation}
                        transition={{ duration: 2, delay: 2 }}
                        src={"https://desarrollodesoftware.com.co/storage-desarrollo/recorte-isotipo222.jpg"} className="max-h-96" />
                </div>
                <div className="flex mt-56 flex-col items-center lg:flex-row justify-center gap-16 z-30">
                    <motion.div
                        initial={{ opacity: 0, y: 75 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="bg-white border-2 border-gray-100 w-96 h-72 rounded-lg shadow-lg mb-40 lg:mb-0">
                        <img src={apis} className="h-32 m-auto -translate-y-32" />
                        <div className="-mt-36 p-10">
                            <h3 className="font-semibold text-xl text-center mb-6">APIs</h3>
                            <h5 className="text-sm font-[OpenSans] text-gray-500 max-w-96 mb-6 h-20">Ofrecemos APIs que impulsan la conectividad, la innovación y la eficiencia de tus servicios, permitiendo una integración fluida y un desarrollo rápido.</h5>
                            <Link to="/contacto">
                            <button className="text-black text-base mt-4 rounded-lg border-black border-2 p-3 hover:bg-gray-800 hover:text-white transition-all">Más información</button>
                            </Link>
                        </div>
                    </motion.div >
                    <motion.div
                        initial={{ opacity: 0, y: 75 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.2 }} className="bg-white border-2 border-gray-100 w-96 h-72 rounded-lg shadow-lg mb-40 lg:mb-0">
                        <img src={security} className="h-32 m-auto -translate-y-32" />
                        <div className="-mt-36 p-10">
                            <h3 className="font-semibold text-xl text-center mb-6">Ciberseguridad</h3>
                            <h5 className="text-sm font-[OpenSans] text-gray-500 max-w-96 mb-6 h-20">Ofrecemos soluciones de cyberseguridad personalizadas para proteger tus activos digitales, garantizando la continuidad del negocio y la privacidad de los usuarios.</h5>
                            <Link to="/contacto">
                            <button className="text-black text-base mt-4 rounded-lg border-black border-2 p-3 hover:bg-gray-800 hover:text-white transition-all">Más información</button>
                            </Link>                        </div>
                    </motion.div >
                    <motion.div
                        initial={{ opacity: 0, y: 75 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.3 }} className="bg-white border-2 border-gray-100 w-96 h-72 rounded-lg shadow-lg">
                        <img src={integration} className="h-32 m-auto -translate-y-32" />
                        <div className="-mt-36 p-10">
                            <h3 className="font-semibold text-xl text-center mb-6">Integraciones</h3>
                            <h5 className="text-sm font-[OpenSans] text-gray-500 max-w-96 mb-6 h-20">Ofrecemos integraciones que optimizan los procesos, mejorando la eficiencia y productividad de tu negocio.</h5>
                            <Link to="/contacto">
                            <button className="text-black text-base mt-4 rounded-lg border-black border-2 p-3 hover:bg-gray-800 hover:text-white transition-all">Más información</button>
                            </Link>                        </div>
                    </motion.div >
                </div>
                {/* <div className={style.barraDiagonal}>

                </div> */}
                {/* <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={controlsBar}
                    transition={{ duration: 0.25, delay: 0.25 }}
                    ref={barRef} className={style.barraDiagonal2}>

                </motion.div> */}
                <h1 className="font-bold text-4xl text-slate-800 text-center mt-20">Nuestros servicios</h1>
                <div
                    className="py-36 px-36 max-sm:px-10 max-sm:py-24 w-full h-[fit]">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 75 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.25, delay: 0 }}

                        ref={ref}
                        className="flex flex-wrap m-auto justify-around -mx-2 lg:gap-0 gap-24">
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 75 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate={controls}
                            transition={{ duration: 0.25, delay: 0.05 }}

                            ref={ref} className="bg-[#20af66] rounded-3xl w-1/3 lg:w-1/5 max-lg:w-full mb-52 px-2 h-[152px] p-10">
                            <img src={certificado} className="h-60 m-auto -translate-y-32" />
                            <div className="-mt-24">
                                <h3 className="font-semibold text-lg">Certificados digitales</h3>
                                <h5 className="text-sm font-[OpenSans] text-gray-500 max-w-96 h-28">Asegura la integridad, validación y seguridad de tus documentos médicos con tecnología de vanguardia, garantizando la autenticidad y confiabilidad en el ámbito médico.</h5>
                                <Link to="/contacto">
                                <button className="text-black text-base mt-4 rounded-lg border-black border-2 p-3 hover:bg-gray-800 hover:text-white transition-all">Más información</button>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 75 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate={controls}
                            transition={{ duration: 0.25, delay: 0.10 }}

                            ref={ref} className="bg-[#20af66] rounded-3xl w-1/3 lg:w-1/5 max-lg:w-full mb-52 px-2 h-[152px] p-10">
                            <img src={tarjeta} className="h-60 m-auto -translate-y-32" />
                            <div className="-mt-24">
                                <h3 className="font-semibold text-lg">Tarjeta digital</h3>
                                <h5 className="text-sm font-[OpenSans] text-gray-500 max-w-96 h-28">Documento virtual seguro y fácil de usar para autenticación y verificación, proporcionando una solución eficiente y confiable para la identificación en el mundo digital.</h5>
                                <Link to="/contacto">
                                <button className="text-black text-base mt-4 rounded-lg border-black border-2 p-3 hover:bg-gray-800 hover:text-white transition-all">Más información</button>
                                </Link>                            </div>
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 75 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate={controls}
                            transition={{ duration: 0.25, delay: 0.15 }}

                            ref={ref} className="bg-[#20af66] rounded-3xl w-1/3 lg:w-1/5 max-lg:w-full mb-52 px-2 h-[152px] p-10">
                            <img src={biometricos} className="h-60 m-auto -translate-y-32" />
                            <div className="-mt-24">
                                <h3 className="font-semibold text-lg">Biometricos</h3>
                                <h5 className="text-sm font-[OpenSans] text-gray-500 max-w-96 h-28">Tecnología de seguridad avanzada para identificar y autenticar de manera única, ofreciendo un nivel de seguridad sin precedentes y personalización en la autenticación.</h5>
                                <Link to="/contacto">
                                <button className="text-black text-base mt-4 rounded-lg border-black border-2 p-3 hover:bg-gray-800 hover:text-white transition-all">Más información</button>
                                </Link>                            </div>
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 75 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate={controls}
                            transition={{ duration: 0.25, delay: 0.20 }}

                            ref={ref} className="bg-[#20af66] rounded-3xl w-1/3 lg:w-1/5 max-lg:w-full mb-52 px-2 h-[152px] p-10">
                            <img src={firma} className="h-60 m-auto -translate-y-32" />
                            <div className="-mt-24">
                                <h3 className="font-semibold text-lg">Firma digital</h3>
                                <h5 className="text-sm font-[OpenSans] text-gray-500 max-w-96 h-28">Validación electrónica de documentos con seguridad y autenticidad, asegurando la integridad y confiabilidad de las firmas en el ámbito digital.</h5>
                                <Link to="/contacto">
                                <button className="text-black text-base mt-4 rounded-lg border-black border-2 p-3 hover:bg-gray-800 hover:text-white transition-all">Más información</button>
                                </Link>                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                {/* <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="Photo by Drew Beamer"
                        className="rounded-md object-cover"
                    />
                </AspectRatio> */}
            </div >
            <Footer />
        </>
    )
}

export default Inicio
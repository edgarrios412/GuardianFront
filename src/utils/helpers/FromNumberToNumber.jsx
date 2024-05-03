import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

const FromNumberToNumber = ({ from, to, className }) => {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1,
      type: 'spring', // Usa un muelle para la transición
      damping: 30, // Ajusta la amortiguación para controlar la desaceleración
      onUpdate(value) {
        ref.current.textContent = value.toFixed(0); // Asegúrate de que el valor sea un número
      },
    });
    return () => controls.stop(); // Detiene la animación al desmontar el componente
  }, [from, to]); // Dependencias del efecto

  return (
    <p className={className} ref={ref}>
      {from}
    </p>
  );
};

export default FromNumberToNumber;

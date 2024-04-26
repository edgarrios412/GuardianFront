import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios"
import { UserContext } from "./utils/context/User/UserContext";
import Login from "./pages/Login";
import Bandeja from "./pages/Profile/Bandeja";
import DetailProcedimiento from "./pages/Profile/DetailProcedimiento";
import Profile from "./pages/Profile";
import FormSolicitud from "./pages/FormSolicitud";

function App() {

  const {setUsuario} = useContext(UserContext)

  useEffect(() => {
    if(localStorage.getItem("token")){
      axios.get("/user/token/"+localStorage.getItem("token")).then(({data}) => {
        setUsuario(data)
      })
    }
  },[])

  return (
    <>
      <Routes>
      <Route path="/solicitud" element={<FormSolicitud />} />
        <Route path="/" element={<Login />} />
        <Route path="/panel" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

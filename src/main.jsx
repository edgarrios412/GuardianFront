import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { NavigationProvider } from "./utils/context/Navigation/NavigationProvider.jsx";
import axios from "axios";
import { UserProvider } from "./utils/context/User/UserProvider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";

// axios.defaults.baseURL = "https://back-teldip.onrender.com";
axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <Toaster/>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </UserProvider>
  </BrowserRouter>
);

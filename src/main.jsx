import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { NavigationProvider } from "./utils/context/Navigation/NavigationProvider.jsx";
import axios from "axios";
import { UserProvider } from "./utils/context/User/UserProvider.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense("ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5XdUViXnxedXxWRWZa")
// axios.defaults.baseURL = "https://guardianbackend.onrender.com";
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

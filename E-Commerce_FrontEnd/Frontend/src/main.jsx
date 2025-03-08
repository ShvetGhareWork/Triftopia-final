import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Use HashRouter here
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    {" "}
    {/* Use HashRouter here instead of BrowserRouter */}
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </HashRouter>
);

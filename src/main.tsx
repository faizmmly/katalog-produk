import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { ThemeProvider } from "./context/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>,
);
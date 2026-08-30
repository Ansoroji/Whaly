import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import {
  ChakraProvider,
  defaultSystem,
} from "@chakra-ui/react";

import App from "./App.jsx";

import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ChakraProvider value={defaultSystem}>

      <App />

    </ChakraProvider>

  </React.StrictMode>

);
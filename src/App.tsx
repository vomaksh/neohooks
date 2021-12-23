import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Webhook from "./pages/Webhook";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Webhook />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

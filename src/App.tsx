import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Webhook} from "./webhook";
import {theme} from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Webhook />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Webhook } from './routes/webhook';
import { theme } from './theme';
import { Home } from './routes/home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Webhook />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

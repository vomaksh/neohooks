import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Webhook } from './routes/webhook';
import { theme } from './theme';
import { Home } from './routes/home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/w/:webhookId" element={<Webhook />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </ChakraProvider>
  );
}

export default App;

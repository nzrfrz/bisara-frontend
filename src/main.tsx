import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import './index.css'
import App from './App.tsx'
import 'antd/dist/reset.css'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { GlobalContextProvider } from './GlobalContextProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </QueryClientProvider>
);
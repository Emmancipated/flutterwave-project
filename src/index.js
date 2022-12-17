import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
  );
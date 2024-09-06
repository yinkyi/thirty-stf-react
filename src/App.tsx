import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import './App.scss';
import Search from './components/Search';
import ContactDetail from './pages/ContactDetail';
import Checkout from './pages/CheckOut';
import PaymentSuccess from './pages/PaymentSuccess';
import RequireAuth from './RequireAuth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
  {
    path: '/contact-detail',
    element: <RequireAuth element={<ContactDetail />} />,
  },
  {
    path: '/checkout/:reference',
    element: <RequireAuth element={<Checkout />} />,
  },
  {
    path: '/payment-success',
    element: <RequireAuth element={<PaymentSuccess />} />,
  },
]);

const App: React.FC = () => (
  <Layout>
    {/* <QueryClientProvider client={queryClient}> */}
    <RouterProvider router={router} />
    {/* </QueryClientProvider> */}
  </Layout>
);

export default App;

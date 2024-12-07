import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Products } from './pages/Products';
import { Batches } from './pages/Batches';
import { Taxes } from './pages/Taxes';
import { Users } from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<Products />} />
          <Route path="batches" element={<Batches />} />
          <Route path="taxes" element={<Taxes />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Package, Users, Calculator, Boxes, LayoutDashboard } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
                <LayoutDashboard className="h-6 w-6 mr-2" />
                <span className="font-semibold">Sistema de Estoque</span>
              </Link>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/products"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Produtos
                </Link>
                
                <Link
                  to="/batches"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <Boxes className="h-4 w-4 mr-2" />
                  Lotes
                </Link>
                
                <Link
                  to="/taxes"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Impostos
                </Link>
                
                <Link
                  to="/users"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Usuários
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
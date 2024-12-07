import { create } from 'zustand';
import { User, Product, Batch, Tax } from '../types';

interface Store {
  users: User[];
  products: Product[];
  batches: Batch[];
  taxes: Tax[];
  addUser: (user: User) => void;
  addProduct: (product: Product) => void;
  addBatch: (batch: Batch) => void;
  addTax: (tax: Tax) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  updateBatch: (id: string, batch: Partial<Batch>) => void;
  updateTax: (id: string, tax: Partial<Tax>) => void;
  deleteUser: (id: string) => void;
  deleteProduct: (id: string) => void;
  deleteBatch: (id: string) => void;
  deleteTax: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  users: [],
  products: [],
  batches: [],
  taxes: [],
  
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  addBatch: (batch) => set((state) => ({ batches: [...state.batches, batch] })),
  addTax: (tax) => set((state) => ({ taxes: [...state.taxes, tax] })),
  
  updateUser: (id, user) => set((state) => ({
    users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
  })),
  updateProduct: (id, product) => set((state) => ({
    products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
  })),
  updateBatch: (id, batch) => set((state) => ({
    batches: state.batches.map((b) => (b.id === id ? { ...b, ...batch } : b)),
  })),
  updateTax: (id, tax) => set((state) => ({
    taxes: state.taxes.map((t) => (t.id === id ? { ...t, ...tax } : t)),
  })),
  
  deleteUser: (id) => set((state) => ({
    users: state.users.filter((u) => u.id !== id),
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id),
  })),
  deleteBatch: (id) => set((state) => ({
    batches: state.batches.filter((b) => b.id !== id),
  })),
  deleteTax: (id) => set((state) => ({
    taxes: state.taxes.filter((t) => t.id !== id),
  })),
}));
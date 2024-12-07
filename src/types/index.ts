export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
}

export interface Batch {
  id: string;
  productId: string;
  quantity: number;
  purchasePrice: number;
  expirationDate?: Date;
  receivedDate: Date;
  batchNumber: string;
}

export interface Tax {
  id: string;
  name: string;
  rate: number;
  description: string;
  appliesTo: 'product' | 'service' | 'both';
  isActive: boolean;
}
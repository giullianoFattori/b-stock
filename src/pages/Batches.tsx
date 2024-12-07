import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Batch } from '../types';

export function Batches() {
  const { batches, products, addBatch, updateBatch, deleteBatch } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const batchData = {
      id: editingBatch?.id || crypto.randomUUID(),
      productId: formData.get('productId') as string,
      quantity: Number(formData.get('quantity')),
      purchasePrice: Number(formData.get('purchasePrice')),
      expirationDate: formData.get('expirationDate') ? new Date(formData.get('expirationDate') as string) : undefined,
      receivedDate: new Date(formData.get('receivedDate') as string),
      batchNumber: formData.get('batchNumber') as string,
    };

    if (editingBatch) {
      updateBatch(editingBatch.id, batchData);
    } else {
      addBatch(batchData);
    }
    
    setIsModalOpen(false);
    setEditingBatch(null);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Gestão de Lotes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Acompanhe e gerencie os lotes de produtos
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4 inline-block mr-1" />
            Adicionar Lote
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Número do Lote</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Produto</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantidade</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Preço de Compra</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data de Recebimento</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data de Validade</th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {batches.map((batch) => {
                  const product = products.find(p => p.id === batch.productId);
                  return (
                    <tr key={batch.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.batchNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{product?.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.quantity}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        R$ {batch.purchasePrice.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(batch.receivedDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {batch.expirationDate ? new Date(batch.expirationDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            setEditingBatch(batch);
                            setIsModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteBatch(batch.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {editingBatch ? 'Editar Lote' : 'Adicionar Novo Lote'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Produto</label>
                  <select
                    name="productId"
                    defaultValue={editingBatch?.productId}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número do Lote</label>
                  <input
                    type="text"
                    name="batchNumber"
                    defaultValue={editingBatch?.batchNumber}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantidade</label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={editingBatch?.quantity}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preço de Compra</label>
                  <input
                    type="number"
                    name="purchasePrice"
                    step="0.01"
                    defaultValue={editingBatch?.purchasePrice}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Recebimento</label>
                  <input
                    type="date"
                    name="receivedDate"
                    defaultValue={editingBatch?.receivedDate.toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Validade</label>
                  <input
                    type="date"
                    name="expirationDate"
                    defaultValue={editingBatch?.expirationDate?.toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                >
                  {editingBatch ? 'Salvar Alterações' : 'Adicionar Lote'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBatch(null);
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Aquí puedes hacer una llamada a una API para obtener los pedidos
    // Por ejemplo, usando axios:
    // axios.get('/api/orders')
    //   .then(response => setOrders(response.data))
    //   .catch(error => console.error('Error fetching orders:', error));

    // Para fines de este ejemplo, usaremos datos estáticos
    const fetchedOrders = [
      { id: 1, customer: 'John Doe', date: '2024-05-17', total: 150.0, status: 'Pending' },
      { id: 2, customer: 'Jane Smith', date: '2024-05-16', total: 200.0, status: 'Completed' },
      // Agrega más pedidos aquí
    ];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-xs">
          <thead className="rounded-t-lg dark:bg-gray-300">
            <tr className="text-right">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="border-b dark:bg-gray-50 dark:border-gray-300">
            {orders.map(order => (
              <tr key={order.id} className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
                <td className="px-3 py-2 text-left">{order.id}</td>
                <td className="px-3 py-2 text-left">{order.customer}</td>
                <td className="px-3 py-2 text-left">{order.date}</td>
                <td className="px-3 py-2 text-left">${order.total.toFixed(2)}</td>
                <td className="px-3 py-2 text-left">{order.status}</td>
                <td className="px-3 py-2 text-left">
                  <button className='mx-1'>
                    <FontAwesomeIcon icon={faEdit} color='blue' />
                  </button>
                  <button className='mx-1'>
                    <FontAwesomeIcon icon={faTrash} color='red' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOrders;

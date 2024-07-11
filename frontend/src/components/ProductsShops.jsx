import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import BackToTopButton from "./Backtop";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { storeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('datos.json');
        const tiendas = response.data.tiendas;
        const store = tiendas.find(store => store.id === parseInt(storeId));
        if (store) {
          setProductos(store.productos);
          setLoading(false);
        } else {
          setError("Tienda no encontrada");
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="md:container md:mx-auto mt-2">
        <Link to="/providers" className="btn btn-primary">Regresar a las tiendas</Link>
      </div>
      
      <div className="md:container md:mx-auto mt-5">
        <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Productos <span className="text-blue-600 dark:text-blue-500"> disponibles </span></h1>
      </div>

      <div className="md:container md:mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map(producto => (
          <div key={producto.id} className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white">
              <img
                src={producto.imagen}
                className="h-full w-full object-cover"
                alt={producto.nombre}
              />
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {producto.nombre}
                </p>
                <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  ${producto.precio}
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                {producto.descripción}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <BackToTopButton />
    </>
  );
};

export default Productos;

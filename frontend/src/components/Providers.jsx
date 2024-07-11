import React, { useEffect, useState } from "react";
import axios from 'axios';
import BackToTopButton from "./Backtop";
import { Link } from "react-router-dom";

const Providers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/datos.json');
        setData(response.data.tiendas);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="md:container md:mx-auto mt-5">
        <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Nuestros <span className="text-blue-600 dark:text-blue-500">proveedores</span></h1>
      </div>

      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(data) && data.map(store => (
              <div key={store.id} className="mb-10 overflow-hidden rounded-lg bg-white shadow-lg shadow-3 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
                <img src={store.imagen} alt="" className="w-full h-64 object-cover" />
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                  <h3 className="font-extrabold md:text-4xl lg:text-2xl text-blue-500 dark:text-blue-500">
                    {store.nombre}
                  </h3>
                  <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                    {store.descripción}
                  </p>
                  <Link to={`/productos/${store.id}`}>
                    {/* <button className="inline-block rounded-full border border-gray-3 bg-stone-200 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6">
                      Ver productos
                    </button> */}
                  </Link>
                </div>
              </div>
            ))}
            <BackToTopButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Providers;

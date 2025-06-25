import { useState } from 'react';

function ProductBrowser() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products?name=${query}`);
      const data = await response.json();
      setResultados(data.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto por nombre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>

      <ul>
        {resultados.map((p) => (
          <li key={p._id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export {ProductBrowser}
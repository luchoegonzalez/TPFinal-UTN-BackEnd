import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FormUpdate } from "../../components/FormUpdate";

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [productEditing, setProductEditing] = useState(null);
  const [query, setQuery] = useState('');

  const { user, logout, token } = useAuth();

  const fetchingProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products`);
      if (!response.ok) {
        setError("Sesión terminada, vuelve a loguearte.");
        logout();
        throw new Error("Falló el fetch :(");
      }
      const dataProducts = await response.json();
      setProducts(dataProducts.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const buscarProductos = async () => {
      if (query.trim() === '') {
        fetchingProducts();
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/products/${query}`);
        if (!response.ok) {
          throw new Error("Error al buscar productos");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    buscarProductos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleDelete = async (product) => {
    if (confirm("Esta seguro que quieres borrar el producto?")) {
      try {
        const response = await fetch(`${apiUrl}/products/${product._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          fetchingProducts();
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleUpdate = async (product) => {
    setIsEditing(true);
    setProductEditing(product);
  };

  const handleCancelEditing = () => {
    setIsEditing(null);
    setProductEditing(null);
  };

  return (
    <Layout>
      <h1>Lista de productos</h1>
      {user && <p>Bienvenido, {user.email}</p>}

      <div className="browser-cont">
        <input
          type="text"
          placeholder="Buscar producto por nombre"
          className="browser"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && (
        <div className="error-home">
          <h2>{error}</h2>
          <Link to={"/login"}>Ir al login</Link>
        </div>
      )}

      {isEditing && (
        <FormUpdate
          product={productEditing}
          handleCancelEditing={handleCancelEditing}
          fetchingProducts={fetchingProducts}
        />
      )}

      <section className="grid-products">
        {
          products.length === 0 && query.trim() !== '' ? (
            <div className="no-results">
              <h3>No se encontraron productos con ese nombre.</h3>
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id}>
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <p className="category-product">{product.category}</p>
                {user && (
                  <div className="control-product">
                    <button
                      className="btn-update"
                      onClick={() => handleUpdate(product)}
                    >
                      Actualizar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product)}
                    >
                      Borrar
                    </button>
                  </div>
                )}
              </div>
            ))
          )
        }
      </section>
    </Layout>
  );
};

export { Home };

import React, { useEffect, useState } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('usuario_id');

    if (!userId) {
      setError('No se pudo cargar la información');
      setLoading(false);
      return;
    }

    fetch(`https://api-freelancehub.vercel.app/clientes/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los clientes');
        }
        return response.json();
      })
      .then((data) => {
        if (data.clientes && Array.isArray(data.clientes)) {
          setClientes(data.clientes);
        } else {
          setError('La respuesta de la API no contiene un array de clientes.');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const eliminarCliente = (clienteId) => {
    fetch(`https://api-freelancehub.vercel.app/cliente/${clienteId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el cliente');
        }
        setClientes((prevClientes) =>
          prevClientes.filter((cliente) => cliente.cliente_id !== clienteId)
        );
      })
      .catch((error) => {
        console.error('Error al eliminar el cliente:', error);
        setError(error.message);
      });
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id='clientes-tabla' className="container">
      <h2 className='mb-5'>Tus Clientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>RUT</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.cliente_id}>
              <td>{cliente.cliente_nombre}</td>
              <td>{cliente.cliente_email}</td>
              <td>{cliente.cliente_tel}</td>
              <td>{cliente.cliente_rut}</td>
              <td>
                <button type="button" className="btn" onClick={() => eliminarCliente(cliente.cliente_id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
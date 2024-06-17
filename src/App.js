import React, { useState } from 'react';
import './App.css';

function App() {
  const [ingresoMensual, setIngresoMensual] = useState('');
  const [tipoSolicitud, setTipoSolicitud] = useState('prestamo');
  const [montoAprobado, setMontoAprobado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/solicitar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingreso_mensual: parseFloat(ingresoMensual), tipo_solicitud: tipoSolicitud })
    });
    const data = await response.json();
    setMontoAprobado(data.monto_aprobado);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Solicitud de Crédito</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Ingreso Mensual: </label>
            <input
              type="number"
              value={ingresoMensual}
              onChange={(e) => setIngresoMensual(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tipo de Solicitud: </label>
            <select value={tipoSolicitud} onChange={(e) => setTipoSolicitud(e.target.value)}>
              <option value="prestamo">Préstamo</option>
              <option value="tarjeta">Tarjeta de Crédito</option>
            </select>
          </div>
          <button type="submit">Solicitar</button>
        </form>
        {montoAprobado !== null && (
          <div>
            <h2>Monto Aprobado: ${montoAprobado}</h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

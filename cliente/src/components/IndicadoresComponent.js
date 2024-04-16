import React, { useState } from "react";
import axios from "axios";

const IndicadoresComponent = () => {
  const [datosServidor, setDatosServidor] = useState();
  const [fecha, setFecha] = useState("");
  const [indicador, setIndicadorSeleccionado] = useState();

  const TransformarFecha = (fecha, nuevaFecha) => {
    var d = new Date(fecha),
      month = "" + (d.getMonth() + 1),
      day = "" + (d.getDate() + 1),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    nuevaFecha = [day, month, year].join("-");
    return nuevaFecha;
  };

  const TraerDatos = (req, res) => {
    const options = {
      method: "get",
      url: "http://localhost:5000/" + indicador + "/" + TransformarFecha(fecha),
    };
    axios.request(options).then((response) => {
      console.log(response.data);
      setDatosServidor(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    TraerDatos();
  };

  return (
    <div>
      <div>
      <h1 className="selectorIndicador" class="text-center mt-md-5">
        Mostrador de indicadores económicos de Chile
      </h1>
      <h2 class="text-center mt-md-3">
        Datos proporcionados por el Banco Central de Chile, <br/>consumidos a través
        de la API pública www.mindicador.cl
      </h2>
      <h4 class="text-center mt-md-3">Aplicación de Página Única</h4>
      <h5 class="text-center mt-md-3">
        Para visualizar el valor de los indicadores, selecciona una fecha y el
        nombre del indicador. Luego, clickea en "Enviar"
      </h5>

      </div>

      <div class="row mt-md-5">
        <div class="col">
          <label>
            Selecciona una fecha:
            <input
              type="date"
              formTarget="dd-mm-yyyy"
              value={fecha}
              onChange={(ff) => setFecha(ff.target.value)}
            ></input>
          </label>
          {/* {fecha && <p>La fecha Seleccionada es: {TransformarFecha(fecha)}</p>} */}
        </div>

        <div class="col">
          <label>
            Selecciona un indicador
            <select
              name="indicadores"
              id="indicadores"
              value={indicador}
              onChange={(e) => setIndicadorSeleccionado(e.target.value)}
            >
              <option value={null}>Selecciona un indicador</option>
              <option value="uf">Unidad de Fomento</option>
              <option value="ivp">Índice de valor promedio</option>
              <option value="dolar">Dólar observado</option>
              <option value="dolar_intercambio">Dólar acuerdo</option>
              <option value="euro">Euro</option>
              <option value="ipc">Indice de Precios al Consumidor (IPC)</option>
              <option value="utm">Unidad Tributaria Mensual (UTM)</option>
              <option value="imacec">
                Índice Mensual de Actividad Económica (Imacec)
              </option>
              <option value="tpm">Tasa Política Monetaria (TPM)</option>
              <option value="libra_cobre">Libra de Cobre</option>
              <option value="tasa_desempleo">Tasa de desempleo</option>
            </select>
          </label>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-md-3">
        <button type="submit" value="true" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
      {indicador && fecha && datosServidor && (
        <div className="valorIndicador" class="mt-md-4">
          <h5 class="text-center">
            {" "}
            A la fecha seleccionada ( {TransformarFecha(fecha)} ), el valor del
            indicador seleccionado ({datosServidor.nombre}) es de{" "}
            {datosServidor.serie[0].valor} {datosServidor.unidad_medida}
          </h5>
          <div  class="d-flex justify-content-center mt-md-4" >
          <button type="submit" >
            <a href="/">Busca el valor de otro indicador</a>
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndicadoresComponent;

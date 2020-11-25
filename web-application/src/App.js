import React, { useEffect , useState } from 'react'
import logo from './logo.svg'
import './App.css'
import api from './services/api'

function App() {

    function defaultSetting() {
      var IPvalue = document.getElementById("IP").value
      api.post('default-setting', {
        IP: IPvalue
      }).then(function (response) {
        atualizarDados(response.data.date) 
        console.log(response.data.date.report)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function viewSetting() {
      var IPvalue = document.getElementById("IP").value
      api.post('view-setting', {
        IP: IPvalue
      }).then(function (response) {
        atualizarDados(response.data.date) 
        console.log(response.data.date.report)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  const [dados, atualizarDados] = useState({})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="ZTE">
          ZTE
        <div>
        </div>
          <input type="text" id="IP"></input>
          <div>
            <button type="submit" onClick={defaultSetting}>configurar</button>
            <button type="submit" onClick={viewSetting}>visualizar</button>
          </div>
        </div>
      </header>
      <div className="log-title">
      </div>
      <div className="log">
      <div className="painel">
        <div className="caixa">
            <div className="title">IP</div>
            <div className="conteudo" id="IP">{dados.ip}</div>
        </div>
        <div className="caixa">
            <div className="title">Equipment</div>
            <div className="conteudo" id="equipment">{dados.equipament}</div>
        </div>
        <div className="caixa">
            <div className="title">PON</div>
            <div className="conteudo" id="version">{dados.pon}</div>
        </div>
      </div>
      <div className="painel">
        <div className="caixa">
            <div className="title" id="2g">2.4G</div>
            <div className="conteudo" id="version">{dados.rede2}<div>{dados.rede2band}</div></div>
        </div>
        <div className="caixa">
            <div className="title" id="5g">5G</div>
            <div className="conteudo" id="version">{dados.rede5}<div>{dados.rede5band}</div></div>
        </div>
        <div className="caixa">
            <div className="title" id="dns">DNS</div>
            <div className="conteudo" id="version">{dados.dns1}<div>{dados.dns2}</div><div>{dados.dns3}</div></div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;

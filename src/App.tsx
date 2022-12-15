import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes as Switch, Route } from "react-router-dom";
import ListaList from "./components/Lista-list";
import Lista from "./components/Lista";
import CadastraLista from "./components/Cadastra-lista";
import ItensList from "./components/Itens-list";
import CadastraItem from "./components/Cadastra-item";
import Header from "./components/Header";

function App() {
  return (
    <div className={"vh-100 bg-light "}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      />
      <Header />

      <div>
        <Switch>
          <Route path="/listas" element={<ListaList />} />
          <Route path="/listas/:id" element={<Lista />} />
          <Route path="/cadastra-lista" element={<CadastraLista />} />
          <Route path="/listas/:listaId/itens" element={<ItensList />} />
          <Route path="/itens/lista/:listaId" element={<CadastraItem />} />

          <Route path="*" element={<ListaList />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes as Switch, Route } from "react-router-dom";
import ListaList from "./screens/Lista-list";
import Lista from "./screens/Lista";
import CadastraLista from "./screens/Cadastra-lista";
import ItensList from "./screens/Itens-list";
import CadastraItem from "./screens/Cadastra-item";
import Header from "./components/Header";
import { ListaProvider } from "./contexts/ListaContext";
import { ItemProvider } from "./contexts/ItemContext";
import Item from "./screens/Item";

function App() {
  return (
    <ListaProvider>
      <ItemProvider>
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
              <Route path="/itens/:itemId/lista/:listaId" element={<Item />} />
              <Route path="/itens/lista/:listaId" element={<CadastraItem />} />

              <Route path="*" element={<ListaList />} />
            </Switch>
          </div>
        </div>
      </ItemProvider>
    </ListaProvider>
  );
}

export default App;

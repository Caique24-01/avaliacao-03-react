import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemService from "../services/ItemService";
import IItem from "../types/IItem";
import Item from "./Item";
import Loading from "./Loading";

const ItensList = () => {
  const { listaId } = useParams();
  const [itens, setItens] = useState<IItem[]>([]);
  const [selecionado, setSelecionado] = useState<IItem | null>(null);
  const [editar, setEditar] = useState<boolean>(false);
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");

  const [isLoading, setIsLoanding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoanding(true);
    ItemService.getAll(listaId as string)
      .then((response) => {
        setItens(response.data);
      })
      .catch((e) => {
        console.log(e);
        setErro(true);
        setMensagemErro(
          "Falha ao carregar itens, por favor tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }, [listaId]);

  function setAtivo(item: IItem) {
    const data: IItem = {
      id: item.id,
      titulo: item.titulo,
      concluido: item.concluido,
    };
    setSelecionado(data);
    setEditar(false);
  }

  function alterar() {
    setEditar(true);
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="list row mt-5">
          <div className="col-md-5 mx-5">
            <h1>Itens</h1>
            {erro ? (
              <div
                className="d-flex justify-content-center alert alert-danger"
                role="alert"
              >
                {mensagemErro}
              </div>
            ) : (
              <ul className="list-group">
                {itens.length > 0 ? (
                  itens.map((item: IItem) => (
                    <li
                      className={
                        "list-group-item " +
                        (item.id === selecionado?.id ? "active" : "")
                      }
                      onClick={() => setAtivo(item)}
                      key={item.id}
                    >
                      {item.titulo}
                    </li>
                  ))
                ) : (
                  <div className="alert alert-warning" role="alert">
                    Nenhuma item cadastrado
                  </div>
                )}
              </ul>
            )}
          </div>
          <div className="col-md-5">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-md btn-success px-5"
                onClick={() => navigate(`/itens/lista/${listaId}`)}
              >
                Novo item
              </button>
            </div>
            {selecionado ? (
              <div>
                {editar ? (
                  <Item {...selecionado} />
                ) : (
                  <div>
                    <h4 className="d-flex justify-content-center m-4">Itens</h4>
                    <div className="d-flex justify-content-center mb-5">
                      <div className="row row-cols-2">
                        <label>
                          <strong>Titulo:</strong>
                        </label>
                        <p>{selecionado.titulo}</p>
                        <label>
                          <strong>Status:</strong>
                        </label>
                        {selecionado.concluido ? (
                          <p>Concluído</p>
                        ) : (
                          <p>Não concluído</p>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-md btn-warning px-5"
                        onClick={() => alterar()}
                      >
                        <i className="bi bi-pencil-square pe-2" />
                        Editar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <br />
                {erro ? (
                  <p></p>
                ) : (
                  <p className="d-flex justify-content-center">
                    Selecione um item...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItensList;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemService from "../services/ItemService";
import IItem from "../types/IItem";
import Loading from "../components/Loading";
import { ListaContext } from "../contexts/ListaContext";
import { ItemContext } from "../contexts/ItemContext";

const ItensList = () => {
  const { listaId } = useParams();
  const [itens, setItens] = useState<IItem[]>([]);
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [isLoading, setIsLoanding] = useState(false);

  const { listaContexto } = useContext(ListaContext);
  const { itemContexto, setItemContexto } = useContext(ItemContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoanding(true);
    ItemService.getAll(listaId as string)
      .then((response) => {
        setItens(response.data);
      })
      .catch((e) => {
        setErro(true);
        setMensagemErro(
          "Falha ao carregar itens, por favor tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }, [listaId, itemContexto]);

  function getUpdate(item: IItem) {
    setItemContexto(item);
    navigate(`/itens/${item.id}/lista/${listaId}`);
  }
  
  function marcarDesconcluido(item: IItem) {
    ItemService.alterarParaDesconcluido(item.id as number)
      .then(() => {
        setItemContexto(item)
      })
      .catch(() => {
        setErro(true);
        setMensagemErro("Falha ao desconcluir item!");
      });
  }

  function marcarConcluido(item: IItem) {
    ItemService.alterarParaConcluido(item.id as number)
      .then(() => {
        setItemContexto(item)
      })
      .catch(() => {
        setErro(true);
        setMensagemErro("Falha ao concluir item!");
      });
  }

  return (
    <div className="m-5">
      <h1 className="d-flex justify-content-center mb-4">
        Lista {listaContexto?.titulo}
      </h1>
      <div className="col-md">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {erro ? (
              <div
                className="d-flex justify-content-center mx-5 alert alert-danger"
                role="alert"
              >
                {mensagemErro}
              </div>
            ) : (
              <table className="table table-sm table-light table-hover">
                <thead className="table-secondary col-7">
                  <tr>
                    <th className="col-5 text-uppercase">Status:</th>
                    <th className="col-5 text-uppercase"> Itens:</th>
                    <th className="col-2">
                      <button
                        className="btn btn-outline-success mx-4"
                        onClick={() => navigate(`/itens/lista/${listaContexto.id}`)}
                      >
                        Novo item
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itens.length > 0 ? (
                    itens.map((item: IItem) => (
                      <tr>
                        <td>
                          {item.concluido ? (
                            <button
                              className="m-2 btn btn-sm btn-outline-secondary"
                              onClick={() => {
                                marcarDesconcluido(item);
                              }}
                            >
                              <i className="bi bi-check-square pe-2"></i>
                              Desconcluir
                            </button>
                          ) : (
                            <button
                              className="m-2 btn btn-sm btn-outline-primary"
                              onClick={() => {
                                marcarConcluido(item);
                              }}
                            >
                              <i className="bi bi-check-square pe-2"></i>
                              Concluir
                            </button>
                          )}
                        </td>
                        <td>{item.titulo}</td>
                        <td>
                          <button
                            className="btn btn-warning mx-4"
                            onClick={() => {
                              getUpdate(item);
                            }}
                          >
                            <i className="bi bi-pencil-square pe-2" />
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      Nenhuma lista cadastrada
                    </div>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItensList;

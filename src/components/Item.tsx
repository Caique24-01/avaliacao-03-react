import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemService from "../services/ItemService";
import IItem from "../types/IItem";
import Loading from "./Loading";

const Item = (ItemProps: IItem) => {
  const { listaId } = useParams();
  const [item, setItem] = useState<IItem>();
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string>("");

  
  const [isLoading, setIsLoanding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const data: IItem = {
      id: ItemProps.id,
      titulo: ItemProps.titulo,
      concluido: ItemProps.concluido,
      lista: ItemProps.lista
    };
    setItem(data);
  }, [listaId, ItemProps]);

  function onChangeTitulo(texto: string, item: IItem) {
    const titulo = texto;

    const data: IItem = {
      id: item.id,
      titulo: titulo,
      concluido: item.concluido,
      lista: ItemProps.lista
    };

    setItem(data);
  }

  function update(item: IItem) {
    setIsLoanding(true)
    ItemService.update(listaId as string, item, item.id as number)
      .then(() => {
        setSucesso(true);
        setMensagemSucesso("Item atualizado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        setErro(true);
        setMensagemErro(
          "Falha ao atualizar a item, por faver tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }

  function remove(item: IItem) {
    setIsLoanding(true)
    ItemService.delete(item.id as number)
      .then(() => {
        setSucesso(true);
        setMensagemSucesso("Item removido com sucesso!");
      })
      .catch(() => {
        setErro(true);
        setMensagemErro("Falha ao excluir item!");
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }

  function marcarDesconcluido(item: IItem) {
    ItemService.alterarParaDesconcluido(item.id as number)
      .then(() => {
        setSucesso(true);
        setMensagemSucesso("Item desconcluído com sucesso!");
      })
      .catch(() => {
        setErro(true);
        setMensagemErro("Falha ao desconcluir item!");
      });
  }

  function marcarConcluido(item: IItem) {
    ItemService.alterarParaConcluido(item.id as number)
      .then(() => {
        setSucesso(true);
        setMensagemSucesso("Item concluído com sucesso!");
      })
      .catch(() => {
        setErro(true);
        setMensagemErro("Falha ao concluir item!");
      });
  }

  return (
    <div>
      { isLoading ? <Loading /> : 
    <div>
      {erro ? (
        <div className="alert alert-danger text-center mt-3" role="alert">
          {mensagemErro}
        </div>
      ) : (
        <div>
          {sucesso ? (
            <div>
              <div
                className="d-flex justify-content-center m-5 alert alert-success text-center "
                role="alert"
              >
                {mensagemSucesso}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-outline-primary px-5"
                  onClick={() => navigate(`/listas`)}
                >
                  Ok
                </button>
              </div>
            </div>
          ) : (
            <div>
              {item ? (
                <div className="edit-form mt-3">
                  <h4 className="d-flex justify-content-center mb-4">Item</h4>
                  <div className="d-flex justify-content-center m-4">
                    <form>
                      <div className="form-group">
                        <label htmlFor="title">Título:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          value={item.titulo}
                          onChange={(e) => onChangeTitulo(e.target.value, item)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="title">Status:</label>
                        {item.concluido ? (
                          <button
                            className="m-2 btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              marcarDesconcluido(item);
                            }}
                          >
                            <i className="bi bi-check-square pe-2"></i>
                            Desconcluir item
                          </button>
                        ) : (
                          <button
                            className="m-2 btn btn-sm btn-outline-primary"
                            onClick={() => {
                              marcarConcluido(item);
                            }}
                          >
                            <i className="bi bi-check-square pe-2"></i>
                            Concluir item
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="d-flex justify-content-center m-4">
                    <button
                      className="m-3 btn btn-sm btn-danger"
                      onClick={() => remove(item)}
                    >
                      Delete
                    </button>

                    <button
                      type="submit"
                      className="m-3 btn btn-sm btn-success"
                      onClick={() => update(item)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Por favor selecione um item...</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
    }
    </div>
  );
};

export default Item;

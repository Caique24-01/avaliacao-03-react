import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ItemService from "../services/ItemService";
import IItem from "../types/IItem";
import Loading from "../components/Loading";
import { ItemContext } from "../contexts/ItemContext";

const Item = () => {
  const { listaId } = useParams();
  const [item, setItem] = useState<IItem>();
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string>("");

  
  const [isLoading, setIsLoanding] = useState(false);
  const { itemContexto } = useContext(ItemContext)
  const navigate = useNavigate();

  useEffect(() => {
    const data: IItem = {
      id: itemContexto.id,
      titulo: itemContexto.titulo,
      concluido: itemContexto.concluido,
      lista: itemContexto.lista
    };
    setItem(data);
  }, [listaId, itemContexto]);

  function onChangeTitulo(texto: string, item: IItem) {
    const titulo = texto;

    const data: IItem = {
      id: item.id,
      titulo: titulo,
      concluido: item.concluido,
      lista: itemContexto.lista
    };

    setItem(data);
  }

  function update() {
    setIsLoanding(true)
    ItemService.update(listaId as string, item as IItem, item?.id as number)
      .then(() => {
        setSucesso(true);
        setMensagemSucesso("Item atualizado com sucesso!");
      })
      .catch(() => {
        setErro(true);
        setMensagemErro(
          "Falha ao atualizar a item, por faver tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }

  function remove() {
    setIsLoanding(true)
    ItemService.delete(item?.id as number)
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


  return (
    <div className="mt-5">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {erro ? (
            <div>
              <div
                className="d-flex justify-content-center mx-5 alert alert-danger text-center"
                role="alert"
              >
                {mensagemErro}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-outline-danger px-5"
                  onClick={() => navigate(`/listas/${listaId}/itens`)}
                >
                  Voltar
                </button>
              </div>
            </div>
          ) : (
            <div>
              {sucesso ? (
                <div>
                  <div
                    className="d-flex justify-content-center mx-5 alert alert-success text-center "
                    role="alert"
                  >
                    {mensagemSucesso}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-outline-success px-5"
                      onClick={() => navigate(`/listas/${listaId}/itens`)}
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <h4 className="d-flex justify-content-center mb-4">
                      Lista {item?.titulo}
                    </h4>
                    <div className="d-flex justify-content-center m-4">
                      <form>
                        <div className="form-group text-sm">
                          <label htmlFor="title">Título</label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={item?.titulo}
                            onChange={(e) => onChangeTitulo(e.target.value, item as IItem)}
                          />
                        </div>
                      </form>
                    </div>
                    {item?.titulo.trim() ? (
                      <div className="d-flex justify-content-center mt-5">
                        <button
                          className="btn btn-md btn-outline-primary m-3"
                          onClick={() => navigate(-1)}
                        >
                          {"< Voltar"}
                        </button>
                        <button
                          type="submit"
                          className="m-3 btn btn-md btn-success"
                          onClick={() => update()}
                        >
                          Update
                        </button>
                        <button
                          className="m-3 btn btn-md btn-danger"
                          onClick={() => remove()}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-center">
                          <div
                            className="alert alert-danger d-flex justify-content-cente px-4"
                            role="alert"
                          >
                            Titulo é obrigatório
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-md btn-outline-primary mt-3 px-4"
                            onClick={() => navigate(-1)}
                          >
                            {"< Voltar"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Item;

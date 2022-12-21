import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListaService from "../services/ListaService";
import ILista from "../types/ILista";
import Loading from "../components/Loading";

const Lista = () => {
  const [lista, setLista] = useState<ILista>();
  const { id } = useParams();
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string>("");

  const [isLoading, setIsLoanding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoanding(true);
    ListaService.get(id as string)
      .then((response) => {
        setLista(response.data);
      })
      .catch(() => {
        setErro(true);
        setMensagemErro(
          "Falha ao encontrar a lista, por favor tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }, [id]);

  function onChangeTitulo(texto: string) {
    const titulo = texto;

    const data: ILista = {
      titulo: titulo,
    };

    setLista(data);
  }

  function update() {
    setIsLoanding(true)
    ListaService.update(id as string, lista as ILista)
      .then(() => {
        setSucesso(true);
        setMensagemSucesso("Lista atualizado com sucesso!");
      })
      .catch(() => {
        setErro(true);
        setMensagemErro(
          "Falha ao atualizar a lista, por faver tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }

  function remove() {
    setIsLoanding(true)
    ListaService.delete(id as string)
      .then(() => {
        setSucesso(true);
        setMensagemSucesso("Lista removido com sucesso!");
      })
      .catch(() => {
        setErro(true);
        setMensagemErro(
          "Falha ao excluir a lista, por faver tente novamente mais tarde!"
        );
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
                  onClick={() => navigate("/listas")}
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
                      onClick={() => navigate("/listas")}
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <h4 className="d-flex justify-content-center mb-4">
                      Lista {lista?.titulo}
                    </h4>
                    <div className="d-flex justify-content-center m-4">
                      <form>
                        <div className="form-group text-sm">
                          <label htmlFor="title">Título</label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={lista?.titulo}
                            onChange={(e) => onChangeTitulo(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                    {lista?.titulo.trim() ? (
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

export default Lista;

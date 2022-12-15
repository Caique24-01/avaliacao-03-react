import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListaService from "../services/ListaService";
import ILista from "../types/ILista";
import Loading from "./Loading";

const CadastraLista = () => {
  const [titulo, setTitulo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");

  const [isLoading, setIsLoanding] = useState(false);

  const navigate = useNavigate();

  function criarLista() {
    const data: ILista = {
      titulo: titulo,
    };

    setIsLoanding(true);
    ListaService.create(data)
      .then((response) => {
        setTitulo(response.data.titulo);
        setSubmitted(true);
      })
      .catch((e: Error) => {
        console.log(e);
        setErro(true);
        setMensagemErro(
          "Falha ao cadastrar a lista, por favor tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }

  function novaLista() {
    setTitulo("");
    setSubmitted(false);
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="submit-form mt-5">
          {erro ? (
            <div
              className="d-flex justify-content-center alert alert-danger mx-5"
              role="alert"
            >
              {mensagemErro}
            </div>
          ) : (
            <div>
              {submitted ? (
                <div>
                  <div className="d-flex justify-content-center mt-5">
                    <h4>Cadastro realizado com sucesso!</h4>
                  </div>
                  <div className="d-flex justify-content-center mt-5">
                    <button
                      className="btn btn-success mt-4 me-2"
                      onClick={novaLista}
                    >
                      Adicionar nova lista
                    </button>
                    <button
                      className="btn btn-primary mt-4 ms-2"
                      onClick={() => navigate("/listas")}
                    >
                      Todas Listas
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="d-flex justify-content-center mb-4">
                    Adicionar Lista
                  </h4>
                  <div className="d-flex justify-content-center">
                    <div className="form-group pb-4">
                      <label htmlFor="titulo">Título</label>
                      <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        required
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        name="titulo"
                      />
                    </div>
                  </div>
                  {titulo.trim().length > 0 ? (
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-md btn-outline-primary m-2 mt-3 px-4"
                        onClick={() => navigate(-1)}
                      >
                        {"< Voltar"}
                      </button>
                      <button
                        onClick={criarLista}
                        className="btn btn-md btn-success  m-2 mt-3 px-4"
                      >
                        Cadastrar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex justify-content-center">
                        <div
                          className="alert alert-danger d-flex justify-content-cente py-2 px-3"
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
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CadastraLista;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemService from "../services/ItemService";

import IItem from "../types/IItem";
import Loading from "../components/Loading";

const CadastraItem = () => {
  const { listaId } = useParams();

  const [titulo, setTitulo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  
  
  const [isLoading, setIsLoanding] = useState(false);

  const navigate = useNavigate();

  function criarItem() {
    const data: IItem = {
      titulo: titulo,
      concluido: false,
      lista: {
        titulo: ""
      }
    };
    
    setIsLoanding(true)
    ItemService.create(listaId as string, data)
      .then((response) => {
        setTitulo(response.data.titulo);
        setSubmitted(true);
      })
      .catch((e: Error) => {
        console.log(e);
        setErro(true);
        setMensagemErro(
          "Falha ao cadastrar o item, por favor tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }

  function novoItem() {
    setTitulo("");
    setSubmitted(false);
  }

  return (
    <div>
      { isLoading ? <Loading /> : 
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
                  onClick={novoItem}
                >
                  Adicionar novo item
                </button>
                <button
                  className="btn btn-primary mt-4 ms-2"
                  onClick={() => navigate(-1)}
                >
                  Todos itens
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="d-flex justify-content-center mb-4">
                Adicionar Item
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
                    onClick={criarItem}
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
    }
    </div>
  );
};

export default CadastraItem;

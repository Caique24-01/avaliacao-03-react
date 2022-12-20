import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListaService from "../services/ListaService";
import ILista from "../types/ILista";
import Loading from "./Loading";

const ListaList = () => {
  const [listas, setListas] = useState<ILista[]>([]);
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>("");
  const [isLoading, setIsLoanding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoanding(true);
    ListaService.getAll()
      .then((response) => {
        setListas(response.data);
      })
      .catch(() => {
        setErro(true);
        setMensagemErro(
          "Falha ao carregar a listas, por favor tente novamente mais tarde!"
        );
      })
      .finally(() => {
        setIsLoanding(false);
      });
  }, []);

  return (
    <div className="m-5">
      <h1 className="d-flex justify-content-center mb-4">Listas</h1>
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
                    <th className="col-5 text-uppercase">Título lista:</th>
                    <th className="col-2">
                      <button
                        className="btn btn-outline-success mx-4"
                        onClick={() => navigate("/cadastra-lista")}
                      >
                        Nova Lista
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listas.length > 0  ? (
                    listas.map((lista: ILista) => (
                      <tr>
                        <td>{lista.titulo}</td>
                        <td>
                          <button
                            className="btn btn-outline-warning mx-4"
                            onClick={() => {
                              navigate(`/listas/${lista.id}`);
                            }}
                          >
                            <i className="bi bi-pencil-square pe-2" />
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-success mx-4"
                            onClick={() => {
                              navigate(`/listas/${lista.id}/itens`);
                            }}
                          >
                            <i className="bi bi-list-ol pe-2"></i>
                            Itens
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

export default ListaList;

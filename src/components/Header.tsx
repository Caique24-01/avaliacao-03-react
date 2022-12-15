import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="d-flex  navbar navbar-expand navbar-dark bg-dark">
      <Link
        to={"/listas"}
        className="m-auto p-3 navbar-brand text-warning fw-bold text-uppercase"
      >
        Avaliação 03
      </Link>
      
    </nav>
  );
};

export default Header;

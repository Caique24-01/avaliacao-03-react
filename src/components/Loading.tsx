export default function Loading() {
  return (
    <div  className="d-flex justify-content-center m-4">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

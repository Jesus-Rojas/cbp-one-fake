import './loading.css';

function Loading() {
  return (
    <div className='container-loading'>
      <div className="container-loader">
        <img className='logo-image' src="/assets/loading.png" alt="" />
        <span className="loader"></span>
      </div>
    </div>
  );
}

export { Loading };

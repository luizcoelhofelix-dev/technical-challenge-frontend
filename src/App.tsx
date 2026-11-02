import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  
  function goToGenres() {
    navigate('/genres');
  }

  function goToAuthors() {
    navigate('/authors');
  }

  function goToBooks() {
    navigate('/books');
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <button type="button" className="menu" onClick={goToGenres}>Gênero</button>
          </div>
          <div className='col-4'>
            <button type="button" className="menu" onClick={goToAuthors}>Autor</button>
          </div>
          <div className='col-4'>
            <button type="button" className="menu" onClick={goToBooks}>Livro</button>
          </div>
        </div>
      </div>      
    </>
  )
}

export default App

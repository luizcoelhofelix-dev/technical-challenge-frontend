import { useState, useEffect } from 'react';
import type { IGenre } from '../models/genre.tsx'
import { genreRepository } from '../repository/genre.repository.tsx';
import { useNavigate } from 'react-router-dom';

function Genre() {
  const navigate = useNavigate();
  const [newGenre, setNewGenre] = useState<IGenre>({ genre_code: 0} as IGenre);
  const [genres, setGenres] = useState<IGenre[] | null>(null);

   useEffect(() =>  {   
     loadGenresData();
  }, []);

  async function loadGenresData() 
  {
      try {
        const genresData = await genreRepository.getAll();
        setGenres(genresData);
      } catch (error) {
        console.log('Houve um erro ' + error)
      } 
  }

  async function handleAdd() {
    if (newGenre.genre_code < 0 || newGenre?.genre_description == '')
    {
        alert('Dados do gênero inválidos');
    }
    if (newGenre.genre_code == 0)
        await genreRepository.add(newGenre);
    else 
        await genreRepository.update(newGenre);
    await loadGenresData();
    setNewGenre({genre_code: 0} as IGenre);
  }

  function handleEdit(genre: IGenre) {
    setNewGenre(genre);
  }

  async function handleDelete(genre: IGenre) {
    await genreRepository.delete(genre.genre_code);
    await loadGenresData();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGenre({
        ...newGenre,
        genre_description: e.target.value 
    });
  };

  function goHome() {
    navigate('/');
  }

  return (
    <>
      
      <div className='container'>
        <div className='row justify-content-end' >
          <button type="button" className="menu" style={{width: '100px'}} onClick={goHome}>Home</button>
        </div>
        <div className='row'>
          <div className='col-4'>
            <b>Cadastro de Gênero</b>
          </div> 
                
        </div>
        <br/>        
        <br/>
        <div className='row'>
          <div className='col-8'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Nome Gênero
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="genre"
                    placeholder="Ex: Comédia"
                    value={newGenre.genre_description || ''} 
                    onChange={handleInputChange}
                />                   
            </div> 
            <br/> 
            <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleAdd()}
                >
                    {newGenre.genre_code == 0 ? 'Adicionar' : 'Alterar'}
            </button>
          </div> 
          <div className='col-4'>
           
          </div>            
        </div>
        <br/>        
        <br/>
        {genres?.length > 0 &&
            <div>
                <div className='row'>
                    <div className='col-4'>
                        <b>Lista de Gêneros</b>
                    </div>          
                </div>
                <div className="row">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col" style={{ width: '200px' }}>
                                Ações
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {genres.map((genre) => (
                                <tr key={genre.genre_code}>
                                <td>{genre.genre_code}</td>
                                <td>{genre.genre_description}</td>

                                <td>
                                    <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(genre)}
                                    >
                                        Alterar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(genre)}
                                    >
                                        Excluir
                                    </button>
                                    </div>
                                </td>
                                </tr>
                            ))}

                            {genres?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        Nenhum gênero cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div/>
                </div>
            </div>
        }
        </div>
    </>
  )
}

export default Genre
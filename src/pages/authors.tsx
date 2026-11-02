import { useState, useEffect } from 'react';
import { authorRepository } from '../repository/author.repository.tsx';
import { useNavigate } from 'react-router-dom';
import type { IAuthor } from '../models/Author.tsx';

function Author() {
  const navigate = useNavigate();
  const [newAuthor, setNewAuthor] = useState<IAuthor>({ author_code: 0} as IAuthor);
  const [authors, setAuthors] = useState<IAuthor[] | null>(null);

   useEffect(() =>  {   
     loadAuthorsData();
  }, []);

  async function loadAuthorsData() 
  {
      try {
        const authorData = await authorRepository.getAll();
        setAuthors(authorData);
      } catch (error) {
        console.log('Houve um erro ' + error)
      } 
  }

  async function handleAdd() {
    if (newAuthor.author_code < 0 ||
        newAuthor?.author_name.trim() == '' ||
        newAuthor?.author_country.trim() == '' ||
        newAuthor.author_dateOfBirth.toString() == '')
    {
        alert('Dados do autor inválidos');
        return ;
    }
    if (newAuthor.author_code == 0)
        await authorRepository.add(newAuthor);
    else 
        await authorRepository.update(newAuthor);
    await loadAuthorsData();
    setNewAuthor({author_code: 0} as IAuthor);
  }

  function handleEdit(author: IAuthor) {
    setNewAuthor(author);
  }

  async function handleDelete(author: IAuthor) {
    await authorRepository.delete(author.author_code);
    await loadAuthorsData();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.target;

  setNewAuthor((prevState) => ({
    ...prevState,
    [id]: value 
  }));
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
            <b>Cadastro de Autor</b>
          </div>                 
        </div>
        <br/>        
        <br/>
        <div className='row'>
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Nome Autor
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="author_name"
                    value={newAuthor.author_name || ''} 
                    onChange={handleInputChange}
                />                   
            </div>             
          </div> 
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    País
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="author_country"
                    value={newAuthor.author_country || ''} 
                    onChange={handleInputChange}
                />                   
            </div>
          </div>            
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Data Nascimento
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="author_dateOfBirth"
                    placeholder="Ex: 10/12/1992"
                    value={newAuthor.author_dateOfBirth?.toString() || ''} 
                    onChange={handleInputChange}
                />                   
            </div>             
          </div>                      
           <div className='col-6'>
               <button
                type="button"
                style={{ marginTop: "40px"}}
                className="btn btn-primary btn-sm"
                onClick={() => handleAdd()}
                >
                    {newAuthor.author_code == 0 ? 'Adicionar' : 'Alterar'}
            </button>          
          </div>
        </div>        
        <br/>        
        <br/>
        {authors?.length > 0 &&
            <div>
                <div className='row'>
                    <div className='col-4'>
                        <b>Lista de Autores</b>
                    </div>          
                </div>
                <div className="row">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">País</th>
                                <th scope="col">Data de Nascimento</th>
                                <th scope="col" style={{ width: '200px' }}>
                                Ações
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {authors.map((author) => (
                                <tr key={author.author_code}>
                                <td>{author.author_code}</td>
                                <td>{author.author_name}</td>
                                <td>{author.author_country}</td>
                                <td>{author.author_dateOfBirth?.toString()}</td>                                
                                <td>
                                    <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(author)}
                                    >
                                        Alterar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(author)}
                                    >
                                        Excluir
                                    </button>
                                    </div>
                                </td>
                                </tr>
                            ))}

                            {authors?.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        Nenhum autor cadastrado.
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

export default Author
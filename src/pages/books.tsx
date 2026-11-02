import { useState, useEffect } from 'react';
import { authorRepository } from '../repository/author.repository.tsx';
import { genreRepository } from '../repository/genre.repository.tsx';
import { bookRepository } from '../repository/book.repository.tsx';
import { useNavigate } from 'react-router-dom';
import type { IAuthor } from '../models/Author.tsx';
import type { IGenre } from '../models/genre.tsx';
import type { IBook } from '../models/book.tsx';

function Books() {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState<IBook>({ book_code: 0} as IBook);
  const [books, setBooks] = useState<IBook[] | null>(null);
  const [authors, setAuthors] = useState<IAuthor[] | null>(null);
  const [genres, setGenres] = useState<IGenre[] | null>(null);

   useEffect(() =>  {   
     loadBooksData();
     loadAuthorsList();
     loadGenresData();
  }, []);

  async function loadBooksData() 
  {
      try {
        const booksData = await bookRepository.getAll();
        setBooks(booksData);
      } catch (error) {
        console.log('Houve um erro ' + error)
      } 
  }

  async function loadAuthorsList() 
  {
      try {
        const listAuthors = await authorRepository.getAll();
        setAuthors(listAuthors);
      } catch (error) {
        console.log('Houve um erro ' + error)
      } 
  }

  async function loadGenresData() 
  {
      try {
        const listGenres = await genreRepository.getAll();
        setGenres(listGenres);
      } catch (error) {
        console.log('Houve um erro ' + error)
      } 
  }

  async function handleAdd() {
    console.log('newBook');
    console.log(newBook);
    
    if (newBook.book_code < 0 ||
        newBook.book_authorCode == undefined ||
        newBook.book_authorCode <= 0 ||
        newBook.book_genreCode <= 0 ||
        newBook.book_genreCode ==undefined ||
        newBook.book_title?.trim() == '' ||
        newBook.book_title == undefined)
    {
        alert('Dados do livro inválidos');
        return ;
    }
    if (newBook.book_code == 0)
        await bookRepository.add(newBook);
    else 
        await bookRepository.update(newBook);
    await loadBooksData();
    setNewBook({book_code: 0} as IBook);
  }

  function handleEdit(book: IBook) {
    setNewBook(book);
  }

  async function handleDelete(book: IBook) {
    await bookRepository.delete(book.book_code);
    await loadBooksData();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setNewBook((prevState) => ({
        ...prevState,
        [id]: value 
    }));
  };

  const handleGenreChange = (e) => { 
    const { value } = e.target;
    setNewBook(prev => ({
        ...prev,
        book_genreCode:  Number(value)
    }));
  };

  const handleAuthorChange = (e) => { 
    const { value } = e.target;
    setNewBook(prev => ({
        ...prev,
        book_authorCode:  Number(value)
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
            <b>Cadastro de Livros</b>
          </div>                 
        </div>
        <br/>        
        <br/>
        <div className='row'>
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Título do Livro
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="book_title"
                    value={newBook.book_title || ''} 
                    onChange={handleInputChange}
                />                   
            </div>             
          </div> 
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Preço
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="book_price"
                    value={newBook.book_price || ''} 
                    onChange={handleInputChange}
                />                   
            </div>
          </div>            
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Gênero
                </label>
                <select
                    className="form-select"
                    id="book_genreCode"
                    name="book_genreCode"
                    value={newBook.book_genreCode || '0'}
                    onChange={handleGenreChange}
                >
                    <option value="0">Escolha um gênero</option>

                    {genres?.map(genre => (
                        <option key={genre.genre_code} value={genre.genre_code}>
                            {genre.genre_description}
                        </option>
                    ))}
                </select>                   
            </div>             
          </div> 
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Autor
                </label>
                <select
                    className="form-select"
                    id="book_authorCode"
                    name="book_authorCode"
                    value={newBook.book_authorCode || '0'}
                    onChange={handleAuthorChange}
                >
                    <option value="0">Escolha um autor</option>

                    {authors?.map(author => (
                        <option key={author.author_code} value={author.author_code}>
                            {author.author_name}
                        </option>
                    ))}
                </select>                   
            </div>
          </div>            
        </div>
        <div className='row'>
          <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Data Publicação
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="book_publishDate"
                    value={newBook.book_publishDate?.toString() || ''} 
                    onChange={handleInputChange}
                />                   
            </div>             
          </div>                      
           <div className='col-6'>
            <div className="form-field">
                <label htmlFor="fieldText" className="form-label">
                    Description
                </label>
                <input
                    className="form-control"
                    id="book_description"
                    value={newBook.book_description || ''} 
                    onChange={handleInputChange}
                />                   
            </div>             
          </div>
        </div>  
        <div className='row'>                                
           <div className='col-6'>
               <button
                type="button"
                style={{ marginTop: "40px"}}
                className="btn btn-primary btn-sm"
                onClick={() => handleAdd()}
                >
                    {newBook.book_code == 0 ? 'Adicionar' : 'Alterar'}
            </button>          
          </div>
        </div>       
        <br/>        
        <br/>
        {books?.length > 0 &&
            <div>
                <div className='row'>
                    <div className='col-4'>
                        <b>Lista de Livros</b>
                    </div>          
                </div>
                <div className="row">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Código Gênero</th>
                                <th scope="col">Código Autor</th>
                                <th scope="col" style={{ width: '200px' }}>
                                Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.book_code}>
                                <td>{book.book_code}</td>
                                <td>{book.book_title}</td>
                                <td>{book.book_price}</td>
                                <td>{book.book_genreCode}</td>
                                <td>{book.book_authorCode}</td>                                
                                <td>
                                    <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(book)}
                                    >
                                        Alterar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(book)}
                                    >
                                        Excluir
                                    </button>
                                    </div>
                                </td>
                                </tr>
                            ))}

                            {books?.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        Nenhum livro cadastrado.
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

export default Books
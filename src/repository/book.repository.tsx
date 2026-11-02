import type { IBook} from '../models/book.tsx'; // Supondo que sua interface esteja em um arquivo de tipos
import type { IResponseHttp } from '../models/response.http';

const base_url = 'https://localhost:32843/api';

export const bookRepository = {  
  async getAll(): Promise<IBook[]> {
    const resposta = await fetch(base_url + '/Book');
    
    if (resposta.ok != true) {
      throw new Error('Falha ao buscar os gêneros');
    }

    const response: IResponseHttp = await resposta.json(); 
    
    const authorData: IBook[] = response.value as IBook[];
    
    return authorData;
  },
  async add(newBook: Omit<IBook, 'id'>): Promise<IBook> {
    const fetchResponse = await fetch(base_url+'/Book/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(newBook),
    });

    if (!fetchResponse.ok) {
      throw new Error('An error occured');
    }

    const response: IResponseHttp = await fetchResponse.json();
        
    return response.value as IBook;
  },
  async update(book: IBook): Promise<IBook> {
    const fetchResponse = await fetch(base_url+'/Book/update/'+ book.book_code, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(book),
    });

    if (!fetchResponse.ok) {
      throw new Error('An error occured');
    }

    const response: IResponseHttp = await fetchResponse.json();
        
    return response.value as IBook;
  },
  async delete(code: number): Promise<boolean> {
    const fetchResponse = await fetch(base_url +'/Book/delete/'+ code, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 
      }
    });

    if (!fetchResponse.ok) {
      throw new Error('An error occured');
    }

    const response: IResponseHttp = await fetchResponse.json();
        
    return response.value as boolean;
  }
};
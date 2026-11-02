import type { IAuthor} from '../models/Author'; // Supondo que sua interface esteja em um arquivo de tipos
import type { IResponseHttp } from '../models/response.http';

const base_url = 'https://localhost:32843/api';

export const authorRepository = {
  
  async getAll(): Promise<IAuthor[]> {
    const resposta = await fetch(base_url + '/Author');
    
    if (resposta.ok != true) {
      throw new Error('Falha ao buscar os autores');
    }

    const response: IResponseHttp = await resposta.json(); 
    
    const authorData: IAuthor[] = response.value as IAuthor[];
    
    return authorData;
  },
  async add(newAuthor: Omit<IAuthor, 'id'>): Promise<IAuthor> {
    const fetchResponse = await fetch(base_url+'/Author/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(newAuthor),
    });

    if (!fetchResponse.ok) {
      throw new Error('An error occured');
    }

    const response: IResponseHttp = await fetchResponse.json();
        
    return response.value as IAuthor;
  },
  async update(author: IAuthor): Promise<IAuthor> {
    const fetchResponse = await fetch(base_url+'/Author/update/'+ author.author_code, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(author),
    });

    if (!fetchResponse.ok) {
      throw new Error('An error occured');
    }

    const response: IResponseHttp = await fetchResponse.json();
        
    return response.value as IAuthor;
  },
  async delete(code: number): Promise<boolean> {
    const fetchResponse = await fetch(base_url +'/Author/delete/'+ code, {
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
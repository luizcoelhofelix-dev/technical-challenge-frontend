import type { IGenre } from '../models/genre'; // Supondo que sua interface esteja em um arquivo de tipos
import type { IResponseHttp } from '../models/response.http';

const base_url = 'https://localhost:32843/api';

export const genreRepository = {
  
  async getAll(): Promise<IGenre[]> {
    const resposta = await fetch(base_url + '/Genre');
    
    if (resposta.ok != true) {
      throw new Error('Falha ao buscar os gêneros');
    }

    const response: IResponseHttp = await resposta.json(); 
    
    const genreData: IGenre[] = response.value as IGenre[];
    
    return genreData;
  },
  async add(newGenre: Omit<IGenre, 'id'>): Promise<IGenre> {
    const fetchResponse = await fetch(base_url+'/Genre/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(newGenre),
    });

    if (!fetchResponse.ok) {
      throw new Error('An error occured');
    }

    const response: IResponseHttp = await fetchResponse.json();
        
    return response.value as IGenre;
  },
  async update(genre: IGenre): Promise<IGenre> {
    const fetchResponse = await fetch(base_url+'/Genre/update/'+ genre.genre_code, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(genre),
    });

    if (!fetchResponse.ok) {
      throw new Error('An error occured');
    }

    const response: IResponseHttp = await fetchResponse.json();
        
    return response.value as IGenre;
  },
  async delete(code: number): Promise<boolean> {
    const fetchResponse = await fetch(base_url +'/Genre/delete/'+ code, {
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
import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';

@Service()
export class ItemsService {
  http = inject(HttpClient);
  baseurl = '/items';

  items = signal<Item[]>([]);

  create(item: Item) {
    return this.http.post<ResponseItem>(this.baseurl, item);
  }

  getAll() {
    return this.http.get<ResponseItem>(this.baseurl);
  }

  getById(id: number) {
    return this.http.get<ResponseItemById>(`${this.baseurl}/${id}`);
  }

  update(id: Item['id'], payload: Partial<Omit<Item, 'id'>>) {
    return this.http.patch<ResponseItem>(`${this.baseurl}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete<ResponseItem>(`${this.baseurl}/${id}`);
  }
}

type Item = {
  id: number;
  name: string;
  description: string;
};

export type ResponseItem = {
  success: boolean;
  data: Item[];
};

type ResponseItemById = {
  success: boolean;
  data: Item;
};

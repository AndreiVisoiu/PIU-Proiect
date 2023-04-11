import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly baseUrl = "https://localhost:44385/api/item";
  //readonly getItemById = "https://localhost:44385/api/item/getItems/";
  //readonly post = "https://localhost:44385/api/item/post";
  //readonly delete = "https://localhost:44385/api/item/delete/{id}";
  //readonly edit = "https://localhost:44385/api/item/edit/{id}";

  constructor(public httpClient: HttpClient) { }

  getItems(): Observable<Item[]>{
    return this.httpClient.get(this.baseUrl + "get") as Observable<Item[]>; 
  }

  getItemById(id: number): Observable<Item>{
    return this.httpClient.get(this.baseUrl + "getItems/" + id) as Observable<Item>; 
  }

  createItem(item: Item): Observable<Item> {
    return this.httpClient.post(this.baseUrl + "post/", item) as Observable<Item>;
  }

  deleteItem(id: number): Observable<null>{
    return this.httpClient.delete(this.baseUrl + "delete/" + id) as unknown as Observable<null>;
  }

  editItem(item: Item): Observable<null>{
    return this.httpClient.put(this.baseUrl + "edit/" + item.id, item) as unknown as Observable<null>;
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.baseUrl='https://jsonplaceholder.typicode.com/posts';
  }

  getAll():Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl).toPromise();
  }

  //nota:Solo sirve con el id=1
  getById(nId:number):Promise<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/${nId}`).toPromise();
  }

  create({title, body, userId}):Promise<any>{
    const bodyRequest = {title, body, userId};
    
    //Creando cabecera para cuando lo pide el servidor 
    const httpOptios={
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=UTF-8'
      })
    }
    
    return this.httpClient.post<any>(this.baseUrl, bodyRequest, httpOptios).toPromise();
  }

  update({id, title, body, userId}): Promise<any>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, {id,title,body,userId}).toPromise();
  }

  delete(id):Promise<any>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`).toPromise();
  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseUrl ='https://my-json-server.typicode.com/pankajgour/myproduct/productList/';
  constructor(private httpClient :HttpClient) {
   }

   postProduct(data :any)
   {
     return this.httpClient.post<any>(this.BaseUrl,data);
   }
   getProduct()
   {
    return this.httpClient.get<any>(this.BaseUrl);
   }
   putProduct(data:any,id:number)
   {
     return this.httpClient.put<any>(this.BaseUrl+id,data);
   }
   deleteProduct(id:number)
   {
return this.httpClient.delete<any>(this.BaseUrl+id);
   }
}

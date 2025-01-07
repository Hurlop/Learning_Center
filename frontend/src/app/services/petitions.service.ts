import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {
  constructor(private http: HttpClient) { }
  requestOptions:any = {}
  hostReal:string = "http://localhost:3000"
  
  post(url:string, payload:any){
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //Encabezado
        }),withCredentials:true
      }
      this.http.post(url,payload,this.requestOptions).toPromise()
      .then((res:any) => {
        console.log(res)
        resolve(res)
      }).catch((error) =>{
        console.log(error)
        reject(error)
      })
    })
    return promise
  }

  put(url:string, payload:any){
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //Encabezado
        }),withCredentials:true
      }
      this.http.put(url,payload,this.requestOptions).toPromise()
      .then((res:any) => {
        console.log(res)
        resolve(res)
      }).catch((error) =>{
        console.log(error)
        reject(error)
      })
    })
    return promise
  }

  delete(url:string, payload:any){
    let promise = new Promise((resolve, reject) => {
      this.http.delete(url,payload).toPromise()
      .then((res:any) => {
        console.log(res)
        resolve(res)
      }).catch((error) =>{
        console.log(error)
        reject(error)
      })
    })
    return promise
  }

  get(url:string){
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //Encabezado
        }),withCredentials:true
      }
      this.http.get(url,this.requestOptions).toPromise()
      .then((res:any) => {
        resolve(res)
      }).catch((error) =>{
        console.log(error)
        reject(error)
      })
    })
    return promise
  }
}

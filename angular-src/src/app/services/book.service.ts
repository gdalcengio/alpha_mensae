import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Book{
  id?: String;
  title?: String;
  author?: String;
  review?: String;
  publisher?: String;
  img?: String;
  link?: String;
  tags?: String[];
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  storeBookData(book: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/books/addabook', book, httpOptions).pipe(res => res);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    };

    const endpoint = 'http://localhost:3000/books/img/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, httpOptions).pipe(
        map(() => { return true; })
      )
      // .catch((e: any) => this.handleError(e));

  }
  // private handleError(e: any) {
  //   console.error('An error occurred', e); // for demo purposes only
  //   // throw new Error('Method not implemented.');
  //   // return Promise.reject(e.message || e);
  // }

  public getAllBooks(): Observable<any> {
    console.log('hit book service');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>('http://localhost:3000/books/getBooks', httpOptions).pipe(res => res);
  }

}

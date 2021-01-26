import { Component, OnInit } from '@angular/core';

// import { Book } from '.models/Book';
import { Book, BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor(
    private bookService:BookService,
    private router:Router,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
    this.getAllBook();
    console.log("init");
  }

  getAllBook(){
    console.log("hit");
    this.bookService.getAllBooks().subscribe(result => {
      // this.books = result;
      if ((result as any).success) {
        //data is stored
        // this.router.navigate(['books']);
        console.log('data is stored in service');
        console.log(result);
        this.books = result;
      } else {
        console.log('failure');
      };
    });
  }

}

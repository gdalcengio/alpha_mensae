import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  title: String ="";
  author: String ="";
  publisher: String ="";
  review: String ="";
  link: String ="";
  img: String ="";

  constructor(
    private bookService:BookService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onBookSubmit() {
    const book = {
      title : this.title,
      author : this.author,
      publisher: this.publisher,
      review: this.review,
      link: this.link,
      img: this.img
    }

    this.bookService.storeBookData(book).subscribe(data => {
      if ((data as any).success) {
        //data is stored
        // this.router.navigate(['books']);
        console.log('data is stored in service');
      } else {
        console.log('data is not stored, service failed');
      };

    });
  }



}

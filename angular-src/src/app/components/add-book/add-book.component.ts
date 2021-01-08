import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
  }

}

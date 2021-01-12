import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;

  title: String ="";
  author: String ="";
  publisher: String ="";
  review: String ="";
  link: String ="";
  img: String ="";

  constructor(
    private bookService:BookService,
    private router:Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
  }

  submitBook(filename: String) {
    const book = {
      title : this.title,
      author : this.author,
      publisher: this.publisher,
      review: this.review,
      link: this.link,
      img: filename,

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

  onFileUpload() {
    const imageBlob = this.fileInput?.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);

    this.http.post<any>('http://localhost:3000/image-upload', file).subscribe(response => {
      console.log(response.filename);
      // this.submitBook(response[3]);
    });

  }


}

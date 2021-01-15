import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  form: FormGroup;
  Data: Array<any> = [
    { name: 'Adventure', value: 'adventure' },
    { name: 'Biography', value: 'biography' },
    { name: 'Fiction', value: 'fiction' },
    { name: 'Memoires', value: 'memoires' },
    { name: 'Native', value: 'native' },
    { name: 'Non-Fiction', value: 'non-fiction'},
    { name: 'Politics', value: 'politics'},
    { name: 'Science Fiction', value: 'science fiction'},
    { name: 'History', value: 'history'},
    { name: 'Teen', value: 'teen'},
    { name: 'Western', value: 'western'}
  ];

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;

  title: String ="";
  author: String ="";
  publisher: String ="";
  review: String ="";
  link: String ="";
  img: String ="";
  checkArr: Array<String> = [];

  constructor(
    private bookService:BookService,
    private router:Router,
    private http:HttpClient,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          this.checkArr = checkArray.value;
          return;
        }

        i++;
      });
    }

    console.log(checkArray.value);

    this.checkArr = checkArray.value;
  }

  submitBook(filename: String) {
    const book = {
      title : this.title,
      author : this.author,
      publisher: this.publisher,
      review: this.review,
      link: this.link,
      img: filename,
      tags: this.checkArr
    }

    console.log(book.tags);

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
      this.submitBook(response.filename);
    });

  }


}

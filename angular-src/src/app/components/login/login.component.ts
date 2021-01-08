import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String="";
  password: String="";

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      let dataSuccess = (data as any).success;
      console.log(data);

      if ((data as any).success) {
        //store data
        this.authService.storeUserData((data as any).token, (data as any).user);

        //redirect
        this.router.navigate(['books/add']);
      } else {
        // this.flash.message.show();
        console.log((data as any).msg);
        this.router.navigate(['login']);
      }
    });
  }

}

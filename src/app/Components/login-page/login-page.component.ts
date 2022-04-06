import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public userName: string;
  public password: string;
  public isAdmin: boolean;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.userName = '';
    this.password = '';
    this.isAdmin = false;
  }
  onSubmit(form: NgForm): void {
    sessionStorage.setItem('UserName', this.userName);
    this.router.navigate(['home'], { relativeTo: this.route });
    console.log(
      'formdata: Name : ' + this.userName + ' password: ' + this.password
    );
  }
  showPasswordField() {
    this.isAdmin = !this.isAdmin;
  }
  ngOnInit(): void {}
}

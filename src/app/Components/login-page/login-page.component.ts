import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public userName: string;
  public password: string;
  public isAdmin: boolean;
  public isLoading: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.userName = '';
    this.password = '';
    this.isAdmin = false;
    this.isLoading = false;
  }
  async onSubmit(form: NgForm): Promise<void> {
    sessionStorage.setItem('UserName', this.userName);
    if (this.password != '') {
      await this.userService
        .login(this.userName, this.password)
        .subscribe((res) => {
          this.isLoading = true;
          if (res == 'Logged In') {
            sessionStorage.setItem('isAdmin', 'true');
            setTimeout(() => {
              this.router.navigate(['home/ViewFlights'], {
                relativeTo: this.route,
              });
            }, 1000);
          } else {
            this.isLoading = false;
            window.alert('Wrong UserName/Password entered');
          }
        });
    } else {
      this.router.navigate(['home/ViewFlights'], {
        relativeTo: this.route,
      });
    }
  }
  showPasswordField() {
    this.isAdmin = !this.isAdmin;
  }
  ngOnInit(): void {}
}

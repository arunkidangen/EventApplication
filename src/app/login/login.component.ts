import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataserviceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  loginUserId: any
  loginPassword: any

  loginForm = this.formBuilder.group({
    loginUserId: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]],
    loginPassword: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
  })

  login() {
    if (this.loginForm.valid) {

      var loginUserId = this.loginForm.value.loginUserId;
      var loginPassword = this.loginForm.value.loginPassword;
      this.dataService.login(loginUserId, loginPassword).subscribe((result: any) => {
        if (result) {
          localStorage.setItem("token",result.token)
          localStorage.setItem("currentUserId",result.currentUser)
          localStorage.setItem("currentUserName",result.currentUserName)
          
          
          this.router.navigateByUrl("dashboard")
        }
      },
        (result: any) => {
          alert(result.message)
        })

    } else {
      alert("invalid form")
    }
  }
}


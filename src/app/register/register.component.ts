import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserId='';
  registerPassword="";
  registerUserName="";

  registerFrom=this.formBuilder.group({
  registerUserName : ["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  registerPassword : ["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  registerUserId   : ["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

  constructor(private formBuilder:FormBuilder,private dataservices: DataserviceService) { }

  ngOnInit(): void {
  }
  

  register(){
    if(this.registerFrom.valid){
      
      var username=this.registerFrom.value.registerUserName
      var password=this.registerFrom.value.registerPassword
      var userId=this.registerFrom.value.registerUserId
      this.dataservices.register(username,password,userId).subscribe( (result:any) =>{
        if(result){
          alert(result.message);
        }
      },(result:any)=>{
        alert(result.error.message)
      })

    }
    else{
      alert('invalid')
    }
  }

}

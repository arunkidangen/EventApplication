import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUserId: any;
  currentUserName:any;
  events:any
  constructor(private router:Router,private dataServices: DataserviceService) { 
this.currentUserName=localStorage.getItem("currentUserName")
this.getEventsForTheDay();

  }
  
  ngOnInit(): void {
  }

  addEventFromParent() {
    //console.log(localStorage.getItem("currentUserId"));
    
    this.currentUserId = localStorage.getItem("currentUserId")
  }



  cancel(){
    this.currentUserId="";
  }

  addEventSuccessHandler(event:any){
    alert(event.message);
    this.currentUserId="";
  }

  viewEvents(){
    this.router.navigateByUrl("viewEvents")
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl("")
  }

  getEventsForTheDay(){
  var  currentUserId = localStorage.getItem("currentUserId")
this.dataServices.getEventsForTheDay(currentUserId).subscribe((result:any) =>{
  if (result.events !=""){
      this.events =result.events
  }
})
  }
}

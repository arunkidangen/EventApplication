import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  events: any;
  eventId: any
  currentUserName:any
  constructor(private dataServices: DataserviceService, private router : Router) {
    this.populateEventDetails();
    this.currentUserName=localStorage.getItem("currentUserName")
  }

  ngOnInit(): void {
  }
  populateEventDetails() {
    var currentUserId = localStorage.getItem("currentUserId")
    this.dataServices.fetchEvents(currentUserId).subscribe((result: any) => {
      if (result) {
        if(result.events.length >0)
        this.events = result.events
        else
        this.events =""
      }
    },
      (result: any) => {

      })

  }
  delete(event: any) {
    var id = event.currentTarget.attributes.id.value;
    this.dataServices.deleteEvent(id).subscribe((result: any) => {
      if (result) {
        this.populateEventDetails();
        alert(result.message)
      }
    })
  }

  edit(event: any) {
    this.eventId = event.currentTarget.attributes.id.value
  }


  updateSuccessHandler(event: any){
    if(event == "success"){
      this.populateEventDetails();
    }else{
      this.eventId ="";
    }
  }

  viewDashBoard(){
    this.router.navigateByUrl("dashboard")
  }
}

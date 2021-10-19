import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  @Input() eventId : string | undefined

  @Output () updateSuccessHandler =new EventEmitter()

  eventDescription="";
  eventName="";
  eventDate="";

  constructor(private dataservice :DataserviceService) { }

  ngOnInit(): void {
  }

  update(){
    var id=this.eventId;
    var eventDescription=this.eventDescription
    var eventName=this.eventName
    var  eventDate=this.eventDate
    
    this.dataservice.update(id,eventDescription,eventName,eventDate).subscribe((result:any)=>{
      if (result){
        alert("Event Updated Successfully");
        this.updateSuccessHandler.emit('success')
      }
    })
  

  }

  cancel(){
    this.updateSuccessHandler.emit()
  }



}

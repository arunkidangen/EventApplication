import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {


  eventName = "";
  eventDate = "";
  eventDescription = "";
  @Input()
  item: string | undefined


  @Output() onCancel = new EventEmitter();

  @Output() addEventSuccessHandler = new EventEmitter();

  constructor(private dataService: DataserviceService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
addEventform = this.formBuilder.group({
  eventName:["",[Validators.required,Validators.pattern('[a-zA-Z-0-9]*')]],
  eventDate:["",[Validators.required,Validators.pattern('[a-zA-Z-0-9]*')]],
  eventDescription:[""]
})
  addEvent() {
    var eventName = this.addEventform.value.eventName;
    var eventDate = this.addEventform.value.eventDate;
    var eventDescription = this.addEventform.value.eventDescription;
if(this.addEventform.valid){


    this.dataService.addEvent(eventName, eventDate, eventDescription).subscribe((result: any) => {
      if (result) {
        this.addEventSuccessHandler.emit(result);
      this.eventDate="";
      this.eventName="";
      this.eventDescription="";
      }
    }, (result: any) => {
      this.addEventSuccessHandler.emit(result);
    })
  }
else{
  alert("Invalid Form")
}}

  cancel() {
    this.onCancel.emit();
  }
}

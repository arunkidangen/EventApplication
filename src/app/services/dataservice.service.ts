import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
const options = {
  withCredential: true,
  headers: new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
 

  constructor(private http: HttpClient) { }

  getOptions() {
    const token = localStorage.getItem("token");
    let header = new HttpHeaders;
    if (token) {
      header = header.append("token", token);
      options.headers = header;
    }
    return options;
  }

  login(loginUserId: any, loginPassword: any) {
    const data = {
      loginUserId,
      loginPassword
    }
   // return this.http.post(environment.baseUrl + "/login", data, options);
   return this.http.post( "/login", data, options);
  }


  register(user: any, password: any, userId: any) {
    const data = {
      user,
      password,
      userId
    }
    //return this.http.post(environment.baseUrl + "/register", data)
    return this.http.post( "/register", data)
  }

  addEvent(eventName: string, eventDate: string, eventDescription: string) {
    const data = {
      eventName,
      eventDate,
      eventDescription
    }
    //return this.http.post(environment.baseUrl + "/addEvent", data,this.getOptions())
    return this.http.post("/addEvent", data,this.getOptions())

  }

  fetchEvents(currentUserId: string | null) {
    const data ={
      currentUserId:currentUserId
    }
    //return this.http.post(environment.baseUrl+"/viewEvents",data,this.getOptions())
    return this.http.post("/viewEvents",data,this.getOptions())
    
  }

  deleteEvent(id:any){
    const data ={
      id:id
    }
   // return this.http.post(environment.baseUrl+"/deleteEvent",data,this.getOptions())
   return this.http.post("/deleteEvent",data,this.getOptions())
  }

  update(id:any,eventDescription:any,eventName:any,eventDate:any){
    const data={
      id:id,
      eventDescription:eventDescription,
      eventName:eventName,
      eventDate:eventDate
      
    }
   // return this.http.put(environment.baseUrl+"/updateEvent",data,this.getOptions())
   return this.http.put("/updateEvent",data,this.getOptions())
  }

  getEventsForTheDay(id:any){
    const data ={
      userId:id,
      date: new Date()

    }
   // return this.http.post(environment.baseUrl+"/getEventsForTheDay",data,this.getOptions())
   return this.http.post("/getEventsForTheDay",data,this.getOptions())
  }
}

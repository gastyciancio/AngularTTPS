import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_data:any;

  constructor(public user:UsersService) { }

  ngOnInit(): void {
    this.getUser();
  }

  logOut(){
    this.user.logOut()
  }

  getUser(){
    this.user.getUser().subscribe(
      data =>{this.user_data=data;console.log(this.user_data),
        console.log(data);})// aca esta la data del usuario
    
  }

}

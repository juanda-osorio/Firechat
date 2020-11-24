import { ChatService } from './../../providers/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string){
    console.log(proveedor);
    this._chatService.login(proveedor);
  }

}

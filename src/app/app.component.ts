import { ChatService } from './providers/chat.service';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'firechat';
  chats: Observable<any[]>;

  constructor(firestore: AngularFirestore,
              public _chatServe: ChatService){
    this.chats = firestore.collection('chats').valueChanges();
  }
}

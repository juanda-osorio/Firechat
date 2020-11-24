import { ChatService } from './../../providers/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {
    
  mensaje: string = "";
  elemento: any;

  constructor(public _chatService: ChatService) {
    /* El 'subscribe' hace que se ejecute la función cargarMensajes del Servicio
     * y será en el servicio donde se manipulen los datos que vienen  */
    this._chatService.cargarMensajes()
      .subscribe( ()=>{
        setTimeout( ()=>{
          // Con esto hace que la pantalla se pongo abajo del todo siempre
          this.elemento.scrollTop = this.elemento.scrollHeight
        }, 20)
      });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    if (this.mensaje.length > 0) {
      this._chatService.agregarMensaje(this.mensaje)
        .then( ()=> this.mensaje = "" )
        .catch( (err)=> console.error("Error al enviar", err) );
    }else{
      //Crear mensaje: debes escribir algo!
    }

  }

}

import { Mensaje } from './../interfaces/mensaje.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /* Sacado de la docu de angularFire (collections) */
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};



  constructor( private afs: AngularFirestore,
               public auth: AngularFireAuth ) {     
    /* Con la autenticación estamos sacando la info del usuario y asignándosela 
    *  a nuestras propiedades de la interfaz, con el fin de guardarlas en Firebase. */
    this.auth.authState.subscribe( user =>{

      if (!user) {
        return;        
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });                
  }
  

  cargarMensajes(){
    /* 'chats' entre comillas, es como se llama la colección de mensajes 
     * que se encuentra en FIREBASE */
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'asc')
      .limitToLast(5));

    return this.itemsCollection.valueChanges().
    /* Aqui se manipulan los datos que vienen del firebase y que se ejecutaron
     * gracias al subscribe del componente. */
      pipe(
        map( (mensajes: Mensaje[]) =>{
          this.chats = mensajes;
          /* Esto era para meterlos al inicio el array y sacarlos ordenados,
          *  pero un compañero descubrió la funcion usada mas arriba .limitToLast()
          *  y saca los mensajes como queresmos: solo los 5 ultimos.
          *  Por esto, nos ahorramos el siguiente codigo
          this.chats = [];
          for (const mensaje of mensajes) {
            this.chats.unshift( mensaje )
          }
          return this.chats; //return opcional
          */
        })
      )
  }


  agregarMensaje( texto: string ){

    let mensaje: Mensaje = {
      uid: this.usuario.uid,
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime()
    }
    return this.itemsCollection.add(mensaje);
  }


  login(prov: string){
    if (prov === "google") {
      this.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider() );      
    }else{
      this.auth.signInWithPopup( new firebase.auth.GithubAuthProvider() );      
    }
  }
  logout(){
    this.usuario = {};
    this.auth.signOut();
  }

}

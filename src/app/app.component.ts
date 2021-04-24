import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from './servicios/post.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arrPost: any[];
  formulario: FormGroup;
  items: Observable<any[]>;

  constructor(private postService: PostService,  private firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
    this.formulario = new FormGroup({
      title: new FormControl(''),
      body: new FormControl(''),
      userId: new FormControl('')
    })
  }

  ngOnInit() {
    this.postService.getAll()
      .then(posts => this.arrPost = posts)
      .catch(error => console.log(error));
  }

  async onClick(postId) {
    try {
      const post = await this.postService.getById(postId);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  }

  onClickPost() {
    this.postService.create({
      title: 'nuevo titulo',
      body: 'Este es el cuerpo',
      userId: 1
    }).then(response => console.log(Response))
      .catch(error => console.log(error));
  }

  async onSubmit() {
    try {
      const respuesta = await this.postService.create(this.formulario.value);
      console.log(respuesta);
    } catch (error) {
      console.log(error);
    }
  }

  onClickUpdate(){
    this.postService.update({
      id:5,
      title:'nuevo titulo',
      body:'nuevo cuerpo',
      userId:3
    }).then(response=> console.log(response))
    .catch(error => console.log(error))
  }

  async onClickDelete(){
    try{
      const response = await this.postService.delete(5);
    }catch(error){
      console.log(error);
    }

  }
}

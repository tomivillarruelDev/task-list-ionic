import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor( public whishesService: WishesService,
               private router: Router,
               private alertCtrl: AlertController   ) {}

 async addList(){
    const alert = await this.alertCtrl.create(
      {
        header: 'Nueva lista',
        inputs: [
          {
            name: 'title',
            type: 'text',
            placeholder: 'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel');
            }
          },
          {
            text: 'Crear',
            handler: ( data ) => {
              console.log(data);
              if ( data.title.length === 0 ){
                return;
              }

              const listId = this.whishesService.createList( data.title );

              this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`)

            }
          }
        ]
      }); 

     alert.present();
  }

  
}

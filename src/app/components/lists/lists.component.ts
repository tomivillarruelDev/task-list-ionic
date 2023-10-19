import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WishesService } from 'src/app/services/wishes.service';
import { List } from 'src/app/models/list.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent  implements OnInit {

  @Input() completed = true;
  @ViewChild( IonList ) list!: IonList;

  constructor( public  whishesService: WishesService,
               private router: Router,
               private alertCtrl: AlertController ) { }

  ngOnInit() {}

  listNavigate( list: List ){
    const listId = list.id;

    if ( this.completed ) {
      this.router.navigateByUrl(`/tabs/tab2/add/${ listId }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`);
    }
  }

  deleteList( list: List) {
    this.whishesService.deleteList( list );
  }

  async editList( list: List ){
    const alert = await this.alertCtrl.create(
      {
        header: 'Editar lista',
        inputs: [
          {
            name: 'title',
            type: 'text',
            placeholder: 'Nombre de la lista',
            value: list.title
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.list.closeSlidingItems();
            }
          },
          {
            text: 'Editar',
            handler: ( data ) => {
              console.log(data);
              if ( data.title.length === 0 ){
                return;
              }
              list.title = data.title;
              this.whishesService.saveStorage();
              this.list.closeSlidingItems();

            }
          }
        ]
      }); 

     alert.present();

  }

}

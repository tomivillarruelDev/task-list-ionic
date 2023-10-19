import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListItem } from 'src/app/models/list-item.model';
import { List } from 'src/app/models/list.model';
import { WishesService } from 'src/app/services/wishes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  item: string = '';

  constructor( private wishesService: WishesService, 
               private activatedRoute: ActivatedRoute ) { 

    const listId = this.activatedRoute.snapshot.paramMap.get('listId')!;

    this.list = this.wishesService.getList( listId );
  }

  ngOnInit() {
  }

  addItem(){
    if ( this.item.length === 0 ){
      return; 
    }

    const newItem = new ListItem( this.item );
    this.list.items.push( newItem );

    this.item = ''; 

    this.wishesService.saveStorage();
  }

  changeCheck( item: ListItem ){
    console.log(item);
    const pending = this.list.items.filter( itemData => !itemData.completed ).length;

    if ( pending === 0 ){
      this.list.finishedIn = new Date();
      this.list.completed = true;
    } else {
      this.list.finishedIn = undefined;
      this.list.completed = false;
    }
  }

  deleteItem( i: number ){
    this.list.items.splice( i, 1 );
    this.wishesService.saveStorage();
    
  }

}

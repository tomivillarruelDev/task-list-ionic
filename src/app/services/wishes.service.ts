import { Injectable } from '@angular/core';

import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {

  lists: List[] = []

  constructor() { 
    this.loadStorage();
  }

  createList( title: string ){
    const newList = new List( title );
    this.lists.push( newList );
    this.saveStorage();

    return newList.id;
  }

  deleteList( list: List) {
    this.lists = this.lists.filter( listData => listData.id !== list.id); 
    this.saveStorage();
  }

  getList( id: string | number ): List {
    id = Number(id);
    const list = this.lists.find( listData => listData.id === id);
    return list!;

  }

  saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  loadStorage() {
    const storedData = localStorage.getItem('data');
    if (storedData !== null) {
      this.lists = JSON.parse(storedData);
    } else {
      this.lists = [];
    }
  }
}

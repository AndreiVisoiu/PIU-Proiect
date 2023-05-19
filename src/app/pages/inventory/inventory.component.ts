import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InventoryComponent implements OnInit{
  error?: string;
  itemList!: Item[];

constructor(public dialog: MatDialog, public itemService: ItemService) { }

async openDialog(id: number |undefined | null) {
  const dialogRef = this.dialog.open(FormComponent, {
    width: '16rem', 
    data: {idToBeEdit: id },
  });
  
  dialogRef.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
};

  ngOnInit(): void{  
    this.getItems();
  }

  getItems(): void{
    this.itemService.getItems().subscribe((list: Item[]) => {
      this.itemList = list;
    }, (err) => {
      this.error = err.error;
    });
  }

  deleteItem(id: number|undefined): void{
    this.itemService.deleteItem(id!).subscribe(
      () =>{
        window.location.reload();
      }, (err) =>{
        this.error = err.error;
      });
  }
}

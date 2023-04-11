import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  itemList!: Item[];
  items: string[] = [
  'Andrei',
  'Adi',
  'Alex',
  'Dani',
  'Marius',
  'George',
  'Bogdan',
  'Vasile',
  'Andrei',
  'Adi',
  'Alex',
  'Dani',
  'Marius',
  'George',
  'Bogdan',
  'Vasile',
  'Andrei',
  'Adi',
  'Alex',
  'Dani',
  'Marius',
  'George',
  'Bogdan',
  'Vasile',
  'Andrei',
  'Adi',
  'Alex',
  'Dani',
  'Marius',
  'George',
  'Bogdan',
  'Vasile'
];

constructor(public dialog: MatDialog, public itemService: ItemService) { }

async openDialog() {
  const dialogRef = this.dialog.open(FormComponent, {
    width: '15rem',
    data: {items: this.items },
  });
  
  dialogRef.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });
};

  ngOnInit(): void{  }

  getItems(): void{
    this.itemService.getItems().subscribe((list: Item[]) => {
      this.itemList = list;
    })
  }


}



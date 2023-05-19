import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/models/item';

export interface DialogData{
  idToBeEdit: number | undefined
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  errorText?: string;
  form!: FormGroup;
  itemToEdit: Item | undefined;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.errorText = '';
    if(this.data.idToBeEdit != 0){
      this.setEditItem(this.data.idToBeEdit!);
    }
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
      number: [null],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private addItem(newItem: Item): void {
    this.itemService.createItem(newItem).subscribe(
      () => {
        this.dialogRef.close();
      },
      (err) => {
        this.errorText = err.error;
      }
    );
  }

  private updateItem(newItem: Item): void {
    this.itemService.editItem(newItem).subscribe(
      () => {
        this.dialogRef.close();
      },
      (err) => {
        this.errorText = err.error;
      }
    );
  }

  saveNewItem(): void {
    const isValid = this.form.valid;
    if (!isValid) {
      return;
    }
    const newItem: Item = {
      ...this.itemToEdit,
      ...this.form.getRawValue(),
    };
    if (this.data.idToBeEdit == 0) {
      this.addItem(newItem);
    } else {
      this.updateItem(newItem);
    }
  }

  private setEditItem(id: number) {
    this.itemService.getItemById(id).subscribe((item: Item) => {
      this.itemToEdit = item;
      this.form.patchValue(item, {
        emitEvent: false,
      });
    });


  }
}

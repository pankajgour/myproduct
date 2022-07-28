import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService,
    private matDialogRef: MatDialogRef<DialogComponent>
  ) {}

  freshnessList: string[] = ['Brand New', 'Second Hand', 'Refurbished'];
  productForms!: FormGroup;
  btnAddUpdate: string = 'Save';
  ngOnInit(): void {
    this.productForms = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      freshness: ['', Validators.required],
    });
    if (this.editData) {
      this.btnAddUpdate = 'Update';
      this.productForms.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForms.controls['category'].setValue(this.editData.category);
      this.productForms.controls['date'].setValue(this.editData.date);
      this.productForms.controls['price'].setValue(this.editData.price);
      this.productForms.controls['comment'].setValue(this.editData.comment);
      this.productForms.controls['freshness'].setValue(this.editData.freshness);
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.productForms.valid) {
        this.api.postProduct(this.productForms.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.productForms.reset();
            this.matDialogRef.close('save');
            
          },
          error: (err) => {
           console.warn(err);
            alert('Error while adding product.');
          },
        });
      }
    }
    else
    {
      this.updateProduct();
    }
    //console.warn(this.productForms.value);
  }
  updateProduct() {
    this.api.putProduct(this.productForms.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product updated successfully !');
        this.productForms.reset();
        this.matDialogRef.close('updated');
      },
      error: (err) => {
        alert('While updating the product something is wrong !');
      },
    });
  }
}

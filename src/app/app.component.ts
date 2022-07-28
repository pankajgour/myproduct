import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {ApiService} from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, _MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  implements OnInit{
  title = 'Angular-12-Curd Operation!';
  displayedColumns: string[] = ['productName', 'category', 'date', 'price','comment','freshness','action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private api :ApiService) {}
  
  ngOnInit(): void {
    this.getAllProduct();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    })
     .afterClosed().subscribe(val=>{
       if(val == 'save')
       {
         this.getAllProduct();
       }
     })
  }

  getAllProduct()
  {
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource = new _MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert('Error while fetching the records!!');
      }
      
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editProduct(row:any)
  {
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'updated')
      {
        this.getAllProduct();
      }
    })
  }
  deleteProduct(id : number)
  {
     return this.api.deleteProduct(id).subscribe({
      next : (res)=>{
        alert('Product Deleted successfully !');
        this.getAllProduct();
      },
      error:(err)=>{
        alert('While deleting the product something is wrong !');
      }
     })
  }
} 

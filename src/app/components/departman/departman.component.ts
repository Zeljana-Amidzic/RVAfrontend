import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Departman } from 'src/app/models/departman';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmanService } from 'src/app/services/departman.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DepartmanDialogComponent } from 'src/app/dialogs/departman-dialog/departman-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Fakultet } from 'src/app/models/fakultet';

@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html',
  styleUrls: ['./departman.component.css']
})
export class DepartmanComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'oznaka', 'fakultet', 'actions'];
  dataSource: MatTableDataSource<Departman>;
  subscription: Subscription;
  selektovaniDepartman: Departman;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatSort, {static: false}) sort: MatSort;
  //@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(public departmanService: DepartmanService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {
    this.subscription = this.departmanService.getAllDepartmane()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) =>{
        const accumulator = (currentTerm, key) => {
          return key === 'fakultet' ? currentTerm + data.fakultet.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'fakultet': return data.fakultet.naziv.toLowerCase();

          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, fakultet?: Fakultet) {
    const dialogRef = this.dialog.open(DepartmanDialogComponent, 
      {data: {id, naziv, oznaka, fakultet}});
      dialogRef.componentInstance.flag = flag; 
      
      dialogRef.afterClosed().subscribe(result => {
      if(result === 1)
      {
        this.loadData();
      }
    })
  }

  selectRow(row: any){
    this.selektovaniDepartman = row;
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;
  }
}

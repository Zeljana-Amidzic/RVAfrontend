import { Component, OnInit, OnChanges, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { Subscription } from 'rxjs';
import { Departman } from 'src/app/models/departman';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { Status } from 'src/app/models/status';
import { StudentDialogComponent } from 'src/app/dialogs/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnChanges, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'brojIndeksa', 'status', 'departman', 'actions'];
  dataSource: MatTableDataSource<Student>;
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() selektovaniDepartman: Departman;

  constructor(private studentService: StudentService,
    private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
  ngOnChanges(): void {
    if(this.selektovaniDepartman.id){
      this.loadData();
    }
  }

  ngOnInit(): void {
    //this.loadData();
  }

  public loadData() {
    this.subscription = this.studentService.getStudentPoDepartmanu(this.selektovaniDepartman.id)
    .subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) =>{
        const accumulator = (currentTerm, key) => {
          return key === 'status' ? currentTerm + data.status.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
  
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'status': return data.status.naziv.toLowerCase();
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
  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojIndeksa?: number, status?: Status, departman?: Departman) {
      const dialogRef = this.dialog.open(StudentDialogComponent,{data: {id, ime, prezime, brojIndeksa, status, departman}});
      dialogRef.componentInstance.flag = flag;
      if(flag === 1) {
        dialogRef.componentInstance.data.departman = this.selektovaniDepartman;
      }
      dialogRef.afterClosed().subscribe(result => {
        if(result === 1) {
          this.loadData();
        }
      })
  } 
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();   
    this.dataSource.filter = filterValue;

  }
}

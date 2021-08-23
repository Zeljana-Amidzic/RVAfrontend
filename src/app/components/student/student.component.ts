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
  
  displayedColumns = ['id','brojIndeksa','ime','prezime','departman','status','actions'];
  dataSource: MatTableDataSource<Student>;
  subscription: Subscription;
  @Input() selektovaniDepartman: Departman;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private studentService: StudentService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.loadData();
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
  ngOnChanges(): void {
    if(this.selektovaniDepartman.id){
      this.loadData();
    }
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
  public openDialog(flag: number, id?: number, brojIndeksa?: number, ime?: string, prezime?: string, departman?: Departman, status?: Status) {
      const dialogRef = this.dialog.open(StudentDialogComponent,{data: {id, brojIndeksa, ime, prezime, departman, status}});
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

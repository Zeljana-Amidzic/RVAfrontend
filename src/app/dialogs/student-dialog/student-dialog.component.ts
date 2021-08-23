import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Status } from 'src/app/models/status';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';
import { StatusService } from 'src/app/services/status.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit, OnDestroy {
  
  statusi: Status[];
  public flag: number;
  statusSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Student>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public statusService: StatusService,
    public studentService: StudentService) { }

  ngOnInit(): void {
    this.statusSubscription = this.statusService.getAllStatuse().subscribe(
      statusi => {
        this.statusi = statusi;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
    }
    /*this.statusSubscription = this.statusService.getAllStatuse().subscribe(
      data => {
        this.statusi = data;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }*/
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public add(): void {
    this.studentService.addStudent(this.data)
    .subscribe(() => {
      this.snackBar.open('Student uspešno dodat: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja studenta: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    };
  }
  public update(): void {
    this.studentService.updateStudent(this.data)
    .subscribe(() => {
      this.snackBar.open('Student uspešno izmenjen: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene studenta: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public delete(): void {
    this.studentService.deleteStudent(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Student uspešno obrisan: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja studenta: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.' + this.data.id, 'Zatvori', {
      duration: 1000
    })
  }
}

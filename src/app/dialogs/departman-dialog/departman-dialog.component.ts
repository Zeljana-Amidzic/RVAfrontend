import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departman } from 'src/app/models/departman';
import { DepartmanService } from 'src/app/services/departman.service';
import { Fakultet } from 'src/app/models/fakultet';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

  public flag: number;
  fakulteti: Fakultet[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DepartmanDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Departman,
              public departmanService: DepartmanService,
              public fakultetService: FakultetService) { }

  ngOnInit(): void {
    this.fakultetService.getFakultete().subscribe(
      data => {
        this.fakulteti = data;
      }
    );
  }

  compareTo(a,b){
    return a.id == b.id;
  }

  public addDepartman(): void{
    this.departmanService.addDepartman(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspešno dodat departman: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog departmana.' , 'Zatvori', {
        duration: 2500
      });
    };
  }

  public updateDepartman(): void {
    this.departmanService.updateDepartman(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan departman: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postejeceg departmana.' , 'Zatvori', {
        duration: 2500
      })
    }
  }

  public deleteDepartman(): void {
    this.departmanService.deleteDepartman(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan departman: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja artikla.' , 'Zatvori', {
        duration: 2500
      })
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StatusDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Status,
              public statusService: StatusService) { }

  ngOnInit(): void {
  }
  
  public addStatus(): void {
    this.statusService.addStatus(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspesno dodat status: '+ this.data.naziv, 'OK' , {
        duration: 2500
        });
      }),
      (error: Error) =>
        {
          console.log(error.name + ' ' + error.message);
          this.snackBar.open('Doslo je do greske.', 'Zatvori' , {
            duration: 2500
        });
    };
  }
  public updateStatus(): void {
    this.statusService.updateStatus(this.data).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen status: '+ this.data.naziv, 'OK' , {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske.', 'Zatvori' , {
          duration: 2500
        })
      }
    })
  }
  public deleteStatus(): void {
    this.statusService.deleteStatus(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan status: '+ this.data.naziv, 'OK' , {
        duration: 2500
      }),
      (error: Error) =>
      {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske.', 'Zatvori' , {
          duration: 2500
        })
      }
    })
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
  }
}

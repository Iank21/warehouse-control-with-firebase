import { Component, OnInit } from '@angular/core';
import {EquipmentDto} from 'src/app/model/equipment';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {PopUpAddComponent} from "../pop-up-add/pop-up-add.component";
import {PopUpEditComponent} from "../pop-up-edit/pop-up-edit.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  equipmentsList: EquipmentDto[] = [];

  constructor(
    private auth: AuthService,
    private data: DataService,
    private dialog: MatDialog)
  { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  logout() {
    this.auth.logout();
  }

  getAllStudents() {
    this.data.getAllEquipments().subscribe(res => {

      this.equipmentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching data');
    })
  }

  //
  // resetForm() {
  //   this.id = '';
  //   this.name = '';
  //   this.inv_number = '';
  // }
  //
  // updateEquipment() {
  //
  // }
  //

  deleteEquipment(equipment: EquipmentDto) {
    if (window.confirm('Вы действительно хотите удалить '
      + equipment.name + ' ' + equipment.inventory + ' ?')) {
      this.data.deleteEquipment(equipment);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopUpAddComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
  }

  openDialogEdit() {
    const dialogRef = this.dialog.open(PopUpEditComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { EquipmentDto } from 'src/app/model/equipment';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import {FormBuilder, FormGroup} from "@angular/forms";

declare const window: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public editForm: FormGroup;
  equipmentRef: any;

  formModal: any;

  equipmentsList: EquipmentDto[] = [];

  private id: string = '';

  constructor(
    private auth: AuthService,
    private data: DataService,
    public formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      inventory: [''],
      category: [''],
      status: [''],
      comment: [''],
      renterFio: [''],
      renterPhone: [''],
      renterDate: ['']
    })
  }

  ngOnInit(): void {
    this.getAllEquipments();
  }

  openModalAdd(){
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("addModal")
    );
    this.formModal.show();
  }

  openModalEdit(equipment: EquipmentDto){
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("editModal")
    );
    this.formModal.show();
    this.getValueById(equipment);
    this.id = equipment.id;
    return this.id;
  }

  getValueById(equipment: EquipmentDto) {
    this.data.getEquipmentDoc(equipment).subscribe(res => {
      this.equipmentRef = res;
      this.editForm = this.formBuilder.group({
        name:[this.equipmentRef.name],
        inventory:[this.equipmentRef.inventory],
        category:[this.equipmentRef.category],
        status: [this.equipmentRef.status],
        comment: [this.equipmentRef.comment],
        renterFio: [this.equipmentRef.renterFio],
        renterPhone: [this.equipmentRef.renterPhone],
        renterDate: [this.equipmentRef.renterDate]
      })
    })
  }

  onSubmit(){
    this.data.updateEquipment(this.editForm.value, this.id);
  }

  closeModal(){
    this.formModal.hide();
  }

  logout() {
    this.auth.logout();
  }

  getAllEquipments() {
    this.data.getAllEquipments().subscribe(res => {

      this.equipmentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Ошибка при получении данных');
    })
  }

  deleteEquipment(equipment: EquipmentDto) {
    if (window.confirm('Вы действительно хотите удалить '
      + equipment.name + ' ' + equipment.inventory + '?')) {
      this.data.deleteEquipment(equipment);
    }
  }

}

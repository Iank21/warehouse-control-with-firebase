import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../shared/data.service";
import {EquipmentDto} from "../../model/equipment";

@Component({
  selector: 'app-pop-up-edit',
  templateUrl: './pop-up-edit.component.html',
  styleUrls: ['./pop-up-edit.component.css']
})
export class PopUpEditComponent implements OnInit {
  public editForm: FormGroup;
  equipmentRef: any;

  constructor(
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

  ngOnInit() {
    // const id = this.act.snapshot.paramMap.get('id');
    // console.log(id)
    //this.getValueById(id);
  }

  getValueById(equipment: EquipmentDto){
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
    //this.data.updateEquipment(this.editForm.value);
  }
}

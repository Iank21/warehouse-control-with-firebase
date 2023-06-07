import {Component, Inject} from '@angular/core';
import {EquipmentDto} from "../../model/equipment";
import {DataService} from "../../shared/data.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-pop-up-add',
  templateUrl: './pop-up-add.component.html',
  styleUrls: ['./pop-up-add.component.css']
})
export class PopUpAddComponent {
  public equipmentForm: FormGroup;

  constructor(
    private data: DataService,
    private dialogRef: MatDialogRef<PopUpAddComponent>,
    public formBuilder: FormBuilder,
  ) {
    this.equipmentForm = this.formBuilder.group({
      name: [''],
      inventory: [''],
      category: ['']
    })
  }

  onSubmit(){
    this.data.addEquipment(this.equipmentForm.value);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
}

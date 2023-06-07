import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataService} from "../../shared/data.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

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
    private dialogRef: MatDialogRef<PopUpEditComponent>,
    public formBuilder: FormBuilder,
    public act: ActivatedRoute
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      inventory: [''],
      category: ['']
    })
  }

  ngOnInit() {
    const id = this.act.snapshot.paramMap.get('id');

    this.data.getEquipmentDoc(id).subscribe(res => {
      this.equipmentRef = res;
      this.editForm = this.formBuilder.group({
        name:[this.equipmentRef.name],
        inventory:[this.equipmentRef.inventory],
        category:[this.equipmentRef.category]
      })
    })
  }

  onSubmit(){
    const id = this.act.snapshot.paramMap.get('id');

    this.data.updateEquipment(this.editForm.value, id);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }
}

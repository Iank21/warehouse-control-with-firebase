import {Component} from '@angular/core';
import {DataService} from "../../shared/data.service";
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
    public formBuilder: FormBuilder,
  ) {
    this.equipmentForm = this.formBuilder.group({
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

  onSubmit(){
    this.data.addEquipment(this.equipmentForm.value);
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {EquipmentDto} from '../model/equipment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  getEquipmentDoc(id: any){
    return this.afs.collection('/EquipmentDto').doc(id).valueChanges()
  }

  addEquipment(equipment : EquipmentDto) {
    equipment.id = this.afs.createId();
    return this.afs.collection('/EquipmentDto').add(equipment);
  }

  getAllEquipments() {
    return this.afs.collection('/EquipmentDto').snapshotChanges();
  }

  deleteEquipment(equipment : EquipmentDto) {
    this.afs.doc('/EquipmentDto/'+equipment.id).delete();
  }

  // updateEquipment(equipment : EquipmentDto) {
  //   this.deleteEquipment(equipment);
  //   this.addEquipment(equipment);
  // }

  updateEquipment(equipment : EquipmentDto, id: any) {
    return this.afs.collection('/EquipmentDto').doc(id)
      .update({
        name: equipment.name,
        inventory: equipment.inventory,
        category: equipment.category
      })
  }

}

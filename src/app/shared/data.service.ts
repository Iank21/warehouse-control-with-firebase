import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {EquipmentDto} from '../model/equipment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

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

  getEquipmentDoc(equipment : EquipmentDto) {
    return this.afs.doc('/EquipmentDto/'+equipment.id).valueChanges();
  }

  updateEquipment(equipment : EquipmentDto, id: string) {
    return this.afs.doc('/EquipmentDto/' + id)
      .update({
        name: equipment.name,
        inventory: equipment.inventory,
        category: equipment.category,
        status: equipment.status,
        comment: equipment.comment,
        renterFio: equipment.renterFio,
        renterPhone: equipment.renterPhone,
        renterDate: equipment.renterDate
      })
  }
}

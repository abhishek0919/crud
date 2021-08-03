import { BrokerModel } from './broker-dash board model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-broker-dashboard',
  templateUrl: './broker-dashboard.component.html',
  styleUrls: ['./broker-dashboard.component.css']
})
export class BrokerDashboardComponent implements OnInit {
  [x: string]: any;


  formValue !: FormGroup;
  BrokerModelobj : BrokerModel = new BrokerModel();

  dealerData !: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { };

  ngOnInit(): void {
  this.formValue = this.formbuilder.group({
    firstName : [''],
    lastName : [''],
    email :[''],
    mobile:[''],
    price:[''],
  })
  this.getalldealers();
  };
  postDealerDetails(){
    this.BrokerModelobj.firstName = this.formValue.value.firstName;
    this.BrokerModelobj.lastName = this.formValue.value.lastName;
    this.BrokerModelobj.email = this.formValue.value.email;
    this.BrokerModelobj.mobile = this.formValue.value.mobile;
    this.BrokerModelobj.price = this.formValue.value.price;

    this.api.postDealer(this.BrokerModelobj)
    .subscribe(res=>{
      console.log(res);
      alert(" Dealer Added Succesfully")
      this.formValue.reset();
      this.getalldealers();
      let ref= document.getElementById('cancel')
      ref?.click();
    },
      err=>{
      alert("Something went wrong")
    })

  }
  getalldealers(){
    this.api.getDealer()
    .subscribe(res=>{
      this.dealerData=res;
    })
  }
  deletedealers(row:any){
    this.api.deleteDealer(row.id)
    .subscribe(res=>{
      alert("dealer deleted")
    })
    this.getalldealers();
  }
  onEdit(row:any){
    this.BrokerModelobj.id= row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['price'].setValue(row.price);

  }
  updateDealersDetails(){
    this.BrokerModelobj.firstName = this.formValue.value.firstName;
    this.BrokerModelobj.lastName = this.formValue.value.lastName;
    this.BrokerModelobj.email = this.formValue.value.email;
    this.BrokerModelobj.mobile = this.formValue.value.mobile;
    this.BrokerModelobj.price = this.formValue.value.price;
    this.api.updateDealer(this.BrokerModelobj,this.BrokerModelobj.id)
    .subscribe(res=>{
      alert("dealer updated")
      this.formValue.reset();
      this.getalldealers();
      let ref= document.getElementById('cancel')
      ref?.click();
    })
  }
  




}

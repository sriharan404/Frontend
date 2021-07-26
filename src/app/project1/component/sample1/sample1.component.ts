import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { SampleService } from '../../service/sample.service';


@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html',
  styleUrls: ['./sample1.component.css']
})
export class Sample1Component implements OnInit {

  commonform!: FormGroup;
  submitted:boolean =false
  savespinner:boolean =false


  dataSource!: MatTableDataSource<any>;
  @ViewChild("exlargeModal", { static: false }) contentrefer: any;
  displayedColumns = ['sno','name', 'mobileno','email','password','gender','actions'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  constructor( private formBuilder: FormBuilder,private modalService: NgbModal,private apiservice:SampleService ) { }

  ngOnInit(): void {
    this.formgrp()
    this.tablelist()
  }

  formgrp() {
    this.commonform = this.formBuilder.group({
      _id: [null],
      name: [null, [Validators.required]],
      mobileno: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      gender: [null,[Validators.required]],
      description:[null]
    });
  }
  cleardata(){
    this.savespinner = false;
    this.commonform.patchValue({
      _id: null,
      name: null,
      mobileno: null,
      email: null,
      password: null,
      gender: null,
      description:null
    })
  }
  get f() { return this.commonform.controls; }
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'md', windowClass: 'modal-holder',backdrop: 'static', keyboard: false  });
  }
  onSubmit(){
    this.submitted = true;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger mx-2'
    },
    buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'No, cancel!',
    confirmButtonText: 'Yes, Save it!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.savespinner = true;
      console.log(this.commonform.value);
      this.apiservice.useraddservice(this.commonform.value).subscribe(res => {
        console.log(res);
          if (res.status == true) {
            this.savespinner = false;
            this.modalService.dismissAll();
            this.ngOnInit()
            Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: res.message, icon: 'success' });
          }
        else {
          this.savespinner = false;
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: res.message, icon: 'error' })
        }
      })
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      this.savespinner = false;
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'error'
      )
    }
  })
  }
  edituser(row: { _id: any; name: any; mobileno: any; email: any; password: any; gender: any;description:any }){
    this.extraLarge(this.contentrefer);
    console.log(row);
  this.commonform.patchValue({
    _id:row._id,
    name: row.name,
    mobileno: row.mobileno,
    email: row.email,
    password: row.password,
    gender: row.gender,
    description:row.description
  })
  }
  tablelist() {
    this.apiservice.userlistservice().subscribe(res=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }
  deleteuser(id: any){
    var senddata={
      "_id":id
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
         this.apiservice.userdeleteservice(senddata).subscribe(res => {
      console.log(res)
      if (res.status == true) {
        this.tablelist()
        this.ngOnInit()
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: res.message, icon: 'success' });

      }
      else {
        console.log(res.message)
      }
    },
    (err) => {
      console.log(err);
    })
      }
    })
  }
}

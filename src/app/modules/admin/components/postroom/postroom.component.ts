import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-postroom',
  templateUrl: './postroom.component.html',
  styleUrl: './postroom.component.css'
})
export class PostroomComponent {

  roomDetailsForm: FormGroup;

  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private router: Router,
              private adminService: AdminService
  ){
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  submitForm(){
    this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe(res =>{
      this.message
      .success(
        `Room Posted Successfully`,{nzDuration: 5000}
      );
      this.router.navigateByUrl('/admin/dashboard')
    }, error=>{
      this.message.error(
        `${error.error}`, {nzDuration: 5000}
      )
    })
  }

}

import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { ModalType } from 'src/app/interfaces/user-interface';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
})
export class AddUserModalComponent implements OnInit {
  userForm!: FormGroup;
  url : string = this.router.url;
  modal: string;
  activeModal = inject(NgbActiveModal);


  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService,
    private router : Router
  ) {
    userService.modal$.subscribe(value => {
      this.modal = value
    });

    this.userForm = this.formBuilder.group({
      id: [Date.now().toString(), Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      number: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.url.split('/')[3]).subscribe(user => {
      if (user) {
        this.userForm.setValue({
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          number: user.number
        });
      }
    });
  
  }

  open(){
    this.userService.setModal(ModalType.ADD);
  }

  submitForm() {
    if (this.userForm.valid) {
      if(this.modal ===ModalType.ADD){
        this.userService.addUser(this.userForm.value);
      }if(this.modal ===ModalType.EDIT) {
        this.userService.editUser(this.userForm.value); 
      }
      
    }
  }
}

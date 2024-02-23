import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalType, User } from 'src/app/interfaces/user-interface';
import { UserService } from 'src/app/services/user-service.service';
import { AddUserModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] | unknown[] = [];
  filteredUsers: User[] | unknown[] = [];
  url: string = this.router.url;
  filterText: string = '';
  selectedValue: string = 'All';

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.userService.modal$.subscribe((show) => {
      this.modalService.dismissAll();
      if (
        (show === ModalType.ADD || show === ModalType.EDIT) &&
        this.url !== '/users'
      ) {
        this.modalService.open(AddUserModalComponent);
      }
    });
  }

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
      this.filteredUsers =users;
    });
  }

  filterUsers(filterText: string): void {
    this.filteredUsers = this.users.filter((user : any ) =>
      user.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  open() {
    this.userService.setModal(ModalType.ADD);
  }

  onSortChange() {
    this.userService.sortingUsers(this.selectedValue);
}
}

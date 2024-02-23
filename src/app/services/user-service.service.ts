import { Injectable} from '@angular/core';
import { User } from '../interfaces/user-interface';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalType } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  public users$: Observable<User[]> = this.usersSubject.asObservable();
  private modalAbleSubject = new BehaviorSubject<ModalType>(ModalType.ADD);
  modal$ = this.modalAbleSubject.asObservable();

  constructor(private dbService: NgxIndexedDBService,private modalService: NgbModal) {
    this.getUsers();
  }

  getRandomColor(): string {
    const randomValue = () => Math.floor(Math.random() * 256); 
    return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`; 
  }

  setModal(value: ModalType) {
    this.modalAbleSubject.next(value);
  }

  getModal(): Observable<ModalType> {
    return this.modal$;
  }


  addUser(user: User) {
    this.dbService.add('users', user).subscribe((key) => {
      const currentUsers = this.usersSubject.getValue();
      const updatedUsers = [...currentUsers, user];
      this.usersSubject.next(updatedUsers);
    });
  }

  getUsers(): void {
    this.dbService.getAll('users').subscribe((users: any) => {
      this.usersSubject.next(users);
    });
  }

  getUserById(userId: string): BehaviorSubject<User | undefined> {
    const userSubject = new BehaviorSubject<User | undefined>(undefined);
    this.users$.subscribe((users) => {
      const user = users.find((u) => u.id === userId);
      userSubject.next(user);
    });
    return userSubject;
  }

  editUser(updatedUser: User) {
    this.dbService.update('users', updatedUser).subscribe(() => {
      const currentUsers = this.usersSubject.getValue();
      const updatedUsers = currentUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      this.usersSubject.next(updatedUsers);
    });
  }

  deleteUser(userId: string) {
    this.dbService.delete('users', userId).subscribe(() => {
      const currentUsers = this.usersSubject.getValue();
      const updatedUsers = currentUsers.filter((user) => user.id !== userId);
      this.usersSubject.next(updatedUsers);
    });
  }

  sortingUsers(selectedValue: string) {
    this.users$.pipe(take(1)).subscribe(users => {
      let sortedUsers: User[] = [];
      switch(selectedValue) {
          case 'A-Z':
              sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));
              break;
          case 'Z-A':
              sortedUsers = users.slice().sort((a, b) => b.name.localeCompare(a.name));
              break;
          default:
              sortedUsers = users;
      }
      
      this.usersSubject.next(sortedUsers);
  });
}


  open(content:any) {
    this.modalService.open(content);
  }

}

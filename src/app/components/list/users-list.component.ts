import { Component, Input } from '@angular/core';
import { ModalType } from 'src/app/interfaces/user-interface';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
 @Input() users : any = [];
 userColors: Map<string, { background: string, text: string }> = new Map<string, { background: string, text: string }>();

 constructor( private userService : UserService) {
 }

 deleteUser(id:string){
  this.userService.deleteUser(id)
 }

 setOpen(){
  this.userService.setModal(ModalType.EDIT);
 }

 setRandomColor(userId:string) {
  const randomBackgroundColor = this.userService.getRandomColor();
  const randomTextColor = this.userService.getRandomColor();
  this.userColors.set(userId, { background: randomBackgroundColor, text: randomTextColor });
}
}

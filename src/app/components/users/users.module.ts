import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from '../list/users-list.component';
import { AddUserModalComponent } from '../modal/modal.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    AddUserModalComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class UsersModule { }

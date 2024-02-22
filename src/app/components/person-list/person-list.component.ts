import { Component,OnInit } from '@angular/core';
import { MockDataService } from 'src/app/services/mock-data.servise';
import { Person } from 'src/app/models/person.model';
import { mockPersonData } from 'src/app/services/mock-data.servise';
import { NgxIndexedDBService } from 'ngx-indexed-db';
// export const mockPersonData: Person[] = [
//   {
//     id: 1,
//     name: 'John',
//     surname: 'Doe',
//     email: 'john.doe@example.com',
//     phoneNumber: '123-456-7890'
//   },
//   {
//     id: 2,
//     name: 'Alice',
//     surname: 'Smith',
//     email: 'alice.smith@example.com',
//     phoneNumber: '987-654-3210'
//   },
//   {
//     id: 3,
//     name: 'Bob',
//     surname: 'Johnson',
//     email: 'bob.johnson@example.com',
//     phoneNumber: '456-789-0123'
//   }
// ];



@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit  {
  mockPersons: Person[] = [];

  constructor(private dbService: NgxIndexedDBService){
  }

  ngOnInit(): void {
    mockPersonData.map(person => {
      this.dbService
      .add('people', person)
      .subscribe((key) => {
        console.log('key: ', key);
      });
    })
  }
  

  
  removePerson(person: Person): void {
    
  }
}

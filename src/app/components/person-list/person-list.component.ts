import { Component } from '@angular/core';
import { MockDataService } from 'src/app/services/mock-data.servise';
import { Person } from 'src/app/models/person.model';

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
export class PersonListComponent {
  mockPersons: Person[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.mockDataService.mockData$.subscribe(data => {
      this.mockPersons = data;
    });
  }

  removePerson(person: Person): void {
    const newData = this.mockPersons.filter(p => p !== person);
    this.mockDataService.updateMockData(newData);
    this.mockPersons = newData;
  }
}

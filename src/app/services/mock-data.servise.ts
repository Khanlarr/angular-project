import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockDataSubject = new BehaviorSubject<Person[]>([]);
  mockData$ = this.mockDataSubject.asObservable();

  constructor() {
    this.mockDataSubject.next(mockPersonData);
  }

  updateMockData(newData: Person[]): void {
    this.mockDataSubject.next(newData);
  }
}

export const mockPersonData: Person[] = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890'
  },
  {
    id: 2,
    name: 'Alice',
    surname: 'Smith',
    email: 'alice.smith@example.com',
    phoneNumber: '987-654-3210'
  },
  {
    id: 3,
    name: 'Bob',
    surname: 'Johnson',
    email: 'bob.johnson@example.com',
    phoneNumber: '456-789-0123'
  }
];
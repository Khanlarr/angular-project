import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { PersonListComponent } from './components/person-list/person-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBModule ,DBConfig } from 'ngx-indexed-db';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


// Ahead of time compiles requires an exported function for factories
// export function migrationFactory() {
//   // The animal table was added with version 2 but none of the existing tables or data needed
//   // to be modified so a migrator for that version is not included.
//   return {
//     1: (db:any, transaction:any) => {
//       const store = transaction.objectStore('people');
//       store.createIndex('country', 'country', { unique: false });
//     },
//     3: (db:any, transaction:any) => {
//       const store = transaction.objectStore('people');
//       store.createIndex('age', 'age', { unique: false });
//     }
//   };
// }

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 3,
  objectStoresMeta: [{
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: false } },
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } },
      { name: 'surname', keypath: 'surname', options: { unique: false } },
      { name: 'number', keypath: 'number', options: { unique: false } },
    ]
  }],
  // provide the migration factory to the DBConfig
  // migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

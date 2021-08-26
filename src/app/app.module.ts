import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedService} from "./services/shared.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {TableSortingComponent} from './table-sorting/table-sorting.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { StudentComponent } from './student/student.component';
import { AddEditStudentComponent } from './student/add-edit-student/add-edit-student.component';
import { SubjectComponent } from './subject/subject.component';
import { AddEditSubjectComponent } from './subject/add-edit-subject/add-edit-subject.component';
import {DatePipe} from "@angular/common";
import { InscriptionComponent } from './inscription/inscription.component';
import { AddInscComponent } from './inscription/add-insc/add-insc.component';

@NgModule({
  declarations: [
    AppComponent,
    TableSortingComponent,
    StudentComponent,
    AddEditStudentComponent,
    SubjectComponent,
    AddEditSubjectComponent,
    InscriptionComponent,
    AddInscComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [SharedService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

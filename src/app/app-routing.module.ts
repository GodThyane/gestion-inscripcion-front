import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentComponent} from "./student/student.component";
import {SubjectComponent} from "./subject/subject.component";
import {InscriptionComponent} from "./inscription/inscription.component";

const routes: Routes = [
  {path: 'student', component: StudentComponent},
  {path: 'subject', component: SubjectComponent},
  {path: 'inscription', component: InscriptionComponent},
  { path: '',   redirectTo: '/student', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "https://localhost:5001/api"
  readonly PhotoUrl = "https://localhost:5001/Photos"

  constructor(private http: HttpClient) {
  }

  getDepList(): Observable<any[]> {
    return this.http.get<any>(`${this.APIUrl}/department`)
  }

  addDepartment(val: any): Observable<any[]> {
    return this.http.post<any>(`${this.APIUrl}/department`, val)
  }

  updateDepartment(val: any, id: number): Observable<any[]> {
    return this.http.put<any>(`${this.APIUrl}/department/${id}`, val)
  }

  delateDepartment(id: number): Observable<any[]> {
    return this.http.delete<any>(`${this.APIUrl}/department/${id}`)
  }


  getEmpList(): Observable<any[]> {
    return this.http.get<any>(`${this.APIUrl}/employee`)
  }

  addEmployee(val: any): Observable<any[]> {
    return this.http.post<any>(`${this.APIUrl}/employee`, val)
  }

  updateEmployee(val: any, id: number): Observable<any[]> {
    return this.http.put<any>(`${this.APIUrl}/employee/${id}`, val)
  }

  delateEmployee(id: number): Observable<any[]> {
    return this.http.delete<any>(`${this.APIUrl}/employee/${id}`)
  }

  UploadPhoto(val: any) {
    return this.http.post(`${this.APIUrl}/employee/savefile`, val)
  }

  getStudentList(): Observable<any[]> {
    return this.http.get<any>(`${this.APIUrl}/student`)
  }

  addStudent(val: any): Observable<any[]> {
    return this.http.post<any>(`${this.APIUrl}/student`, val)
  }

  updateStudent(val: any, id: number): Observable<any[]> {
    return this.http.put<any>(`${this.APIUrl}/student/${id}`, val)
  }

  deleteStudent(id: number): Observable<any[]> {
    return this.http.delete<any>(`${this.APIUrl}/student/${id}`)
  }

  getSubjectList(): Observable<any[]> {
    return this.http.get<any>(`${this.APIUrl}/subject`)
  }

  addSubject(val: any): Observable<any[]> {
    return this.http.post<any>(`${this.APIUrl}/subject`, val)
  }

  updateSubject(val: any, id: number): Observable<any[]> {
    return this.http.put<any>(`${this.APIUrl}/subject/${id}`, val)
  }

  deleteSubject(id: number): Observable<any[]> {
    return this.http.delete<any>(`${this.APIUrl}/subject/${id}`)
  }

  getInscriptionList(): Observable<any[]> {
    return this.http.get<any>(`${this.APIUrl}/inscription`)
  }

  getSubjectListNotInscription(id: number) {
    return this.http.get<any>(`${this.APIUrl}/inscription/subject/${id}`)
  }

  getStudentListNotInscription(id: number) {
    return this.http.get<any>(`${this.APIUrl}/inscription/student/${id}`)
  }

  inscription(inscription: { SubjectCode: any; StudentCode: any }) {
    return this.http.post<any>(`${this.APIUrl}/inscription/`, inscription)
  }
}

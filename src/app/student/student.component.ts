import {Component, OnInit} from '@angular/core';
import {SharedService} from "../services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEditStudentComponent} from "./add-edit-student/add-edit-student.component";

export interface StudentElement {
  studentId: number;
  code: number;
  studentLastName: string;
  studentFirstName: string;
  name: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  columns = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (element: StudentElement) => `${element.studentId}`
    },
    {
      columnDef: 'code',
      header: 'Código',
      cell: (element: StudentElement) => `${element.code}`
    },
    {
      columnDef: 'firstName',
      header: 'Nombre',
      cell: (element: StudentElement) => `${element.studentFirstName}`
    },
    {
      columnDef: 'lastName',
      header: 'Apellido',
      cell: (element: StudentElement) => `${element.studentLastName}`
    }

  ];
  students: any[] = []
  dialogRef: any;

  constructor(private service: SharedService, public dialog: MatDialog) {
  }

  openDialog(data: any = {
    option: "add",
    element: {
      name: undefined
    }
  }) {
    this.dialogRef = this.dialog.open(AddEditStudentComponent, {data});

    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshStudentList();
    })

  }

  ngOnInit(): void {
    this.refreshStudentList();
  }

  refreshStudentList() {
    this.students = []
    this.service.getStudentList().subscribe(res => {
      console.log(res)
      res.map(res => {
        this.students = [...this.students, {
          studentId: res.StudentId,
          code: res.StudentCode,
          studentLastName: res.StudentLastName,
          studentFirstName: res.StudentFirstName,
          name: res.StudentFirstName + " " + res.StudentLastName
        }]
      })
    })
  }

  deleteStudent(id: number) {
    this.service.deleteStudent(id).subscribe(() => {
      this.refreshStudentList();
    })
  }

}

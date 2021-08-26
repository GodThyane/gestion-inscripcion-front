import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit {

  title: string = '';
  option: string = '';

  studentForm: any;

  student: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fmB: FormBuilder,
              private service: SharedService,
              public dialog: MatDialog
  ) {
    this.title = data.option === 'edit' ? 'Editar estudiante' : 'Agregar estudiante'
    this.option = data.option;
    this.studentForm = this.fmB.group({
      StudentId: [data.element.studentId || '', Validators.required],
      StudentFirstName: [data.element.studentFirstName || '', Validators.required],
      StudentLastName: [data.element.studentLastName || '', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  editStudent() {
    this.service.updateStudent(this.studentForm.value, this.data.element.code).subscribe(res => {
      this.dialog.closeAll();
      alert(res.toString())
    }, error => {
      console.log(error)
    });
  }

  addStudent() {
    this.service.addStudent(this.studentForm.value).subscribe(res => {
      this.dialog.closeAll();
      alert(res.toString())
    }, error => {
      console.log(error)
    });
  }
}

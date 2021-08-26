import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-add-insc',
  templateUrl: './add-insc.component.html',
  styleUrls: ['./add-insc.component.css']
})
export class AddInscComponent implements OnInit {

  datas: any;
  displayedColumnsSubject = ['code', 'name', 'desc', 'init', 'finish', 'inscription'];
  displayedColumnsStudent = ['id', 'code', 'name', 'lastname', 'inscription'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sharedS: SharedService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.refreshList()
  }

  refreshList(): void {
    if (this.data.isStudent) {
      this.sharedS.getSubjectListNotInscription(this.data.student.code).subscribe(res => {
        this.datas = res
        console.log(this.datas)
      })
    } else {
      this.sharedS.getStudentListNotInscription(this.data.subject.code).subscribe(res => {
        this.datas = res
        console.log(this.datas)
      })
    }
  }

  inscription(element: any) {
    if (this.data.isStudent) {
      this.sharedS.inscription({
        StudentCode: this.data.student.code,
        SubjectCode: element.SubjectCode
      }).subscribe(res => {
        this.dialog.closeAll()
        alert(res.toString())
      })
    }else{
      this.sharedS.inscription({
        SubjectCode: this.data.subject.code,
        StudentCode: element.StudentCode
      }).subscribe(res => {
        this.dialog.closeAll()
        alert(res.toString())
      })
    }
  }
}

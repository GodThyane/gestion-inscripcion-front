import {Component, OnInit} from '@angular/core';
import {SharedService} from "../services/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {AddEditSubjectComponent} from "./add-edit-subject/add-edit-subject.component";
import {DatePipe} from "@angular/common";

export interface SubjectElement {
  code: number;
  name: string;
  subjectDescription: string;
  subjectInitHour: Date;
  subjectFinishHour: Date;
  initHour: string;
  finishHour: string;
}

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  columns = [
    {
      columnDef: 'code',
      header: 'Código',
      cell: (element: SubjectElement) => `${element.code}`
    },
    {
      columnDef: 'name',
      header: 'Nombre',
      cell: (element: SubjectElement) => `${element.name}`
    },
    {
      columnDef: 'desc',
      header: 'Descripción',
      cell: (element: SubjectElement) => `${element.subjectDescription}`
    },
    {
      columnDef: 'initHour',
      header: 'Hora de inicio',
      cell: (element: SubjectElement) => `${element.initHour}`
    },
    {
      columnDef: 'finishHour',
      header: 'Hora de salida',
      cell: (element: SubjectElement) => `${element.finishHour}`
    }

  ];
  subjects: any[] = []
  dialogRef: any;

  constructor(private service: SharedService, public dialog: MatDialog, private datePipe: DatePipe) {
  }

  openDialog(data: any = {
    option: "add",
    element: {
      name: undefined
    }
  }) {
    this.dialogRef = this.dialog.open(AddEditSubjectComponent, {data});

    this.dialogRef.afterClosed().subscribe(() => {
      this.refreshSubjectList();
    })

  }

  ngOnInit(): void {
    this.refreshSubjectList();
  }

  refreshSubjectList() {
    this.subjects = []
    this.service.getSubjectList().subscribe(res => {
      res.map(res => {
        this.subjects = [...this.subjects, {
          code: res.SubjectCode,
          name: res.SubjectName,
          subjectDescription: res.SubjectDescription,
          subjectInitHour: res.SubjectInitHour,
          subjectFinishHour: res.SubjectFinishHour,
          initHour: this.datePipe.transform(res.SubjectInitHour, 'h:mm a'),
          finishHour: this.datePipe.transform(res.SubjectFinishHour, 'h:mm a'),
        }]
      })
    })
  }

  deleteSubject(id: number) {
    this.service.deleteSubject(id).subscribe(() => {
      this.refreshSubjectList();
    })
  }

}

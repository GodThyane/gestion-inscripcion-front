import {Component, OnInit} from '@angular/core';
import {SharedService} from "../services/shared.service";
import {DatePipe} from "@angular/common";

export interface InscriptionElement {
  studentCode: number;
  studentFirstName: number;
  studentLastName: string;
  name: string;
  subjectCode: string;
  subjectName: string;
  subjectInitHour: Date;
  subjectFinishHour: Date;
  initHour: string;
  finishHour: string;
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  columns = [
    {
      columnDef: 'code',
      header: 'Código Estudiante',
      cell: (element: InscriptionElement) => `${element.studentCode}`
    },
    {
      columnDef: 'name',
      header: 'Estudiante',
      cell: (element: InscriptionElement) => `${element.name}`
    },
    {
      columnDef: 'codeSub',
      header: 'Código Materia',
      cell: (element: InscriptionElement) => `${element.subjectCode}`
    },
    {
      columnDef: 'nameSub',
      header: 'Materia',
      cell: (element: InscriptionElement) => `${element.subjectName}`
    }
    ,{
      columnDef: 'initHour',
      header: 'Hora de inicio',
      cell: (element: InscriptionElement) => `${element.initHour}`
    },
    {
      columnDef: 'finishHour',
      header: 'Hora de salida',
      cell: (element: InscriptionElement) => `${element.finishHour}`
    }

  ];
  inscriptions: any[] = []

  constructor(private service: SharedService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.refreshInscriptionList();
  }

  refreshInscriptionList() {
    this.service.getInscriptionList().subscribe(res => {
      console.log(res)
      res.map(res => {
        this.inscriptions = [...this.inscriptions, {
          studentCode: res.StudentCode,
          studentFirstName: res.StudentFirstName,
          studentLastName: res.StudentLastName,
          name: `${res.StudentFirstName} ${res.StudentLastName}`,
          subjectCode: res.SubjectCode,
          subjectName: res.SubjectName,
          subjectInitHour: res.SubjectInitHour,
          subjectFinishHour: res.SubjectFinishHour,
          initHour: this.datePipe.transform(res.SubjectInitHour, 'h:mm a'),
          finishHour: this.datePipe.transform(res.SubjectFinishHour, 'h:mm a'),
        }]
      })
    })
  }
}

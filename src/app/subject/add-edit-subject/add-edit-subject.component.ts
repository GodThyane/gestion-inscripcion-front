import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-add-edit-subject',
  templateUrl: './add-edit-subject.component.html',
  styleUrls: ['./add-edit-subject.component.css']
})
export class AddEditSubjectComponent implements OnInit {

  title: string = '';
  option: string = '';

  hourInit = new FormControl(Validators.required);
  minuteInit = new FormControl(Validators.required);
  scheduleInit = new FormControl(Validators.required);

  hourFinish = new FormControl(Validators.required);
  minuteFinish = new FormControl(Validators.required);
  scheduleFinish = new FormControl(Validators.required);


  hours: number[] = []
  minutes: number[] = []

  subjectForm: any;

  subject: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fmB: FormBuilder,
              private service: SharedService,
              public dialog: MatDialog
  ) {
    this.title = data.option === 'edit' ? 'Editar materia' : 'Agregar materia'
    this.option = data.option;
    this.subjectForm = this.fmB.group({
      SubjectName: [data.element.name || '', Validators.required],
      SubjectDescription: [data.element.subjectDescription || '', Validators.required],
      SubjectInitHour: [data.element.subjectInitHour ? new Date(data.element.subjectInitHour) : new Date(0, 0, 0, 12, 0), Validators.required],
      SubjectFinishHour: [data.element.subjectFinishHour ? new Date(data.element.subjectFinishHour) : new Date(0, 0, 0, 14, 0), Validators.required]
    })

    this.initHours(this.hourInit, this.minuteInit, this.subjectForm.controls.SubjectInitHour, this.scheduleInit);
    this.initHours(this.hourFinish, this.minuteFinish, this.subjectForm.controls.SubjectFinishHour, this.scheduleFinish);

    for (let i = 1; i <= 12; i++) {
      this.hours.push(i)
    }

    for (let i = 0; i <= 55; i = i + 5) {
      this.minutes.push(i)
    }
  }

  initHours(hour: any, minute: any, sb: any, schedule: any) {

    let hours = sb.value.getHours()

    hour.setValue(hours)
    minute.setValue(sb.value.getMinutes())
    schedule.setValue("AM")
    if (hours > 12) {
      hour.setValue(hours - 12)
      schedule.setValue("PM")
    } else if (hours == 12) {
      hour.setValue(hours)
      schedule.setValue("PM")
    } else if (hours == 0) {
      hour.setValue(12)
      schedule.setValue("AM")
    }
  }

  ngOnInit(): void {
  }

  editSubject() {
    let cDateInit = this.convertDate(this.hourInit.value, this.minuteInit.value, this.scheduleInit.value)
    let cDateFinish = this.convertDate(this.hourFinish.value, this.minuteFinish.value, this.scheduleFinish.value)
    if (cDateInit > cDateFinish) {
      let cDateInitAux = cDateInit;
      cDateInit = cDateFinish;
      cDateFinish = cDateInitAux
    }
    this.subjectForm.controls.SubjectInitHour.setValue(`${cDateInit.getHours()}:${cDateInit.getMinutes()}`)
    this.subjectForm.controls.SubjectFinishHour.setValue(`${cDateFinish.getHours()}:${cDateFinish.getMinutes()}`)
    this.service.updateSubject(this.subjectForm.value, this.data.element.code).subscribe(res => {
      this.dialog.closeAll();
      alert(res.toString())
    }, error => {
      console.log(error)
    });
  }

  addSubject() {
    let cDateInit = this.convertDate(this.hourInit.value, this.minuteInit.value, this.scheduleInit.value)
    let cDateFinish = this.convertDate(this.hourFinish.value, this.minuteFinish.value, this.scheduleFinish.value)
    if (cDateInit > cDateFinish) {
      let cDateInitAux = cDateInit;
      cDateInit = cDateFinish;
      cDateFinish = cDateInitAux
    }
    this.subjectForm.controls.SubjectInitHour.setValue(`${cDateInit.getHours()}:${cDateInit.getMinutes()}`)
    this.subjectForm.controls.SubjectFinishHour.setValue(`${cDateFinish.getHours()}:${cDateFinish.getMinutes()}`)
    console.log(this.subjectForm.value)
    this.service.addSubject(this.subjectForm.value).subscribe(res => {
      this.dialog.closeAll();
      alert(res.toString())
    }, error => {
      console.log(error)
    });
  }

  convertDate(hour: any, minute: any, schedule: any): Date {
    if (schedule === 'PM' && hour !== 12) {
      hour += 12
    } else if (schedule === 'AM' && hour === 12) {
      hour = 0
    }
    return new Date(0, 0, 0, hour, minute);
  }
}

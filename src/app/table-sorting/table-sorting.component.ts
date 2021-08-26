import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddInscComponent} from "../inscription/add-insc/add-insc.component";

@Component({
  selector: 'app-table-sorting',
  styleUrls: ['table-sorting.component.css'],
  templateUrl: 'table-sorting.component.html',
})
export class TableSortingComponent implements AfterViewInit, OnInit {
  @Input() columns: any;
  @Input() elements: any;
  @Output() openDialog = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  displayedColumns: any;
  dataSource: any;

  @ViewChild(MatSort) sort: any;

  constructor(public router: Router, private dialog: MatDialog) {
  }

  openEditDialog(element: any) {
    this.openDialog.emit(
      {
        option: "edit",
        element
      }
    );
  }

  openRemoveDialog(element: any) {
    let isDelete = confirm(`Estás seguro de querer eliminar: ${element.name}`)
    isDelete && this.remove.emit(element.code);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
    this.dataSource = new MatTableDataSource(this.elements);
  }

  openAddSubject(student: any) {
    this.dialog.open(AddInscComponent, {
      data: {student, isStudent: true}
    })
  }

  openAddStudent(subject: any) {
    this.dialog.open(AddInscComponent, {
      data: {subject, isStudent: false}
    })
  }
}

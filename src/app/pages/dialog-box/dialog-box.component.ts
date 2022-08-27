import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: [ './dialog-box.component.css' ]
})
export class DialogBoxComponent implements OnInit {

  taskForm: FormGroup = this.fb.group({
    task: [ null, Validators.compose([ Validators.required, Validators.minLength(3), Validators.maxLength(35) ]) ]
  });
  constructor (private fb: FormBuilder, public dialogRef: MatDialogRef<DialogBoxComponent>) { }

  ngOnInit(): void {
  }

  passToParent() {
    const newTask = this.taskForm.controls[ 'task' ].value;
    console.log(newTask);
    this.dialogRef.close(newTask);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

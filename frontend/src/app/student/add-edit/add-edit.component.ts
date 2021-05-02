import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdapterService } from '../adapter.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  addStudentForm: any = FormGroup;
  id: any = '';
  classes: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  subjects: any = [
    'English',
    'Hindi',
    'Math',
    'Physics',
    'Social Science',
    'Chemistry',
    'Biology',
  ];
  studentDetail: any;
  subjectMarks: any = FormArray;
  constructor(
    private formBuilder: FormBuilder,
    private _sharedService: AdapterService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((id) => {
      this.id = id.id;
    });
    if (this.id) {
      this._sharedService.get('student/' + this.id).subscribe((res: any) => {
        try {
          this.studentDetail = res;
          this.addStudentForm.patchValue(this.studentDetail);
          this.setExpenseSubjectMarks();
        } catch (err) {
          throw err;
        }
      });
    }
  }

  ngOnInit(): void {
    this.addStudentForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      subjectMarks: this.formBuilder.array([]),
    });
  }

  get f() {
    return this.addStudentForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.addStudentForm.invalid) {
      return;
    }
    if (this.id) {
      this._sharedService
        .put('student/' + this.id, this.addStudentForm.value)
        .subscribe((res: any) => {
          try {
            this.addStudentForm.reset();
            alert('Record has been updated successfully!');
          } catch (err) {
            throw err;
          }
        });
      return;
    }
    this._sharedService
      .post('student', this.addStudentForm.value)
      .subscribe((res: any) => {
        try {
          this.addStudentForm.reset();
          alert('Record has been created successfully!');
        } catch (err) {
          throw err;
        }
      });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      subject: '',
      marks: '',
    });
  }

  addItem(): void {
    this.subjectMarks = this.addStudentForm.get('subjectMarks') as FormArray;
    this.subjectMarks.push(this.createItem());
  }

  setExpenseSubjectMarks() {
    let control = <FormArray>this.addStudentForm.controls.subjectMarks;
    this.studentDetail.subjectMarks.forEach((x: any) => {
      control.push(this.formBuilder.group(x));
    });
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrationapp',
  templateUrl: './registrationapp.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegistrationappComponent {
  @Input() studentToEdit: any = null; 
  @Output() onSubmitStudent = new EventEmitter<any>(); 
  @Output() onClose = new EventEmitter<void>(); 

  studentForm: FormGroup;
  isModalOpen = false;

  departments = ['IT', 'CSE', 'EEE'];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnChanges() {
    if (this.studentToEdit) {
      this.studentForm.patchValue(this.studentToEdit); 
    } else {
      this.studentForm.reset();
    }
  }

  addOrUpdateStudent() {
    if (this.studentForm.valid) {
      this.onSubmitStudent.emit(this.studentForm.value);
      this.closeRegistrationForm();
    } else {
      alert('Please fill out all fields correctly.');
      this.studentForm.markAllAsTouched();
    }
  }

  closeRegistrationForm() {
    this.onClose.emit();
  }
}

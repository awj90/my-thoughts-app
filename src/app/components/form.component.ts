import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  maxCharacters: number = 140;

  @Output()
  onSubmit = new Subject<string>();

  @Input()
  canShare = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      thought: this.fb.control<string>('', [
        Validators.required,
        Validators.maxLength(this.maxCharacters),
      ]),
    });
  }

  clearForm() {
    this.form.reset();
  }

  processForm() {
    const t = this.form.value['thought'];
    this.onSubmit.next(t);
    this.form.reset();
  }

  invalid(): boolean {
    return this.form.invalid || !this.canShare;
  }
}

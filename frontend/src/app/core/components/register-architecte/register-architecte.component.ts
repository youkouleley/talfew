import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ArchitecteService } from '../../../shared/services/architecte.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Constantes } from '../../../shared/common/Constantes';
import { ArchitecteClass } from '../../models/ArchitecteClass';

@Component({
  selector: 'app-register-architecte',
  templateUrl: './register-architecte.component.html',
  styleUrls: ['./register-architecte.component.scss']
})
export class RegisterArchitecteComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private architecteService: ArchitecteService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.createForm();
  }

  data: ArchitecteClass = new ArchitecteClass();
  registerForm: FormGroup;

  createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(Constantes.EMAIL_REGEX)
      ]),
      password: ['', Validators.required],
      verifyPassword: new FormControl('', [
        this.matchOtherValidator('password')
      ])
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this.architecteService.postArchitecte(this.data).subscribe(
      x => {
        this.authenticationService.login(this.data.email, this.data.password).subscribe( x => {
          this.authenticationService.returnUrl = null;
          this.router.navigate(['/architecte/profile']);
        });
      });
  }
  
  matchOtherValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOther(control: FormControl) {
      if (!control.parent) {
        return null;
      }
      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        // Get the other control from the parent
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        // If other control change, we must compute again the validity
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }
      if (!otherControl) {
        return null;
      }
      return (otherControl.value === thisControl.value) ? null : { verifyPasswordFailed: true };
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToolbarService } from 'src/app/shared/toolbar/services/toolbar.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  public myClientsForm: FormGroup = new FormGroup({});
  public newClientForm: FormGroup = new FormGroup({});
  public configurationsForm: FormGroup = new FormGroup({});

  constructor(
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.toolbarService.updateTitle("Administración");

    this.newClientForm = this.formBuilder.group({
      email: ['', [
        // Validators.required,
        Validators.email,
      ]],
    });
  }

  get email() {
    return this.newClientForm.get('email');
  }

  onSubmitRegister(): void {
    if (this.newClientForm.value.email) {
      console.log(this.newClientForm.value)
    }
  }

}

import { ViewContainerRef } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective implements OnInit, OnDestroy {

  @Input() public ifRole!: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const ROLE = this.authService.getUserRole();

    if (ROLE != this.ifRole) {
      // Remove element from DOM
      this.viewContainerRef.clear();
    }
    else {
      // appends the ref element to DOM
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy(): void {

  }
}

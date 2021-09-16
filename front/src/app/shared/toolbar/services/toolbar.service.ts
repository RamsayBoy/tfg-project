import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private titleSource = new BehaviorSubject<string>("");
  currentTitle = this.titleSource.asObservable();

  private showDateControlsSource = new BehaviorSubject<boolean>(false);
  areDateControlsShown = this.showDateControlsSource.asObservable();

  constructor() { }

  updateTitle(title: string) {
    this.titleSource.next(title);
  }

  showDateControls(areControlsShown: boolean) {
    this.showDateControlsSource.next(areControlsShown);
  }
}

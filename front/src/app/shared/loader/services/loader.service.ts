import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoadingSource = new BehaviorSubject<boolean>(false);
  isLoading = this.isLoadingSource.asObservable();

  constructor() { }

  setLoader(value: boolean): void {
    this.isLoadingSource.next(value);
  }
}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  private isLoadingSource = new BehaviorSubject<boolean>(false);
  isLoading = this.isLoadingSource.asObservable();

  constructor(
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
  }

  setLoader(value: boolean): void {
    this.isLoadingSource.next(value);
  }
}

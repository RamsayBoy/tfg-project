import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading!: boolean;
  loading!: Subscription;

  constructor(
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.loading = this.loaderService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void{
    this.loading.unsubscribe();
  }
}

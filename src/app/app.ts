import { Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LuckysheetService } from './services/luckysheet.service';
import { LuckysheetConfig } from './models/luckysheet';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('test-table');

  sheet!: LuckysheetConfig

  constructor(
    private luckysheetService: LuckysheetService
  ) { }

  ngOnInit(): void {
    this.luckysheetService.create(this.sheet);
  }

  saveData(): void {
    const allSheets = this.luckysheetService.getAllSheets();
    console.log('--- TOÀN BỘ DỮ LIỆU WORKBOOK ---');
    console.log(allSheets);
  }

}

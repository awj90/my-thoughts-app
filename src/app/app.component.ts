import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Input()
  thought: string = '';

  canShare: boolean = false;

  ngOnInit(): void {
    this.canShare = !!navigator.share;
  }

  process(t: string) {
    this.thought = t;
    const data: any = {
      title: '',
      text: this.thought,
      // url: '',
    };
    navigator
      .share(data)
      .then((result) => {
        alert('Succesfully shared!');
        this.thought = '';
      })
      .catch((err) => alert(`Error: ` + JSON.stringify(err)));
  }
}

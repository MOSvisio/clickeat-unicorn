import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unicorn-color',
  templateUrl: './unicorn-color.component.html',
  styleUrls: ['./unicorn-color.component.scss']
})
export class UnicornColorComponent implements OnInit {

  @Input() color = "#FFFFFF";
  @Input() bgColor = "darker";

  image = "";

  constructor() { }

  ngOnInit(): void {
    if (this.bgColor == "darker") {
      this.image = "../../assets/Images/unicorn-uncolored-darker.png"
    } else {
      this.image = "../../assets/Images/unicorn-uncolored.png"

    }
  }

}

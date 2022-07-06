import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { Unicorn } from 'src/app/shared/classes/unicorn';
import { EventService } from 'src/app/shared/services/event.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit, AfterViewInit {

  unicorns: Unicorn[] = [];

  height: number = 0;
  width: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;

  object: HTMLElement[] = [];

  mouseMoveSub: any;
  openModalSub: any;
  closeModalSub: any;
  unicornSub: any;

  subInterval: Subscription | undefined;

  @ViewChild("playgroundContainer") playground: ElementRef|undefined;

  constructor(private elem: ElementRef, private eventService: EventService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.unicorns = this.storageService.getUnicorns();

    this.unicornSub = this.eventService.unicornCreated.subscribe(() => {
      this.unicorns = this.storageService.getUnicorns();
    })

    this.openModalSub = this.eventService.modalOpened.subscribe((id) =>{
      if (id == "unicorn-playground") {
        this.width = this.playground?.nativeElement.clientWidth;
        this.height = this.playground?.nativeElement.clientHeight;
        this.subInterval = interval(3000).subscribe(() => this.moveObject())
    
        let items = Array.from(document.getElementsByClassName('idle') as HTMLCollectionOf<HTMLElement>);
    
        items.forEach((testElement) => {
          testElement.style.top = this.getRandom(0, this.height - 50) + "px"
          testElement.style.left = this.getRandom(0, this.width-50) + "px"
        });
      }
    })

    this.closeModalSub = this.eventService.modalClosed.subscribe((id) => {
      this.subInterval?.unsubscribe();
    })

  }

  ngAfterViewInit(): void {
  }

  moveObject() {
    let items = Array.from(document.getElementsByClassName('idle') as HTMLCollectionOf<HTMLElement>);

    items.forEach((testElement) => {
      let topNum = parseInt(testElement.style.left.replace("px", ""));
      let pos = this.getNextPosition(testElement.style.top, testElement.style.left, 50);
      if (pos.left - topNum > 0) {
        testElement.style.transform= "scaleX(-1)";
      } else {
        testElement.style.transform= "scaleX(1)";
      }

      testElement.style.transition = "left 4s linear, top 4s linear, transform 1s";
      testElement.style.top = pos.top + "px"
      testElement.style.left = pos.left + "px"
      
    });
  }

  getNextPosition(top: string, left: string, size: number) {
    let topNum = parseInt(top.replace("px", ""));
    let leftNum = parseInt(left.replace("px", ""));
    topNum += this.getRandom(topNum > 50 ? -50 : 20, 50);
    leftNum += this.getRandom(leftNum > 50 ? -100 : 20, 100);

    if (topNum < 0) {
      topNum = 0;
    } else if (topNum > this.height - size) {
      topNum = this.height - size;
    }

    if (leftNum < 0) {
      leftNum = 0;
    } else if (leftNum > this.width - size) {
      leftNum = this.width - size;
    }

    return { left: leftNum, top: topNum }
  }

  getRandom(min: number, max: number) : number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  mouseMove(evt: any) {
    this.width = this.playground?.nativeElement.clientWidth;
    this.height = this.playground?.nativeElement.clientHeight;
    this.mouseX = evt.offSetX; 
    this.mouseY = evt.offSetY;
  }

  handleDragOver(e:any) {
    e = e || window.event;
    this.mouseX=e.offsetX;
    this.mouseY=e.offsetY;
    return false;
  }

  handleDragStart(e:any) {
    e.target.style.opacity = '1';
    e.target.style.transition = "none";
    e.target.classList.add("moving");
    e.target.classList.remove("idle");
  }

  handleDragEnd(e: any) {
    e.target.style.opacity = '1';
    e.target.style.top = this.mouseY - 25 + "px"
    e.target.style.left = this.mouseX - 25 + "px"
    e.target.classList.add("idle");
    e.target.classList.remove("moving");
  }
  
  trackByUnicorn(index: number, item: Unicorn) {
    return item.name + item.gender + item.color;
  }

}

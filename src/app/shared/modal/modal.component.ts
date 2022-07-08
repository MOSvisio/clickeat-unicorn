import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../services/event.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  @Input() id: string = "";
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef, private eventService: EventService) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el:any) => {
        if (el.target.className === 'modal') {
            this.close();
        }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  open() {
    this.element.style.display = "block";
    this.element.style.opacity = 1;
    document.body.classList.add("modal-open");
    this.eventService.emitModalOpened(this.id);
  }

  close() {
    this.element.style.display = "none";
    this.element.style.opacity = 0;
    document.body.classList.remove("modal-open");
    this.eventService.emitModalClosed(this.id);
  }

}

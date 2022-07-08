import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Unicorn } from 'src/app/shared/classes/unicorn';
import { EventService } from 'src/app/shared/services/event.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-unicorn-form',
  templateUrl: './unicorn-form.component.html',
  styleUrls: ['./unicorn-form.component.scss']
})
export class UnicornFormComponent implements OnInit, OnChanges {

  @Input() unicorn: Unicorn = new Unicorn({color: "#FFFFFF"});

  constructor(private eventService: EventService, private modalService: ModalService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  create() {
    this.eventService.emitUnicornCreated(this.unicorn);
    this.unicorn = new Unicorn({color: "#FFFFFF"});
    this.modalService.close("unicorn-detail");
  }
}

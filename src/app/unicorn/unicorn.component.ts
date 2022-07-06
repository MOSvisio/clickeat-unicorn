import { Component, OnInit } from '@angular/core';
import { Unicorn } from '../shared/classes/unicorn';
import { EventService } from '../shared/services/event.service';
import { ModalService } from '../shared/services/modal.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-unicorn',
  templateUrl: './unicorn.component.html',
  styleUrls: ['./unicorn.component.scss']
})
export class UnicornComponent implements OnInit {

  constructor(private modalService: ModalService, private eventService: EventService, private storageService: StorageService) { }

  public unicorns: Unicorn[] = [];

  public unicornSelected: Unicorn = new Unicorn({color: "white"});
  private unicornOpenedSub: any;

  ngOnInit(): void {
    this.unicornOpenedSub = this.eventService.unicornOpened.subscribe(unicorn => {
      this.unicornSelected = unicorn;
      this.openModal("unicorn-detail");
    })
  }

  openModalCreateUnicorn() {
    this.unicornSelected = new Unicorn({color: "white"});
    this.openModal("unicorn-detail");
  }

  openModalReproduce() {
    this.openModal("unicorn-reproduce");
  }

  openModal(id: string) {
    this.unicorns = this.storageService.getUnicorns();
    this.modalService.open(id);
  }

}

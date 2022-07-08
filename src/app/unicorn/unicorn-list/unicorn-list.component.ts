import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Unicorn } from 'src/app/shared/classes/unicorn';
import { EventService } from 'src/app/shared/services/event.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-unicorn-list',
  templateUrl: './unicorn-list.component.html',
  styleUrls: ['./unicorn-list.component.scss']
})
export class UnicornListComponent implements OnInit {

  public unicorns: Unicorn[] = [];
  public unicornsMate: {
    unicorn: Unicorn,
    mate: Unicorn
  }[] = [];


  public unicornSelectedMating: Unicorn = new Unicorn();
  public unicornSelectedMateMatch: Unicorn = new Unicorn();

  private unicornCreatedSub: any;

  constructor(
    private storageService: StorageService,
    private modalService: ModalService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getUnicornsFromFile();

    this.unicornCreatedSub = this.eventService.unicornCreated.subscribe(unicorn => {
      this.unicorns.push(unicorn);
      this.generateUnicornMate();
      this.storageService.saveUnicorns(this.unicorns);
    })
  }

  getUnicornsFromFile() {
    this.unicorns = this.storageService.getUnicorns();
    this.generateUnicornMate();
  }

  trackByUnicorn(index: number, item: Unicorn) {
    return item.name + item.gender + item.color;
  }

  trackByUnicornMate(index: number, item: {
    unicorn: Unicorn,
    mate: Unicorn
  }) {
    return item.unicorn.name + item.unicorn.id;
  }
  openModal(unicorn: Unicorn) {
    console.log(unicorn)
    this.eventService.emitUnicornOpened(unicorn);
  }
  
  addMate(unicorn: Unicorn) {
    this.unicornSelectedMating = unicorn;
    this.modalService.open("unicorn-mate")
  }

  deleteMate(unicorn: Unicorn) {
    this.unicornSelectedMating = unicorn;
    this.modalService.open("unicorn-mate-delete")
  }

  removeMate() {
    for (let i=0; i<this.unicorns.length; i++ ){
      if (this.unicorns[i].id == this.unicornSelectedMating.mate) {
        this.unicorns[i].mate = null;
        continue;
      }
    }
    this.unicornSelectedMating.mate = null;
    this.storageService.saveUnicorns(this.unicorns);
    this.generateUnicornMate();
    this.eventService.emitUnicornMateChanged();
    this.modalService.close("unicorn-mate-delete");
  }
  
  createMate() {
    this.unicornSelectedMating.mate = this.unicornSelectedMateMatch.id;
    this.unicornSelectedMateMatch.mate = this.unicornSelectedMating.id;
    for(let i=0; i < this.unicorns.length; i++) {
      if (this.unicorns[i].id == this.unicornSelectedMating.id) {
        this.unicorns[i] = this.unicornSelectedMating;
      }
      if (this.unicorns[i].id == this.unicornSelectedMateMatch.id) {
        this.unicorns[i] = this.unicornSelectedMateMatch;
      }
    }

    this.storageService.saveUnicorns(this.unicorns);
    this.generateUnicornMate();
    this.eventService.emitUnicornMateChanged();
    this.modalService.close("unicorn-mate");
  }

  
  generateUnicornMate() {
    let unicornsMateTmp:{
      unicorn: Unicorn,
      mate: Unicorn
    }[] = [];

    this.unicorns.forEach(item => {
      let mate = this.unicorns.find(element => element.id == item.mate) ?? new Unicorn();
      let unicornMate = {unicorn: item, mate: mate};
      unicornsMateTmp.push(unicornMate);
    })

    this.unicornsMate = unicornsMateTmp;
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}

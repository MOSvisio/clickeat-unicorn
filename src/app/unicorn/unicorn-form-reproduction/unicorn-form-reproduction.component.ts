import { Component, OnInit } from '@angular/core';
import { Unicorn } from 'src/app/shared/classes/unicorn';
import { EventService } from 'src/app/shared/services/event.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { StorageService } from 'src/app/shared/services/storage.service';

export class Mates {
  male: Unicorn = new Unicorn()
  female: Unicorn = new Unicorn()
};

@Component({
  selector: 'app-unicorn-form-reproduction',
  templateUrl: './unicorn-form-reproduction.component.html',
  styleUrls: ['./unicorn-form-reproduction.component.scss']
})
export class UnicornFormReproductionComponent implements OnInit {

  constructor(private storageService: StorageService, private eventService: EventService, private modalService: ModalService) { }

  public unicorns: Unicorn[] = [];
  public mates: Mates[] = [];
  public child: Unicorn = new Unicorn(); 
  public colorGenerate = "";
  public sliderColor = 0.5;
  public selectedMate: Mates|null = null; 
  private mateChangedSub: any;

  ngOnInit(): void {
    this.getMates();
    
    this.mateChangedSub = this.eventService.unicornMateChanged.subscribe(result => {
      this.getMates();
    })
  }

  getMates() {
    this.unicorns = this.storageService.getUnicorns().filter((item: Unicorn) => item.mate != null && item.gender != 'other');

    let tmpMates: Mates[] = [];

    this.unicorns.forEach(unicorn => {
      let tmpMate: {
        male: Unicorn,
        female: Unicorn
      } = {male: new Unicorn(), female: new Unicorn()};

      if (unicorn.gender == "male") {
        tmpMate.male = unicorn;

        tmpMate.female = this.unicorns.find(item => item.id == unicorn.mate) ?? new Unicorn();
        tmpMates.push(tmpMate);
      }
    })

    this.mates = tmpMates;
  }

  mateChanged() {
    this.colorGenerate = this.blendColors(this.selectedMate?.female.color, this.selectedMate?.male.color, this.sliderColor);
  }


  blendColors(colorA: any, colorB: any, amount: any) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c: any) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c: any) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
  }

  createChild() {
    this.child.color = this.colorGenerate;
    this.child.name = (this.selectedMate?.female.name ?? "") + (this.selectedMate?.male.name ?? "");
    this.child.age = 1;
    this.eventService.emitUnicornCreated(this.child);
    this.child = new Unicorn();
    this.modalService.close("unicorn-child");
    this.modalService.close("unicorn-reproduce");
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}

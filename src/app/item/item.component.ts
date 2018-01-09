import { Component, OnInit, Input } from '@angular/core';
import { StarWarsService } from '../starWars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

@Input() character;
swServices: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swServices = swService;
  }

  ngOnInit() {
  }

  onAssign(side) {
     // this.character.side = side;
     // this.sideAssigned.emit({name: this.character.name , side: side}) ;
     this.swServices.onSideChosen({name: this.character.name, side: side});
  }
}

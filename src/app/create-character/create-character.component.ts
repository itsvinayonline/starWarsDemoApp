import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../starWars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

  availableSide = [
    {display: 'None', value: ''},
    {display: 'Light Side', value: 'light'},
    {display: 'Dark Side', value: 'dark'}
  ];

  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService ;
  }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log(submittedForm);
    if (submittedForm.invalid) {
      return;
    }
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.Side);
  }

}

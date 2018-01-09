import {Injectable} from '@angular/core';
import { LogService } from './log.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {
private  characters= [
    {name: 'Luke SkyWaker', side: null},
    {name: 'Drath Vader', side: null},
    {name: 'Obi-Wan', side: null}
  ];

  private logService: LogService;
  http: Http;

  charactersChanged = new Subject <void>();

  constructor(logService: LogService, http: Http) {
    this.logService = logService ;
    this.http = http ;
  }


  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
    .map((response: Response) => {
      const data = response.json();
      const extractedChars = data.results;
      const chars = extractedChars.map((char) => {
          return {name: char.name, side: ''};
      });
      return chars;
    })
    .subscribe(
      (data) => {
        console.log(data);
        this.characters = data;
        this.charactersChanged.next();
      }
    );
  }


  // fetchCharacters() {
  //   this.http.get('https://swapi.co/api/people/').subscribe(data => {
  //     const Bdata = data.json();
  //     const extractedChars = Bdata.results;
  //     const chars = extractedChars.map((char) => {
  //     return {name: char.name, side: ''};
  //     });
  //     this.characters = chars;
  //       this.charactersChanged.next();
  //   });
  //   }


  getCharacters(chosenSide) {
    if (chosenSide === 'all') {
        return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenSide;
    });

  }

  onSideChosen(finalInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === finalInfo.name ;
    });
    this.characters[pos].side = finalInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed Side of' + finalInfo.name + ', new side:' + finalInfo.side);

  }

  addCharacter(name, side) {
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}

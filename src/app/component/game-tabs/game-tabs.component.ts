import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../model/models";

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent  {

  @Input() game!: Game


}

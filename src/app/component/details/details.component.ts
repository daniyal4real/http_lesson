import { Component, OnInit } from '@angular/core';
import {Game} from "../../model/models";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpService} from "../../service/http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  gameRating = 0
  gameId!: string
  game!: Game
  routeSub!: Subscription
  gameSub!: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id']
      this.getGameDetails(this.gameId)
    })
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp

        setTimeout(() => {
          this.gameRating = this.game.metacritic
        }, 1000);
      })
  }

}

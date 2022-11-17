import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {APIResponse, Game} from "../../model/models";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort!: string
  public games!: Array<Game>
  private routeSub!: Subscription
  private gameSub!: Subscription

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search'])
      } else {
        this.searchGames('metacrit')
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results
        console.log(gameList)
      })
  }

}

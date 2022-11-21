import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {APIResponse, Game} from "../model/models";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL = 'https://rawg-video-games-database.p.rapidapi.com'

  constructor(
    private http: HttpClient
  ) { }


  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
  let params = new HttpParams().set('ordering', ordering)
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search)
    }

    return this.http.get<APIResponse<Game>>(this.BASE_URL+`/games`, {
      params: params
    })
  }


  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(this.BASE_URL+`/games/${id}`)
    const gameTrailerRequest = this.http.get(
      this.BASE_URL+`/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      this.BASE_URL+`/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailerRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailerRequest']?.results,
        };
      })
    );
  }
}

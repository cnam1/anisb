import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pageInfo } from '../interfaces/page-info.interface';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  info : pageInfo = {};
  team: any[] = [];
  loaded = true;

  constructor( private http : HttpClient ) { 

    this.loadTeam();
    this.loadInfo();

  }

  private loadInfo(){
    this.http.get('assets/data/data-page.json')

      .subscribe( (resp: pageInfo)=>{
      this.info = resp; 
      this.loaded = false;
      //console.log(resp.instagram);

    })

  }

  private loadTeam(){

    this.http.get('https://anisbakery-51672.firebaseio.com/team.json')
      .subscribe((resp: any)=>{

        this.team = resp;       
        this.loaded = false;

      })
  }

}

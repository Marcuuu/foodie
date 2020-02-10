import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { CustMenuInfoPage } from '../CUST-menuinfo/menuinfo';
import { Storage } from '@ionic/storage';
import { MenuDetailsPage } from "../menu-details/menu-details";
/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class CustFavouritesPage {
menuPage:any;
data:any;
favs:any;
ishidden:any;
ishiddenimg:any;
loading:any;
totalReviews:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,public http: HttpClient,public storage: Storage) {
  }
  ngOnInit(){

  }
  ionViewWillEnter(){
    this.getFavs();
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
  goToMenuPage(menuId){
    //this.router.navigateByUrl('/pdpMenuPage/' + this.custId + '/' + menuId);
    localStorage.setItem('cust_menuid',menuId);
    this.navCtrl.push(CustMenuInfoPage);
  }
  goToMenuDetailsPage(event, item) {
    localStorage.setItem('cust_menuid',item.menuId);
    this.navCtrl.push(MenuDetailsPage, {
      item: item
    });
    console.log(item)
  }
  getFavs() {
    var url = 'https://foodie1234.herokuapp.com/findFavs';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      custId: localStorage.getItem("loginid"),
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      if(data == false)
      {
        this.ishidden=true;
        this.ishiddenimg=false;
      }
      else
      {
        this.ishidden=false;
        this.ishiddenimg=true;
        this.favs=data;
        for(var i =0; i<this.favs.length;i++){
        this.getTotalReviews(this.favs[i].menuId);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  getTotalReviews(menuId) {
    var url = 'https://foodie1234.herokuapp.com/getTotalReviews';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      menuId: menuId,
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      this.totalReviews=data;
    }, error => {
      console.log(error);
    });
  }
}

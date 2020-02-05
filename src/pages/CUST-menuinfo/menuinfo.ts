import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { CustReviewsPage } from '../CUST-reviews/reviews';
import { CustSubmitReviewPage } from '../CUST-submitReview/submitReview';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menuinfo',
  templateUrl: 'menuinfo.html',
})
export class CustMenuInfoPage {
data:any;
menuPage:any;
rating:any;
rating2:any;
ratingNum:any;
visible:any;
TopReview:any;
hvInfo:boolean;
menuInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.getMenuInfo();
  }

  ionViewWillEnter(){
    this.getTopReview();
    this.getAvgRating();
    this.getFavAnot();
    
    console.log('ionViewWillEnter MenuPage');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave MenuPage');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave MenuPage');
  }

  // ngOnInit() {
  //   this.getMenuInfo();
  //   this.getTopReview();
  //   this.getAvgRating();
  //   // this.getPDPfName();
  // }
  
  favmenu(){
    if(this.visible==true){
      this.getDeleteFavMenu();
      
      console.log("Deleted FaveMenu")
    }
    else if(this.visible==false){

      this.getInsertFavMenu();
      console.log("Inserted FaveMenu")
    }

  }
  getDeleteFavMenu() {
    var url = 'https://foodie1234.herokuapp.com/getDeleteFavMenu';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      menuId: localStorage.getItem('cust_menuid'),
      loginId: localStorage.getItem('loginid'),
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postDataaaa:', postData)
      console.log(data);
      this.visible=false;
    }, error => {
      console.log(error);
    });
  }
  getInsertFavMenu() {
    var url = 'https://foodie1234.herokuapp.com/getInsertFavMenu';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      menuId: localStorage.getItem('cust_menuid'),
      loginId: localStorage.getItem('loginid'),
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postDatabbbb:', postData)
      console.log(data);
      this.visible=true;
    }, error => {
      console.log(error);
    });
  }


  getTopReview() {
    var url = 'https://foodie1234.herokuapp.com/getTopReview';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      menuId: localStorage.getItem('cust_menuid'),
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData:', postData)
      console.log("topReview",data);
      if (data == false){
        this.hvInfo=true
      }
      else{
        this.hvInfo=false
        this.TopReview=data;
        this.rating2 = data[0].rating;
      }

    }, error => {
      console.log(error);
    });
  }

  // getPDPfName() {
  //   var url = 'https://foodie1234.herokuapp.com/getPDPfName';
  //   var postData = JSON.stringify({
  //     //these fields MUST match the server.js request.body.XXX;  
  //     menuId: this.menuId,
  //   });
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
  //     })
  //   };
  //   this.http.post(url, postData, httpOptions).subscribe((data) => {
  //     console.log('postData:', postData)
  //     console.log(data);
  //       this.fName=data;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  getMenuInfo() {
    var url = 'https://foodie1234.herokuapp.com/getMenuInfo';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      menuId: localStorage.getItem('cust_menuid'),
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData:', postData)
      console.log(data);
        this.menuInfo=data;
    }, error => {
      console.log(error);
    });
  }

  getAvgRating() {
    var url = 'https://foodie1234.herokuapp.com/getAvgRating';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      menuId: localStorage.getItem('cust_menuid'),
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData1:', postData)
      console.log(data);
      if(this.ratingNum == false){
        this.rating=0;
        this.ratingNum = 0;
      }
      else{
      this.rating = data[0].avgFood;
      this.ratingNum = data[0].avgFood;
    }
    }, error => {
      console.log(error);
    });
  }

  getFavAnot() {
    var url = 'https://foodie1234.herokuapp.com/getFavAnot';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      menuId: localStorage.getItem('cust_menuid'),
      loginId: localStorage.getItem('loginid'),
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };
    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('getFavAnot()postData:', postData)
      console.log(data);
      console.log('FavAnotAAAA',this.visible);
        this.visible=data;
        console.log('favANOTbbb',this.visible);
    }, error => {
      console.log(error);
    });
  }

  allReviews(){
    //this.router.navigateByUrl('/allReview/' + this.menuId);
    this.navCtrl.push(CustReviewsPage);
  }

  navSubmitReview() {
    //this.router.navigateByUrl('/submitReview/' + this.custId +  '/' + this.menuId);
    this.navCtrl.push(CustSubmitReviewPage);
  }
}
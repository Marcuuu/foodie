import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { CustPBookData } from '../../providers/Cust-pastBookingData';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-cust-past-booking-details',
  templateUrl: 'cust-past-booking-details.html'
})
export class CustPastBookingDetailsPage {
  bookItem: any;
  loading: any;
  cBPMenuItem: any;
  totalPrice: any=0;
  // this tells the tabs component which Pages should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public custPBookData: CustPBookData, public http: HttpClient) {
    this.bookItem = navParams.get('data');
    console.log(this.bookItem);
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cancelling'
    });
  }

  ionViewWillEnter() {
    this.getBMenuItems();
  }

  getBMenuItems() {
    console.log("entered", "here");
    var url = 'https://foodie1234.herokuapp.com/getCustMenuItemsDet';
    var postData = JSON.stringify({
      // post data MUSt match the request.body.userID; 
      bookingID: this.bookItem.bookID
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };   

    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData:', postData);
      console.log("menuItem", data);
      this.cBPMenuItem = data;
      for (var i=0;i<this.cBPMenuItem.length;i++) {
        this.totalPrice += this.cBPMenuItem[i].price;
      }
      this.totalPrice = this.totalPrice * (this.bookItem.bookPax);
    }, error => {
      console.log(error);
    });
  }
  
}

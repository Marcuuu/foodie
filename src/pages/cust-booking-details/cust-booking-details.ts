import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { CustRescheduleBookingPage } from '../cust-reschedule-booking/cust-reschedule-booking';
import { CustBookData } from '../../providers/Cust-bookingData';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-cust-booking-details',
  templateUrl: 'cust-booking-details.html'
})

export class CustBookingDetailsPage {
  bookItem: any;
  loading: any;
  cBMenuItem: any;
  totalPrice: any=0;
  // this tells the tabs component which Pages should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams, public custBookData: CustBookData, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public http: HttpClient) {
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
      this.cBMenuItem = data;
      for (var i=0;i<this.cBMenuItem.length;i++) {
        this.totalPrice += this.cBMenuItem[i].price;
      }
      this.totalPrice = this.totalPrice * (this.bookItem.bookPax);
      
    }, error => {
      console.log(error);
    });
  }

  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirm cancellation',
      message: 'Upon cancelation, you will have to book again according to the availabiity of the chef.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.cancelBooking();
            this.loading.present();
            console.log('Yes');
          }
        }
      ]
    });
    alert.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Booking has been cancelled',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  cancelBooking(){
    var url = 'https://foodie1234.herokuapp.com/cancelBooking';
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
      console.log("In /cancelBooking");
      console.log('postData:', postData);
      this.loading.dismiss();
      this.presentAlert();
      this.bookItem.bookStatus = "Cancelled";
      this.custBookData.getBookData();
    });
  }

  goToCustRescheduleBooking(bookItem){
    this.navCtrl.push(CustRescheduleBookingPage, {
      data: bookItem
    });
  }
}

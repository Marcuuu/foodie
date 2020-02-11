import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CustBookData } from '../../providers/Cust-bookingData';
import { CustBookingDetailsPage } from "../cust-booking-details/cust-booking-details";
import { custBooking } from "../../models/Cust-Bookings";
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { Observable } from "rxjs";

@Component({
  selector: "page-cust-ongoing-bookings",
  templateUrl: "cust-ongoing-bookings.html"
})
export class CustOngoingBookingsPage {
  cBooks: any;

  // this tells the tabs component which Pages should be each tab's root Page
  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public navParams: NavParams,
    private storage: Storage,
    public custBookData: CustBookData
  ) {}

  ionViewWillEnter(){
    this.cBooks = this.navParams.get('data');
    this.storage.get('CUSTBook').then((val) => {
      this.cBooks = val;
      console.log("Ongoing", this.cBooks);
      console.log('Get Customer Ongoing Bookings');
    });
  }

  //to push Booking Details page after selecting on specific bookings
  goToCustBookDetails(bookItem) {
    this.navCtrl.push(CustBookingDetailsPage, {
      data: bookItem
    });
  }
}

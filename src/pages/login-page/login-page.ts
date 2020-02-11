import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { PDPTabsPage } from '../PDP-tabs/PDP-tabs';
import { ProfileData } from '../../providers/PDP-profileData';
import { BookingsData } from '../../providers/PDP-bookingData';
import { DashboardData } from '../../providers/PDP-dashboardData';
import { CustTabsPage } from '../CUST-tabs/tabs2';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { MenusData } from '../../providers/PDP-menuData';
import { CustBookData } from '../../providers/Cust-bookingData';
import { CustPBookData } from '../../providers/Cust-pastBookingData';


@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
  cust: any;
  loading: any;

  constructor(public navCtrl: NavController, public http: HttpClient, public loadingCtrl: LoadingController, public dashboardData: DashboardData, public bookingData: BookingsData, public menusData: MenusData, public profileData: ProfileData, public custBookData: CustBookData, public custPBookData: CustPBookData) {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Authenticating'
    });
  }
  
  custLogin(custId){
    var url = 'https://foodie1234.herokuapp.com/custLogin1';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      custId: custId,
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
      console.log('data',data);
      //pdp
      if (data == false) {
        this.PDPLogin(custId);
        // localStorage.setItem("loginid","3");
        // var url = 'https://foodie1234.herokuapp.com/updateDashboard';
        // this.http.get(url).subscribe();    
        // console.log("In /updateDashboard");
        // this.dashboardData.getDashboardData();
        // this.bookingData.getBookingsData();
        // this.profileData.getProfileData();
        // this.menusData.getMenusData(data[0].custID);
        // this.menusData.getMenuItemsData();
        // setTimeout(() => {
        //   this.navCtrl.setRoot(PDPTabsPage);
        //   this.loading.dismiss();
        // }, 2000);
      } 
      //customer
      else {
        localStorage.setItem("loginid",data[0].custID)
        this.navCtrl.push(TabsControllerPage);
        this.loading.dismiss();
      } 
     }
    , error => {
      console.log(error);
    });
  }

  PDPLogin(PDPId){
    var url = 'https://foodie1234.herokuapp.com/PDPLogin';
    var postData = JSON.stringify({
      //these fields MUST match the server.js request.body.XXX;  
      custId: PDPId,
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
      //pdp 
      console.log('data',data);
        localStorage.setItem("loginid",data[0].id);
        var url = 'https://foodie1234.herokuapp.com/updateDashboard';
        this.http.get(url).subscribe();    
        console.log("In /updateDashboard");
        this.dashboardData.getDashboardData();
        this.bookingData.getBookingsData();
        this.profileData.getProfileData();
        this.menusData.getMenusData(data[0].id);
        this.menusData.getMenuItemsData();
        setTimeout(() => {
          this.navCtrl.setRoot(PDPTabsPage);
          this.loading.dismiss();
        }, 2000);
      } 
      //customer
      // if (data[0].custID == 2) {
      //   localStorage.setItem("loginid","2")
      //   this.navCtrl.push(TabsControllerPage);
      //   this.loading.dismiss();
      // } 
      // else if (data == false){
      //   console.log("Not authorized username");
      //   this.loading.dismiss();
      // }
     , error => {
      console.log(error);
    });
  }


  login(custId){
    this.custBookData.getBookData();
    this.custPBookData.getPBookData();
    this.loading.present();
    this.custLogin(custId);


  }
}

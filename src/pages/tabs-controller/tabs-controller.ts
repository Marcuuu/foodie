import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DiscoverPage } from '../discover/discover';
import { FavouritesPage } from '../favourites/favourites';
import { BookingsPage } from '../bookings/bookings';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DiscoverPage;
  tab2Root: any = FavouritesPage;
  tab3Root: any = BookingsPage;
  tab4Root: any = ProfilePage;
  constructor(public navCtrl: NavController) {
  }
  
}
import {Page} from 'ionic-angular';
import {Feed} from '../feed/feed';
import {Create} from '../create/create';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  feedRoot: any = Feed;
  createRoot: any = Create;
}

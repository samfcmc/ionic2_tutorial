import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

/*
	Generated class for the MemePage page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	templateUrl: 'build/pages/meme/meme.html',
})
export class Meme {
	private meme: any;
	private navParams: NavParams;
	
	constructor(public nav: NavController, navParams: NavParams) {
		this.navParams = navParams;
		this.meme = navParams.get('meme');
	}
	
	private share() {
		var plugins = window['plugins'];
		if(plugins && plugins.socialsharing) {
			var share = plugins.socialsharing;
			var message = this.meme.displayName;
			var subject = 'Meme';
			var file = this.meme.instanceImageUrl;
			var link = this.meme.instanceImageUrl;
			share.share(message, subject, file, link);
		}
	}
	
}

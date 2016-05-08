import {Page, NavController} from 'ionic-angular';
import {MemeAPIClient} from '../../meme-generator/meme-generator-api';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/memes/memes.html',
})
export class Memes {
	private memes: any[];
	private loading: boolean;
	private client: MemeAPIClient;
	
	constructor(public nav: NavController, client: MemeAPIClient) {	
		this.client = client;
	}
	
	public searchMemes(event: UIEvent, query: string) {
    	var finalQuery = query.trim();
    	console.log(finalQuery);
  	}
	
	onPageLoaded() {
		console.log('LOADED');
		this.loading = true;
		this.client.getGeneratorsByNew(0, (r: any) => {
			console.log(r);
		}, this.error);
	}
	
	public setMemes(memes: any) {
		this.loading = false;
		this.memes = memes;
		console.log(this.memes);
		
	}
	
	public error() {
		alert('UPS');
	}
}

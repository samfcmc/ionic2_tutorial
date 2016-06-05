import {Page, NavController} from 'ionic-angular';
import {MemeAPIClient} from '../../meme-generator/meme-generator-api';
import {NgZone} from 'angular2/core';
import {Meme} from '../meme/meme';
import {MemeCard} from '../../meme-card/meme-card';

@Page({
  templateUrl: 'build/pages/feed/feed.html',
  directives: [MemeCard] 
})
export class Feed {
	private memes: any[];
	private loading: boolean;
	private client: MemeAPIClient;
	private zone: NgZone;
	private error: any;
	private currentPage: number;
	private navController: NavController;

	constructor(client: MemeAPIClient, zone: NgZone, navController: NavController) {
		this.client = client;
		this.zone = zone;
		this.navController = navController;
		this.error = null;
	}

	onPageLoaded() {
		this.loading = true;
		this.loadInstances();
	}

	private loadInstances(callback?: () => void) {
		this.memes = [];
		this.loadPage(0, callback);
	}

	private loadPage(page: number, callback?: () => void) {
		this.client.getInstances(page, (result) => {
			if(callback) {
				callback();
			}
			this.instancesFetched(result, page);
			}, (errorThrown) => {
				this.error = errorThrown;
				this.loading = false;
				alert(JSON.stringify(errorThrown));
				if(callback) {
					callback();
				}
		});
	}

	private instancesFetched(instances: any[], page: number) {
		this.zone.run((() => {
			this.currentPage = page;
			this.loading = false;
			for(var i = 0; i < instances.length; i++) {
				var instance = instances[i];
				this.memes.push(instance);
			}
		}).bind(this));
	}

	private loadNextPage(infiniteScroll) {
		var nextPage = this.currentPage + 1;
		this.loadPage(nextPage, () => {
			infiniteScroll.complete();
		});
	}

	private showMeme(meme) {
		this.navController.push(Meme, {meme: meme});
	}

	private refresh(refresher) {
		this.loadPage(0, () => {
			this.memes = [];
			refresher.complete();
		});
	}

}

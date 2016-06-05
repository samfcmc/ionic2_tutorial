import {Page, ViewController, NavOptions} from 'ionic-angular';
import {MemeAPIClient} from '../../meme-generator/meme-generator-api';
import {NgZone} from 'angular2/core';
import {MemeCard} from '../../meme-card/meme-card';

@Page({
  templateUrl: 'build/pages/generators/generators.html',
  directives: [MemeCard] 
})
export class Generators {
	private generators: any[];
	private loading: boolean;
	private client: MemeAPIClient;
	private zone: NgZone;
	private viewController: ViewController;
	private errorOccured: any;
	private currentPage: number;
	
	constructor(client: MemeAPIClient, zone: NgZone, viewController: ViewController) {	
		this.client = client;
		this.zone = zone;
		this.viewController = viewController;
	}
	
	public search(event: UIEvent, query: string) {
    	var finalQuery = query.trim();
    	console.log(finalQuery);
  	}
	
	onPageLoaded() {
		this.loading = true;
		this.generators = [];
		this.loadPage(0);
	}
	
	public loadPage(page: number, callback?: () => void) {
		this.client.getGeneratorsByNew(page, (response: any) => {
			this.currentPage = page;
			this.generatorsFetched(response);
			if(callback) {
				callback();
			}
		}, (error) => {
			this.loading = false;
			this.currentPage = page;
			this.error(error);
			if(callback) {
				callback();
			}
		});
	}
	
	public loadNextPage(infiniteScroll) {
		var nextPage = this.currentPage + 1;
		this.loadPage(nextPage, () => {
			infiniteScroll.complete();
		});
	}
	
	public generatorsFetched(generators: any) {
		var self = this;
		this.zone.run(() => {
			self.loading = false;
			for(var i = 0; i < generators.length; i++) {
				var generator = generators[i];
				this.generators.push(generator);
			}
			self.generators = generators;
		})
	}
	
	public error(errorThrown) {
		this.loading = false;
		this.errorOccured = JSON.stringify(errorThrown);
		console.error(errorThrown);
		
	}
	
	public selectGenerator(generator) {
		var data = {generator: generator};
		this.close(data);
	}
	
	public cancel() {
		this.close();
	}
	
	private close(data? : any) {
		this.viewController.dismiss(data);
	}
}

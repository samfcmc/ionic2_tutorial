import {Component, Input} from 'angular2/core'

@Component({
	selector: 'meme-card',
	templateUrl : `build/meme-card/meme-card.html` 
})
export class MemeCard {
	@Input() title: string;
	@Input() imageUrl: string;
	
	constructor() {
		
	}
	
	ngOnInit() {
		console.log('test');
	}
}
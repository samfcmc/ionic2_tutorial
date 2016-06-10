import {Component, Input} from '@angular/core'

@Component({
	selector: 'meme-card',
	templateUrl : `build/meme-card/meme-card.html` 
})
export class MemeCard {
	@Input() title: string;
	@Input() imageUrl: string;
	@Input() text: string;
	
	constructor() {
		
	}
	
	ngOnInit() {
	}
}
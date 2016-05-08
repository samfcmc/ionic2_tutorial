import {Page, NavController} from 'ionic-angular';
import {Memes} from '../memes/memes';

@Page({
  templateUrl: 'build/pages/create/create.html',
})
export class Create {
  
  private navController: NavController;
  
  constructor(navController: NavController) {
    this.navController = navController;
  }
  
  public choosePicture(): void {
    this.navController.push(Memes);
  }
  
  public createMeme(): void {
    alert('Meme created. Not...');
  }
}
import {NavController, Modal, Alert} from 'ionic-angular';
import {Component} from '@angular/core';
import {Generators} from '../generators/generators';
import {MemeAPIClient} from '../../meme-generator/meme-generator-api';
import {Meme} from '../meme/meme';

@Component({
  templateUrl: 'build/pages/create/create.html',
})
export class Create {
  
  private navController: NavController;
  private selectedGenerator: any;
  private newMeme: any;
  private client: MemeAPIClient;
  
  constructor(navController: NavController, client: MemeAPIClient) {
    this.navController = navController;
    this.selectedGenerator = null;
    this.newMeme = {};
    this.client = client;
  }
  
  public chooseGenerator(): void {
    let modal = Modal.create(Generators);
    var self = this;
    modal.onDismiss((data: any) => {
      self.selectGenerator(data);
    });
    this.navController.present(modal);
  }
  
  public createMeme(newMeme: any): void {
    var topText: string = '';
    var bottomText: string = '';
    
    if(newMeme.topText) {
      topText = newMeme.topText.trim();
    }
    if(newMeme.bottomText) {
      bottomText = newMeme.bottomText.trim();
    }
    
    if(topText && bottomText && this.selectedGenerator) {
      this.preSubmitMeme(newMeme);
    }
    else {
      this.alertError('Some fields are missing');
    }
  }
  
  private selectGenerator(data: any) {
    if(data && data.generator) {
      this.selectedGenerator = data.generator;
    }
  }
  
  private alertError(message: string) {
    let alert = Alert.create({
      title: 'Error',
      message: message,
      buttons: ['Dismiss']
    });
    this.navController.present(alert);
  }
  
  private preSubmitMeme(meme: any) {
    var self = this;
    let alert = Alert.create({
      title: 'Login',
      message: 'Type your imgflip credentials',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            var username = '';
            var password = '';
            if(data.username) {
              username = data.username.trim();
            }
            if(data.password) {
              password = data.password.trim();
            }
            
            if(username && password) {
              self.submitMeme(meme, username, password);
            }
          }
        }
      ]
    });
    
    this.navController.present(alert);
    
  }
  
  private submitMeme(meme: any, username: string, password: string) {
      var self = this;
      var id = this.selectedGenerator.generatorID;
      var topText = meme.topText;
      var bottomText = meme.bottomText;
      var imageId = this.getImageId(this.selectedGenerator);
      var data = {
        'generatorId': id,
        'text0': topText,
        'text1': bottomText,
        'username': username,
        'password': password,
        'languageCode': 'en',
		'imageID': imageId
      }
      this.client.createMeme(data, (response) => {
        console.log(response);
        self.memeCreated(response);
      }, (error) => {
        self.errorSubmitMeme(error);
      })
  }
  
  private getImageId(generator: any) {
	  var imageUrl: string = generator.imageUrl;
	  var lastSlashIndex = imageUrl.lastIndexOf('/');
	  var imageName = imageUrl.substring(lastSlashIndex + 1);
	  imageName = imageName.replace('.jpg', '');
	  return imageName; 
  }
  
  private errorSubmitMeme(message) {
    this.alertError(JSON.stringify(message));
  }
  
  private memeCreated(data) {
    this.navController.push(Meme, {meme: data});
  }
}
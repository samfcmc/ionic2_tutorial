# ionic2_tutorial
Explain the tutorial

What is Ionic Framework



## Requirements
* [NodeJS](https://nodejs.org/en)
* [NPM](https://www.npmjs.com/)
* [Ionic CLI](http://ionicframework.com/getting-started/)
* [Android SDK](https://developer.android.com/studio/index.html) (If you want to build for Android)
Just install Android Studio because it comes with everything you need
* [XCode](https://developer.apple.com/xcode) (If you want to build for iOS)
* A text editor (My recomendation goes to [VS Code](https://www.visualstudio.com/en-us/products/code-vs.aspx)
which is a pretty nice editor with iteresting features
and it is available for all platforms)

## Getting started
The best way to learn is to get hands on.
In this tutorial, we are going to build a simple
app that will allow the user to create memes, share them
and check memes created by other users of
[Meme Generator](https://memegenerator.net/).


### Installing Ionic Beta
```sh
npm install -g ionic@beta
```

### Creating the project
```sh
ionic start memeapp --v2 --ts
```

The `--v2` option is for creating the project using Ionic V2
instead of V1 which is still the default version.
Beaware that this is a beta version, somethings might not work
as reliable as in the V1. But it is still a nice technology
to try.

The `--ts` option configures the project to use
Typescript, which is a nice language that gives us
static type checking and other stuff that we get from
really good languages, such as Java.

This command can take a long time to execute.

When the command finishes its execution we can start
exploring our new project's structure.

### Structure
#### The `app` folder

#### `node_modules` folder

#### `platforms` folder

#### `plugins` folder

#### `resources` folder

#### `typings` folder

#### `www` folder

### Run the example app
#### Getting the code
* Clone this repo
```bash
git clone git@github.com:samfcmc/ionic2_tutorial.git
```

* Navigate to the app directory
```bash
cd ionic2_tutorial/memeapp
```

* Install all dependencies
```bash
npm install
```

#### Run the app

You can run the app in multiple platoforms, even in your browser.
This example just has the Android platform but you can
add iOS if you want.

* Run in the browser
```bash
ionic serve
```

* Or, if you prefer an Android emulator
```bash
ionic emulate android
```

* You can use a real device. Connect it throught USB and run:
```bash
ionic run android
```

* If you want to add a new platform you can use `ionic add platform <platform name>`.
For instance, if you want to add iOS run the following:
```bash
ionic add platform ios
```
The previously mentioned commands to `emulate` and `run` in Android
are similar to do the same in ios.
Just replace the word `android` by `ios`.
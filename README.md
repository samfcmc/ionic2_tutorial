# ionic2_tutorial
Explain the tutorial

What is Ionic Framework



## Check the presentation


## Requirements
* NodeJS
* NPM
* Ionic CLI

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

The `--ts` option configures the project to use
Typescript, which is a nice language that gives us
static type checking and other stuff that we get from
really good languages, such as Java.

This command can take a long time to execute.

When the command finishes its execution we can start
exploring our new project's structure.

### Structure
#### The `app` folder


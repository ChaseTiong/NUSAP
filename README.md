# NUSAP

## Planning your degree in NUS

##Overview of Project

### Project Description: 
* NUSAP is a web-based application that allows NUS students to view their current progress and plan their modules to meet the degree requirement according to their respective major throughout their study in NUS.
* Project NUSAP is achieved Project Apollo 11 and is managed by Tiong YaoCong and Chen Rui Wen.
Check out the [live example](http://nusap.me)!

### Features (Currently only working for NUS Computer Science Student admission from AY15/16 & above)
* NUS Students are allowed to login through IVLE
* Retrieve student's information from IVLE (Cleared Modules & Status)
* Able to retrieve all modules from NUSMODS & IVLE
* Cap Calculator 
* Color-coded modules to reduce confusion

## Usage
### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com)

### Installation
1. Clone the repository: `git clone https://github.com/rdash/rdash-angular.git`
2. Install the NodeJS dependencies: `npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp build task: `gulp build`.
5. Run the gulp default task: `gulp`. This will build any changes made automatically, and also run a live reload server on [http://localhost:8888](http://localhost:8888).

Ensure your preferred web server points towards the `dist` directory.

### Development
Continue developing the dashboard further by editing the `src` directory. With the `gulp` command, any file changes made will automatically be compiled into the specific location within the `dist` directory.

If you'd like to include any additional modules/packages not included with rdash-angular, add them to your `bower.json` file and then update the `src/index.html` file, to include them in the minified distribution output.

## Credits
* [Elliot Hesp](https://github.com/Ehesp)
* [Leonel Samayoa](https://github.com/lsamayoa)
* [Mathew Goldsborough](https://github.com/mgoldsborough)
* [Ricardo Pascua Jr](https://github.com/rdpascua)
* [Template] (https://github.com/rdash/rdash-angular)

/*global describe, before, it, beforeEach */
'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

describe('angular-xl generator', function () {
    var angular;
    var folderName = 'temp';

    beforeEach(function (done) {
        var deps = [
            '../../app',
            '../../common',
            '../../controller',
            '../../main', [
                helpers.createDummyGenerator(),
                'karma:app'
            ]
        ];
        helpers.testDirectory(path.join(__dirname, folderName), function (err) {
            if (err) {
                done(err);
            }
            angular = helpers.createGenerator('angular-xl:app', deps);
            angular.options['skip-install'] = true;
            done();
        });
    });

    describe('Page', function () {
        //TODO: Test that it adds style import to _pages.scss
        it('should generate a new page', function (done) {
            var controllerGenerator;
            var deps = [
                '../../controller',
                '../../view',
                '../../page',
            ];
            controllerGenerator = helpers.createGenerator('angular-xl:page', deps, ['thingThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                controllerGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/pages/thing-thing/index/index.js'],
                        ['app/pages/thing-thing/_thing-thing.scss'],
                        ['app/pages/thing-thing/index/views/index.html'],
                        ['test/spec/pages/thing-thing/index/index.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Component', function () {
        //TODO: Test that it adds style import to _component.scss
        it('should generate a new component', function (done) {
            var componentGenerator;
            var deps = [
                '../../component'
            ];
            componentGenerator = helpers.createGenerator('angular-xl:component', deps, ['thingThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                componentGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/components/thing-thing/thing-thing.js'],
                        ['app/components/thing-thing/styles/_thing-thing.scss'],
                        ['app/components/thing-thing/views/thing-thing.html'],
                        ['test/spec/components/thing-thing.js']
                    ]);
                    done();
                });
            });
        });
    });

    describe('Service', function () {
        it('should generate a new service', function (done) {
            var serviceGenerator;
            var deps = [
                '../../service'
            ];
            serviceGenerator = helpers.createGenerator('angular-xl:service', deps, ['serviceThing']);

            helpers.mockPrompt(angular, {
                modules: []
            });
            angular.run([], function () {
                serviceGenerator.run([], function () {
                    helpers.assertFiles([
                        ['app/scripts/services/service-thing.js'],
                        ['spec/services/service-thing.js']
                    ]);
                    done();
                });
            });
        });
    });
     /*


 xit('creates expected files', function (done) {
 var expected = [
 'app/.htaccess',
 'app/404.html',
 'app/favicon.ico',
 'app/robots.txt',
 'app/styles/main.scss',
 'app/styles/_animations.scss',
 'app/styles/_components.scss',
 'app/styles/_globals.scss',
 'app/styles/_views.scss',
 'app/views/main.html',
 'app/views/components/awesome/awesome.js',
 'app/scripts/components/awesome.js',
 'test/spec/components/awesome.js',
 ['.bowerrc', /"directory": "app\/bower_components"/],
 'Gruntfile.js',
 'package.json',
 ['bower.json', /"name":\s+"temp"/],
 'app/scripts/module.js',
 'app/scripts/config/routes.js',
 'app/index.html',
 'app/scripts/controllers/main.js',
 'test/spec/controllers/main.js'
 ];
 helpers.mockPrompt(angular, {
 modules: []
 });

 angular.run({}, function () {
 helpers.assertFiles(expected);
 done();
 });
 });

 xit('should generate the same appName in every file', function (done) {
 var expectedAppName = 'upperCaseBugApp';
 var expected = [
 'app/scripts/module.js',
 'app/scripts/config/routes.js',
 'app/scripts/controllers/main.js',
 'app/index.html',
 'test/spec/controllers/main.js'
 ];
 helpers.mockPrompt(angular, {
 modules: []
 });

 angular.run({}, function () {
 // Check if all files are created for the test
 helpers.assertFiles(expected);

 // read JS Files
 var module_js = fs.readFileSync('app/scripts/module.js', 'utf8');
 var route_js = fs.readFileSync('app/scripts/config/routes.js', 'utf8');
 var main_js = fs.readFileSync('app/scripts/controllers/main.js', 'utf8');
 var main_test_js = fs.readFileSync('test/spec/controllers/main.js', 'utf8');

 // Test JS Files
 var regex_js = new RegExp('module\\(\'' + expectedAppName + '\'');
 assert.ok(regex_js.test(module_js), 'module.js template using a wrong appName');
 assert.ok(regex_js.test(route_js), 'route.js template using a wrong appName');
 assert.ok(regex_js.test(main_js), 'main.js template using a wrong appName');
 assert.ok(regex_js.test(main_test_js), 'controller spec template using a wrong appName');

 // read HTML file
 var index_html = fs.readFileSync('app/index.html', 'utf8');

 // Test HTML File
 var regex_html = new RegExp('ng-app=\"' + expectedAppName + '\"');
 assert.ok(regex_html.test(index_html), 'index.html template using a wrong appName');
 done();
 });
 });

 xdescribe('Controller', function () {
 it('should generate a new controller', function (done) {
 generatorTest('controller', 'controller', 'controllers', _.classify, _.classify, 'Ctrl', done);
 });
 });


* */
});

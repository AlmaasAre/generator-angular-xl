'use strict';
var path = require('path'),
    util = require('util'),
    helpers = require('yeoman-generator').test,
    _ = require('underscore.string');

var deps = [
    '../../app',
    '../../common',
    '../../controller',
    '../../view',
    '../../page',
    '../../component',
    '../../decorator',
    '../../value',
    '../../service',
    '../../factory',
    '../../provider',
    '../../repository',
    '../../filter',
    '../../directive',
    '../../route',
    '../../main', [
        helpers.createDummyGenerator(),
        'karma:app'
    ]
];

helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
    var angular = helpers.createGenerator('angular-xl:app', deps);

    angular.options['skip-install'] = true;

    helpers.mockPrompt(angular, {
        modules: [
            'resourceModule',
            'cookiesModule',
            'sanitizeModule',
            'restangularModule',
            'touchModule',
            'xeditableModule',
            'angularUIBootstrapModule',
            'ngStorageModule'
        ]
    });

    var queue = [
        'page',
        'component',
        'service',
        'factory',
        'value',
        'provider',
        'filter',
        'repository',
        'directive',
        'view',
        'controller',
        'route'
    ];

    //Recursively do all tests
    function testNext() {
        if (queue.length == 0) {
            return;
        }
        var name = queue.pop(); //Get next generator in line
        var generator = helpers.createGenerator('angular-xl:' + name, deps, [ name + 'Test' ]);

        generator.run([], function () {
            //Do the next test in queue
            testNext();
        });
    };

    //Run tests
    angular.run([], function () {
        testNext(); //Test all generators in queue recursively
    });
});




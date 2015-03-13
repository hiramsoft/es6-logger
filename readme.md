Hiram Logger (hlog)
=======

Requirements
-----

* JSPM and ES6
* AngularJS is *NOT* required

Synopsis
-----

First, install via [jspm](http://www.jspm.io)

    jspm install 'github:hiramsoft/es6-logger'

Optionally, in your config.js replace this line

    "es6-logger": "github:hiramsoft/es6-logger@master"

with this line

    "hlog": "github:hiramsoft/es6-logger@master"

Second, use ES6 import to bring logging to your code

    import $log from 'hlog'

Third, then log like normal

    ...

    $log.info('Your logging message here');
    $log.warn('Something worth watching');
    $log.error('Major trouble');
    $log.error('More information', myErrObj);

Introduction and Background
------
This is the [AngularJS](https://angularjs.org/) $logProvider pulled out into a standalone ES6 module.

Why?

If you are refactoring your AngularJS code into ES6 classes and modules,
it is very likely you are running into to the overlap of AngularJS Dependency Injection and ES6 imports.

Example of mixing ES6 with AngularJS DI
---------

    class MyClass{
        static factory($log, dep1, dep2, ...){
            return new MyClass($log, dep1, dep2, ...);
        }

        constructor($log, dep1, dep2, ...){
            this.$log = $log;
            this.dep1 = dep1;
            this.dep2 = dep2;
            ...
        }

        doSomethingAwesome(){
            this.$log.debug('Everything is better when you're part of a team!');
            ...
        }

    }

    MyClass.factory.$inject = ['$log', 'dep1', 'dep2'];

    export default MyClass;

Notice how '$log' has to be defined and passed through three times, once at $inject, once at the factory,
and once at the constructor.  This is less than elegant, but it's understandable given the transition period
of ES6 and 1.X AngularJS.

However, as a consequence the calls to $log have to be prefixed with 'this' as in _this.$log_
... that is way too much work for what should be 'easy.'

Why should logging be easy?  Because easy things are done often, and verbose logging makes for maintainable code.

Reworked example using this logging module
-------

    import $log from 'hiram-logger'

    class MyClass{
        static factory(dep1, dep2, ...){
            return new MyClass(dep1, dep2, ...);
        }

        constructor(dep1, dep2, ...){
            this.dep1 = dep1;
            this.dep2 = dep2;
            ...
        }

        doSomethingAwesome(){
            $log.debug('Everything is better when you're part of a team!');
            ...
        }

        MyClass.factory.$inject = ['dep1', 'dep2'];

        $log.debug('MyClass is now available');

        export default MyClass;
    }

Notice how $log is available throughout the file, both within the class and also without it.  Also, notice how
this.$log disappeared.

What's more, $log has no dependency on AngularJS so you can use this logging anywhere and everywhere.

Where are the appenders and other whizbang features?
------

I'm a big Java developer, but honestly for JavaScript at this stage, we don't need anything more than a way to
separate out console messages between debug, info, warn, and error.
One day we'll find a compelling use for an appender, but today in Q2 2015 isn't that day.
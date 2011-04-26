#Fictum
- [http://github.com/gmoeck/fictum](http://github.com/gmoeck/fictum)


##Description:
Fictum is designed to make it easier to test your sproutcore applications in pure javascript by providing an intuitive interface to create a fake server to respond to your application's request. 

##Installation

To setup fictum to work in your SproutCore project, we need to add the framework to your application.

    $ cd <your sproutcore project's root directory>
    $ mkdir frameworks # if you don't already have a frameworks folder
    $ cd frameworks
    $ git clone git://github.com/gmoeck/fictum.git

##Usage
At this point, the easiest way to see how fictum can be used is to look at it's
integration tests. These can be seen within
[foundation/tests/integration](https://github.com/gmoeck/fictum/tree/master/frameworks/foundation/tests/integration).

##Running Fictum's Test Suite
First you need to update your Buildfile to include sproutcore-jasmine.
**Note**: When you go back to production, you need to recomment out
these lines.

Then start your server running.

    $ cd <your sproutcore project's root directory>
    $ sc-server

###Integration Tests
    http://localhost:4020/static/foundation/en/current/tests/integration.html

###Unit Tests
    http://localhost:4020/static/foundation/en/current/tests/unit.html



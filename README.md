# grunt-edgecast-purge

> Purge files from the Edgecast CDN

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-edgecast-purge --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-edgecast-purge');
```

## The "edgecast_purge" task

### Overview
In your project's Gruntfile, add a section named `edgecast_purge` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  edgecast_purge: {
    options: {
      customer: '1234A',
      authorization: 'TOK:your-hashed-authorization-token',
      edgeCNAME: 'http://your.edge.cname.com/',
      mediaType: 8
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  }
});
```

### Options

#### options.customer
Type: `String`
Default value: `null`

**Required**. Your Edgecast Account.

#### options.authorization
Type: `String`
Default value: `null`

**Required**. Your Edgecast WebService REST API Token

#### options.edgeCNAME
Type: `String`
Default value: `null`

**Required**. The Edge CNAME for the container you wish to purge.

#### options.mediaType
Type: `Integer`
Default value: `null`

**Required**. An integer that indicates the service for which an asset will be purged. (2: Flash Media Streaming, 3: HTTP Large, 8: HTTP Small, 14: Application Delivery Network (ADN))

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2015-01-25   v0.1.1   Make `async` a dependency, not just a devDependency
* 2015-01-25   v0.1.0   Work in progress, not yet officially released.
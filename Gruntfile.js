// our wrapper function (required by grunt and its plugins)
module.exports = function(grunt) {

  var srcPath = "src/",
      buildPath = "ODP/WebContent/";

  // CONFIGURE GRUNT
  grunt.initConfig({

    // get the configuration info from package.json
    pkg: grunt.file.readJSON('package.json'),

    // wait task, because Eclipse versions less than 3.7 suck for registering ODP changes on Windows
    wait: {
        options: {
            delay: 5000
        },
        pause: {      
            options: {
                before : function(options) {
                    console.log('pausing %dms', options.delay);
                },
                after : function() {
                    console.log('pause end');
                }
            }
        }
    },

    // configure plugin with information, sample here is jshint, which doesn't like my code
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        '-W033': true, // mising semicolon
        '-W041': true, // use 'x' to compare with 'y'
        '-W004': true, // x already in use
        '-W014': true // bad line breaking before '||'
      },
      all: ['Grunfile.js', 'src/js/*.js']
    },

    // ng-annotate
    ngAnnotate: {
        options: {
          sourceMap: true
        },
        app: {
            files: {
              expand: true,
              src: ['src/js/*.js'],
            },
        },
    },

    // configure uglify to minify js files
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'ODP/WebContent/js/scripts.min.js': 'src/js/*.js'
        }
      }
    },

    // clean output directory
    clean: {
      all: [
        "ODP/WebContent/js/*.js",
        "ODP/WebContent/css/*.css",
        "ODP/WebContent/partials/*.html",
        "ODP/WebContent/*.*",
        "!ODP/WebContent/libs",
        "!ODP/WebContent/META-INF"
        ],
      index: ["ODP/WebContent/index.html"],
      partials: ["ODP/WebContent/partials/*.html"],
      js: ["ODP/WebContent/js/*.js"],
      css: ["ODP/WebContent/css/*.css"],
      custFile: [
        "ODP/WebContent/*.*",
        "!ODP/WebContent/index.html"
      ]
    },

    // configure cssmin to minify css files
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'ODP/WebContent/css/styles.min.css': 'src/css/*.css'
        }
      }
    },

    // configure htmlmin to remove comments and whitespace or more for dev vs dist
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: 'src/partials',
          src: '{,*/}*.html',
          dest: 'ODP/WebContent/partials'
        }]
       }
    },

    // copy index.html to dist
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['index.html'], dest: 'ODP/WebContent/', filter: 'isFile'}
        ]
      }
    },

    // inject app css and js
    injector: {
      options: {
        ignorePath: 'ODP/WebContent/',
        addRootSlash: false
      },
      dependencies: {
        files: {
          'ODP/WebContent/index.html': [
            'ODP/WebContent/css/*.css',
            'ODP/WebContent/js/*.js',
            '!ODP/WebContent/libs/**/*.js',
          ],
        }
      }
    },

    // configure watch to auto update
    watch: {
      stylesheets: {
        files: ['src/css/*.css'],
        tasks: ['clean:css','clean:custFile','cssmin','wait','customTask']
      },
      scripts: {
        files: 'src/js/*.js',
        tasks: ['clean:js','clean:custFile','jshint', 'uglify','wait','customTask']
      },
      partials: {
        files: 'src/partials/*.html',
        tasks: ['clean:partials','clean:custFile','htmlmin','wait','customTask']
      },
      index: {
        files: 'src/index.html',
        tasks: ['clean:index','clean:custFile','copy','wait','customTask']
      },
      grunt: {
        files: ['Gruntfile.js']
      }
    },

    browserSync: {
      dev: {
          bsFiles: {
              src : [ 'src/*' ]
          },
          options: {
              watchTask: true,
              proxy: 'balder/AmazingDemo.nsf/'
          }
      }
    }

  });

  // LOAD GRUNT PLUGINS
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-wait');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // CREATE TASKS
  grunt.registerTask('customTask', function(){
    // 
    var fs = require('fs');
    var uuid = require('uuid');
    fs.writeFile("ODP/WebContent/"+uuid.v4()+'.txt',
      "An arbitrary build file to attempt to force DDE to pick up the changes.",
      function(err) { if(err) { return console.log(err); }
    });
  });
  grunt.registerTask('build', ['jshint', 'clean:all', 'uglify', 'cssmin', 'htmlmin', 'copy', 'injector', 'customTask']);
  grunt.registerTask('default', ['build','browserSync','watch']);

};

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'public/bundle.js': ['public/js/src/*.js']
        }
      }
    },

    stylus: {
      compile: {
        files: {
          'public/style/inc.css': 'public/style/inc.styl'
        }
      }
    },

    watch: {
      scripts: {
        files: ['public/js/src/*.js'],
        tasks: ['browserify']
      },
      styles: {
        files: ['public/style/*.styl'],
        tasks: ['stylus']
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);

};
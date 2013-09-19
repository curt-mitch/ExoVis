module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'bundle.js': ['js/src/*.js']
        }
      }
    },

    stylus: {
      compile: {
        files: {
          'style/inc.css': 'style/inc.styl'
        }
      }
    },

    watch: {
      scripts: {
        files: ['js/src/*.js'],
        tasks: ['browserify']
      },
      styles: {
        files: ['style/*.styl'],
        tasks: ['stylus']
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);

};
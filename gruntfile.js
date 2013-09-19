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
        options: {
          'include css': true
        },
        files: {
          'styles/inc.css': 'styles/inc.styl'
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/src/*.js'],
        tasks: ['browserify']
      },
      styles: {
        files: ['styles/*.styl'],
        tasks: ['stylus']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);

};
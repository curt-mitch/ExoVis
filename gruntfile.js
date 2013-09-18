module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'module.js': ['js/src/*.js']
        }
      }
    },
    watch: {
      files: ['js/src/*.js'],
      tasks: ['browserify']
    }
  });
};

grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-watch');
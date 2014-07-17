module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        cwd: '../master',
        src: '**',
        dest: 'app/widgets/nl.fokkezb.infiniteScroll/',
      },
    },
    clean: {
      main: ['app/widgets']
    },
    titanium: {
      ios: {
        options: {
          command: 'build',
          platform: 'ios',
          logLevel: 'trace',
          iosVersion: 7.1,
          shadow: true,
          sdk: '3.3.0.RC'
        }
      },
      android: {
        options: {
          command: 'build',
          platform: 'android',
          logLevel: 'trace',
          shadow: true,
          sdk: '3.3.0.RC'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-titanium');

  grunt.registerTask('update', ['clean', 'copy']);  

  grunt.registerTask('ios', ['update', 'titanium:ios']);  
  grunt.registerTask('android', ['update', 'titanium:android']);

  grunt.registerTask('default', ['ios']);
};
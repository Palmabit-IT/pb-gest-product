module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        browsers: ['Chrome']
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> - Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n'
      },
      dist: {
        src: [
          'src/*.js',
          'src/**/*.js'
        ],
        dest: 'dist/pb-gest-product.js'
      }
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/pb-gest-product.js': 'dist/pb-gest-product.js'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> - Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> */\n'
      },
      build: {
        files: [
          {
            src: [
              'dist/pb-gest-product.js'
            ],
            dest: 'dist/pb-gest-product.min.js'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-babel');

  // Default task(s).
  grunt.registerTask('default', ['karma', 'concat', 'babel', 'uglify']);
};

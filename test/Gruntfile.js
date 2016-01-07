module.exports = function (grunt) {
    grunt.initConfig({
        cssunitswitch   : {
            global      : {
                cwd     : "src" ,
                dist    : "dev" ,
                src     : [ "*.css" ] ,
                remUnit : 30
            }
        }
    });

    grunt.loadTasks( "../tasks" );
    grunt.task.registerTask( "default" , [ "cssunitswitch" ] );
};

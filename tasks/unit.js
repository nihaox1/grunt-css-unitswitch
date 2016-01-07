var grunt ,
    Path    = require( "path" ) ,
    Unit;

Unit    = function( opt ){
    var _self   = this;
    this.opt    = opt;
    grunt.file.mkdir( Path.resolve( this.opt.dist ) );
    if( opt.remUnit ){
        grunt.file.recurse( Path.resolve( this.opt.cwd ) , function( filePath , dir , type , fileName ){
            _self.handlerFiles( filePath , fileName , "rem" );
        } );
    }
}

Unit.prototype  = {
    writeFile   : function( dist , str ){

        return this;
    } ,
    handlerFiles    : function( filePath , fileName , type ){
        var _file   = grunt.file.read( filePath , "utf-8" ) ,
            _dist   = Path.resolve( this.opt.dist , fileName );
        _file   = this[ type ]( _file , this.opt.remUnit );
        grunt.file.write( _dist , _file , "utf-8" );
        return this;
    } ,
    rem     : function( str , num ){
        return str.replace( /\d+px/gi , function( v ){
                v   = v.replace( "px" , "" );
                return v > 0 ? ( parseFloat( v / num ).toFixed( 2 ) + "rem" ) : 0;
            } );
    }
}

module.exports = function( __grunt ){
    grunt   = __grunt;
    grunt.registerMultiTask( "cssunitswitch" , "css unit switch" , function(){
        for( var i = 0 , len = this.files.length; i < len; i++ ){
            new Unit( this.files[ i ] );
        }
    } );
}
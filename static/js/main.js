/*!
 *
 * main.js
 *
 * Initialises melon.
 *
 **/

// game resources
var g_resources = [{
    name: "meanbee_tileset",
    type: "image",
    src: "images/meanbee_tileset.png"
}, {
    name: "map",
    type: "tmx",
    src: "assets/map.tmx"
}, {
    name: "sprite",
    type: "image",
    src: "images/sprite.png"
}];


var jsApp = {
    /* Initialize the jsApp */
    onload: function() {
        // init the video
        if (!me.video.init('jsapp', 640, 480, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "audio"
        me.audio.init("mp3,ogg");

        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all resources to be loaded
        me.loader.preload(g_resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },


    /* callback when everything is loaded */
    loaded: function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        me.entityPool.add("mainPlayer", PlayerEntity);

        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);

        // start the game
        me.state.change(me.state.PLAY);
    }

}; 

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend( {

        onResetEvent: function() {
            me.levelDirector.loadLevel("map");
        },


        /* action to perform when game is finished (state change) */
        onDestroyEvent: function() {
        }

    });


//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});
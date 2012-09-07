/*!
 *
 *   melonJS
 *   http://www.melonjs.org
 *
 *   Step by step game creation tutorial
 *
 **/

// game resources
//game resources
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



var jsApp	=
{
    /* ---

     Initialize the jsApp

     ---			*/
    onload: function()
    {

        // init the video
        if (!me.video.init('jsapp', 640, 480, false, 1.0))
        {
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


    /* ---

     callback when everything is loaded

     ---										*/
    loaded: function ()
    {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        me.entityPool.add("mainPlayer", PlayerEntity);

        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);

        // start the game
        me.state.change(me.state.PLAY);
    }

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
    {

        onResetEvent: function()
        {
            // stuff to reset on state change
            me.levelDirector.loadLevel("map");
        },


        /* ---

         action to perform when game is finished (state change)

         ---	*/
        onDestroyEvent: function()
        {

        }

    });


//bootstrap :)
window.onReady(function()
{
    jsApp.onload();
});




var PlayerEntity = me.ObjectEntity.extend({

    /* -----

     constructor

     ------ */

    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
        this.gravity = 0;
    },

    /* -----

     update the player pos

     ------ */
    update: function() {

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('jump')) {

        }

        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});
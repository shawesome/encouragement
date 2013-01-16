var PlayerEntity = me.ObjectEntity.extend({

    /* constructor */
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // walking animatin
        this.addAnimation ("walk-down", [0,1,2,3]);
        this.addAnimation ("walk-up", [8,9,10,11]);
        this.addAnimation ("walk-right", [16,17,18,19]);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
        this.gravity = 0;
    },

    /* update the player pos */
    update: function() {
        if (me.input.isKeyPressed('left')) {
            this.setCurrentAnimation("walk-right");
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.setCurrentAnimation("walk-right");
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        
        if (me.input.isKeyPressed('up')) {
            this.setCurrentAnimation("walk-up");
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.setCurrentAnimation("walk-down");
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.y = 0;
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


var EnemySpawner = me.InvisibleEntity.extend({
    update: function() {
        console.log('maybe spawn an enemy, maybe not');
    }
});

var EnemyEntity = me.ObjectEntity.extend({
    /* constructor */
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        // walking animatin
        this.addAnimation ("walk-down", [0,1,2,3]);
        this.addAnimation ("walk-up", [8,9,10,11]);
        this.addAnimation ("walk-right", [16,17,18,19]);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
        this.gravity = 0;
    },

    /* update the player pos */
    update: function() {
        var goX = Math.random() >= 0.5;
        var goY = Math.random() >= 0.5;

        if (goX) {
            this.vel.x += this.accel.x * me.timer.tick;
            this.setCurrentAnimation("walk-right");
            this.flipX(false);
                //Updating x and then y, rather than both together ~TS
                if (goY) {
                this.vel.y += this.accel.y * me.timer.tick;
                this.setCurrentAnimation("walk-down");
            } else {
                this.vel.y -= this.accel.y * me.timer.tick;
                this.setCurrentAnimation("walk-up");
            }
        } else {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.setCurrentAnimation("walk-right");
            this.flipX(true);
                if (goY) {
                this.vel.y += this.accel.y * me.timer.tick;
                this.setCurrentAnimation("walk-down");
            } else {
                this.vel.y -= this.accel.y * me.timer.tick;
                this.setCurrentAnimation("walk-up");
            }
        }
        /*if (goY) {
            this.vel.y += this.accel.y * me.timer.tick;
            this.setCurrentAnimation("walk-down");
        } else {
            this.vel.y -= this.accel.y * me.timer.tick;
            this.setCurrentAnimation("walk-up");
        }*/
        this.updateMovement();
        return true;
    }
});

//Group member: Anson Fong, Peichen Yao  Date: 4/21/2024


class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.armRX = this.bodyX + 100;
        this.armRY = this.bodyY + 20;
        this.armLX = this.bodyX - 100;
        this.armLY = this.bodyY + 20;

        this.legLX = this.bodyX - 50;
        this.legLY = this.bodyY + 150;
        this.legRX = this.bodyX + 50;
        this.legRY = this.bodyX + 200;

        this.eyeX = 300;
        this.eyeY = 300;

        this.hornLX = this.bodyX - 50;
        this.hornLY = this.bodyY - 70;

        this.hornRX = this.bodyX + 50;
        this.hornRY = this.bodyY - 70;

        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 50;

        this.S_Key = null;
        this.F_Key = null;
        this.D_Key = null;
        this.A_Key = null;
        
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        //body image
        this.load.image("bluebody", "body_blueA.png");

        //arms
        this.load.image("yArmE", "arm_yellowE.png");
        this.load.image("yArmc", "arm_yellowC.png");

        //legs
        this.load.image("legB", "leg_redB.png");
        this.load.image("legA", "leg_redA.png");

        //mouth
        this.load.image("fang", "mouthI.png");
        this.load.image("smile", "mouthH.png");

        //eye
        this.load.image("EyeBlue", "eye_blue.png");
        this.load.image("EyeRed", "eye_red.png");
        this.load.image("EyeYellow", "eye_yellow.png");

        //accessories
        this.load.image("hornDark", "detail_dark_horn_small.png");
        this.load.image("hornDark2", "detail_dark_horn_small.png");

        


        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        this.A_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.S_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.F_Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueD.png");

        //eyes
        my.sprite.EyeBlue = this.add.sprite(this.eyeX, this.eyeY, "EyeRed");

        //accessories
        my.sprite.hornDark = this.add.sprite(this.hornLX, this.hornLY, "hornDark");
        my.sprite.hornDark.flipX = true;
        my.sprite.hornDark2 = this.add.sprite(this.hornRX, this.hornRY, "hornDark2");

        //Legs
        my.sprite.legB = this.add.sprite(this.legLX, this.legLY, "legB");
        my.sprite.legB.flipX = true;
        my.sprite.legA = this.add.sprite(this.legRX, this.legRY, "legA");

        //Arms
        my.sprite.ArmLeft= this.add.sprite(this.armLX, this.armLY, "yArmE");
        my.sprite.ArmLeft.flipX = true;
        my.sprite.ArmRight= this.add.sprite(this.armRX, this.armRY, "yArmE");

        //mouth
        my.sprite.smile = this.add.sprite(this.mouthX, this.mouthY, "smile");
        my.sprite.fang = this.add.sprite(this.mouthX, this.mouthY, "fang");


        //Smile face when 'S' is pressed
        my.sprite.fang.visible = false;

        this.S_Key.on('down', () => {
            my.sprite.fang.visible = false;
            my.sprite.smile.visible = true;
        });

         //fang face
         this.F_Key.on('down', () => {
            my.sprite.smile.visible = false;
            my.sprite.fang.visible = true;
        });
        /*
        // D_key, moving to the right
        this.D_Key.on('down', () => {
            this.bodyX = this.bodyX + 50;
            

        });*/
        


        
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if (this.A_Key.isDown) {
            this.bodyX -= 2; // Move left
        }
        if (this.D_Key.isDown) {
            this.bodyX += 2; // Move right
        }

        this.updateMonsterPositions();
        this.updateMonsterSprites();
       

       
    }

    updateMonsterPositions() {
        // Update all component positions based on bodyX
        this.armRX = this.bodyX + 100;
        this.armRY = this.bodyY + 20;
        this.armLX = this.bodyX - 100;
        this.armLY = this.bodyY + 20;
        this.legLX = this.bodyX - 50;
        this.legLY = this.bodyY + 150;
        this.legRX = this.bodyX + 50;
        this.legRY = this.bodyY + 150;
        this.eyeX = this.bodyX;
        this.eyeY = this.bodyY - 50;
        this.hornLX = this.bodyX - 50;
        this.hornLY = this.bodyY - 70;
        this.hornRX = this.bodyX + 50;
        this.hornRY = this.bodyY - 70;
        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 50;
    }

    updateMonsterSprites() {
        // Update sprite positions
        let my = this.my;
        my.sprite.body.setPosition(this.bodyX, this.bodyY);
        my.sprite.EyeBlue.setPosition(this.eyeX, this.eyeY);
        my.sprite.hornDark.setPosition(this.hornLX, this.hornLY);
        my.sprite.hornDark2.setPosition(this.hornRX, this.hornRY);
        my.sprite.legB.setPosition(this.legLX, this.legLY);
        my.sprite.legA.setPosition(this.legRX, this.legRY);
        my.sprite.ArmLeft.setPosition(this.armLX, this.armLY);
        my.sprite.ArmRight.setPosition(this.armRX, this.armRY);
        my.sprite.smile.setPosition(this.mouthX, this.mouthY);
        my.sprite.fang.setPosition(this.mouthX, this.mouthY);
    }

}
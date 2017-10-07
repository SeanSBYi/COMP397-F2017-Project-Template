module objects {
    export class Plane extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES      

        // PUBLIC PROPERTIES

        // CONSTRUCTORS
        constructor(assetManager:createjs.LoadQueue) {
            super(assetManager, "plane");

            this.Start();
        }

        // PRIVATE METHODS
        private _checkBounds() {
            if(this.x >= (640 - this.halfHeight)) {
                this.x = 640 - this.halfWidth;
            }
            if(this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        }

        // PUBLIC METHODS
        public Start() {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.x = 320;
            this.y = 430;
        }

        public Update() {
            this.x = this.stage.mouseX;
            this._checkBounds();
        }
    }
}
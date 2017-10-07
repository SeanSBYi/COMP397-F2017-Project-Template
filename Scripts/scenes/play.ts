module scenes {
    export class Play extends objects.Scene {
      // PRIVATE INSTANCE VARIABLES
      private _assetManager:createjs.LoadQueue;
  
      private _plane:objects.Plane;
      private _ocean:objects.Ocean;
      private _island:objects.Island;
      private _clouds:objects.Cloud[];  
      private _cloudNum:number;
  
      private _livesLabel: objects.Label;
      private _scoreLabel: objects.Label;
      
      private _lives;
      private _score;

      // PUBLIC PROPERTIES
  
      // CONSTRUCTORS
      constructor(assetManager:createjs.LoadQueue, currentScene:number) {
        super();
        this._assetManager = assetManager;
        this._currentScene = currentScene;
        this.Start();
      }
      // PRIVATE METHODS
  
      // PUBLIC METHODS
      public Start():void {
        this._plane = new objects.Plane(this._assetManager);
        this._ocean = new objects.Ocean(this._assetManager);
        this._island = new objects.Island(this._assetManager);
        this._cloudNum = 3;
        this._clouds = new Array<objects.Cloud>();
        
        this._lives = 5;
        this._score = 0;
        
        this._livesLabel = new objects.Label("Lives: " + this._lives, "30px", "Consolas", "#FFFF00", 10, 10, false);        
        this._scoreLabel = new objects.Label("Score: " + this._score, "30px", "Consolas", "#FFFF00", 350, 10, false);
        
        this.Main();
      }
  
      public Update():number {
        this._plane.Update();
        this._ocean.Update();
        this._island.Update();
        this._checkCollision(this._island);
  
        this._clouds.forEach(cloud => {
          cloud.Update();
          this._checkCollision(cloud);
        });
  
        return this._currentScene;
      }
  
      public Main():void {
        this.addChild(this._ocean);
        this.addChild(this._island);
        this.addChild(this._plane);
  
        for (let count = 0; count < this._cloudNum; count++) {
          this._clouds[count] = new objects.Cloud(this._assetManager);
          this.addChild(this._clouds[count]);
        }

        this.addChild(this._livesLabel);
        this.addChild(this._scoreLabel);
      }

      private _checkCollision(other:objects.GameObject) {
        let P1:createjs.Point = new createjs.Point(this._plane.x, this._plane.y);
        let P2:createjs.Point = other.position;

        // compare the distance between P1 and P2 is less than half the height of each object
        if(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)) <(
          this._plane.halfHeight + other.halfHeight)) {
            if(!other.isColliding){  
            console.log("Collision with " + other.name);
            other.isColliding = true;
            }
        }
        else 
        {
          other.isColliding = false;
        }
      }
    }
  }

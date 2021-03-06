import { SVG_NS} from '../settings';
import pingSound from '../../public/sounds/pong-01.wav'
import pingSound2 from '../../public/sounds/pong-03.wav'

export default class Ball {
    constructor(radius,boardWidth,boardHeight) {
      this.radius = radius;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.direction = 1;
      this.color='white';
      this.vx=0;
      this.vy=0;
      this.reset();
      this.aim=false;
      this.ping= new Audio (pingSound);
    }
    ballMove(p,pp){
      if (this.aim) {
        if (this.direction===1) {
          this.x =p.x+p.width;
          this.y = p.y+ p.height/2;
        } else if(this.direction===-1) {
          this.x =pp.x;
          this.y = pp.y+ pp.height/2;
        }
      } else {
        this.x+= this.vx;
        this.y+= this.vy;
      }
        
    }
    reset() {
      
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.aim= true; 
        this.vy=0;
        this.vx=0;
        let spdy=Math.floor(Math.random() * 10 -5);
        while (spdy==0) {
          spdy=Math.floor(Math.random() * 10 -5);
        }
        const spdx=this.direction * (6 - Math.abs(this.vy));
    document.addEventListener("keydown", (event) => {
      if((event.key=== "d" || event.key=== "ArrowLeft" || event.key=== " " ) ) {
        this.vy= spdy;
        this.vx= spdx;
        this.aim= false;

      }
      });
      }
      wallCollision(p,pp){
        const hitLeft= this.x<0;
        const hitRight= this.x> this.boardWidth -2;

          if (this.y<0+ this.radius || this.y> this.boardHeight - this.radius) {
              this.vy= - this.vy;} 
              if (hitLeft) {
                this.direction=1
                this.reset();
                pp.increaseScore();
              } else if(hitRight){
                this.direction=-1
                this.reset();
                p.increaseScore();
              }
      };
      
      paddleCollision(p,pp){
        let hitWall , checkTop, checkBottom;
              if (this.vx<0) {
         hitWall =this.x<(p.x+ p.width + this.radius-1) && this.x>p.x;
         checkBottom  =this.y < (p.y + p.height);
         checkTop= this.y>p.y
       } else {
        hitWall =this.x> (pp.x - this.radius) && this.x<pp.x + 10;
        checkBottom  =this.y < (pp.y + pp.height);
        checkTop= this.y>pp.y;
       }
        
       if (hitWall && checkBottom && checkTop && this.vx!==0) {
            this.vx= - this.vx;
            this.ping.play();
            console.log(this.vx);
          }
      }

    render(svg, p1 ,p2){
        const circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttributeNS(null, "r", this.radius);
        circle.setAttributeNS(null, "cx", this.x);
        circle.setAttributeNS(null, "cy", this.y);
        circle.setAttributeNS(null, "fill", this.color);
        svg.appendChild(circle);
        this.ballMove(p1,p2);
        this.wallCollision(p1,p2);
        this.paddleCollision(p1,p2);

    }
  }
  export class Ball2 extends Ball{
    constructor(radius,boardWidth,boardHeight) {
      super(radius,boardWidth,boardHeight);
      this.color='red';
      this.ping2= new Audio (pingSound2);
      

    }

    paddleCollision(p,pp){
      let hitWall , checkTop, checkBottom;
      hitWall =this.x<(p.x+ p.width + this.radius) && this.x>p.x;
      checkBottom  =this.y - this.radius/2 < (p.y + p.height);
      checkTop= this.y +this.radius/2>p.y
      let hitWall2 , checkTop2, checkBottom2;
      hitWall2 =this.x> (pp.x - this.radius) && this.x < pp.x + 30;
      checkBottom2  =this.y - this.radius/2 < (pp.y + pp.height);
      checkTop2= this.y + this.radius/2>pp.y;
      if (this.vx<0 && hitWall && checkBottom && checkTop) {

       this.vx= - this.vx;
          p.loseHeight();
          this.direction= - this.direction;
          this.ping2.play();
     } 
     else if(this.vx>0 && hitWall2 && checkBottom2 && checkTop2 && this.x<pp.x+30) {
      this.vx= - this.vx;
          pp.loseHeight();
          this.direction= - this.direction;
          this.ping2.play();
     }
    }
    wallCollision(p,pp){
      const hitLeft= this.x<-270;
      const hitRight= this.x> this.boardWidth + 270;

        if (this.y<0+ this.radius || this.y> this.boardHeight - this.radius) {
            this.vy= - this.vy;} 
            if (hitLeft) {
              this.reset();
              this.direction=-1;
            } else if(hitRight){
              this.direction=1;
             this.reset();

            }
    };
    ballMove(p,pp){

        this.x+= this.vx;
        this.y+= this.vy;
        
    }
    reset() {
      this.x = this.boardWidth/2;
      this.y = this.boardHeight / 2;
      this.direction = - this.direction;
      this.aim= true;
      this.vy=0;
      this.vx=0;
      this.vy=Math.floor(Math.random() * 6 -3)*2.2;
      while (this.vy==0) {
      this.vy=Math.floor(Math.random() * 6 -3)*2.2;
        
      }
      this.vx=this.direction* (4 - Math.abs(this.vy))/3;
      console.log(this);
    }
      
};
import { SVG_NS ,BOARD_HEIGHT, PADDLE_SPEED} from '../settings';
export default class Paddle {
    constructor(width, height,boardHeight,x,y,upKey ,downKey) {
      this.width = width;
      this.height = height;
      this.x=x;
      this.y=y;
      this.boardHeight=boardHeight;
      this.score=0;
      this.speed= PADDLE_SPEED;
      this.up= false;
      this.down= false;
      document.addEventListener("keydown", event => {
        switch (event.key) {
          case upKey:
            this.up=true
            break;
          case downKey:
            this.down= true
            break;
        }
      });
      document.addEventListener("keyup", event => {
        switch (event.key) {
          case upKey:
            this.up=false
            break;
          case downKey:
            this.down= false
            break;
        }
      });
    }

    moveUp(){
      if (this. up) {
        this.y = Math.max((this.y-this.speed) , 0)
      }}
    moveDown(){
      if (this.down) {  
      this.y = Math.min((this.y+this.speed) , BOARD_HEIGHT - this.height)

    }}
    increaseScore(){
      this.score+=1;
    }
    loseHeight(){
      this.height=this.height*3/4;
    };
    setSpeed(speed){
      this.speed= speed;
    }
    getScore(){
      return this.score;
    }
    render(svg) {
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttributeNS(null, "width", this.width);
        rect.setAttributeNS(null, "height", this.height);
        rect.setAttributeNS(null, "x", this.x);
        rect.setAttributeNS(null, "y", this.y);
        rect.setAttributeNS(null, "fill", "white");
        svg.appendChild(rect);
        this.moveUp();
        this.moveDown();

    }
  }

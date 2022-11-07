import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./scorePanel";

// 游戏控制器类
class GameControl{
  //定义三个属性
  snake:Snake
  food:Food
  scroePanel:ScorePanel
  //创建一个属性来存储蛇的移动方向(也就是按键的方向)
  direction:string = 'Right'
  //创建一个属性用来记录游戏是否结束
  isLive = true

  constructor(){
    this.snake=new Snake()
    this.food=new Food()
    this.scroePanel=new ScorePanel(10,1)

    this.init()
  }

  //游戏的初始化方法,调用后游戏即开始
  init(){
    //绑定键盘键按下的事件
    document.addEventListener('keydown',this.keydownHander.bind(this))
    // 调用run方法，使蛇移动
    this.run()

  }

  //创建一个键盘按下的响应事件
  keydownHander(event:KeyboardEvent){
    // 需要检查event.key的值是否合法（用户是否按了正确的按键）

    //修改direction的值
    this.direction=event.key
    
  }

  //创建一个控制蛇移动的方法
  run(){
    let X = this.snake.X
    let Y = this.snake.Y

    switch(this.direction){
      case "ArrowUp":
      case "Up":
        //向上移动top减少
        Y -= 10
        break
      case "ArrowDown":
      case "Down":
        Y += 10
        break
      case "ArrowLeft":
      case "Left":
        X -= 10
        break
      case "ArrowRight":
      case "Right":
        X += 10
        break
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X,Y)
      
    //修改蛇的X值和Y值
    try{
      this.snake.X = X
      this.snake.Y = Y
    }catch(e:any){
      alert(e.message + 'GameOver~')
      this.isLive = false
    }

    //开启一个定时器
    this.isLive && setTimeout(this.run.bind(this),300 - (this.scroePanel.level - 1) * 30)
  }
  
    //定义一个方法，判断蛇是否吃到了食物
    checkEat(X: number,Y: number){
      if( X === this.food.X && Y === this.food.Y){
         // 食物位置重置
        this.food.change()
         // 分数增加
        this.scroePanel.addScore()
         // 蛇增加一节
        this.snake.addBody()
      }
    }

}

export default GameControl

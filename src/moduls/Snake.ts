class Snake {
  //表示蛇的元素
  head:HTMLElement
  //蛇的身体（包括身体）
  bodies: HTMLCollection
  // 获取蛇的容器
  element:HTMLElement
  constructor() {
    this.element=document.getElementById('snake')!
    this.head = document.querySelector('#snake>div') as HTMLElement
    this.bodies= this.element.getElementsByTagName('div')
  }

  //获取蛇的坐标
  get X(){
    return this.head.offsetLeft
  }
  get Y(){
    return this.head.offsetTop
  }
  //设置蛇头的坐标
  set X(value){
    // 如果新值和旧值相同，则不修改
    if(this.X === value) {
      return
    }

    //判断value的值是否合法（value < 0 || value > 290 都是不合法）
    if(value < 0 || value > 290 ){
      //进入判断说明蛇撞墙了
      throw new Error ('蛇撞墙了！')
    }

      //修改x时，是在修改水平坐标，蛇在 左右移动，蛇在向左移动时不能掉头，反之亦然
      if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
        value > this.X? value = this.X - 10 :value = this.X + 10
      }

    // 移动身体
    this.moveBody()
    this.head.style.left = value + 'px'
    //检查有没有撞到自己
    this.checkHeadBody()
  }
  set Y(value){
      // 如果新值和旧值相同，则不修改
    if(this.Y === value) {
      return
    }
      //判断value的值是否合法（value < 0 || value > 290 都是不合法）
      if(value < 0 || value > 290 ){
        //进入判断说明蛇撞墙了
        throw new Error ('蛇撞墙了！')
      }
      
        //修改y时，是在修改水平坐标，蛇在上下移动，蛇在向上移动时不能掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
          value > this.Y? value = this.Y - 10 :value = this.Y + 10
        }


      // 移动身体
    this.moveBody()
    this.head.style.top = value + 'px'
    //检查有没有撞到自己
    this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody(){
    //向element中添加一个div
    this.element.insertAdjacentHTML("beforeend","<div></div>")
  }

    //添加一个蛇身体移动的方法
    moveBody(){
      //将后边的身体设置为前边身体的位置
      //遍历获取所有的身体
      for(let i = this.bodies.length - 1; i>0; i--){
        //获取前边身体的位置
        let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
        let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
        // 将值设置到当前的身体上去
        (this.bodies[i] as HTMLElement).style.left = X + 'px';
        (this.bodies[i] as HTMLElement).style.top = Y + 'px';
      }
    }
    //检查蛇头是否撞到身体的方法
    checkHeadBody(){
      // 获取所有身体，检查其是否和蛇头的坐标发生重叠
      for(let i=1; i<this.bodies.length;i++){
        let bd = this.bodies[i] as HTMLElement;
        if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
          throw new Error('撞到自己了')
        }
      }
    }

}

export default Snake
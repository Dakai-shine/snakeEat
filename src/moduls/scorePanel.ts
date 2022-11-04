//定义记分牌的类
class ScorePanel {
  score=0;
  level=1;
  socreEle:HTMLElement
  levelEle:HTMLElement

  //设置一个变量限制等级
  maxLevel:number
  //设置每加多少分升级
  upScore:number

  constructor(maxLevel: number = 10,upScore:number=10){
    this.socreEle=document.getElementById('score')!
    this.levelEle=document.getElementById('level')!
    this.maxLevel=maxLevel
    this.upScore=upScore
  }

  //设计一个加分的方法
  addScore(){
    this.socreEle.innerHTML = ++this.score + ''
    //判断分数是否整10，是则升级
    if(this.score % this.upScore === 0){
      this.levelUp()
    }
  }
  //升级的方法
  levelUp(){
    if(this.level < this.maxLevel){
    this.levelEle.innerHTML= ++this.level + ''
  }
}
}

export default ScorePanel
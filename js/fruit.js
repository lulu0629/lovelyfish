var fruitObj = function () {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNO = [];
    this.l = [];
    this.speed = [];
    this.kind = [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for (var i=0;i<this.num;i++){
        this.alive[i] = true;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNO[i] = Math.floor(Math.random()*ane.num);
        this.l[i] = 0;
        this.speed[i] = Math.random() * 0.017 + 0.003;
        this.kind[i] = '';
    }
    this.orange.src = './src/fruit.png';
      this.blue.src = './src/blue.png';
}
fruitObj.prototype.draw = function () {
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            if(this.kind[i] == 'blue'){
                var pic = this.blue;
            }else{
                var pic = this.orange;
            }
            if(this.l[i] <=14){
                var NO = this.aneNO[i];
                this.x[i] = ane.headx[NO];
                this.y[i] = ane.heady[NO];
                this.l[i] += this.speed[i] * deltaTime;
                ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            }else{
                this.y[i] -= this.speed[i] * 7 * deltaTime;
                ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i]);
            }
            if(this.y[i] < 10){
                this.alive[i] = false;
            }
        }
    }
}
fruitObj.prototype.born = function (i) {
    this.aneNO[i] = Math.floor(Math.random()*ane.num);
    this.l[i] = 0;
    this.alive[i] = true;
    if(Math.random() < 0.2){
        this.kind[i] = 'blue';
    }else{
        this.kind[i] = 'orange';
    }
}
fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}
function fruitMonitor() {
    var num = 0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if(num<15){
        sendFruit();
        return;
    }
}
function sendFruit() {
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
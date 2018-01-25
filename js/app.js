// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.lastx = x; //定义上一个时间的位置为x
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    
    //speed范围100~500
    this.x = this.speed * dt + this.lastx;
    
    //判断是否超出边界，重新设置改对象的属性值
    if (this.x > 505) {
        this.x = -100;
        this.y = locEnermyY[getRandomInt(3)];
        //设置随机的速度在[100,500)之间
        this.speed = getRandomInt(400) + 100; 
    }
    
    
    //玩家碰撞部分
    if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 50) {
        player.x = 200;
        player.y = 380; 
    }
    this.lastx = this.x;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//产生随机[0-max)范围的随机整数函数
//Code reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    //定义玩家的初始位置
    this.x = x;
    this.y = y;
    this.over = false;
}


Player.prototype.update = function() {
    if (this.y < 20 && !this.over) {
        this.over = true;
        swal({
            title: 'Congratulations! You Won!',
            icon: 'success',
            button: 'Try Again'
        }).then(function() {
            location.reload();
        })
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keys) {
    var x, y;
    const offsetX = 101, offsetY = 83;
    //判断玩家输入，做出相应操作
    switch (keys) {
        case 'left':
            [x, y] = [-offsetX, 0];
            break;
        case 'up':
            [x, y] = [0, -offsetY];
            break;
        case 'right':
            [x, y] = [offsetX, 0];
            break;
        case 'down':
            [x, y] = [0, offsetY]
            break;
        }
    //判断玩家是否出了边界
    if (this.x + x >= -20 && this.x + x < 450) this.x += x
    if (this.y + y >= -50 && this.y + y < 400) this.y += y;
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //确保仅仅输入上下左右的时候才会处理
    if (allowedKeys[e.keyCode]) {
        player.handleInput(allowedKeys[e.keyCode])
    };
});

//初始化

//locY记录敌人落在格子内的Y坐标
var locEnermyY = [60, 140, 225];

//设置敌人总数
const enemyNumbers = 3; 
var allEnemies = [];
for (let i = 0; i < enemyNumbers; i ++) {
    var temp = new Enemy(-100, locEnermyY[getRandomInt(enemyNumbers)], getRandomInt(400) + 100);
    allEnemies.push(temp);
};

//初始化玩家
var player = new Player(200, 380);



//displayChoice();
////开始的选人界面，这段代码有问题
//function displayChoice() {
//    var pic = ['char-boy.png', 'char-cat-girl.png', 'char-horn-girl.png', 'char-pink-girl.png', 'char-princess-girl.png'];
//    var body = document.getElementsByTagName('body')[0];
//    var div = document.createElement('div');
//    div.setAttribute('class','board');
//    body.appendChild(div);
//    div = document.createElement('div');
//    div.setAttribute('class','choose');
//    div.innerHTML = '<h1>Please choose a player:</h1>';
//    for (let i = 0; i < 5; i++) {
//        div.innerHTML = div.innerHTML + `<div class="block"><img src="images/${pic[i]}"><input type="radio" name='player' onclick=choosePlayer('${pic[i]}')></div>`;
//    }
//    div.innerHTML = div.innerHTML + '<div class="button"><button onclick="dis(); Engine.main();">Confirm</button></div>';
//    
//    body.appendChild(div);
//}

//var choose;
//function choosePlayer(player) {
//    choose = player;
//}

function dis() {
    document.getElementsByClassName('board')[0].style="display:none";
    document.getElementsByClassName('choose')[0].style="display:none";
}

function win() {
    swal({
        title: 'Congratulations! You Won!',
        type: 'success',
        confirmButtonText: 'Try Again'
    })
}
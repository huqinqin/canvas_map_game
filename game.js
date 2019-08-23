var cvs= document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var img = new Image();
img.src = './img/maze_solu.png';
var gGame = null;

function onLoad() {
    gGame = new Game();
    gGame.render();
    gGame.update();
}

function Game() {
    var _this = this;
    this.map = null;
    this.person = null;
    this.render = function () {
        _this.map = new Map();
        _this.person = new Person();
    };
    this.update = function () {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        _this.map.draw();
        _this.person.draw();
        _this.person.isCollection();
        _this.person.updatePos();
        window.requestAnimationFrame(gGame.update);
    }
}
function Map() {
    var _this = this;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(img,0,0,cvs.width,cvs.height)
    }
}
function Person() {
    var _this = this;
    this.positionX = cvs.width / 2;
    this.positionY = 20;
    this.dx = 0;
    this.dy = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(_this.positionX,_this.positionY,5,0,Math.PI *2);
        ctx.fillStyle = 'blue';
        ctx.fill();
    };
    this.updatePos = function () {
        if(_this.positionY >= cvs.height - 10){
            alert('恭喜你通关 游戏结束');
            return false;
        }
        if(!_this.isCollection()){
            _this.positionX += _this.dx;
            _this.positionY += _this.dy;
        }else{
            _this.positionX -= _this.dx;
            _this.positionY -= _this.dy;
            _this.dx = 0;
            _this.dy = 0;
        }
    };
    this.isCollection = function () {
        var imageData = ctx.getImageData(_this.positionX - 5 , _this.positionY - 5 , 12, 12);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i++) {
            var red = pixels[i],
                green = pixels[i + 1],
                blue = pixels[i + 2];
            // 检测是否碰到黑色的墙
            if (red === 0 && green === 0 && blue === 0) {
                return true;
            }
        }
        return false;
    };
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37: {
                _this.dx = -1
            };break;
            case 38: {
                _this.dy = -1
            };break;
            case 39: {
                _this.dx = 1
            };break;
            case 40: {
                _this.dy = 1
            };break;
        }
    };
}
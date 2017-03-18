var map = new Object();
var array = [];
var canvas = document.getElementById('c');
var activePlayer;
// var ctx = canvas.getContext("2d");

// var tile_size = 10;
// var startX = canvas.width / 2;
// var startY = canvas.height / 2;
// var radius = 10;

// current x, y
// var cx = startX,
//     cy = startY;

// var player1 = {
//     name: 'n1',
//     id: 'i1',
//     color: 'green',
//     ctx: canvas.getContext("2d"),
//     tile_size: 10,
//     radius: 10,
//     cx: canvas.width / 2,
//     cy: canvas.height / 2    
// };

// map["p1"] = player1;
// draw(map["p1"]);

function draw(player) {
    player.ctx.beginPath();
    player.ctx.arc(player.cx, player.cy, player.radius, 0, 2 * Math.PI, false);
    player.ctx.fillStyle = player.color;
    player.ctx.fill();
    player.ctx.lineWidth = 1;
    player.ctx.strokeStyle = player.color;
    player.ctx.stroke();
    console.log("draw: " + player.color)
}  

function createPlayer(){
    var playerCount = Object.keys(map).length + 1;
    var newPlayer = {
        name: $("#name").val(),
        id: $("#playerId").val(),
        color: $("#color").val(),        
        ctx: canvas.getContext("2d"),
        tile_size: 10,
        radius: 10,
        cx: canvas.width / 2,
        cy: canvas.height / 2    
    };
    newPlayer.ctx.beginPath();
    newPlayer.ctx.arc(newPlayer.cx, newPlayer.cy, newPlayer.radius, 0, 2 * Math.PI, false);
    newPlayer.ctx.fillStyle = $("#color").val();
    newPlayer.ctx.fill();
    newPlayer.ctx.lineWidth = 1;
    newPlayer.ctx.strokeStyle = $("#color").val();
    newPlayer.ctx.stroke();  
    console.log('newPlayer created');
    map["p" + playerCount] = newPlayer;
}
 
function drawPlayers(map){
    $.each( map, function( i, val ) {
      draw(map[i]);
    });
}

$(document).ready(function() {
    $("#c").click(function(e){
        var x = e.pageX - this.offsetLeft,
            y = e.pageY - this.offsetTop;

        $.each( map, function( i, val ) {
            if (coordinatesWithin(x, y, map[i].cx - 10, map[i].cx + 10, map[i].cy - 10, map[i].cy + 10)) {
               console.log(map[i]);
               activePlayer = map[i];
            }          
        });     

        
    }); 
});
function coordinatesWithin(x,y, minX, maxX, minY, maxY) {
    return (x >= minX && x <= maxX && y >= minY && y <= maxY);
}

// ctx.fillRect(startX, startY, tile_size, tile_size);

 
$(document).bind("keydown", function(e){
    
    switch(e.keyCode)
    {
        //left
        case 37:
                activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx - tile_size, cy, tile_size, tile_size);
                activePlayer.cx = activePlayer.cx - activePlayer.tile_size;
                activePlayer.cy = activePlayer.cy;
                activePlayer.cx -= activePlayer.tile_size;  
                drawPlayers(map);
        break;
            
        //up
        case 38:
                activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy - tile_size, tile_size, tile_size);
                activePlayer.cx = activePlayer.cx;
                activePlayer.cy = activePlayer.cy - activePlayer.tile_size;
                activePlayer.cy -= activePlayer.tile_size;
                drawPlayers(map);             
        break;
            
        //right
        case 39:
                activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx + tile_size, cy, tile_size, tile_size);
                activePlayer.cx = activePlayer.cx + activePlayer.tile_size;
                activePlayer.cy = activePlayer.cy;
                activePlayer.cx += activePlayer.tile_size;
                drawPlayers(map);                
        break;
        
        //down
        case 40:
                activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy + tile_size, tile_size, tile_size);
                activePlayer.cx = activePlayer.cx;
                activePlayer.cy = activePlayer.cy + activePlayer.tile_size;
                activePlayer.cy += activePlayer.tile_size;
                drawPlayers(map);               
        break;
    }
    
    // $("#coords").text("cx: " + circle1.cx + ", cy: " + circle1.cy);
    // if((circle1.cx <= 10 || circle1.cx >= 290) || (circle1.cy <= 10 || circle1.cy >= 290)){
    //     console.log('Hit The wall!');
    // }
});

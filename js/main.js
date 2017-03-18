var map = new Object();
var array = [];
var canvas = document.getElementById('c');
// var ctx = canvas.getContext("2d");

// var tile_size = 10;
// var startX = canvas.width / 2;
// var startY = canvas.height / 2;
// var radius = 10;

// current x, y
// var cx = startX,
//     cy = startY;

var player1 = {
    ctx: canvas.getContext("2d"),
    tile_size: 10,
    radius: 10,
    cx: canvas.width / 2,
    cy: canvas.height / 2    
};

map["p1"] = player1;


     

draw(map["p1"]);

function draw(player) {
    player.ctx.beginPath();
    player.ctx.arc(player.cx, player.cy, player.radius, 0, 2 * Math.PI, false);
    player.ctx.fillStyle = 'green';
    player.ctx.fill();
    player.ctx.lineWidth = 1;
    player.ctx.strokeStyle = 'red';
    player.ctx.stroke();
}  

function createPlayer(){
    var newPlayer = {
        ctx: canvas.getContext("2d"),
        tile_size: 10,
        radius: 10,
        cx: canvas.width / 2,
        cy: canvas.height / 2    
    };
    newPlayer.ctx.beginPath();
    newPlayer.ctx.arc(newPlayer.cx, newPlayer.cy, newPlayer.radius, 0, 2 * Math.PI, false);
    newPlayer.ctx.fillStyle = 'red';
    newPlayer.ctx.fill();
    newPlayer.ctx.lineWidth = 1;
    newPlayer.ctx.strokeStyle = 'red';
    newPlayer.ctx.stroke();  
    console.log('newPlayer created');
    map["p" + (Object.keys(map).length + 1)] = newPlayer;
}
 
function drawPlayers(map){
    $.each( map, function( i, val ) {
      draw(map[i]);
    });
}

// ctx.fillRect(startX, startY, tile_size, tile_size);

 
$(document).bind("keydown", function(e){
    
    switch(e.keyCode)
    {
        //left
        case 37:
                map["p1"].ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx - tile_size, cy, tile_size, tile_size);
                map["p1"].cx = map["p1"].cx - map["p1"].tile_size;
                map["p1"].cy = map["p1"].cy;
                map["p1"].cx -= map["p1"].tile_size;  
                drawPlayers(map);
        break;
            
        //up
        case 38:
                map["p1"].ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy - tile_size, tile_size, tile_size);
                map["p1"].cx = map["p1"].cx;
                map["p1"].cy = map["p1"].cy - map["p1"].tile_size;
                map["p1"].cy -= map["p1"].tile_size;
                drawPlayers(map);             
        break;
            
        //right
        case 39:
                map["p1"].ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx + tile_size, cy, tile_size, tile_size);
                map["p1"].cx = map["p1"].cx + map["p1"].tile_size;
                map["p1"].cy = map["p1"].cy;
                map["p1"].cx += map["p1"].tile_size;
                drawPlayers(map);                
        break;
        
        //down
        case 40:
                map["p1"].ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy + tile_size, tile_size, tile_size);
                map["p1"].cx = map["p1"].cx;
                map["p1"].cy = map["p1"].cy + map["p1"].tile_size;
                map["p1"].cy += map["p1"].tile_size;
                drawPlayers(map);               
        break;
    }
    
    // $("#coords").text("cx: " + circle1.cx + ", cy: " + circle1.cy);
    // if((circle1.cx <= 10 || circle1.cx >= 290) || (circle1.cy <= 10 || circle1.cy >= 290)){
    //     console.log('Hit The wall!');
    // }
});

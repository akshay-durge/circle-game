var canvas = document.getElementById('c');
var ctx = canvas.getContext("2d");

var tile_size = 10;
var startX = canvas.width / 2;
var startY = canvas.height / 2;
var radius = 10;

// current x, y
var cx = startX,
    cy = startY;


var rect = {
    x: 100,
    y: 100,
    w: 40,
    h: 100
};    
draw();
function draw(startX, startY) {
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
}      

// ctx.fillRect(startX, startY, tile_size, tile_size);

 
$(document).bind("keydown", function(e){
    
    switch(e.keyCode)
    {
        //left
        case 37:
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx - tile_size, cy, tile_size, tile_size);
                draw(cx - tile_size, cy);
                cx -= tile_size;
                
        break;
            
        //up
        case 38:
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy - tile_size, tile_size, tile_size);
                draw(cx, cy - tile_size);               
                cy -= tile_size;
        break;
            
        //right
        case 39:
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx + tile_size, cy, tile_size, tile_size);
                draw(cx + tile_size, cy);                 
                cx += tile_size;
        break;
        
        //down
        case 40:
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy + tile_size, tile_size, tile_size);
                draw(cx, cy + tile_size);                
                cy += tile_size;
        break;
    }
    
    $("#coords").text("cx: " + cx + ", cy: " + cy);
    
});

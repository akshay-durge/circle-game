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

var circle1 = {
    ctx: canvas.getContext("2d"),
    tile_size: 10,
    radius: 10,
    cx: canvas.width / 2,
    cy: canvas.height / 2    
};

array.push(circle1)


     

draw();

function draw() {
    circle1.ctx.beginPath();
    circle1.ctx.arc(circle1.cx, circle1.cy, circle1.radius, 0, 2 * Math.PI, false);
    circle1.ctx.fillStyle = 'green';
    circle1.ctx.fill();
    circle1.ctx.lineWidth = 1;
    circle1.ctx.strokeStyle = 'red';
    circle1.ctx.stroke();
}  

 

// ctx.fillRect(startX, startY, tile_size, tile_size);

 
$(document).bind("keydown", function(e){
    
    switch(e.keyCode)
    {
        //left
        case 37:
                circle1.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx - tile_size, cy, tile_size, tile_size);
                circle1.cx = circle1.cx - circle1.tile_size;
                circle1.cy = circle1.cy;
                circle1.cx -= circle1.tile_size;  
                draw();
        break;
            
        //up
        case 38:
                circle1.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy - tile_size, tile_size, tile_size);
                circle1.cx = circle1.cx;
                circle1.cy = circle1.cy - circle1.tile_size;
                circle1.cy -= circle1.tile_size;
                draw();              
        break;
            
        //right
        case 39:
                circle1.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx + tile_size, cy, tile_size, tile_size);
                circle1.cx = circle1.cx + circle1.tile_size;
                circle1.cy = circle1.cy;
                circle1.cx += circle1.tile_size;
                draw();                
        break;
        
        //down
        case 40:
                circle1.ctx.clearRect(0, 0, canvas.width, canvas.height);
                // ctx.fillRect(cx, cy + tile_size, tile_size, tile_size);
                circle1.cx = circle1.cx;
                circle1.cy = circle1.cy + circle1.tile_size;
                circle1.cy += circle1.tile_size;
                draw();               
        break;
    }
    
    $("#coords").text("cx: " + circle1.cx + ", cy: " + circle1.cy);
    if((circle1.cx <= 10 || circle1.cx >= 290) || (circle1.cy <= 10 || circle1.cy >= 290)){
        console.log('Hit The wall!');
    }
});

var map = new Object();
var array = [];
var canvas = document.getElementById('c');
var activePlayer;
var circleRadius = 10;

function draw(player) {
    player.ctx.beginPath();
    player.ctx.arc(player.cx, player.cy, player.radius, 0, 2 * Math.PI, false);
    player.ctx.fillStyle = player.color;
    player.ctx.fill();
    player.ctx.lineWidth = 1;
    player.ctx.strokeStyle = player.color;
    player.ctx.stroke();
}  

function createPlayer(){
    var playerCount = Object.keys(map).length + 1;
    var newPlayer = {
        name: $("#name").val(),
        playerId: $("#playerId").val(),
        color: $("#color").val(),        
        ctx: canvas.getContext("2d"),
        radius: circleRadius,
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
    map[$("#playerId").val()] = newPlayer;
}

function deleteAllUsers(){
    $.ajax({
      method: "DELETE",
      url: "/users/1"
    })
      .done(function( msg ) {
        alert( "Users deleted successfully.");
      });    
}
function deleteAllMessages(){
    $.ajax({
      method: "DELETE",
      url: "/notice_boards/1"
    })
      .done(function( msg ) {
        console.log( msg );
      });    
}
function createMessage(type, msg, playerId){
    var url = "/notice_boards";
    var data = { notice_board : {type: type, message: msg}, player_id: playerId };    
    $.ajax({
           type: "POST",
           url: url,
           data: data,
           success: function(data)
           {
               console.log(data);
           }
         });  
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
            if (coordinatesWithin(x, y, map[i].cx - map[i].radius, map[i].cx + map[i].radius, map[i].cy - map[i].radius, map[i].cy + map[i].radius)) {
               activePlayer = map[i];
            }          
        });     

        
    }); 

    $("#theForm").submit(function(e) {
        var url = "/users"; // the script where you handle the form input.
        var data = { user : {name: $('#name').val(), color: $('#color').val(), player_id: $('#playerId').val()} };
        $.ajax({
               type: "POST",
               url: url,
               data: data,
               success: function(data)
               {
                    createPlayer();
                   console.log(data); // show response from the php script.
               }
             });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });    
});
function coordinatesWithin(x,y, minX, maxX, minY, maxY) {
    return (x >= minX && x <= maxX && y >= minY && y <= maxY);
}
 
$(document).bind("keydown", function(e){

    switch(e.keyCode)
    {
        //left
        case 37:
                if(activePlayer.cx>activePlayer.radius){
                    activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                    activePlayer.cx = activePlayer.cx - activePlayer.radius;
                    activePlayer.cy = activePlayer.cy;
                    activePlayer.cx -= activePlayer.radius;  
                    drawPlayers(map);
                }
        break;
            
        //up
        case 38:
                if(activePlayer.cy>activePlayer.radius){
                    activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                    activePlayer.cx = activePlayer.cx;
                    activePlayer.cy = activePlayer.cy - activePlayer.radius;
                    activePlayer.cy -= activePlayer.radius;
                    drawPlayers(map);             
                }
        break;
            
        //right
        case 39:
                if(activePlayer.cx<(canvas.width - 20)){
                    activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                    activePlayer.cx = activePlayer.cx + activePlayer.radius;
                    activePlayer.cy = activePlayer.cy;
                    activePlayer.cx += activePlayer.radius;
                    drawPlayers(map);                
                }
        break;
        
        //down
        case 40:
                if(activePlayer.cy<(canvas.height - 20)){
                    activePlayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
                    activePlayer.cx = activePlayer.cx;
                    activePlayer.cy = activePlayer.cy + activePlayer.radius;
                    activePlayer.cy += activePlayer.radius;
                    drawPlayers(map);      
                }         
        break;
    }
    $.each( map, function( i, val ) {
        if(i != activePlayer.playerId){
            if((Math.abs(map[i].cx - activePlayer.cx) <= (map[i].radius + activePlayer.radius)) && (Math.abs(map[i].cy - activePlayer.cy) <= (map[i].radius + activePlayer.radius))){
                console.log(activePlayer.name + ' Collide with '+ map[i].name);
                var msgToDisplay = activePlayer.name + ' Collide with '+ map[i].name;
                createMessage('collision', msgToDisplay, activePlayer.playerId);
            }                
        }
    });      
 
    if((activePlayer.cx <= activePlayer.radius || activePlayer.cx >= (canvas.height - 20)) || (activePlayer.cy <= activePlayer.radius || activePlayer.cy >= (canvas.height - 20))){
        console.log(activePlayer.name + ' Hit The wall!');
        var msgToDisplay = activePlayer.name + ' Hit The wall!';
        createMessage('hitWall', msgToDisplay, activePlayer.playerId);        
    }
});

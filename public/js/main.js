var map = new Object();
var array = [];
var canvas = document.getElementById('canvas');
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
  newPlayer.ctx.strokeStyle = '#d2d1d1';
  newPlayer.ctx.stroke();  
  console.log('newPlayer created');
  map[$("#playerId").val()] = newPlayer;
  // $('.user-form').delay(300).fadeOut(500);

}

function newPlayer(){
  $('.user-form').fadeIn(300);
}

function deleteAllUsers(){
    $.ajax({
      method: "DELETE",
      url: "/users/1"
    })
      .done(function( msg ) {
        console.log( msg );
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
function resetGame(){
  deleteAllUsers();
  deleteAllMessages();
  getAllMessages();
  newPlayer();
}
function createMessage(type, msg, playerId){
    var url = "/notice_boards";
    var data = { notice_board : {msg_type: type, message: msg}, player_id: playerId };    
    $.ajax({
           type: "POST",
           url: url,
           data: data,
           success: function(data)
           {
               console.log(data);
               getAllMessages();
           }
         });  
}
function getAllMessages(){
    var url = "/notice_boards";  
    $.ajax({
           type: "GET",
           url: url,
           success: function(data)
           {
               console.log(data);
               drawTable(data.notice_boards);
           }
         });  
}

function drawTable(data) {
    $("#messageDataTable tr").remove();
    var row = $("<tr />")
    $("#messageDataTable").append(row); 
    row.append($("<th colspan='2' class='text-center'>Messages</th>"));    
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function drawRow(rowData) {
    var row = $("<tr />")
    $("#messageDataTable").append(row);
    row.append($("<td>" + rowData.message + "</td>"));
}

function drawPlayers(map){
    $.each( map, function( i, val ) {
      draw(map[i]);
    });
}

$(document).ready(function() {
    resetGame(); //Reset game
    $("#canvas").click(function(e){
        var x = e.pageX - this.offsetLeft,
            y = e.pageY - this.offsetTop;
        $.each( map, function( i, val ) {
            if (coordinatesWithin(x, y, map[i].cx - map[i].radius, map[i].cx + map[i].radius, map[i].cy - map[i].radius, map[i].cy + map[i].radius)) {
               activePlayer = map[i];
            }          
        });
    }); 
 
    $("#theForm").submit(function(e) {
      var duplicateUserId = false;
      $.each( map, function( i, val ) {
        if(i == $("#playerId").val()){
          duplicateUserId = true;
          alert('Player ID is already taken. Please enter diffrent ID.');
        }
      });
      if(!duplicateUserId){
        var url = "/users";
        var data = { user : {name: $('#name').val(), color: $('#color').val(), player_id: $('#playerId').val()} };
        $.ajax({
               type: "POST",
               url: url,
               data: data,
               success: function(data)
               {
                    createPlayer();
                   console.log(data);
               }
             });
      }      
      e.preventDefault(); // avoid to execute the actual submit of the form.
    });    
});
function coordinatesWithin(x,y, minX, maxX, minY, maxY) {
    return (x >= minX && x <= maxX && y >= minY && y <= maxY);
}
 
$(document).bind("keydown", function(e){
    move(e.keyCode);
});

$('#moveLeft').click(function () {
    move(37);
});

$('#moveUp').click(function () {
    move(38);
});

$('#moveRight').click(function () {
    move(39);
});

$('#moveDown').click(function () {
    move(40);
});

function move(direction){
  if(activePlayer != null){
    switch(direction)
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
                $('#canvas').addClass('error');
                var msgToDisplay = 'Player ' + activePlayer.name + ' Collides with '+ map[i].name;
                createMessage('collision', msgToDisplay, activePlayer.playerId);
                setTimeout(function() {
                    $('#canvas').removeClass('error');
                },2000);
            }                
        }
    });      
 
    if((activePlayer.cx <= activePlayer.radius || activePlayer.cx >= (canvas.height - 20)) || (activePlayer.cy <= activePlayer.radius || activePlayer.cy >= (canvas.height - 20))){
        console.log(activePlayer.name + ' Hit The wall!');
        $('#canvas').addClass('warning');
        var msgToDisplay = 'Player ' + activePlayer.name + ' Hit The wall!';
        createMessage('hitWall', msgToDisplay, activePlayer.playerId);        
        setTimeout(function() {
            $('#canvas').removeClass('warning');
        },2000);
    }
  }
}
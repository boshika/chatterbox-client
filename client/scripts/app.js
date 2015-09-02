// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  roomList: {},
  friendList: {},

  init: function(){
    console.log("hello world");  
    app.$roomSelect = $('#roomSelect');  
    app.fetch();
    setInterval(app.fetch, 10000);
     
  },

  send: function(message){
    console.log("messages here")
    //click on submit and function is send(message)
   $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),  
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }

   })
  },

   fetch: function() {
    $.ajax({
    url: app.server,
    type: 'GET',
    data: {},
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      app.clearMessages();
      //   _.each(data.results, function(value) {
      //   app.addMessage(value);
        
      // });
      for(var i = 0 ; i < 100; i++) {
        app.addMessage(data.results[i]);
        console.log("line 48");
      }
    },
      error: function (data) {      
        console.error('chatterbox: Failed to send message');
      }
    })
  },

  clearMessages: function(){
    $('#chats').html('');
  },

  addMessage: function(message) { 
      

      var room = $("#roomSelect option:selected").val();
      if (!room) {
        room = 'lobby';
      }
      $('#chats').append('<div class="chat"><p>' + '<span class="username" data-username>' + _.escape(message.username) + '</span> : ' + _.escape(message.text) +  ' ' + '<span class="roomname" data-roomname>' + '</span></p></div>');
      
      
       $('.username').click( function(value) {
          app.addFriend(value.target);
        });
      app.addRoom(message.roomname);
  },

  addRoom: function(room) {    
    if (app.roomList[room] === undefined) {
      $('#roomSelect').append('<option value="' + room + '">' + room + '</option>');
      app.roomList[room] = true;
    }
  },

  addFriend: function(e) {
    var username = $(e).text();
    app.friendList[username] = true;
  }, 

  submitThis: function(e) {
    var myMessage = {
      username: $('.usernameis').text(),
      text: $('.messageis').val(),
      roomname: app.$roomSelect.val()
    };
    console.log(myMessage);
    app.send(myMessage);
  }
};

$( document ).ready(function() {

    app.init();
    
    $('.submit').click(function(event) {
      app.submitThis(event);
    })

  });


// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });






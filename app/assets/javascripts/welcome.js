$(document).ready(function() {
  var $showUsers = $('#show-users');
  var $userForm = $('#add-user-form');
  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';
  var $userFirstName = $('#user-first-name');
  var $userLastName = $('#user-last-name');
  var $userPhoneNumber = $('#user-phone-number');
  var $users = $('#users')



  function loadUsers() {
    $users.empty();

    $.ajax({
      type: 'GET',
      url: BASEURL + '/users',
      dataType: 'JSON',
    }).success(function(data) {
      for(var i = 0; i < data.length; i++) {
        var user = data[i];
        $users.append('<div id=' + user.id + '>' + user.first_name + ' - <button class="blue btn view-user"><i class="material-icons">visibility</i></button> <button class="orange btn edit-user"><i class="material-icons">edit</i></button><button class="red btn delete-user"><i class="material-icons">delete</i></button></div>')
      }
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    });
  }

  $(document).on('click', '.edit-user', function() {
    var userId = $(this).parent().attr('id');
    $.ajax({
      type:'GET',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON',
    }).success(function(data) {
      $userFirstName.val(data.first_name).focus();
      $userLastName.val(data.last_name);
      $userPhoneNumber.val(data.phone_number);
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    })
  })

    $(document).on('click', '.view-user', function() {
    var userId = $(this).parent().attr('id');
    $.ajax({
      type:'GET',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON',
    }).success(function(data) {
      console.log('show')
      $users.append("<div>" + data.first_name + " " + data.last_name + " " + data.phone_number + "</div>")
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    })
  })

  $(document).on('click', '.delete-user', function() {
    var userId = $(this).parent().attr('id');
    $.ajax({
      type: 'DELETE',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON',
    }).success(function(data) {
      $('#' + userId).remove();
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    });
  })

  $userForm.submit(function(e) {
    e.preventDefault();
    var requestType, requestUrl;

    if($(this).data('user-id')) {
      requestType = 'PUT';
      requestUrl = BASEURL + '/users/' + $(this).data('user-id');
    } else {
      requestType = 'POST';
      requestUrl = BASEURL + '/users';
    }
    $.ajax({
      type: requestType,
      url: requestUrl,
      dataType: 'JSON',
      data: { user: {first_name: $userFirstName.val(),
                     last_name: $userLastName.val(),
                     phone_number: $userPhoneNumber.val()
                      }}
    }).success(function(data) {
      $userForm[0].reset();
      $userFirstName.focus();
      loadUsers();
    }).fail(function(data) {
      alert("Something is wrong with the code. Sorry!!");
    });
  });


  $showUsers.click(function() {
    loadUsers();
  })

});

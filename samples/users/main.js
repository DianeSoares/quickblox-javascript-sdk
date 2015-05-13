
// Init QuickBlox application here
//
QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret);

$(document).ready(function() {

  // First of all create a session and obtain a session token
  // Then you will be able to run requests to Users
  //
  QB.createSession(function(err,result){
    console.log('Session create callback', err, result);
  });


  // Create user
  //
  $('#sign_up').on('click', function() {
    var login = $('#usr_sgn_p_lgn').val();
    var password = $('#usr_sgn_p_pwd').val();

    var params = { 'login': login, 'password': password};

    QB.users.create(params, function(err, user){
      if (user) {
        $('#output_place').val(JSON.stringify(user));
      } else  {
        $('#output_place').val(JSON.stringify(err));
      }

      $("#progressModal").modal("hide");
    });
  });


  // Login user
  //
  $('#sign_in').on('click', function() {
    var login = $('#usr_sgn_n_lgn').val();
    var password = $('#usr_sgn_n_pwd').val();

    var params = { 'login': login, 'password': password};

    QB.login(params, function(err, user){
      if (user) {
        $('#output_place').val(JSON.stringify(user));
      } else  {
        $('#output_place').val(JSON.stringify(err));
      }

      $("#progressModal").modal("hide");
    });
  });


  // Logout user
  //
  $('#sign_out').on('click', function() {
     QB.logout(function(err, result){
      if (result) {
        $('#output_place').val(JSON.stringify(result));
      } else  {
        $('#output_place').val(JSON.stringify(err));
      }

      $("#progressModal").modal("hide");
    });
  });


  // Get users 
  //
  $('#get_by').on('click', function() {
    var filter_value = $('#usrs_get_by_filter').val();
    var filter_type = $("#sel_filter_for_users option:selected").val();

    var params;

    var request_for_many_user = true

    switch (filter_type) {
      // all users, no filters<
      case "1":
        params = { page: '1', per_page: '100'};
        break;

      // by id
      case "2":
        params = parseInt(filter_value);
        request_for_many_user = false
        break;
    }

    if(request_for_many_user){
      QB.users.listUsers(params, function(err, user){
        if (user) {
          $('#output_place').val(JSON.stringify(user));
        } else  {
          $('#output_place').val(JSON.stringify(err));
        }

        $("#progressModal").modal("hide");
      });
    }else{
      QB.users.get(params, function(err, user){
        if (user) {
          $('#output_place').val(JSON.stringify(user));
        } else  {
          $('#output_place').val(JSON.stringify(err));
        }

        $("#progressModal").modal("hide");
      });
    }
  });

});

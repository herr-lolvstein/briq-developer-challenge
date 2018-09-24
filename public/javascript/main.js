$(document).ready(() => {
  $('#add').click(function() {
      $.post('/users/', {username: $('#add-user').val(), amount: 0}, (data) => {
        console.log(data);
        location.reload();
      });
  });
  $('button.delete').click(function() {
      $.ajax({
        url: '/users/' + $(this).data('id'),
        type: 'DELETE',
        success: (data) => {
          console.log(data);
          location.reload();
        },
        error: (err) => {
          console.log(err);
          location.reload();
        }
      })
  });
  $('button.update').click(function() {
    $.ajax({
      url: '/users/' + $(this).data('id'),
      type: 'PUT',
      data: {
        username: $('#u1' + $(this).data('id')).val(),
        balance: $('#u2' + $(this).data('id')).val()
      },
      success: (data) => {
        console.log(data);
        location.reload();
      },
      error: (err) => {
        console.log(err);
        location.reload();
      }
    });
  });
  $('#give').click(function() {
    $.post('/users/' + $('#to').val() + '/give', {
        amount: $('#amount').val(),
        userFrom: $('#from').val()
      }, (data) => {
        console.log(data);
        location.reload();
    });
  });
});

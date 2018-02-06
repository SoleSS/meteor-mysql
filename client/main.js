import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

users = new MysqlSubscription('users_emails');
//emails = new MysqlSubscription('emails');
users.addEventListener('update', function(diff, data) {
  //console.log(data);
});


  Template.users.helpers({
    users: function () {
      var result = [];
      var tmp = users.reactive();
      for (var i=0; i<tmp.length; i++) {
	var user = tmp[i];
	user.emailsArr = (user.emails !== null) ? user.emails.split(',') : [];
	
	
	result.push(user);
      }
      return result;
    },
  });

Template.users.onCreated(function usersOnCreated() {
  
});

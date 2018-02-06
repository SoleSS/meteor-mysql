import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  var liveDb = new LiveMysql(Meteor.settings.mysql);
  
  var closeAndExit = function() {
    liveDb.end();
    process.exit();
  };
  // Close connections on hot code push
  process.on('SIGTERM', closeAndExit);
  // Close connections on exit (ctrl + c)
  process.on('SIGINT', closeAndExit);
  
  Meteor.publish('users_emails', function() {
    return liveDb.select(
      "SELECT users.id, users.login, CONCAT(users.fname, ' ', users.lname) as fullName, (SELECT GROUP_CONCAT(alias SEPARATOR ',') FROM emails WHERE emails.user_id=users.id) as emails FROM users",
      [ { table: 'users' } ]
    );
  });
  
/*  Meteor.publish('users', function() {
    return liveDb.select(
      'SELECT * FROM users',
      [ { table: 'users' } ]
    );
  });
  Meteor.publish('emails', function() {
    return liveDb.select(
      'SELECT * FROM emails',
      [ { table: 'emails' } ]
    );
  });*/
});

module.exports = function(Sms) {


Sms.send = function(token, from, to, text, cb) {

    var mSms = Sms.app.dataSources.sendSMS;

    mSms.send(token, from, to, text, function(err, response, context) {
      if (err) return cb(err,null); //error making request
      if (response.error) {
        return cb(err,null);
      }
      console.log (response);

      console.log('> SMS sent properly');

      return cb(null,response);
    });


  };

 Sms.remoteMethod(
     'send',
     {
       accepts: [
         {arg:'token', type: 'string'},
         {arg:'from', type: 'string'},
         {arg:'to', type: 'string'},
         {arg:'text', type: 'string'},
                ],
       returns: {arg: 'result', type: 'string'},
     }
  );


};

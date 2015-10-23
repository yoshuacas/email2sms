module.exports = function(Email) {

  var htmlToText = require('html-to-text');
  var utf8 = require('utf8');

  Email.toSms = function (req, cb){
    var mSms = Email.app.dataSources.sendSMS;

//  console.log ("req",req);
//  console.log ("req.sender", req.sender);
//  console.log ("req.recipient", req.recipient );
//  console.log ("req['body-plain']", req['body-plain']);

  var bodyPlain = req['body-plain'];
  var bodyPlainText = htmlToText.fromString(bodyPlain);

  var utfconverted =  utf8.encode (bodyPlainText);;

//  console.log ("bodyPlainText", bodyPlainText);

  console.log  ("utfconverted" + utfconverted);
  var startIndex = utfconverted.indexOf ("image");
  var smsText = bodyPlainText.substr (utfconverted+15);

  console.log ("smsText", smsText);

  mSms.send ("IqZWeVK8fG3tthFNmT5GolFqWYbU", "Music", "50230063392", smsText, function (err, response, context){


      if (err) return cb(err,null); //error making request
      if (response.error) {
        return cb(err,null);
      }
      console.log (response);

      console.log('> SMS sent properly');

      return cb(null,response);


	});


//  console.log ("*********************************************");
	cb (null, "ok");
  }

  Email.remoteMethod (
	'toSms',
	{
		accepts:[
			{arg:"req", type:"object", http:{source:"body"}},
			]
	}
  );


}

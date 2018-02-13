exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.MessagingResponse({
    	to: '**********'
    });
	twiml.message("OctoPi 3D printer event: " + event.type);
	callback(null, twiml);
};
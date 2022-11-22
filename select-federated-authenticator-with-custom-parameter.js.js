var methods = ['email otp', 'totp'];

var onLoginRequest = function(context) {
    var method = context.request.params.method[0];
    executeStep(1);
    if (context.request.params.method) {
        if (method === methods[1]) {
            executeStep(2, { authenticationOptions:[{authenticator: 'TOTP'}]}, {});
        } else {
        	executeStep(2);
        }
    } else {
        executeStep(2);
    }
};

/*
* This implementation has be tested in WSO2 Identity Server (IS) V5.11.0.143
* 
* Prerequisites: 
*  - A claim should be created called 'prefauth'
*  - The claim for the user should contain a value manually assigned (unles basic authenticator kicks in)
*  - Identity providers for relevant IDP's should be configured in IS
*
* How to:
*  - Go to Service Provider -> Local & Outbound Authentication Configuration -> Advance Configuration
*  - Add Identifier First as Step 1
*  - Add Google, Facebook and Basic as Step 2
*/

// List of supported Identity Providers (IDP's)
var idps = ['Google', 'Facebook'];
// The claim URI for preferred authenticator
var prefAuthClaim = 'http://wso2.org/claims/prefauth';

var onLoginRequest = function(context) {
    executeStep(1, {
        onSuccess: function(context) {
            // Extracting user store domain of authenticated subject from the first step
            var prefAuth = context.currentKnownSubject.localClaims[prefAuthClaim];
            Log.debug('Preferred Authenticator IDP of user ' + context.currentKnownSubject.uniqueId + ' is : ' + prefAuth);
          
            // Google
            if (idps.indexOf(prefAuth) == 0) {
                executeStep(2, {
                    authenticationOptions: [{
                        idp: 'Google'
                    }]
                }, {});
              
            // Facebook
            } else if (idps.indexOf(prefAuth) == 1) {
                executeStep(2, {
                    authenticationOptions: [{
                        idp: 'Facebook'
                    }]
                }, {});
              
            // Other
            } else {
                executeStep(2, {
                   	authenticationOptions: [{
                        authenticator: 'basic'
                    }]
                }, {});
            }
        }
    });
};

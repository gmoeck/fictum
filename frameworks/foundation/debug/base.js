Fictum = {
  setup: function() {
    this.server = Fictum.Server.create(); 
    if(this.originalSendFunction === undefined)
      this.startInterceptingRequests();
  },

  teardown: function() {
    if(this.originalSendFunction !== undefined)
      this.stopInterceptingRequests();
    this.server.destroy();
    this.server = undefined;
  },

  isARegisteredUrl: function(url) {
    this._ensureServerIsSetup();
    return this.server.isARegisteredUrl(url);
  },

  registerUrl: function(url, response, options) {
    this._ensureServerIsSetup();
    this.server.registerUrl(url, response, options);
  },

  responseFor: function(url, options) {
    this._ensureServerIsSetup();
    return this.server.responseFor(url, options);
  },

  addResourceType: function(type, defaultAttributes) {
    this._ensureServerIsSetup();
    this.server.addResourceType(type, defaultAttributes);
  },

  addResource: function(type, attributes) {
    this._ensureServerIsSetup();
    return this.server.addResource(type, attributes);
  },

  startInterceptingRequests: function() {
    if(Fictum.originalSendFunction != undefined)
      throw new Error('ERROR: Already intercepting requests');
    Fictum.originalSendFunction = SC.Request.prototype.send;

    SC.Request.reopen({
      send: function(original, context) {
        if(Fictum.isARegisteredUrl(this.get('address'))) {
          var response = Fictum.responseFor(this.get('address'), {json: this.get('isJSON'), type: this.get('type'), body: context});
          response.set('request', this);
          setTimeout(function() {
            response.set('status', 200);
            response.notify();
          }, 1);
          return response;
        } else {
          return original(context);
        }
      }.enhance()
    });
  },

  stopInterceptingRequests: function() {
    if(Fictum.originalSendFunction === undefined)
      throw new Error('ERROR: Not currently intercepting requests');
    SC.Request.reopen({
      send: Fictum.originalSendFunction
    });
    Fictum.originalSendFunction = undefined;
  },

  _ensureServerIsSetup: function() {
    if(this.server === undefined)
      throw new Error('ERROR: Server has not yet been setup');
  }
};

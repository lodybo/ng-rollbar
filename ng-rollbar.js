(function(angular){
  angular.module('tandibar/ng-rollbar', []);

  angular.module('tandibar/ng-rollbar').config(['$provide', function($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', '$window', function($delegate, $window) {
      return function (exception, cause) {
        if($window.Rollbar) {
          $window.Rollbar.error(exception, {cause: cause});
        }
        $delegate(exception, cause);
      };
    }]);
  }]);

  angular.module('tandibar/ng-rollbar').provider('Rollbar', function RollbarProvider() {
    var rollbarProvider = this;
    var rollbarActivated = true;

    this.init = function(config) {
      var _rollbarConfig = config;
      if (rollbarActivated) {
        /* jshint ignore:start */
        /* rollbar client lib start */
        // using https://github.com/rollbar/rollbar.js/blob/v1.7.0/dist/rollbar.snippet.js
        !function(r){function t(o){if(e[o])return e[o].exports;var n=e[o]={exports:{},id:o,loaded:!1};return r[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,t,e){"use strict";var o=e(1).Rollbar,n=e(2);_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||"https://d37gvrvc0wt4s1.cloudfront.net/js/v1.7/rollbar.min.js";var a=o.init(window,_rollbarConfig),i=n(a,_rollbarConfig);a.loadFull(window,document,!_rollbarConfig.async,_rollbarConfig,i)},function(r,t){"use strict";function e(){var r=window.console;r&&"function"==typeof r.log&&r.log.apply(r,arguments)}function o(r,t){return t=t||e,function(){try{return r.apply(this,arguments)}catch(e){t("Rollbar internal error:",e)}}}function n(r,t,e){window._rollbarWrappedError&&(e[4]||(e[4]=window._rollbarWrappedError),e[5]||(e[5]=window._rollbarWrappedError._rollbarContext),window._rollbarWrappedError=null),r.uncaughtError.apply(r,e),t&&t.apply(window,e)}function a(r){this.shimId=++u,this.notifier=null,this.parentShim=r,this.logger=e,this._rollbarOldOnError=null}function i(r){var t=a;return o(function(){if(this.notifier)return this.notifier[r].apply(this.notifier,arguments);var e=this,o="scope"===r;o&&(e=new t(this));var n=Array.prototype.slice.call(arguments,0),a={shim:e,method:r,args:n,ts:new Date};return window._rollbarShimQueue.push(a),o?e:void 0})}function l(r,t){if(t.hasOwnProperty&&t.hasOwnProperty("addEventListener")){var e=t.addEventListener;t.addEventListener=function(t,o,n){e.call(this,t,r.wrap(o),n)};var o=t.removeEventListener;t.removeEventListener=function(r,t,e){o.call(this,r,t&&t._wrapped?t._wrapped:t,e)}}}var u=0;a.init=function(r,t){var e=t.globalAlias||"Rollbar";if("object"==typeof r[e])return r[e];r._rollbarShimQueue=[],r._rollbarWrappedError=null,t=t||{};var i=new a;return o(function(){if(i.configure(t),t.captureUncaught){i._rollbarOldOnError=r.onerror,r.onerror=function(){var r=Array.prototype.slice.call(arguments,0);n(i,i._rollbarOldOnError,r)};var o,a,u="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(o=0;o<u.length;++o)a=u[o],r[a]&&r[a].prototype&&l(i,r[a].prototype)}return r[e]=i,i},i.logger)()},a.prototype.loadFull=function(r,t,e,n,a){var i=function(){var t;if(void 0===r._rollbarPayloadQueue){var e,o,n,i;for(t=new Error("rollbar.js did not load");e=r._rollbarShimQueue.shift();)for(n=e.args,i=0;i<n.length;++i)if(o=n[i],"function"==typeof o){o(t);break}}"function"==typeof a&&a(t)},l=!1,u=t.createElement("script"),s=t.getElementsByTagName("script")[0],c=s.parentNode;u.src=n.rollbarJsUrl,u.async=!e,u.onload=u.onreadystatechange=o(function(){if(!(l||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)){u.onload=u.onreadystatechange=null;try{c.removeChild(u)}catch(r){}l=!0,i()}},this.logger),c.insertBefore(u,s)},a.prototype.wrap=function(r,t){try{var e;if(e="function"==typeof t?t:function(){return t||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._wrapped){r._wrapped=function(){try{return r.apply(this,arguments)}catch(t){throw t._rollbarContext=e()||{},t._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=t,t}},r._wrapped._isWrap=!0;for(var o in r)r.hasOwnProperty(o)&&(r._wrapped[o]=r[o])}return r._wrapped}catch(n){return r}};for(var s="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),c=0;c<s.length;++c)a.prototype[s[c]]=i(s[c]);r.exports={Rollbar:a,_rollbarWindowOnError:n}},function(r,t){"use strict";r.exports=function(r,t){return function(e){if(!e&&!window._rollbarInitialized){var o=window.RollbarNotifier,n=t||{},a=n.globalAlias||"Rollbar",i=window.Rollbar.init(n,r);i._processShimQueue(window._rollbarShimQueue||[]),window[a]=i,window._rollbarInitialized=!0,o.processPayloads()}}}}]);
        /* rollbar client lib end */
      /* jshint ignore:end */
      }
    };

    this.deinit = function () {
      rollbarActivated = false;
    };

    getter.$inject = ['$window'];
    function getter($window) {
      var service = {
        Rollbar: logInactiveMessage,

        configure: logInactiveMessage,

        critical: logInactiveMessage,
        error: logInactiveMessage,
        warning: logInactiveMessage,
        info: logInactiveMessage,
        debug: logInactiveMessage,

        scope: logInactiveMessage,

        verbose: logInactiveMessage,
        enable: logInactiveMessage,
        disable: logInactiveMessage
      };

      if (rollbarActivated) {
        service.Rollbar = $window.Rollbar;

        service.configure = $window.Rollbar.configure;

        service.critical = $window.Rollbar.critical;
        service.error = $window.Rollbar.error;
        service.warning = $window.Rollbar.warning;
        service.info = $window.Rollbar.info;
        service.debug = $window.Rollbar.debug;

        service.scope = $window.Rollbar.scope;

        service.verbose = function (boolean) {
          if (boolean === undefined) { boolean = true; }
          $window.Rollbar.configure({ verbose: boolean });
        };
        service.enable = function () {
          $window.Rollbar.configure({ enabled: true });
        };
        service.disable = function () {
          $window.Rollbar.configure({ enabled: false });
        };
      }

      function logInactiveMessage() {
        console.warn("Rollbar is deactivated");
      }

      return service;
    };

    this.$get = getter;
  });

})
(angular);

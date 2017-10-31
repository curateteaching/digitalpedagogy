

function evalLocaleFromCookie(){

  window.dojoConfig = window.dojoConfig || {};

  var nameEQ = "arcgisLocale" + "=";
  var sessionCookie = "esri_auth" + "=";
  var ca = window.document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(sessionCookie) === 0) {
      var sValue = window.unescape(c.substring(sessionCookie.length, c.length));
      try {
        var userObj = JSON.parse(sValue);
      }
      catch (x){}
      var locale = userObj.culture;
      if (locale) {
        window.dojoConfig.locale = locale; // change dojoConfig.locale to the cookie locale when cookie is present
      }
      return;
    }
    if (c.indexOf(nameEQ) === 0) {
      var locale2 = c.substring(nameEQ.length, c.length);
      if (locale2) {
        window.dojoConfig.locale = locale2; // change dojoConfig.locale to the cookie locale when cookie is present
      }
    }
  }
}

evalLocaleFromCookie();

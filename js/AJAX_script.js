'use strict';

//  DEFINICJA FUNKCJI AJAX
function ajax (ajaxoOptions) {
    
//  OPCJE POLACZENIA I JEGO TYPU    
    var options = {
        type: ajaxoOptions.type || 'POST',
        url: ajaxoOptions.url || '',
        onError: ajaxoOptions.onError || function() {},
        onSuccess: ajaxoOptions.onSuccess || function() {},
        dataType: ajaxoOptions.dataType || 'text',
    }
    
    function httpSuccess (httpRequest) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch(err) {
            return false;
        }
    }
    
//  UTWORZENIE OBIEKTU XMLHttpRequest 
    var httpReq = new XMLHttpRequest();
    
//  OTWARCIE POLACZENIA
    httpReq.open(options.type, options.url, true);
    
//  SPRAWDZANIE STANU POLACZENIA FUNCKJA httpSuccess
    httpReq.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (httpSuccess (this)) {
                console.log ('Połączenie działa');
                console.log (this.readyState);
                console.log (this.status);
                
//              JESLI DANE W FORMACIE XML TO ZWROCI OBIEKT responseXML - W PRZECIWNYM WYPADKU responseText (JSON)
                var returnData = (options.dataType=='xml')? this.responseXML: this.responseText;
                
                console.log(returnData);
                
                options.onSuccess(returnData);
                
                httpReq = null;
            } else {
                options.onError(console.log('BŁĄD!'));
            }
        }
    }
    
//  WYSLANIE ZAPYTANIA D0 SERWERA
    httpReq.send();
    
}

ajax({
    type: 'GET',
    url: 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl',
    onError: function (msg) {
        console.log(msg);
    },
    onSuccess: function (reponse) {
        var jsonObj = JSON.parse(reponse);
        console.log(jsonObj.userId);
        console.log(jsonObj.userName);
        console.log(jsonObj.userURL);
        
        var userId = jsonObj.userId;
//      jQuery
//        $('#testowy').text(userId);
//      TO SAMO CO WYŻEJ CZYSTYM JS
        document.getElementById('testowy').innerHTML = userId;
        
//        document.write(jsonObj.userName);
    }
});


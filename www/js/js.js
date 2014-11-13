$(document).ready(function(){

	 document.addEventListener("deviceready", onDeviceReady, false);
     
});


   // device APIs are available
    //
    function onDeviceReady() {
       
    }

    // Show a custom alert
    //
    function showAlert() {
        navigator.notification.alert(
            'Deu Certo!',  // message
            null,
            'Alerta',            // title
            'OK'             // buttonName
        );
    }

    // Beep three times
    //
    function playBeep() {
        navigator.notification.beep(1);
    }

    // Vibrate for 2 seconds
    //
    function vibrate() {
        navigator.notification.vibrate(2000);
    }
    
    // new contact
    
    function newContact()
    {
     var phoneNumbers = [];
     phoneNumbers[0] = new ContactField('work', '212-555-1234', true);
    
    	var myContact = navigator.contacts.create({"displayName": "Test User"});
        myContact.note = "Contato ok";
        myContact.phoneNumbers =  phoneNumbers; 
        myContact.save(myContact.id);
        alert("Contato salvo");
        
        console.log("The contact, " + myContact.displayName + ", note: " + myContact.note);
    }
    
    // check connection
    
    function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            navigator.notification.alert(
            '' + states[networkState],  // message
            null,
            'Tipo de conexão',            // title
            'OK'             // buttonName
        );
        }
    

    function getJsonList(){ 
     
    console.log("Entering getContactList()");
     $('.jlista').empty();
     $.ajax({
            type: 'get',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            url: 'http://mob.clubehnd.com.br/jsonlist.html',
            dataType: "json",
            success: function (json)
            {


                $(json).each(function(){

                     $('.jlista').append('<tr>'+'<td>'+this.Codigo+'</td>'+
                                      '<td>'+this.Nome+'</td>'+
                                      '<td>'+this.Texto+ '</td>'+
                                      '</tr>');

               
                });
                
            } 
    });

$.mobile.changePage("#pagejson", {reverse: false});
  }


  // valida Login 

function login(){

var log = "Cotamelhor";
var sen = "123";

var lg = $('#login').val();
var sh = $('#senha').val();

if(lg == "" || sh == "")
{
    navigator.notification.alert(
            'POR FAVOR DIGITE TODOS OS DADOS' ,  // message
            null,
            "LOGIN",            // title
            'OK'             // buttonName
        );
}

else if(lg == log && sh == sen)
{

    $.mobile.changePage("conversa.html", { reverse: false, transition:"slide"});
   
}else{

    navigator.notification.alert(
            'LOGIN OU SENHA INCORRETO!' ,  // message
            null,
            "LOGIN",            // title
            'OK'             // buttonName
        );

}


}



  
  
    var logIn = "";
    var logCon = "";

    $(document).ready(function(){
        
    	 document.addEventListener("deviceready", onDeviceReady, false);

       });

    function ListaContatos(){

        
            var link = "http://wcf.clubehnd.com.br/Dialogos.svc/ListarContatos/"+ logIn + "";

            $.ajax({
                type: 'GET',
                cache: false,
                contentType: 'application/json;',
                url: link,
                dataType: "json",
                success: function (json)
                {     
                    $(json.ListarContatosResult).each(function(){

                        $("#listcontatos").append("<a href='#' onclick='Conversa("+this.Id+"); return false;' class='ui-btn ui-corner-all' id="+ this.Id +">"+ this.Nome + " " +this.Sobrenome+"</a>");

                    });        
                } 
            });

        $.mobile.changePage("contatos.html", {transition: "slideup", changeHash: false, reverse: false});


    }

    function Conversa(clickid){
            logCon = clickid;
            $.mobile.changePage("mensagem.html", {transition: "pop", changeHash: false, reverse: false});
            time = setInterval('Messagem('+clickid+')',1000);

    }

    function VoltarMensagem(){

            clearInterval(time);
            ListaContatos();

    }
       // device APIs are available
        //
        function onDeviceReady() {


           
        }

        function Enviar(){

            var msg = $("#msg").val();
            
            var data = {
            
                "mensagem": {
                "DateTime": "25\/11\/2014 11:24:16",
                "FromId": logCon,
                "Id": "999",
                "Message": msg,
                "Name": "Teste",
                "ToId": logIn

                }
            }

            $("#msg").val("");

            data = JSON.stringify(data);
            
        
            $.ajax({
                type: 'POST',
                cache: false,
                contentType: 'application/json;',
                url: 'http://wcf.clubehnd.com.br/Dialogos.svc/SalvarMensagem',
                data: data,
                dataType: "json",
                success: function ()
                {             
                } 
            });
           
        }

        function Messagem(click){
        
            
            var link = "http://wcf.clubehnd.com.br/Dialogos.svc/ListarMensagens/"+logIn+"/"+click+"";

            

            $.ajax({
                type: 'get',
                cache: false,
                contentType: 'application/json;',
                url: link,
                dataType: "json",
                success: function (json)
                {
                    var s = "";
                    $(json).each(function(){
                        

                        $(this.ListarMensagensResult).each(function(){

                                s += this.Name + ": " + this.Message + "<br/>";
                                
                        });
                         $("#incomingMessages").html(s); 
                    $(".msgContainerDiv").scrollTop($(".msgContainerDiv")[0].scrollHeight);
                    }); 

                   
                    
                } 
        
            });
            
      }

        // LISTA CONTATOS


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

    function login()
    {

    var email = $('#login').val();
    var log = "";
    var link = "http://wcf.clubehnd.com.br/Dialogos.svc/BuscarId/"+ email +"";

     $.ajax({
                type: 'get',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: link,
                dataType: "json",
                success: function (json)
                {
                   
                    $(json).each(function(){
                        logIn = json.BuscarIdResult;

                    });

                }             
        });

     
  
    $.mobile.changePage("conversa.html", {transition: "pop", changeHash: false, reverse: false});

    }



      
      

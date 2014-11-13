$(document).ready(function(){

	 document.addEventListener("deviceready", onDeviceReady, false);
     
});

var db;
   // device APIs are available
    //
    function onDeviceReady() {
       
    }

    function init() {

        document.addEventListener("deviceready",startup);

    }
       
    function startup() {

        console.log("Starting up...");

        db = window.openDatabase("main","1","Main DB",1000000);

        db.transaction(initDB,dbError,dbReady);

    }

    function dbError(e) {

        alert("SQL ERROR");

        console.dir(e);

    }

    function initDB(tx) {

        tx.executeSql("create table if not exists mensagem(id INTEGER PRIMARY KEY AUTOINCREMENT, conversa TEXT)");
        selectMsg();  
    }

    function dbReady() {

        console.log("DB initialization done.");

        $("#btnenviar").on("touchstart", function(e){

            var msg = $("#msg").val();
            $("#msg").val("");
            if(msg != ""){
             db.transaction(function(ctx) {
            ctx.executeSql("insert into mensagem(conversa) values(?)", [msg]);   
            selectMsg();  

            });
         }
        });

        $("#btnlimpar").on("touchstart",function(f){
            db.transaction(function(ttx){

                ttx.executeSql("delete from mensagem");
                selectMsg();        
            });

        });

}

    function selectMsg()
    {

                db.transaction(function(ctx) {
                   
                    ctx.executeSql("select conversa from mensagem", [], function(tx, results) {

                        var s = "";
                 
                        for(var i=0; i<results.rows.length; i++) {
                            s += results.rows.item(i).conversa + "<br/>";
                        }
                    
                        $("#incomingMessages").html(s);

                    });

                });

    }
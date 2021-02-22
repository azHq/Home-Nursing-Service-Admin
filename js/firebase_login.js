var appVerifier;
var phone_number;
window.onload=function(){

    appVerifier= new firebase.auth.RecaptchaVerifier('recaptcha-container');
    appVerifier.render();
   
}
function send_verification_code(){

    phone_number=document.getElementById("phone_number").value;
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    
    if(check_phone_number(phone_number)){
        verify_phone_number(phone_number);
    }
}


function verify_phone_number(phone_number){

    $.ajax({

            url:"verify_phone_number",
            method:'GET',
            data:
            {
              "phone_number":phone_number,
              
            },
            success:function(result)
            {
              if(result=="0"){

                document.getElementById("error1").style.display="block";
                document.getElementById("message").style.display="none";
                $("#error_message1").text("Your phone number is not registered");
              }
              else if(result=="1"){
                    var phoneNumber="+88"+phone_number;
                    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                    .then(function (confirmationResult) { 
                         window.confirmationResult = confirmationResult;
                         open_verify_code_layout();
                    }).catch(function (error) {
                       document.getElementById("error1").style.display="block";
                       document.getElementById("message").style.display="none";
                       $("#error_message1").text("fail to send code");
                    });
                
              }
              
              
            }
             
        });
}
function check_phone_number(phone_number){
    

    phone_number=phone_number.replace("+88","");
    if(phone_number.startsWith("88")){
      phone_number=phone_number.substring(2,phone_number.length-1);
    }
    var pattern=/\+?(88)?(01)[1-9][0-9]{8}\b/;
    if(pattern.test(phone_number)){

        return true;
    }
    else{
        document.getElementById("error1").style.display="block";
        document.getElementById("message").style.display="none";
        $("#error_message1").text("invalid phone number");
        return false;
    } 

}

function verify_code(){
    var code =document.getElementById("code").value;
    confirmationResult.confirm(code).then(function (result) {
      $.ajaxSetup({

        headers: {

            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')

        }

     });
       $.ajax({

            url:"verification",
            method:'POST',
            data:
            {
              "phone_number":phone_number,
              "secret":secret
            },
            success:function(result)
            {
              if(result=="fail"){
                
                document.getElementById("error").style.display="block";
                document.getElementById("header").style.display="none";  
                
              }
              else {

                //alert(result);
                window.location.href="dashboard";
                
              }
              
              
            }
             
        });

    }).catch(function (error) {
      document.getElementById("error").style.display="block";
      document.getElementById("header").style.display="none";
    });
}

function open_verify_code_layout(){
   
    var top=document.getElementById("verify_code").style.top;
    var top2=document.getElementById("sign_in").style.top;
   
    if(top=="190px"){
 
        document.getElementById("verify_code").style.top="190px";
        document.getElementById("sign_in").style.top="-460px";
         
    }
    else{


        document.getElementById("verify_code").style.top="190px";
        document.getElementById("sign_in").style.top="-460px";
       
        
    }

}

function logout(){

  firebase.auth().signOut().then(function() {
    $.ajax({

              url:"logout",
              method:'GET',
              success:function(result)
              {
                window.location.href="home";

              }
               
          });
  }).catch(function(error) {
    // An error happened.
  });


}

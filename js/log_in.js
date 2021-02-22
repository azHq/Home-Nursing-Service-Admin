$("#form").submit(function(e) {
    e.preventDefault();
    var user_name=$("#uname").val();
    var password=$("#pwd").val();
    console.log(firebase.app().name);
    var db=firebase.firestore();
    var docRef = db.collection("AppConfiguration").doc("HNS");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            var data= doc.data();
            
            if(data.user_name==user_name&&data.password==password){  
                $("#error_message").css("display","none");
                sessionStorage.setItem("user_name",user_name);
                sessionStorage.setItem("password",password);
                window.location.href="http://localhost/HNS_ADMIN/view_resources/Dashboard.html";
                
            }
            else{
                sessionStorage.removeItem("user_name");
                sessionStorage.removeItem("password");
                console.log(user_name);
                $("#error_message").css("display","block");
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
});



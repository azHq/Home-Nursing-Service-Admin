function isLogin(){
    var user_name=sessionStorage.getItem("user_name");
    if(user_name==null)
    {
        window.location.href="http://localhost/HNS_ADMIN/view_resources/log_in.html";
    }
}
function sign_in(){

    var top=document.getElementById("sign_in").style.top;
    console.log("heee"+top);
    if(top=="190px"){

        document.getElementById("sign_in").style.top="-460px";
        if(document.getElementById("sign_up")!=null) document.getElementById("sign_up").style.left="0px";
        else{
            document.getElementById("wel_text").style.marginLeft="20%";
        }
    }
    else{
        document.getElementById("sign_in").style.top="190px";
        if(document.getElementById("sign_up")!=null) document.getElementById("sign_up").style.left="-1000px";
        else{
            document.getElementById("wel_text").style.marginLeft="-70%";
        }
    }

    

}


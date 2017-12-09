function checkForms(){
    if($("#passwordNo1").val() == $("#passwordNo2").val()){
        alert("Register successful!");
        return true;
    }else{
        alert("Make sure both password are the same!");
        return false;
    }
}
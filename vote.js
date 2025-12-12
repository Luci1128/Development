function vote(){
    //alert("Data Recorded");
        var name=document.getElementById("name").value;
        var age=parseInt(document.getElementById("age").value);
    if(age==null){
        alert("Invalid entry!");
    }else if(age>18){
        alert('Eligible to vote');
    }else{            
        alert('You are minor.');
    }

}
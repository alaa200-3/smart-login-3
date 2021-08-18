//login inputs
var loginEmail  = document.getElementById('signInEmail');
var loginPass   = document.getElementById('signInPassword');
// sign up inputs
var signUpName  = document.getElementById('signUpName');
var signUpEmail = document.getElementById('signUpEmail');
var signUpPassword  = document.getElementById('signUpPassword');

// check at start if local storage is empty or not 
   var regestrationArray = []
   if (localStorage.getItem('userInfo') == null) {
      // console.log("null");
       regestrationArray = []
   } else {
       //console.log("not null");
       //json.parse to convert string to array of objects
       regestrationArray = JSON.parse(localStorage.getItem('userInfo'))
   }

//chek if there any empty field
 function isEmptyForSignUp(){

    if( signUpName.value != "" && signUpEmail.value != "" &&  signUpPassword.value != ""   ){
        return true;
    }
    else {
        return false;
    }
}

function isEmptyForLogin(){

    if( loginEmail.value != "" && loginPass.value != ""){
        return true;
    }
    else {
        return false;
    }
}

// check if the email is already exist
function emailIsExist(){

    for( var i=0;i<regestrationArray.length ;i++){
        if(regestrationArray[i].email==signUpEmail.value){
            return false;
        }
    }
    return true;
} 

//home page
var welcomedName = localStorage.getItem('Username')
if (welcomedName) {
      document.getElementById('hello').innerHTML = "Welcome " + welcomedName;
      }

function signUp() {

   // store sign up info
    var signUpInfo = {
        name : signUpName.value,
        email: signUpEmail.value,
        pass : signUpPassword.value
    }   
    //chek if there any empty field
    if (isEmptyForSignUp() == false) {
        document.getElementById('required').innerHTML = '<p class="text-danger m-3">All inputs are required</p>'
        return false
    }
    //check if email is already exist
    if (emailIsExist() == false) {
        document.getElementById('required').innerHTML = '<p class="text-danger m-3">email is already exist</p>'
        return false
    }
    //add info to the localstorage
    regestrationArray.push(signUpInfo);
    localStorage.setItem('userInfo', JSON.stringify(regestrationArray));
    document.getElementById('required').innerHTML='<p class="text-success m-3">Success</p>';
}

function login(){
        // store login info
        var logInInfo = {        
            email: loginEmail.value,
            pass : loginPass.value
        }  
        //chek if there any empty field
        if (isEmptyForLogin() == false) {
            document.getElementById('incorrect').innerHTML = '<p class="text-danger m-3">All inputs is required</p>'
            return false
        }
        var founded=false;
        var name="";
        for(var i=0;i<regestrationArray.length;i++){
            if(logInInfo.email.toLowerCase() == regestrationArray[i].email.toLowerCase() && 
            logInInfo.pass.toLowerCase()  == regestrationArray[i].pass.toLowerCase()){
                founded =true;
                name =regestrationArray[i].name;
            }   
        }
        if(founded ==true){
              localStorage.setItem('Username', name);
              window.location.href="home.html";    
        }
        else{
            document.getElementById('incorrect').innerHTML = '<p class="text-danger m-3">email or pass is incorrect</p>' 
        }
}


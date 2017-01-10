// JavaScript Document

function setStorage(name, value)
{
	if(typeof(Storage)!=="undefined"){
		if (name == "username")
			localStorage.username=value;
		else if (name == "role")
			localStorage.role=value;			
	}
	else
		setCookie(name,value);
}

function getStorage(){
	if(typeof(Storage)!=="undefined")
		document.getElementById("credential").innerHTML += " "+localStorage.username+" [ "+localStorage.role+" ] ";
	else
		document.getElementById("credential").innerHTML += " "+getCookie('username')+" [ "+getCookie('role')+" ] ";
}

function setCookie(name,value){	
	var date = new Date();
	var days = 365;
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+";path=/";
}

function getCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0){				
			var value = c.substring(nameEQ.length,c.length);
			return value;
		}
	}
	return null;
}
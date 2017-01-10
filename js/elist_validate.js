// JavaScript Document

var eid, nme, tte, pos, com, con, bld, adr;
var desc, expc, numb, skil, comp, posn, locn;
var num = '0123456789';
var hyphen = '-'
var lwr = 'abcdefghijklmnopqrstuvwxyz';
var upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var blg = '^(A|B|AB|O)[+-]$';
var phn = "^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$";
var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
var ck = new Array("Alphabets","Numbers","Alpha-Numeric","Specific");
var lbl = new Array("Employee ID","Employee Name","Title","Position","Competencty","Contact","Blood Group","Address"
						,"Designation","Experience","Numbers","Skills","Location");
var cnt = 0;

function emplist_validate(){
	eid = document.getElementById("eid");
	nme = document.getElementById("ename");
	tte = document.getElementById("etitle");
	pos = document.getElementsByName("epos");
	com = document.getElementById("ecomp");
	con = document.getElementById("econtact");
	bld = document.getElementById("eblood");
	adr = document.getElementById("eaddr");
	save = document.getElementById("btnSave");

	if(notNull(eid,0) ||
		notNull(nme,1) ||
		isSelectedlist(tte,2) ||
		isSelected(pos,3) ||
		isSelectedlist(com,4) ||
		notNull(con,5) ||
		notNull(bld,6) ||
		notValid(bld,blg,ck[3],6) ||
		notNull(adr,7)
//		notValid(fnm,lwr+upr,ck[0],0) ||
//		notValid(lnm,lwr+upr,ck[0],1) ||
//		notValid(adr,lwr+upr+num,ck[2],2) ||
//		isEmailAddress(eml.value) ||
//		notValid(fnm,lwr+upr,ck[0],4) ||
//		notValid(cmt,lwr+upr,ck[0],6)
	)		return;
	else{
		if(save.value == "Save"){
			if(checkID(eid,0))	{	return;}
                        populate();
			loadJSON('../JSON/login.js', empSave);


		}
		else if(save.value == "Update"){
			loadJSON('../JSON/login.js', empUpdate);
			//alert("Form Updated");
		}


	}
}

function reslist_validate(){
	desc = document.getElementById("rdes");
	expc = document.getElementById("rexp");
	numb = document.getElementById("rnum");
	skil = document.getElementsByName("rskills");
	comp = document.getElementById("rcomp");
	posn = document.getElementsByName("rpos");
	locn = document.getElementById("rloc");
	save = document.getElementById("btnSave");

	if(isSelectedlist(desc,8) ||
		notNull(expc,9) ||
		notNull(numb,10) ||
		isSelectedCombo(skil,11) ||
		isSelectedlist(comp,4) ||
		isSelected(posn,3) ||
		isSelectedlist(locn,12)
//		notValid(fnm,lwr+upr,ck[0],0) ||
//		notValid(lnm,lwr+upr,ck[0],1) ||
//		notValid(adr,lwr+upr+num,ck[2],2) ||
//		isEmailAddress(eml.value) ||
//		notValid(fnm,lwr+upr,ck[0],4) ||
//		notValid(pin,num,ck[1],5) ||
//		notValid(cmt,lwr+upr,ck[0],6)
	)		return;
	else{
		if(save.value == "Save"){
			loadJSON('../JSON/login.js', resSave);
			//alert("Form Submitted");
		}
		else if(save.value == "Update"){
			loadJSON('../JSON/login.js', resUpdate);
			//alert("Form Updated");
		}

	}
}

function notNull(str,ind){
	var strr = lbl[ind];
	if(str.value == ""){
		alert(strr+" is Mandatory");
		return true;
	}
	return false;
}

function notValid(txt,val,check,ind) {
	var str = txt.value;
	var strr = lbl[ind];
	for (i=0; i<str.length; i++){
		if (val.indexOf(str.charAt(i),0) == -1){
			alert(strr+" should contain only "+check+" values");
			txt.focus();
			return true;
		}
	}
	return false;
}

function isSelected(str,ind){
	var strr = lbl[ind];
	if (str[0].checked || str[1].checked)
		return false;
	else{
		alert(strr+" is Mandatory");
		return true;
	}
}

function isSelectedlist(str,ind){
	var strr = lbl[ind];
	if (str.selectedIndex != 0)
		return false;
	else{
		alert(strr+" is Mandatory");
		return true;
	}
}

function isSelectedCombo(str,ind){
	var strr = lbl[ind];
	//alert(str.length);
	for(var i=0;i<str.length;i++){
		if (str[i].checked)
			return false;
	}
	alert(strr+" is Mandatory");
	return true;
}

function isAlpha(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode

	if ((charCode > 32 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 127))
		return false;
	else
		return true;
}

function isNumeric(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ((charCode > 32 && charCode < 48) || (charCode > 57 && charCode < 127))
		return false;
	else
		return true;
}

function isAlphaNumeric(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ((charCode > 32 && charCode < 48) || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 127))
		return false;
	else
		return true;
}

function resetFields(){
	tag= document.getElementsByTagName("input");
	for(var i = 0; i<tag.length; i++){
		if(tag[i].type == "text"){
			tag[i].value = "";
			tag[i].disabled = false;
		}
		else if(tag[i].type == "radio" || tag[i].type == "checkbox")
			tag[i].checked = false;
		else if(tag[i].type == "button"){
			tag[i].value = "Save";
		}
	}
	tag= document.getElementsByTagName("select");
	for(var i = 0; i<tag.length; i++){
		tag[i].selectedIndex = 0;
		tag[i].disabled = false;
	}
	tag= document.getElementsByTagName("textarea");
	for(var i = 0; i<tag.length; i++){
		tag[i].value = "";
	}

	cleargraphics();
}

function checkID(id,ind){
	var jsonObj;
var emp = getCookie("Employee");
	if(emp)
		jsonObj = JSON.parse(getCookie("Employee"));
	else
	{
		jsonObj = {"employee":[{ "id":"201201" , "name":"Ramya" , "title":"" , "position":"" , "competency":"" , "contact":"" , "blood":"" , "address":"" }]};
	}

	var length = jsonObj.employee.length;

	for(var j=1 ; j<length; j++)
	{
		if(jsonObj.employee[j].id == id.value){
			alert("This id is already present");
			return true;
		}

	}
	return false;
}


function onblur_image()
{
	var id_eid = document.getElementById("eid");
	var img_id = document.getElementById("dynamic_img");
	var label_id = document.getElementById("dynamic_id");

	var q1 = document.getElementById("dynamic_id1");
	var q2 = document.getElementById("dynamic_contact");
	var q3 = document.getElementById("dynamic_blood");
	var q4 = document.getElementById("dynamic_address");
q1.style.visibility="hidden";
q2.style.visibility="hidden";
q3.style.visibility="hidden";
	q4.style.visibility="hidden";


	if( id_eid.value == "201201")
	{

img_id.src ="../Images/201201.png";
label_id.innerHTML = "201201";
 img_id.style.visibility = "visible";
 label_id.style.visibility = "visible"
	}
	else
	if( id_eid.value == "201202")
	{
		img_id.src ="../Images/201202.png";
		label_id.innerHTML = "201202";
		 img_id.style.visibility = "visible";
		 label_id.style.visibility = "visible"
	}
	else
	if( id_eid.value == "201203")
	{
		img_id.src ="../Images/201203.png";
		label_id.innerHTML = "201203";
		 img_id.style.visibility = "visible";
		  label_id.style.visibility = "visible"
	}
	else
	if( id_eid.value == "201204")
	{
		img_id.src ="../Images/201204.png";
		label_id.innerHTML = "201204";
		 img_id.style.visibility = "visible";
		  label_id.style.visibility = "visible"
	}
	else
	if( id_eid.value == "201205")
	{
		img_id.src ="../Images/201205.png";
		label_id.innerHTML = "201205";
		 img_id.style.visibility = "visible";
		  label_id.style.visibility = "visible"
	}
	else
	if( id_eid.value == "")
	{
		img_id.style.visibility = "hidden";
		label_id.style.visibility = "hidden"
	}
	else
	{

		img_id.src ="../Images/anonymous.png";
		 img_id.style.visibility = "visible";
		 label_id.innerHTML = id_eid.value ;
		  label_id.style.visibility = "visible"
	}



}

function onblur_name()
{
	var id_ename = document.getElementById("ename");
	var name_id = document.getElementById("dynamic_name");

	var q1 = document.getElementById("dynamic_id1");
	var q2 = document.getElementById("dynamic_contact");
	var q3 = document.getElementById("dynamic_blood");
	var q4 = document.getElementById("dynamic_address");
q1.style.visibility="hidden";
q2.style.visibility="hidden";
q3.style.visibility="hidden";
	q4.style.visibility="hidden";

	name_id.innerHTML = id_ename.value;
	name_id.style.visibility = "visible";

}

function populate()
{

	var p1 = document.getElementById("eid");
	var p2 = document.getElementById("econtact");
	var p3 = document.getElementById("eblood");
	var p4 = document.getElementById("eaddr");



	var q1 = document.getElementById("dynamic_id1");
	var q2 = document.getElementById("dynamic_contact");
	var q3 = document.getElementById("dynamic_blood");
	var q4 = document.getElementById("dynamic_address");


	q1.innerHTML = p1.value;
	q1.style.visibility="visible";



	q2.innerHTML = p2.value;
	q2.style.visibility="visible";

	q3.innerHTML = p3.value;
	q3.style.visibility="visible";

	q4.innerHTML = p4.value;
	q4.style.visibility="visible";

}

function cleargraphics()
{
	var q1 = document.getElementById("dynamic_id1");
	var q2 = document.getElementById("dynamic_contact");
	var q3 = document.getElementById("dynamic_blood");
	var q4 = document.getElementById("dynamic_address");
	var q5 = document.getElementById("dynamic_img");
	var q6 = document.getElementById("dynamic_id");
	var q7 = document.getElementById("dynamic_name");

q1.style.visibility="hidden";
q2.style.visibility="hidden";
q3.style.visibility="hidden";
q4.style.visibility="hidden";
q5.style.visibility="hidden";
q6.style.visibility="hidden";
q7.style.visibility="hidden";

}

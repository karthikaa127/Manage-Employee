// JavaScript Document
/*Login JavaScript*/


var flag = 0;
function initial_load(username , password)
{

	var uname = document.getElementById(username);
	var pass = document.getElementById(password);
	uname.focus();

	uname.value = "";
}

function login_validate(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode

	if ((charCode > 32 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 127))
		return false;
	else
		return true;
}

function login_validate_empty(username,password)
{
	var uname = document.getElementById(username);
	var pass = document.getElementById(password);

	if(uname.value == "" || pass.value == "")
	{
		alert("Empty field detected");
		return;

	}

	ajaxLoad("../JSON/login.js", ajaxOnResult) ;

}

function ajaxLoad(uri,callback)
{
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            request.onreadystatechange = callback;
            request.open("GET", uri);
            request.send(null);
}

function ajaxOnResult(evt) {
	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var uname1 = document.getElementById("uname");
		var pass1 = document.getElementById("pass");
		var json_data = JSON.parse(evt.currentTarget.responseText);

		for(var i = 0 ; i<3 ; i++){
			if(uname1.value == json_data.roles[i].user_Name  && pass1.value == json_data.roles[i].password){
				setStorage("username", json_data.roles[i].user_Name );
				setStorage("role", json_data.roles[i].user_roles);
				if(json_data.roles[i].user_roles == "HR-Manager" || json_data.roles[i].user_roles == "HR-Staff"){
					window.location = "emplist.html";
					return ;
				}
				else{
					window.location = "req.html";
					return;
				}
			}
			else{
				flag = 1;
			}
		}
		if(flag == 1)
		alert("Invalid username or password");
	}
}
/*Credentials JavaScript*/
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
		if((localStorage.username === '') || (localStorage.username === null) || (localStorage.username === 'undefined'))
			window.location = "login.html";
		else
			document.getElementById("credential").innerHTML += " "+localStorage.username+" [ "+localStorage.role+" ] ";
	else
		if((getCookie('username') === null) || (getCookie('username') === 'undefined') || (getCookie('username') === ''))
			window.location = "login.html";
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
/*Tabs JavaScript*/

var d1 , d2 , d3;
function dynamic_1(){
	var d = document.getElementById('tabs');
	if(localStorage.role == "HR-Manager")
		check_HRManager(d,1);

	if(localStorage.role == "HR-Staff")
		check_HRStaff(d,1);
}

function dynamic_2(){
	var d = document.getElementById('tabs');
	if(localStorage.role == "HR-Manager")
		check_HRManager(d,2);
	if(localStorage.role == "Manager")
		check_Manager(d,2);
}


function dynamic_3(){
	var d = document.getElementById('tabs');
	if(localStorage.role == "HR-Manager")
		check_HRManager(d,3);
	if(localStorage.role == "HR-Staff")
		check_HRStaff(d,3);
	if(localStorage.role == "Manager")
		check_Manager(d,3);
}


function check_HRManager(d, l){
	d.innerHTML +=
		'<li><a href="emplist.html" id="link_1" ><span class="tab">Employees List</span></a></li>'+
		'<li class="res_list"><a href="req.html" id="link_2" ><span class="tab">Resource Request</span></a></li>'+
		' <li><a href="faq.html" id="link_3" ><span class="tab_faq">FAQ</span></a></li>' ;
	d1 = document.getElementById('link_1');
	d2 = document.getElementById('link_2');
	d3 = document.getElementById('link_3');

	d1.className = '';
	d2.className = '';
	d3.className = '';
	if (l == 1)
		d1.className = 'selected';
	else if (l == 2)
		d2.className = 'selected';
	else if (l == 3)
		d3.className = 'selected';
}

function check_HRStaff(d, l){
	d.innerHTML +=
		'<li><a href="emplist.html" id="link_1" ><span class="tab">Employees List</span></a></li>'+
		' <li><a href="faq.html" id="link_3" ><span class="tab_faq">FAQ</span></a></li>' ;
	d1 = document.getElementById('link_1');
	d3 = document.getElementById('link_3');

	d1.className = '';
	d3.className = '';
	if (l == 1)
		d1.className = 'selected';
	else if (l == 3)
		d3.className = 'selected';
}

function check_Manager(d, l){
	d.innerHTML +=
		'<li class="res_list"><a href="req.html" id="link_2" ><span class="tab">Resource Request</span></a></li>'+
		' <li><a href="faq.html" id="link_3" ><span class="tab_faq">FAQ</span></a></li>' ;
	d2 = document.getElementById('link_2');
	d3 = document.getElementById('link_3');

	d2.className = '';
	d3.className = '';
	if (l == 2)
		d2.className = 'selected';
	else if (l == 3)
		d3.className = 'selected';
}

/*Elist_validate*/
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
	if(q1 != null){
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

}
/*JsonProc JavaScript*/
// JavaScript Document
var employeeData = '{"employee":[{ "id":"201201" , "name":"Ramya" , "title":"" , "position":"" , "competency":"" , "contact":"" , "blood":"" , "address":"" }]}';
var resourceData = '{"resource":[{ "reqID":"201201" , "designation":"Ramya" , "experience":"" , "number":"" , "skills":"" , "competency":"" , "position":"" , "location":"" }]}';
var eid,rid;

function loadJSON(uri,callback)
{
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		request.onreadystatechange = callback;
		request.open("GET", uri);
		request.send(null);
}

function empSave(evt) {

	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var emp = getCookie("Employee");
		var jsonObj;
		if(emp)		jsonObj = JSON.parse(getCookie("Employee"));
		else		jsonObj = {"employee":[{ "id":"201201" , "name":"Ramya" , "title":"" , "position":"" , "competency":"" , "contact":"" , "blood":"" , "address":"" }]};

		var empjson = JSON.stringify(jsonObj);

		var str = empjson.substring(0, empjson.length-2);
		str += ',{ "id":"'+ getData("eid") +
			'" , "name":"'+ getData("ename") +
			'" , "title":"'+ getData("etitle") +
			'" , "position":"'+ getData("epos") +
			'" , "competency":"'+ getData("ecomp") +
			'" , "contact":"'+ getData("econtact") +
			'" , "blood":"'+ getData("eblood") +
			'" , "address":"'+ getData("eaddr") +
			'" }' + empjson.substring(empjson.length-2,empjson.length);
		jsonObj = JSON.parse(str);

		setCookie("Employee",str.toString());
		empAuto(evt);

	}
}

function empUpdate(evt) {

	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var emp = getCookie("Employee");
		var jsonObj;
		if(emp)		jsonObj = JSON.parse(getCookie("Employee"));
		else		jsonObj = {"employee":[{ "id":"201201" , "name":"Ramya" , "title":"" , "position":"" , "competency":"" , "contact":"" , "blood":"" , "address":"" }]};

		var length = jsonObj.employee.length;
		for(var j=1 ; j<length; j++)
		{
			if(jsonObj.employee[j].id == getData("eid")){
				alert("Updated");
				jsonObj.employee[j].name = getData("ename");
				jsonObj.employee[j].title = getData("etitle");
				jsonObj.employee[j].position = getData("epos");
				jsonObj.employee[j].competency = getData("ecomp");
				jsonObj.employee[j].contact = getData("econtact");
				jsonObj.employee[j].blood = getData("eblood");
				jsonObj.employee[j].address = getData("eaddr");
				var str = JSON.stringify(jsonObj);
				setCookie("Employee",str.toString());
				empAuto(evt);
			}
		}
		resetFields();
	}
}

function empAuto(evt)
{
	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var emp = getCookie("Employee");
		var jsonObj;

		if(emp)		jsonObj = JSON.parse(getCookie("Employee"));
		else		jsonObj = {"employee":[{ "id":"201201" , "name":"Ramya" , "title":"" , "position":"" , "competency":"" , "contact":"" , "blood":"" , "address":"" }]};

		var length = jsonObj.employee.length;

		var table = document.getElementById("table_employee");
		while ( table.rows.length > 1 )
 {
  table.deleteRow(1);
 }
		for(var j=1 ; j<length; j++)
		{
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			if(rowCount%2 == 0)
			{
				row.style.backgroundColor = "#F1F0EE";
			}
			else
			{
			row.style.backgroundColor = "#FEFEFE";
			}

			var cell1 = row.insertCell(0);
			cell1.innerHTML = jsonObj.employee[j].id;
			var a = cell1.innerHTML;
			var cell2 = row.insertCell(1);
			cell2.innerHTML = jsonObj.employee[j].name;

			var cell3 = row.insertCell(2);
			cell3.innerHTML = jsonObj.employee[j].title;

			var cell4 = row.insertCell(3);
			cell4.innerHTML = jsonObj.employee[j].competency;

			var cell5 = row.insertCell(4);
			cell5.innerHTML = jsonObj.employee[j].position;

			var cell6 = row.insertCell(5);
			var element = document.createElement("img");
			element.setAttribute("src", "../Images/edit.png");
			element.className = "edit_click";
			element.setAttribute("id", "edit_click");
			element.setAttribute("alt", rowCount);
			element.setAttribute("onclick", 'edit_clk(this)');
			cell6.appendChild(element);
		}
	}
}


function empEdit(evt)
{
	cleargraphics();
	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var emp = getCookie("Employee");
		var jsonObj;
		if(emp)		jsonObj = JSON.parse(getCookie("Employee"));
		else		jsonObj = {"employee":[{ "id":"201201" , "name":"Ramya" , "title":"" , "position":"" , "competency":"" , "contact":"" , "blood":"" , "address":"" }]};

		var length = jsonObj.employee.length;

		for(var j=1 ; j<length; j++)
		{
			if(eid == jsonObj.employee[j].id)
			{
				var id_eid = document.getElementById("eid");
				id_eid.disabled = true;
				var id_ename = document.getElementById("ename");
				var id_etitle = document.getElementById("etitle");
				var id_epos = document.getElementsByName("epos");
				var id_ecomp = document.getElementById("ecomp");
				var id_econtact = document.getElementById("econtact");
				var id_eblood = document.getElementById("eblood");
				var id_eaddr = document.getElementById("eaddr");
				var id_save = document.getElementById("btnSave");
				id_eid.value = jsonObj.employee[j].id;
				id_ename.value = jsonObj.employee[j].name;
				id_etitle.selectedIndex = getIndex(id_etitle, jsonObj.employee[j].title);
				setRadioButton(id_epos, jsonObj.employee[j].position)
				id_ecomp.selectedIndex = getIndex(id_ecomp, jsonObj.employee[j].competency);
				id_econtact.value = jsonObj.employee[j].contact;
				id_eblood.value = jsonObj.employee[j].blood;
				id_eaddr.value = jsonObj.employee[j].address;
				id_save.value = "Update";

				imagePopulate_edit();
			}
		}
	}


}

function resSave(evt) {
	//clearCookie("Resource");
	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var res = getCookie("Resource");
		var jsonObj;
		if(res)		jsonObj = JSON.parse(getCookie("Resource"));
		else
			jsonObj = {"resource":[{ "reqID":"201201" , "designation":"Ramya" , "experience":"" , "number":"" , "skills":"" , "competency":"" , "position":"" , "location":"" }]};
		var resjson = JSON.stringify(jsonObj);

		setCookie("Resource",resjson.toString());
		var str = resjson.substring(0, resjson.length-2);
		str += ',{ "reqID":"'+ generateReq() +
			'" , "designation":"'+ getData("rdes") +
			'" , "experience":"'+ getData("rexp") +
			'" , "number":"'+ getData("rnum") +
			'" , "skills":"'+ getData("rskills") +
			'" , "competency":"'+ getData("rcomp") +
			'" , "position":"'+ getData("rpos") +
			'" , "location":"'+ getData("rloc") +
			'" }' + resjson.substring(resjson.length-2,resjson.length);
		jsonObj = JSON.parse(str);
		setCookie("Resource",str.toString());
		alert(getCookie("Resource"));

		var length = jsonObj.resource.length;
		var table = document.getElementById("table_resource");
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);



		var cell1 = row.insertCell(0);
		cell1.innerHTML = jsonObj.resource[length-1].reqID;
		var a = cell1.innerHTML;
		var cell2 = row.insertCell(1);
		cell2.innerHTML = jsonObj.resource[length-1].designation;

		var cell3 = row.insertCell(2);
		cell3.innerHTML = jsonObj.resource[length-1].position;


		var cell4 = row.insertCell(3);
		cell4.innerHTML = jsonObj.resource[length-1].number;

		var cell5 = row.insertCell(4);
		cell5.innerHTML = jsonObj.resource[length-1].competency;

		var cell6 = row.insertCell(5);
		cell6.innerHTML = jsonObj.resource[length-1].location;

		var cell7 = row.insertCell(6);
		var element = document.createElement("img");

		element.setAttribute("src", "../Images/edit.png");
		element.setAttribute("id", "redit_click");
		element.setAttribute("onclick", 'redit_clk(this);');
		element.setAttribute("alt" , "Employee`s image");
		cell7.appendChild(element);
		resetFields();
	}
}

function resUpdate(evt) {

	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var res = getCookie("Resource");
		var jsonObj;
		if(res)		jsonObj = JSON.parse(getCookie("Resource"));
		else
			jsonObj = {"resource":[{ "reqID":"201201" , "designation":"Ramya" , "experience":"" , "number":"" , "skills":"" , "competency":"" , "position":"" , "location":"" }]};

		var length = jsonObj.resource.length;
		for(var j=1 ; j<length; j++)
		{
			if(jsonObj.resource[j].reqID == rid){
				alert("Updated");
				jsonObj.resource[j].designation = getData("rdes");
				jsonObj.resource[j].experience = getData("rexp");
				jsonObj.resource[j].number = getData("rnum");
				jsonObj.resource[j].skills = getData("rskills");
				jsonObj.resource[j].competency = getData("rcomp");
				jsonObj.resource[j].position = getData("rpos");
				jsonObj.resource[j].location = getData("rloc");
				var str = JSON.stringify(jsonObj);
				setCookie("Resource",str.toString());
				resAuto(evt);
			}
		}
		resetFields();
	}
}

function resAuto(evt)
{
	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var res = getCookie("Resource");
		var jsonObj;
		if(res)		jsonObj = JSON.parse(getCookie("Resource"));
		else
			jsonObj = {"resource":[{ "reqID":"201201" , "designation":"Ramya" , "experience":"" , "number":"" , "skills":"" , "competency":"" , "position":"" , "location":"" }]};

		var length = jsonObj.resource.length;

		var table = document.getElementById("table_resource");
while ( table.rows.length > 1 )
 {
  table.deleteRow(1);
 }
		for(var j=1 ; j<length; j++)
		{
			var rowCount = table.rows.length;

			var row = table.insertRow(rowCount);

			if(rowCount%2 == 0)
			{
				row.style.backgroundColor = "#F1F0EE";
			}
			else
			{
			row.style.backgroundColor = "#FEFEFE";
			}
			var cell1 = row.insertCell(0);
			cell1.innerHTML = jsonObj.resource[j].reqID;
			var a = cell1.innerHTML;
			var cell2 = row.insertCell(1);
			cell2.innerHTML = jsonObj.resource[j].designation;

			var cell3 = row.insertCell(2);
			cell3.innerHTML = jsonObj.resource[j].position;

			var cell4 = row.insertCell(3);
			cell4.innerHTML = jsonObj.resource[j].number;

			var cell5 = row.insertCell(4);
			cell5.innerHTML = jsonObj.resource[j].competency;

			var cell6 = row.insertCell(5);
			cell6.innerHTML = jsonObj.resource[j].location;

			var cell7 = row.insertCell(6);
			var element = document.createElement("img");
			element.setAttribute("src", "../Images/edit.png");
			element.className = "redit_click";
			element.setAttribute("id", "redit_click");
			element.setAttribute("alt", rowCount);
			element.setAttribute("onclick", 'redit_clk(this)');
			cell7.appendChild(element);
		}
	}
}

function resEdit(evt)
{
	if ((evt.currentTarget.readyState == 4) && (evt.currentTarget.status == 200 || evt.currentTarget.status == 0)) {
		var res = getCookie("Resource");
		var jsonObj;
		if(res)		jsonObj = JSON.parse(getCookie("Resource"));
		else
			jsonObj = {"resource":[{ "reqID":"201201" , "designation":"Ramya" , "experience":"" , "number":"" , "skills":"" , "competency":"" , "position":"" , "location":"" }]};

		var length = jsonObj.resource.length;

		for(var j=1 ; j<length; j++)
		{
			if(rid == jsonObj.resource[j].reqID)
			{
				var id_rdes = document.getElementById("rdes");
				var id_rexp = document.getElementById("rexp");
				var id_rnumber = document.getElementById("rnum");
				var id_rskills = document.getElementsByName("rskills");
				var id_rcomp = document.getElementById("rcomp");
				var id_rpos = document.getElementsByName("rpos");
				var id_rloc = document.getElementById("rloc");
				var id_save = document.getElementById("btnSave");
				id_rdes.selectedIndex = getIndex(id_rdes,jsonObj.resource[j].designation);
				id_rexp.value = jsonObj.resource[j].experience;
				id_rnumber.value = jsonObj.resource[j].number;
				setCheckBox(id_rskills, jsonObj.resource[j].skills);
				id_rcomp.selectedIndex = getIndex(id_rcomp, jsonObj.resource[j].competency);
				id_rcomp.disabled = true;
				setRadioButton(id_rpos, jsonObj.resource[j].position);
				id_rloc.selectedIndex = getIndex(id_rloc, jsonObj.resource[j].location);
				id_save.value = "Update";
			}
		}
	}
}

function generateReq(){
	if(getData("rcomp") == "CI RIA"){
		ria = parseInt(getCookie("RIA"));
		if (ria > 0)	ria++;
		else		ria = 1;
		setCookie("RIA",ria.toString());
		return "RIA"+(ria);
	}
	if(getData("rcomp") == "CI Web"){
		web = parseInt(getCookie("Web"));
		if (web)	web++;
		else		web = 1;
		setCookie("Web",web.toString());
		return "WEB"+(web);

	}
}

function getData(id){
	if((id == "eid") || (id == "ename") || (id == "econtact") || (id == "eblood") || (id == "eaddr") ||
		(id == "rexp") || (id == "rnum"))
		return document.getElementById(id).value
	else if((id == "epos") || (id == "rpos")){
		var name = document.getElementsByName(id);
		if(name[0].checked)
			return name[0].value
		else if(name[1].checked)
			return name[1].value
	}
	else if((id == "etitle") || (id == "ecomp")
		 || (id == "rdes") || (id == "rcomp") || (id == "rloc")){
		var name = document.getElementById(id);
		return name[name.selectedIndex].value;
	}
	else if((id == "rskills")){
		var name = document.getElementsByName(id);
		var val = "";
		for(var i=0;i<name.length;i++){
			if (name[i].checked)
				val += "/" + name[i].value;
		}
		return val;
	}
}

function setRadioButton(id, value){
	for(var i = 0; i < id.length; i++)
		if(id[i].value == value){
			id[i].checked = true;
			return;
		}
}

function setCheckBox(id, value){
	for(var i = 0; i < id.length; i++){
		var skil = value.split('/');
		for(var j = 1; j < skil.length; j++)
				id[i].checked = false;
		for(var j = 1; j < skil.length; j++)
			if(id[i].value == skil[j])
				id[i].checked = true;
	}
}

function getIndex(id, value){
	for(var i = 0; i < id.length; i++){
		if(id[i].value == value)
			return i;
	}
}

function emplist_load()
{
	loadJSON('../JSON/login.js', empAuto);
}
function reslist_load()
{
	loadJSON('../JSON/login.js', resAuto);
}

function clearCookie(name){
	if (name = "Employee")
		setCookie(name,employeeData);
	if (name = "Resource")
		setCookie(name,resourceData);
if (name = "Web")
		setCookie(name,-1);
	if (name = "RIA")
		setCookie(name,-1);

}

function edit_clk(id1)
{
	eid = id1.parentNode.parentNode.childNodes[0].innerHTML;
	loadJSON('../JSON/login.js', empEdit);
}

function redit_clk(id1)
{
	rid = id1.parentNode.parentNode.childNodes[0].innerHTML;
	loadJSON('../JSON/login.js', resEdit);
}

function imagePopulate_edit()
{

	var q1 = document.getElementById("dynamic_id");
	var q2 = document.getElementById("dynamic_contact");
	var q3 = document.getElementById("dynamic_blood");
	var q4 = document.getElementById("dynamic_address");
	var q5 = document.getElementById("dynamic_img");
	var q6 = document.getElementById("dynamic_id1");
	var q7 = document.getElementById("dynamic_name");


	var id_eid = document.getElementById("eid");
	var id_ename = document.getElementById("ename");
    var id_econtact = document.getElementById("econtact");
	var id_eblood = document.getElementById("eblood");
	var id_eaddr = document.getElementById("eaddr");

	q1.innerHTML = id_eid.value;
	q1.style.visibility = "visible";

	q2.innerHTML = id_econtact.value;
	q2.style.visibility = "visible";

	q3.innerHTML = id_eblood.value;
	q3.style.visibility = "visible";

	q4.innerHTML = id_eaddr.value;
	q4.style.visibility = "visible";

	q6.innerHTML = id_eid.value;
	q6.style.visibility = "visible";

	q7.innerHTML = id_ename.value;
	q7.style.visibility = "visible";

	if( id_eid.value == "201201")
	{

q5.src ="../Images/201201.png";
q5.style.visibility = "visible";

	}
	else

	if( id_eid.value == "201202")
	{
		q5.src ="../Images/201202.png";
		q5.style.visibility = "visible";

	}
	else
	if( id_eid.value == "201203")
	{
		q5.src ="../Images/201203.png";
		q5.style.visibility = "visible";
	}
	else
	if( id_eid.value == "201204")
	{
		q5.src ="../Images/201204.png";
		q5.style.visibility = "visible";
	}
	else
	if( id_eid.value == "201205")
	{
		q5.src ="../Images/201205.png";
		q5.style.visibility = "visible";
	}
	else
	if( id_eid.value == "")
	{
		q5.visibility = "hidden";

	}
	else
	{

		q5.src ="../Images/anonymous.png";
		 q5.style.visibility = "visible";

	}




}

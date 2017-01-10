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
				alert("found ");
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
				alert("found ");
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
				id_rdes.value = jsonObj.resource[j].designation;
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


// JavaScript Document
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

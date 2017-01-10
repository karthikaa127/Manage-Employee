// JavaScript Document

var ContentHeight = 125;
var TimeToSlide = 150.0;

var openAccordion = '';


function runAccordion(index,Accordion_Title)
{
	var imgpath = document.getElementById(Accordion_Title).style.backgroundImage;
	
	if(imgpath == 'url("../Images/iconup.png")' || imgpath == 'url(file://ctsinsrivfs1/Training/CHN11CD012/kmmfinal/Images/iconup.png)' || imgpath == "" || imgpath == "url(http://localhost/kmmfinal/Images/iconup.png)" || imgpath == "url(file:///D:/kmmfinal/Images/iconup.png)")
		document.getElementById(Accordion_Title).style.backgroundImage = "url(../Images/icondown.png)";
	else
	{
		document.getElementById(Accordion_Title).style.backgroundImage = "url(../Images/iconup.png)";
	}

  
  var nID = "Accordion" + index + "Content";
  var id1 = document.getElementById(nID);
  if(id1.style.display != 'block')
  {
	  openAccordion = '';
	  setTimeout("animate(" + new Date().getTime() + "," + TimeToSlide + ",'"
		  + openAccordion + "','" + nID + "')", 33);
  }
  
  else
  {
	  openAccordion = nID; 
	  nID = '' ;
	  setTimeout("animate(" + new Date().getTime() + "," + TimeToSlide + ",'"
	  + openAccordion + "','" + nID + "')", 33);
  }
}
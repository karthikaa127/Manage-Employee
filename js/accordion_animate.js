// JavaScript Document

function animate(lastTick, timeLeft, closingId, openingId)
{  
  var curTick = new Date().getTime();
  var elapsedTicks = curTick - lastTick;
 
  var opening = (openingId == '') ? null : document.getElementById(openingId);
  var closing = (closingId == '') ? null : document.getElementById(closingId);
 
  if(timeLeft <= elapsedTicks)
  {
    if(opening != null)
      opening.style.minHeight = ContentHeight + 'px';
   
    if(closing != null )
    {
      closing.style.display = 'none';
      closing.style.height = '0px';
    }
    return;
  }
 
  timeLeft -= elapsedTicks;
  var newClosedHeight = Math.round((timeLeft/TimeToSlide) * ContentHeight);

  if(opening != null)
  {
    if(opening.style.display != 'block')
      opening.style.display = 'block';
	  opening.style.minHeight = (ContentHeight - newClosedHeight) + 'px';
  }
 
  if(closing != null)
    closing.style.minHeight = newClosedHeight + 'px';

  setTimeout("animate(" + curTick + "," + timeLeft + ",'" + closingId + "','" + openingId + "')", 33);
}
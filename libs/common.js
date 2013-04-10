//This file includes all common functions that can be used across game.

function hasItoccuredBefore(value,arr)//if flag==1 that means value already exists in arr
{
	var flag = 0;
	
	for(i=0; i<arr.length; i++)
	{
		if(arr[i].toString()==value.toString())
		{
			flag = 1;
		}
	} 
	
	return flag;
}


function arrayShuffle(oldArray) { //shuffle the aray
	var newArray = oldArray.slice();
 	var len = newArray.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = newArray[i];
  		newArray[i] = newArray[p];
	  	newArray[p] = t;
 	}
	return newArray; 
};

function calculateDistanceBetween2Points(sX,sY,dX,dY) //calculates distance between centers of two equal circles.
{
	var d = Math.sqrt(Math.pow((dX-sX),2)+Math.pow((dY-sY),2));
	
	return d;	
}

function  svgAnimateAttributes (target,attributeName,begin,to,dur,ifFreeze,repeatCount) {
    // create the fade animation
    var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animation.setAttributeNS(null, 'attributeName', attributeName);
    animation.setAttributeNS(null, 'begin', begin);
    animation.setAttributeNS(null, 'to', to);
    animation.setAttributeNS(null, 'dur', dur);
    if(ifFreeze=='yes')
    	animation.setAttributeNS(null, 'fill', 'freeze');
    animation.setAttributeNS(null, 'repeatCount', repeatCount);
    // link the animation to the target
    target.appendChild(animation);
    // start the animation
    animation.beginElement();
}

function osDetection(){
	
    return ( 
        (navigator.userAgent.indexOf("iPhone") != -1) ||
        (navigator.userAgent.indexOf("iPod") != -1) || (navigator.userAgent.indexOf("iPad") != -1) || (navigator.userAgent.indexOf("Android") != -1)
    );
}

function removeByElement(arrayName,arrayElement)
 {
	  for(var i=0; i<arrayName.length;i++ )
	  { 
	  	if(arrayName[i]==arrayElement)
	  		arrayName.splice(i,1); 
	  } 
	  return arrayName;
 } 
 
function in_array( what, where )
{
	var a=false;
    for(var i=0;i<where.length;i++)
	{
	    if(what == where[i])
		{
	    	a=true;
	    	break;
	    }
	}
	return a;
}

function implode (glue, pieces) {
    // Joins array elements placing glue string between items and return one string  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/implode
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Waldo Malqui Silva
    // +   improved by: Itsacon (http://www.itsacon.net/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
    // *     returns 2: 'Kevin van Zonneveld'
    var i = '',
        retVal = '',
        tGlue = '';
    if (arguments.length === 1) {
        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
        } 
        for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
        }
        return retVal;
    }
    return pieces;
} 
 



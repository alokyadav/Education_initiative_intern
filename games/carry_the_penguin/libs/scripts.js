var completed = 0;
var extraParameters ='';
var score=0;
var totalTimeTaken=0;
var Output='';
var carry_the_penguinsObj;
var numbers=new Array;
var operator;
var AddArray=new Array(0,0);
var SubArray=new Array(0,0);
var MultArray=new Array(0,0);
var DivArray=new Array(0,0);
var CorrectAnswers=new Array;
CorrectAnswers['+']=AddArray;
CorrectAnswers['-']=SubArray;
CorrectAnswers['x']=MultArray;
CorrectAnswers['/']=DivArray;
var LevelArray=new Array;
LevelArray['+']=-1;
LevelArray['-']=-1;
LevelArray['x']=-1;
LevelArray['/']=-1;
TimerRecord=new Array;
TimerRecord['+']=0;
TimerRecord['-']=0;
TimerRecord['x']=0;
TimerRecord['/']=0;
var timer;
CorrectAnswers2=new Array;
CorrectAnswers2['+']=new Array(0,0);
CorrectAnswers2['-']=new Array(0,0);
CorrectAnswers2['x']=new Array(0,0);
CorrectAnswers2['/']=new Array(0,0);
var Crossing_penguin;
var finalCord=new Array;
finalCord[0]=675;
finalCord[1]=0;
var initialCord=new Array;
initialCord[0]=45;
initialCord[1]=0;
var bottomPos=0;
var leftPos=45;
var smallCircleR;
var largeCircleR;
var Xcenter;
var Ycenter;
var count=0;
var count2=0;
var rotateDegree=0;
var sharkCount=0;
var SharkTimer;
function carry_the_penguins()
{
	this.language;
	this.totalTime=300;
	this.CurrentTime=0;
	this.Min=5;
	this.Second=0;
	this.result;
	this.iceBergPos;
	this.minValue=0;
	
	this.animationSpeed=5;
	this.scale=50;
	this.SharkOperator;
	this.PenguinCrossed=0;
	this.SwitchingTime=0;
	if(typeof getParameters['language']=="undefined")   this.language 	= 'english'; else this.language = getParameters['language'];
	if(typeof getParameters['language']=="undefined")   this.class 	= 'english'; else this.language = getParameters['language'];
}
carry_the_penguins.prototype.loadHome=function()
{
	var html='';
	html+='<div id="TextArea1" class="textArea" style="top:50px;left:180px; width:438px; height:50px">'+instArr["instruction1"]+'</div>';
	html+='<button id="bObj1" class="Buttons">'+miscArr["Play"]+'</button>';	
	$('#container').html(html);
	$('#bObj1').click(function()
	{
		
		$('#container').empty();
		var inst='';
		inst+='<div id="Icon"></div>';
		inst+='<div id="P2inst1" class="textArea" style="top:50px;left:180px; width:438px; height:50px">'+instArr["instruction8"]+'</div>';
		inst+='<div id="P2inst2" class="textArea" style="top:200px;left:180px; width:438px; height:50px">'+instArr["instruction2"]+'</div>';
		inst+='<div id="P2inst3" class="textArea" style="top:350px;left:180px; width:438px; height:50px">'+instArr["instruction9"]+'</div>';
		inst+='<button id="Next" class="Buttons" style="top:500px;right:360px;width:120px;height:40px">'+miscArr["Next"]+'</button>';
		$('#container').html(inst);
		$('#Next').click(function(){
		carry_the_penguinsObj.chooseOperations();
		})
	});
}
carry_the_penguins.prototype.chooseOperations=function()
{
	var html='';
	
	carry_the_penguinsObj.SwitchingTime=carry_the_penguinsObj.CurrentTime;
	$('#container').css("background","url(../assets/bkg-1.png) no-repeat ");
	html+='<div id="TextArea1" class="textArea" style="top:50px;left:180px; width:438px; height:50px">'+instArr["instruction2"]+'</div>';
	html+='<div id="plus" class="operator" style="top:341px;left:260px"> </div><div id="minus" class="operator"style="top:190px;left:237px"> </div><div id="mult" class="operator" style="top:208px;left:325px"></div><div id="Div" class="operator" style="top:270px;left:388px"> </div>';
	$('#container').html(html);
	carry_the_penguinsObj.rotate(13,'plus');
	$('#plus').click(function()
	{
		operator='+';
		carry_the_penguinsObj.playingWindow();
	});
	$('#Div').click(function()
	{
		operator='/';
		carry_the_penguinsObj.playingWindow();
	});
	$('#minus').click(function()
	{
		operator='-';
		carry_the_penguinsObj.playingWindow();
	});
	$('#mult').click(function()
	{
		operator='x';
		carry_the_penguinsObj.playingWindow();
	});
	
}
carry_the_penguins.prototype.Timer=function()
{
	
	totalTimeTaken=carry_the_penguinsObj.CurrentTime;
	extraParameters='';
	extraParameters+='+ ->'+CorrectAnswers2['+'][0]+' '+CorrectAnswers2['+'][1]+' '+TimerRecord['+']+' ';
	extraParameters+='- ->'+CorrectAnswers2['-'][0]+' '+CorrectAnswers2['-'][1]+' '+TimerRecord['-']+' ';
	extraParameters+='x ->'+CorrectAnswers2['x'][0]+' '+CorrectAnswers2['x'][1]+' '+TimerRecord['x']+' ';
	extraParameters+='divide ->'+CorrectAnswers2['/'][0]+' '+CorrectAnswers2['/'][1]+' '+TimerRecord['/']+' ';
	carry_the_penguinsObj.Min=4-Math.floor(carry_the_penguinsObj.CurrentTime/60);
	carry_the_penguinsObj.Second=59-carry_the_penguinsObj.CurrentTime%60;
	carry_the_penguinsObj.CurrentTime++;
	TimerRecord[operator]++;
	if(carry_the_penguinsObj.Second/10>.9)
	$('#Timer').html('0'+carry_the_penguinsObj.Min+' : '+carry_the_penguinsObj.Second);
	else
	$('#Timer').html('0'+carry_the_penguinsObj.Min+' : 0'+carry_the_penguinsObj.Second);
	if(carry_the_penguinsObj.CurrentTime==120 || carry_the_penguinsObj.CurrentTime==300)
	{
		clearInterval(timer);
		clearInterval(SharkTimer);
		//clearInterval(timer1);
		$('#numberTable').css("color","transparent");
		$('#numberTable').css("border-bottom","4px solid transparent");
		$("#iceBerg").draggable("disable");
		if(carry_the_penguinsObj.CurrentTime==120){
		var html='';		
		$('#container').append('<div id="TextArea3" class="textArea" style="top:200px;left:180px; width:438px; height:50px; color:orange">'+instArr["instruction3"]+'</div>')
		$('#container').append('<button id="Yes" class="Buttons" style="top:340px;left:290px;color:green;width:70px;height:30px">'+miscArr["Yes"]+'</button> <button id="No" class="Buttons" style="top:340px;left:440px;color:red;width:70px;height:30px">'+miscArr["No"]+'</button>');
		$('#Yes').click(function(){
		TimerRecord[operator]+=carry_the_penguinsObj.CurrentTime-carry_the_penguinsObj.SwitchingTime;
		carry_the_penguinsObj.chooseOperations();
		});
		$('#No').click(function(){
		$('#container').css("opacity","1");
		$('#No').remove();
		$('#Yes').remove();
		$('#TextArea3').remove();
		$('#numberTable').css("color","orange");
		$('#numberTable').css("border-bottom","4px solid orange");
		$("#iceBerg").draggable("enable");
		$('#submitButton').removeAttr("disabled");
		SharkTimer=setInterval("carry_the_penguinsObj.SharkAni()",30);
		timer=setInterval("carry_the_penguinsObj.Timer()",1000);
		});
	}
		if(carry_the_penguinsObj.CurrentTime==300)
		{
			$('#submitButton').attr("disabled","disabled");
			completed =1;
			score=carry_the_penguinsObj.PenguinCrossed;
			
			$('#Menu').attr("disabled","disabled");
			clearInterval(Crossing_penguin);
			$('#container').append('<div id="GameOver" class="textArea"><p>'+instArr["instruction4"]+'</p><br/><p> '+instArr["instruction5"]+' '+carry_the_penguinsObj.PenguinCrossed+' '+instArr["instruction6"]+'</p></div>');
		}
		
		
	}
}
carry_the_penguins.prototype.playingWindow=function()
{
	var html='';
	var xPos;
	var yPos;
	$('#container').css("background","url(../assets/bkg-2.png)");	
	html+='<div id="scale"> </div>';
	html+='<div id="moon"> </div>';
	html+='<div id="animateContainer" style="top:100px;left:25px;"><div id="movingBlock" style="left:'+leftPos+'px;bottom:'+bottomPos+'px" > </div></div>';
	
	html+='<div id="iceBergContainer" ><div id="iceBerg"></div> </div>';
	html+='<div id="Shark" style="bottom:70px;left:540px" > </div>';
	html+='<button id="submitButton" class="Buttons submit ">'+miscArr["submit"]+'</button>';
	html+='<button id="Quit" class="Buttons quit">'+miscArr["Quit"]+'</button>';
	html+='<button id="Menu" class="Buttons">'+miscArr["Menu"]+'</button>';
	html+='<div id="ScoreBoard"> <div id="Timer"  style="top:40px;left:14px;"> </div><div id="penguinCrossed" style="top:6px;left:46px"></div></div>';
	html+='<table id="numberTable" class="myImg"> <tr id="row1" class="row"> <th></th><th id="num1"></th> <th id="num2"> </th> </tr> <tr id="row2" class="row"> <th id="operator"></th><th id="num3"></th> <th id="num4"> </th> </tr></table>';  
	html+='<div id="penguin1" class="penguins" style="top:257px;right:0px;"></div>';
	html+='<div id="penguin2" class="penguins" style="top:287px;right:-5px;"></div>';
	html+='<div id="penguin3" class="penguins" style="top:307px;right:-15px;"></div>';
	$('#container').html(html);
	$('#penguinCrossed').html(carry_the_penguinsObj.PenguinCrossed);
	if(carry_the_penguinsObj.Second/10>.9)
	$('#Timer').html('0'+carry_the_penguinsObj.Min+' : '+carry_the_penguinsObj.Second);
	else
	$('#Timer').html('0'+carry_the_penguinsObj.Min+' : 0'+carry_the_penguinsObj.Second);
	timer=setInterval("carry_the_penguinsObj.Timer()",1000);

	
	carry_the_penguinsObj.rotate(-10,'penguin1');
	carry_the_penguinsObj.rotate(-20,'penguin2');
	carry_the_penguinsObj.pengOperator();
	$('#iceBerg').text(instArr["instruction7"]);
	SharkTimer=setInterval("carry_the_penguinsObj.SharkAni()",30);
	$('#iceBerg').draggable({
	refreshPositions:true,
	containment:'#iceBergContainer',
	axis:"x",
	drag: function() {
        var offset = $(this).position();
        var x= offset.left;
		var val;
		if(carry_the_penguinsObj.scale==100){
		carry_the_penguinsObj.iceBergPos=Math.floor(carry_the_penguinsObj.map*(x-7));
		}
		else
		{
			if(carry_the_penguinsObj.scale==10)
			{
				if(x>=6 && x<35)
				carry_the_penguinsObj.iceBergPos=0;
				if(x>=40 && x<90)
				carry_the_penguinsObj.iceBergPos=1;
				if(x>=90 && x<140)
				carry_the_penguinsObj.iceBergPos=2;
				if(x>=140 && x<195)
				carry_the_penguinsObj.iceBergPos=3;
				if(x>=195 && x<247)
				carry_the_penguinsObj.iceBergPos=4;
				if(x>=247 && x<305)
				carry_the_penguinsObj.iceBergPos=5;
				if(x>=305 && x<355)
				carry_the_penguinsObj.iceBergPos=6;
				if(x>=355 && x<409)
				carry_the_penguinsObj.iceBergPos=7;
				if(x>=409 && x<460)
				carry_the_penguinsObj.iceBergPos=8;
				if(x>=460 && x<513)
				carry_the_penguinsObj.iceBergPos=9;
				if(x>=513 && x<540)
				carry_the_penguinsObj.iceBergPos=10;
			}
			else
				carry_the_penguinsObj.iceBergPos=Math.floor(carry_the_penguinsObj.map*(x-3));		
		}
		
		val=carry_the_penguinsObj.iceBergPos+carry_the_penguinsObj.minValue;
		if(val<0)
		$(this).text(' ');
		else
        $(this).text(''+ val +'' );
		
    }
	});
	
	
	$('#Menu').click(function(){
	clearInterval(SharkTimer);
	clearInterval(timer);
	
	clearInterval(Crossing_penguin);
	carry_the_penguinsObj.chooseOperations();
	});
	
	$('#submitButton').click(function()
			{
				//('#submitButton').unbind('click');
				$('#submitButton').attr("disabled","disabled");
				if(carry_the_penguinsObj.CurrentTime!=120 && carry_the_penguinsObj.CurrentTime!=300){
				var html1='';
				if(carry_the_penguinsObj.iceBergPos+carry_the_penguinsObj.minValue==carry_the_penguinsObj.result){
				CorrectAnswers[operator][0]++;
				CorrectAnswers2[operator][0]++;
				$('#iceBerg').css("border-color","green");
				$('#moon').css("background","url(../assets/bkg-2.png) no-repeat -862px -415px");
				carry_the_penguinsObj.PenguinCrossed++;
				carry_the_penguinsObj.animation(Math.floor(96+carry_the_penguinsObj.iceBergPos/carry_the_penguinsObj.map),0);
				}
				else
				{
					$('#iceBerg').css("border-color","red");
					$('#scale').html('<div id="circularDiv"></div>');
					$('#circularDiv').text(carry_the_penguinsObj.result);
					$('#circularDiv').css("left",Math.floor((carry_the_penguinsObj.result-carry_the_penguinsObj.minValue)/carry_the_penguinsObj.map)-16+"px");
					CorrectAnswers[operator][1]++;
					CorrectAnswers2[operator][1]++;
					$('#moon').css("background","url(../assets/bkg-2.png) no-repeat -882px -227px");
					carry_the_penguinsObj.animation(Math.floor(96+(carry_the_penguinsObj.result-carry_the_penguinsObj.minValue)/carry_the_penguinsObj.map),0);
				}
				
			}
			});
	$('.quit').click(function(){
		clearInterval(SharkTimer);
		clearInterval(timer);
		$('#submitButton').attr("disabled","disabled");
		completed =1;
		$('#Menu').attr("disabled","disabled");
		$("#iceBerg").draggable("destroy");
		clearInterval(Crossing_penguin);
		score=carry_the_penguinsObj.PenguinCrossed;
		totalTimeTaken=carry_the_penguinsObj.CurrentTime;
		$('#container').append('<div id="GameOver" class="textArea"><p>'+instArr["instruction4"]+'</p><br/><p> '+instArr["instruction5"]+' '+carry_the_penguinsObj.PenguinCrossed+' '+instArr["instruction6"]+'</p></div>');
	});
	
}
carry_the_penguins.prototype.pengOperator=function()
{
	$('#moon').css("background","url(../assets/bkg-2.png) no-repeat -858px -30px")
	$('#submitButton').removeAttr("disabled");
	$('#circularDiv').remove();
	leftPos=45;
	bottomPos=0;
	var secondNum=0;
	$('#movingBlock').css("left",leftPos);
	$('#movingBlock').css("bottom",bottomPos);
	$('#movingBlock').css("opacity","1");
	carry_the_penguinsObj.minValue=0;
	carry_the_penguinsObj.scale=50;
	
	if(LevelArray[operator]==-1)
	{
		LevelArray[operator]=1;
	}
	if(operator=='+'){
	
	if(CorrectAnswers['+'][0]+CorrectAnswers['+'][1]==5)
	{
		if(CorrectAnswers['+'][0]>=4)
		{
			if(LevelArray['+']==1)
			LevelArray['+']++;
			CorrectAnswers['+'][0]=0;
			CorrectAnswers['+'][1]=0;
		}
		else
		{
			CorrectAnswers['+'][0]=0;
			CorrectAnswers['+'][1]=0;
		}
	}
	carry_the_penguinsObj.Addition(LevelArray[operator]);
	if(LevelArray[operator]==2){
	$('#scale').css("background","url(../assets/bkg-2.png) no-repeat -809px -326px");
	carry_the_penguinsObj.scale=100;
	carry_the_penguinsObj.map=mapping(100,0,537);
	secondNum=numbers[2]*10+numbers[3];
	}
	else{
	$('#scale').css("background","url(../assets/bkg-2.png) no-repeat -809px -144px");
	carry_the_penguinsObj.map=mapping(50,0,537);
	secondNum=numbers[3];
	}
	
	
	var firstNum=numbers[0]*10+numbers[1];
	
	carry_the_penguinsObj.result=firstNum+secondNum;
	}
	if(operator=='-')
	{
	
	if(CorrectAnswers['-'][0]+CorrectAnswers['-'][1]==5)
	{
		if(CorrectAnswers['-'][0]>=4)
		{
			if(LevelArray['-']==1)
			LevelArray['-']++;
			CorrectAnswers['-'][0]=0;
			CorrectAnswers['+'][1]=0;
		}
		else
		{
			CorrectAnswers['-'][0]=0;
			CorrectAnswers['-'][1]=0;
		}
	}
	carry_the_penguinsObj.Subtraction(LevelArray[operator]);
	if(LevelArray[operator]==1){
	$('#scale').css("background","url(../assets/bkg-2.png) no-repeat -809px -144px");
	carry_the_penguinsObj.map=mapping(50,0,537);
	secondNum=numbers[3];
	}
	if(LevelArray[operator]==2){
	carry_the_penguinsObj.minValue=40;
	$('#scale').css("background","url(../assets/bkg-2.png) no-repeat -808px -533px");
	carry_the_penguinsObj.map=mapping(90,40,537);
	secondNum=numbers[2]*10+numbers[3];
	}
	
	var firstNum=numbers[0]*10+numbers[1];
	
	carry_the_penguinsObj.result=firstNum-secondNum;
	}
	if(operator=='x')
	{
		if(CorrectAnswers['x'][0]+CorrectAnswers['x'][1]==5)
		{
		if(CorrectAnswers['x'][0]>=4)
		{
			if(LevelArray['x']==1)
			LevelArray['x']++;		
			CorrectAnswers['x'][0]=0;
			CorrectAnswers['x'][1]=0;
		}
		else
			{
				CorrectAnswers['x'][0]=0;
				CorrectAnswers['x'][1]=0;
			}
		}
		carry_the_penguinsObj.Multiplication(LevelArray[operator]);
		if(LevelArray[operator]==2){
		$('#scale').css("background","url(../assets/bkg-2.png) no-repeat -809px -326px");
		carry_the_penguinsObj.scale=100;
		carry_the_penguinsObj.map=mapping(100,0,537);
		}
		else{
		$('#scale').css("background","url(../assets/bkg-2.png) no-repeat -809px -144px");
		carry_the_penguinsObj.map=mapping(50,0,537);
		}
		carry_the_penguinsObj.result=numbers[1]*numbers[3];
	}
	if(operator=='/')
	{
		if(CorrectAnswers['/'][0]+CorrectAnswers['/'][1]==5)
		{
		
		if(CorrectAnswers['/'][0]>=4)
			{
			CorrectAnswers['/'][0]=0;
			CorrectAnswers['/'][1]=0;
			}
		else
			{
			CorrectAnswers['/'][0]=0;
			CorrectAnswers['/'][1]=0;
			}
		}
		carry_the_penguinsObj.Division();
		carry_the_penguinsObj.scale=10;
		carry_the_penguinsObj.map=mapping(10,0,537);
		$('#scale').css("background","url(../assets/bkg-2.png) no-repeat -809px -594px");
		carry_the_penguinsObj.result=(numbers[0]*10+numbers[1])/numbers[3];
		
	}
	if(operator!='/'){
	$('#operator').html(operator);
	$('#num1').html(numbers[0]);
	$('#num2').html(numbers[1]);
	$('#num3').html(numbers[2]);
	$('#num4').html(numbers[3]);
	if(carry_the_penguinsObj.CurrentTime==120)
	$('#numberTable').css("border-bottom","4px solid transparent");
	else
	$('#numberTable').css("border-bottom","4px solid orange");
	}
	else
	{
	//$('#operator').html('&divide;');
	$('#row2').empty();
	//$('numberTable').remove("border-bottom");
	$('#num1').html(numbers[0]+''+numbers[1]+'&divide;'+numbers[3]+'=');
	}
	
	
}
carry_the_penguins.prototype.animation=function(iceBergX,iceBergY)
{
	smallCircleR=calculateRadius(iceBergX,iceBergY,initialCord[0],initialCord[1]);
	largeCircleR=calculateRadius(iceBergX,iceBergY,finalCord[0],finalCord[1]);
	Xcenter=iceBergX;
	Ycenter=iceBergY;
	$('#movingBlock').css("background","url('../assets/sprite-peguine.png') no-repeat -92px -122px");
	Crossing_penguin=setInterval("carry_the_penguinsObj.animate_helper(Xcenter,Ycenter)",1);
}
carry_the_penguins.prototype.animate_helper=function(Xcenter,Ycenter)
{
	var X;
	var Y;
	var radius;
	rotateDegree+=5;
	if(count2%2==0)
	{
		if(isIpad())
			leftPos+=2;	
		else if(isIpadORAndroid())	
			leftPos+=5;	
		else
			leftPos+=3;		
	}	
	else
	carry_the_penguinsObj.rotate(rotateDegree,'movingBlock');
	if(leftPos<Xcenter)
	{
	X=(initialCord[0]+Xcenter)/2;
	Y=(initialCord[1]+Ycenter)/2;
	radius=smallCircleR;
	//leftPos++;
	bottomPos=Math.floor((.75*radius)*Math.sqrt(1-(((leftPos-X)*(leftPos-X))/(radius*radius)))+Y);
	}
	else{
	
	if(carry_the_penguinsObj.iceBergPos==carry_the_penguinsObj.result-carry_the_penguinsObj.minValue){
	if(count==0)
		{
			$('#iceBerg').css("width","88px");
			$('#iceBerg').css("height","74px");
			$('#iceBerg').css("left","-=5px");
			$('#iceBerg').css("background","url('../assets/sprite-peguine1.png') no-repeat -606px -15px");
		}
		if(count==5)
		{
			$('#iceBerg').css("width","117px");
			$('#iceBerg').css("height","96px");
			$('#iceBerg').css("left","-=15px");
			$('#iceBerg').css("background","url('../assets/sprite-peguine1.png') no-repeat -717px 0px");
		}
		if(count==10)
		{
			$('#iceBerg').css("width","194px");
			$('#iceBerg').css("height","120px");
			$('#iceBerg').css("left","-=35px");
			$('#iceBerg').css("background","url('../assets/sprite-peguine1.png') no-repeat -566px -136px");
		}
	X=(finalCord[0]+Xcenter)/2;
	Y=(finalCord[1]+Ycenter)/2;
	radius=largeCircleR;

	bottomPos=Math.floor((.75*radius)*Math.sqrt(1-(((leftPos-X)*(leftPos-X))/(radius*radius)))+Y);
	//bottomPos=Math.floor(Math.sqrt((radius*radius)-((leftPos-X)*(leftPos-X)))+Y);
	count++;
	}
	else
		{
		clearInterval(Crossing_penguin);
		Crossing_penguin=setInterval("carry_the_penguinsObj.animate_helper_1()",10 );	
		}
	}
	if(leftPos>finalCord[0] || bottomPos<-284)
	{
		clearInterval(Crossing_penguin);
		carry_the_penguinsObj.rotate(0,'movingBlock');
		$('#movingBlock').css("background","url('../assets/sprite-peguine.png') no-repeat -13px -123px");
		count=0;
		count2=0;
		$('#iceBerg').css("width","78px");
		$('#iceBerg').css("height","70px");
		$('#iceBerg').css("left","270px");
		$('#iceBerg').text(instArr["instruction7"]);
		$('#iceBerg').css("background","url('../assets/sprite-peguine1.png') no-repeat -19px -182px");
		$('#penguinCrossed').html(carry_the_penguinsObj.PenguinCrossed);
		setTimeout("carry_the_penguinsObj.pengOperator()",1000);
	}
	$('#movingBlock').css("bottom",bottomPos);
	$('#movingBlock').css("left",leftPos);
	count2++;
}
carry_the_penguins.prototype.animate_helper_1=function()
{
		rotateDegree+=5;
		if(bottomPos<-270)
		{
			if(isIpad())
				leftPos+=3;
			else	
				leftPos++;
		}
		
		bottomPos-=2;		
		if(bottomPos>-50){
		if(count2%2==0)
		carry_the_penguinsObj.rotate(rotateDegree,'movingBlock');
		else
		$('#movingBlock').css("bottom",bottomPos);
		//leftPos+=1;
		$('#movingBlock').css("left",leftPos-5);
		}
		if(bottomPos==-50 || bottomPos==-51)
		{
			$('#movingBlock').css("opacity",".7");
			$('#movingBlock').css("background","url('../assets/sprite-peguine.png') no-repeat -13px -123px");
		}
		if(count%24==0)		
		carry_the_penguinsObj.rotate(0,'movingBlock');
		if(count%24==6)
		carry_the_penguinsObj.rotate(10,'movingBlock');
		if(count%24==12)
		carry_the_penguinsObj.rotate(0,'movingBlock');
		if(count%24==18)
		carry_the_penguinsObj.rotate(-10,'movingBlock');
		
		count++;
		count2++;
		if(bottomPos<-50)
		$('#movingBlock').css("bottom",bottomPos);
		if(bottomPos<-284)
		{
		clearInterval(Crossing_penguin);
		carry_the_penguinsObj.rotate(0,'movingBlock');
		count=0;
		count2=0;
		setTimeout("carry_the_penguinsObj.pengOperator()",1000);
		$('#iceBerg').css("left","270px");
		$('#iceBerg').text(instArr["instruction7"]);
		}
	
}
carry_the_penguins.prototype.SharkAni=function()
{
	var position=$('#Shark').position();
	if(position.left>500)
	{
		$('#Shark').removeClass('flip');
		this.SharkOperator='-';
	}
	if(position.left<150)
	{
		$('#Shark').addClass('flip');
		this.SharkOperator='+';
	}
	if(sharkCount%24==0)
	{
		$('#Shark').css("background","url('../assets/sprite-peguine1.png') no-repeat 0px -255px");
	}
	if(sharkCount%24==6)
	{
		$('#Shark').css("background","url('../assets/sprite-peguine1.png') no-repeat 0px -351px");
	}
	if(sharkCount%24==12)
	{
		$('#Shark').css("background","url('../assets/sprite-peguine1.png') no-repeat 0px -440px");
	}
	if(sharkCount%24==18)
	{
		$('#Shark').css("background","url('../assets/sprite-peguine1.png') no-repeat 0px -255px")
	}
	sharkCount++;
	$('#Shark').css("left",this.SharkOperator+"=2px");
	
}
carry_the_penguins.prototype.rotate=function(Degree,object)
{    
            $('#'+object).css("transform","rotate("+Degree+"deg)");
            $('#'+object).css("-moz-transform","rotate("+Degree+"deg)");
            $('#'+object).css("-webkit-transform","rotate("+Degree+"deg)");
            $('#'+object).css("-o-transform","rotate("+Degree+"deg)");
}
calculateRadius=function(X,Y,X1,Y1){
	return Math.sqrt((X-X1)*(X-X1)+(Y-Y1)*(Y-Y1))/2;
}
carry_the_penguins.prototype.Addition=function(level)
{
	var rand ,rand2,rand3,rand4;
	if(level==1){
	rand=generateRandomNumber(3,1);
	rand3=generateRandomNumber(9-rand,0);
	rand2=generateRandomNumber(8,0);
	rand4=generateRandomNumber(9-rand2,1);
	numbers[0]=rand;
	numbers[1]=rand2;
	numbers[2]=' ';
	numbers[3]=rand4;
	}
	if(level==2)
	{
	rand=generateRandomNumber(6,3);
	rand3=generateRandomNumber(9-rand-1,3);
	rand2=generateRandomNumber(9,1);
	if(rand+rand3==9)
	rand4=generateRandomNumber(9-rand2,0);
	else
	rand4=generateRandomNumber(9,1);
	numbers[0]=rand;
	numbers[1]=rand2;
	numbers[2]=rand3;
	numbers[3]=rand4;
	}
	//var firstNum=rand*10+rand2;
	//var secondNum=rand3*10+rand4;
}
carry_the_penguins.prototype.Subtraction=function(level)
{
	if(level==1){
	rand=generateRandomNumber(4,1);
	rand3=generateRandomNumber(9-rand,0);
	rand2=generateRandomNumber(9,0);
	rand4=generateRandomNumber(rand2,0);
	numbers[0]=rand;
	numbers[1]=rand2;
	numbers[2]=' ';
	numbers[3]=rand4;
	}
	if(level==2)
	{
	rand=generateRandomNumber(9,5);
	rand3=generateRandomNumber(rand-5,1);
	rand2=generateRandomNumber(9,0);
	if(rand-rand3==4){
	rand4=generateRandomNumber(rand2,0);
	}
	else{
	rand4=generateRandomNumber(9,0);
	}
	numbers[0]=rand;
	numbers[1]=rand2;
	numbers[2]=rand3;
	numbers[3]=rand4;
	}

	
}
carry_the_penguins.prototype.Multiplication=function(level)
{
	if(level==1)
	{
	rand2=generateRandomNumber(5,2);
	rand4=generateRandomNumber(5,1);
	numbers[0]=' ';
	numbers[1]=rand2;
	numbers[2]=' ';
	numbers[3]=rand4;
	}
	if(level==2){
	rand2=generateRandomNumber(9,1);
	rand4=generateRandomNumber(9,1);
	numbers[0]=' ';
	numbers[1]=rand2;
	numbers[2]=' ';
	numbers[3]=rand4;
	}
}
carry_the_penguins.prototype.Division=function()
{
	var factors=new Array;
	rand=generateRandomNumber(9,5);
	rand2=generateRandomNumber(9,2);
	var num;
	num=rand*rand2;
	numbers[0]=Math.floor(num/10);
	numbers[1]=num%10;
	numbers[2]=' ';
	numbers[3]=rand2;
}

function getURLParameters() {
	var parameters = new Object();
	var id = document.URL.indexOf('?');
	if (id != -1) {
		var keyValuePair = document.URL.substring(id+1, document.URL.length).split('&');
		for (var i=0; i<keyValuePair.length; i++) {
			keyValue = keyValuePair[i].split('=');
			parameters[keyValue[0]] = keyValue[1];
		}
	}
	return parameters;
}
function generateRandomNumber(max,min)
{
	return Math.floor(Math.random() * (max-min+1)+min);
}
function mapping(max,min,span)
{
	return (max-min)/span;
}

function resize()
{ 
	if(window.innerHeight < 600) {
		scaleFactor = parseFloat(window.innerHeight/600); //console.log("height "+window.innerWidth+'-'+window.innerHeight+"-"+scaleFactor);
	} else if(window.innerWidth < 800) {
		scaleFactor = parseFloat(window.innerWidth/800); //console.log("width "+window.innerWidth+'-'+window.innerHeight+"-"+scaleFactor);
	} else{
		scaleFactor = 1 ;									
	} 	
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});	
	
}

function isIpadORAndroid(){       
   return ( 
       (navigator.userAgent.indexOf("iPhone") != -1) || (navigator.userAgent.indexOf("iPod") != -1) || (navigator.userAgent.indexOf("iPad") != -1) || (navigator.userAgent.indexOf("Android") != -1)
   );
}

function isIpad(){       
   return ( 
       (navigator.userAgent.indexOf("iPhone") != -1) || (navigator.userAgent.indexOf("iPod") != -1) || (navigator.userAgent.indexOf("iPad") != -1)  );
}
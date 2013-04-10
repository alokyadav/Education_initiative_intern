var completed=0;
var extraParameters ='';
var score=0;
var totalTimeTaken=0;

var lineLength=55;
var x;
var y;
var lineObj;
var canvas;
var context;
var angleA;
var angle1;
var angle2;
var angleTangleObj;
var scaleFactor;
var CorrectAnswer=new Array();
CorrectAnswer[1]=new Array(0,0);
CorrectAnswer[2]=new Array(0,0);
CorrectAnswer[3]=new Array(0,0);
CorrectAnswer[4]=new Array(0,0);
CorrectAnswer[5]=new Array(0,0);
var QueAnswer=0;
var angleCenterX=61;
var CorrectCard;
var angleCenterY=65;
var timer;
var Canvas;
var Color;
var funct;
var randArm=1;
var flag=1;
var orient=0;
function angle_tangle()
{
	this.language
	this.Level=1;
	this.CorrectCard;
	this.compCardAngle;
	this.Tocheck=new Array();
	this.Tocheck['studentCard1']=-1;
	this.Tocheck['studentCard2']=-1;
	this.Tocheck['studentCard3']=-1;
	this.Tocheck['studentCard4']=-1;
	this.studentAngle=new Array();
	this.studentAngle['compCard']=new Array (0,0,1);
	this.studentAngle['compCard2']=new Array (0,0,1);
	this.studentAngle['studentCard1']=new Array(0,0,1);
	this.studentAngle['studentCard2']=new Array(0,0,1);
	this.studentAngle['studentCard3']=new Array(0,0,1);
	this.studentAngle['studentCard4']=new Array(0,0,1);
	this.NoOfquestion=0;
	this.AnswerInRow=new Array();
	this.AnswerInRow[0]=-1;
	this.AnswerInRow[1]=-1;
	this.AnswerInRow[2]=-1;
	this.FirstWrongInlevel=new Array(0,0,0,0);
	this.bonusMissed=9;
	this.Score=0;
	this.Min=0;
	this.Second=0;
	this.AnswerOffset;
	this.TotalTime=300;
	this.CurrentTime=0;
	this.bonusFlag=0;
	this.ClickFlag=0;
	this.levelflag=0;
	this.QuesWrongInRow=new Array(0,0,0,0,0,0,0,0,0,0,0,0);
	this.index=0;
	this.fakeAng1= new angle();
	this.fakeAng2= new angle();
	this.Angle= new angle();
	
	
}
angle_tangle.prototype.firstScreen=function()
{
	var html='';
	html+='<div id="Card1" class="cards"></div>';
	html+='<button id="animationButton" class="Button">'+miscArr['animation']+'</button>';
	html+='<button id="Play" class="Button">'+miscArr['Play']+'</button>';
	html+='<div id="bubble_msg" class="bubble_msg"><div id="bubbleText" class="spancls"></div></div>';
	$('#container').html(html);
	
	$('#bubbleText').html(''+instArr['instruction1']+'');
	$('#Play').click(function(){
	$('#container').empty();
	var myangle=new angle();
	angleTangleObj.PlayingWindow();
	});
	$('#animationButton').click(function(){
	$('#container').empty();
	angleTangleObj.Animation();
	});
	
}

angle_tangle.prototype.Timer=function()
{
	
	angleTangleObj.Min=4-Math.floor(angleTangleObj.CurrentTime/60);
	angleTangleObj.Second=59-angleTangleObj.CurrentTime%60;
	if(angleTangleObj.Second/10>.9)
		$('#Time').text('0'+angleTangleObj.Min+':'+angleTangleObj.Second+'');
	else
		$('#Time').text('0'+angleTangleObj.Min+':0'+angleTangleObj.Second+'');
	if(angleTangleObj.CurrentTime==angleTangleObj.TotalTime)
	{
		clearInterval(timer);
		clearInterval(angleTangleObj.Angle.timer);
		angleTangleObj.GameOver();
		
	}
	angleTangleObj.CurrentTime++;
	
	totalTimeTaken = angleTangleObj.CurrentTime;
	extraParameters = CorrectAnswer[1]+"|"+CorrectAnswer[2]+"|"+CorrectAnswer[3]+"|"+CorrectAnswer[4];
}
angle_tangle.prototype.GameOver=function()
{
	var html='';
	html+='<div id="Card1" class="cards"></div>';
	html+='<div id="bubble_msg" class="bubble_msg"><div id="bubbleText" class="spancls"></div></div>';
	$('#container').html(html);
	if(completed==1)
	$('#bubbleText').html(''+promptArr['prompt9']+' '+angleTangleObj.Score+' '+promptArr['prompt1b']+'');
	else 
	{
	if(angleTangleObj.CurrentTime>=angleTangleObj.TotalTime)
	$('#bubbleText').html(''+promptArr['prompt8']+' '+angleTangleObj.Score+' '+promptArr['prompt1b']+'');
	else 
	$('#bubbleText').html(''+promptArr['prompt10']+' '+angleTangleObj.Score+' '+promptArr['prompt1b']+'');
	}
	completed=1;
	$('#Play').click(function(){
	$('#container').empty();
	
	angleTangleObj.PlayingWindow();
	});
}
angle_tangle.prototype.superImpose=function(clicked,toReach){
	clearInterval(timer);
	$('#movingCard').addClass("duplicate");
	$('#movingCard').append('<canvas id="draw" width="122px" height="130px"></canvas>');
	$('#movingCard').css("border-color",""+$('#'+clicked+'').css("border-left-color")+"");
	Clear(clicked);
	randArm=angleTangleObj.studentAngle[clicked][2];
	angleTangleObj.Angle.drawOnCanvas(angleTangleObj.studentAngle[clicked][0],angleTangleObj.studentAngle[clicked][1],'blue','draw',randArm);
	angleTangleObj.Angle.initialAng=angleTangleObj.studentAngle[clicked][0];
	angleTangleObj.Angle.FinalAng=angleTangleObj.studentAngle[clicked][1];
	angleTangleObj.Angle.orientation=angleTangleObj.studentAngle['compCard'][0]-angleTangleObj.studentAngle[clicked][0];
	$('#movingCard').css("left",$('#'+clicked+'').offset().left/scaleFactor);
	$('#movingCard').css("top",$('#'+clicked+'').offset().top/scaleFactor);
	
	$('#movingCard').animate({
	top:$('#'+toReach+'').offset().top/scaleFactor,
    left:$('#'+toReach+'').offset().left/scaleFactor	
	}, 3000, function() {
	$('#studentCard'+CorrectCard+'').css("border-color","blue");
	Canvas='draw';
	Color='blue';
	$('#movingCard').css("background-color","transparent");
	if(angleTangleObj.NoOfquestion>0){
	if(angleTangleObj.levelFlag==1 && CorrectAnswer[angleTangleObj.Level-1][0]==2 && CorrectAnswer[angleTangleObj.Level-1][1]==0)
	$("#promptBox").html(''+promptArr['prompt31']+'');
	if(angleTangleObj.levelFlag==1 && CorrectAnswer[angleTangleObj.Level-1][1]>0)
	{	
		if(CorrectAnswer[angleTangleObj.Level-1][1]<3)
		$("#promptBox").html(''+promptArr['prompt32']+'');
	}
	angleTangleObj.levelFlag=0;
	if(angleTangleObj.NoOfquestion<=12 ){
	if(angleTangleObj.bonusFlag==0)
	angleTangleObj.Angle.draw_rotating_angle('angleTangleObj.Logic()');
	else{
	angleTangleObj.Angle.draw_rotating_angle('');
	angleTangleObj.Angle.orientation=-angleTangleObj.Angle.initialAng;
	}
	}
	}
	});
	
}
angle_tangle.prototype.BonusAni=function(string,color)
{
	Canvas=string;
	Color=color;
	angleTangleObj.Angle.initialAng=angleTangleObj.studentAngle[string][0];
	angleTangleObj.Angle.FinalAng=angleTangleObj.studentAngle[string][1];
	angleTangleObj.Angle.orientation=-angleTangleObj.studentAngle[string][0];
	
}
angle_tangle.prototype.EndGame=function ()
{
		var a=-3;
		if(angleTangleObj.NoOfquestion>=4){
		for(var a=angleTangleObj.NoOfquestion-1;a>=angleTangleObj.NoOfquestion-4;a--){
		if(angleTangleObj.QuesWrongInRow[a]==0)
		break;
		
		}
		if(a==angleTangleObj.NoOfquestion-5)
		{
			clearInterval(timer);
			clearInterval(angleTangleObj.Angle.timer);
			completed=1;
		}
	}
	
}
angle_tangle.prototype.PlayingWindow=function()
{
	var html='';
	if(completed==1){
	
	}
	completed=0;
	html+='<div id="GameArea" ><div id="computerCard"><div id="card1" class="closed"></div><div id="card2" class="closed" style="margin-left:5%"></div><div id="card3" class="closed" style="margin-left:5%"></div></div>';
	html+='<div id="computerOpenCard"> <canvas id="compCard" class="openCard" width="122px" height="130px"></canvas> </div>';
	html+='<div id="StudentCard"><canvas id="studentCard1" class="cards clickable" width="122px" height="130px"></canvas><canvas id="studentCard2" class="cards clickable" width="122px" height="130px"></canvas>';
	html+='<canvas id="studentCard3" class="cards clickable" width="122px" height="130px"></canvas><canvas id="studentCard4" class="cards clickable" width="122px" height="130px"></canvas></div></div>';
	html+='<div id="sideSpan"><div id="ScoreCard" class="Parameters"><div id="headText" class="tabs">SCORE</div><div id="Score" class="output tabs"></div></div>';
	html+='<div id="Timer" class="Parameters" style="margin-top:20px"><div id="headTimer" class="tabs">TIMER</div><div id="Time" class="output tabs"></div></div>';
	html+='<div id="sparky"><div id="spryImage"></div><div id="Says">Says..</div></div><div id="promptBox"></div></div>';
	html+='<button id="quit" class="Buttons">'+miscArr["quit"]+'</button>';
	html+='<div id="instructBox">'+instArr["instruction3"]+'</div>';
	html+='<div id="movingCard"></div>';
	html+='<div id="Duplicate"></div>';
	html+='<div id="progressBar">'
	for(var a=1;a<=12;a++){
	html+='<div id="block'+a+'" class="block"></div>';
	}
	
	html+='</div>';
	$('#container').html(html);
	for(var a=9;a<=12;a++)
	{
		$('#block'+a+'').html(''+miscArr['bonus']+'');
	}
	angleTangleObj.Logic();
	$('#Score').text('00');
	$('.clickable').click(function(){
	
	if(angleTangleObj.ClickFlag==0){
	
	angleTangleObj.ClickFlag=1;
	angleTangleObj.NoOfquestion++;
	var id=$(this).attr('id');
	
	if(angleTangleObj.Tocheck[id]==1)
	{
		$('#block'+angleTangleObj.NoOfquestion+'').css("background","blue");
		$(this).css("border-color","blue");
		angleTangleObj.Score+=10*angleTangleObj.Level;
		$('#Score').text(''+angleTangleObj.Score+'');
		if(angleTangleObj.AnswerInRow[QueAnswer]==-1)
		angleTangleObj.AnswerInRow[QueAnswer]=1;
		CorrectAnswer[angleTangleObj.Level][0]++;
		QueAnswer++;
		if(angleTangleObj.Level==5)
		$("#promptBox").html(''+promptArr['prompt4a']+' '+angleTangleObj.Level*10+' '+promptArr['prompt4b']+'');
		else
		$("#promptBox").html(''+promptArr['prompt1a']+' '+angleTangleObj.Level*10+' '+promptArr['prompt1b']+'');
		}
		else{
		$('#block'+angleTangleObj.NoOfquestion+'').css("background","red");
		if(angleTangleObj.bonusMissed<=12 && angleTangleObj.Level<5)
		{
			if(angleTangleObj.FirstWrongInlevel[angleTangleObj.Level-1]==0){
			angleTangleObj.FirstWrongInlevel[angleTangleObj.Level-1]++;
			$('#block'+angleTangleObj.bonusMissed+'').empty();
			angleTangleObj.bonusMissed++;
			}
		}
		$(this).css("border-color","red");
		if(angleTangleObj.AnswerInRow[QueAnswer]==-1)
		angleTangleObj.AnswerInRow[QueAnswer]=0;
		CorrectAnswer[angleTangleObj.Level][1]++;
		QueAnswer++;
		angleTangleObj.QuesWrongInRow[angleTangleObj.NoOfquestion-1]=1;
		$('#spryImage').css("background","url('../assets/sparky-card.png') no-repeat -421px -323px");
		if(angleTangleObj.NoOfquestion==12)
		$("#promptBox").html(''+promptArr['prompt6']+'');
		else
		$("#promptBox").html(''+promptArr['prompt2']+'');
		}
		if(angleTangleObj.Level<5)
			angleTangleObj.superImpose(id,'compCard');
		else
			angleTangleObj.superImpose(id,'compCard1');
		}
		if((QueAnswer==3 || CorrectAnswer[angleTangleObj.Level][0]==2) && angleTangleObj.Level<5){
			angleTangleObj.Level++;
			QueAnswer=0;
			angleTangleObj.levelFlag=1
			angleTangleObj.AnswerInRow[0]=-1;
			angleTangleObj.AnswerInRow[1]=-1;
			angleTangleObj.AnswerInRow[2]=-1;
		}
		score = angleTangleObj.Score;			
	});
	$('#quit').click(function(){
	clearInterval(timer);
	$('#container').append('<div id="layer"></div><div id="quitBox"><div id="quitText"></div><button id="Yes" class="btnTy2">'+miscArr['Yes']+'</button><button id="No" class="btnTy2">'+miscArr['No']+'</button></div>');
	$('#quitBox').css("left",$('#container').width()*.25);
	$('#quitBox').css("top",$('#container').height()*.4);
	$('#quitText').html(''+promptArr['prompt12']+'');
	$('#Yes').click(function(){
	completed=1;
	angleTangleObj.GameOver();
	});
	$('#No').click(function(){
	$('#layer').remove();
	$('#quitBox').remove();
	timer=setInterval("angleTangleObj.Timer()",1000);
	});
	});
}
angle_tangle.prototype.Animation=function()
{
	var html='';
	html+='<div id="GameArea" ><div id="computerCard"><div id="card1" class="closed"></div><div id="card2" class="closed" style="margin-left:5%"></div><div id="card3" class="closed" style="margin-left:5%"></div></div>';
	html+='<div id="computerOpenCard"> <canvas id="compCard" class="openCard" width="122px" height="130px"></canvas> </div>';
	html+='<div id="StudentCard"><canvas id="studentCard1" class="cards" width="122px" height="130px"></canvas><canvas id="studentCard2" class="cards" width="122px" height="130px"></canvas>';
	html+='<canvas id="studentCard3" class="cards" width="122px" height="130px"></canvas><canvas id="studentCard4" class="cards" width="122px" height="130px"></canvas></div></div>';
	html+='<div id="sideSpan"><div id="instHead">'+miscArr['inst']+'</div><div id="instr">'+instArr['instruction2']+'</div><button id="PlayGame" class="Buttons">'+miscArr['Play']+'!</button></div>';
	html+='<div id="movingCursor"></div>';
	html+='<div id="movingCard"></canvas></div>';
	$('#container').html(html);
	angleTangleObj.Logic();
	$('#movingCursor').animate({
	top:(Math.random()*200+100)/scaleFactor,
	left:(Math.random()*300+100)/scaleFactor	
    }, 4000, function() {
	$('#movingCursor').animate({
	top:($('#studentCard'+CorrectCard+'').offset().top+30)/scaleFactor,
    left:($('#studentCard'+CorrectCard+'').offset().left+30)/scaleFactor
	}, 3000, function() {
	$('#studentCard'+CorrectCard+'').css("border-color","blue");
	angleTangleObj.superImpose('studentCard'+CorrectCard+'','compCard');
	});
  });
  $('#PlayGame').click(function(){
  $('#container').empty();
  angleTangleObj.PlayingWindow();
  })
		

}
angle_tangle.prototype.ClearCanvas=function(){

	for(var a=1;a<=4;a++)
	{		
			Clear('studentCard'+a+'');
			$('#studentCard'+a+'').css("border-color","black");
	}
	Clear('compCard');
	$('#compCard').css("border-color","black");
	if(angleTangleObj.Level==5)
	{
		for(var a=1;a<=2;a++)
		{		
			Clear('compCard'+a+'');	
			$('#compCard'+a+'').css("border-color","black");
		}
	}
}
Clear=function(string)
{
	canvas = document.getElementById(string);
	context = canvas.getContext('2d');		
	context.clearRect(0, 0, canvas.width, canvas.height);
	
}
angle_tangle.prototype.Logic=function(){
	
	angleTangleObj.EndGame();
	$('#spryImage').css("background","url(../assets/sparky-card.png) no-repeat -358px -323px");
	if(completed==0 && angleTangleObj.NoOfquestion<12){
	timer = setInterval("angleTangleObj.Timer()",1000);
	angleTangleObj.ClickFlag=0;
	orient=0;
	$('#movingCard').empty();
	$('#promptBox').empty();
	$('#movingCard').removeClass('duplicate');
	CorrectCard=Math.floor(Math.random() * 4)+1;
	if(angleTangleObj.Level<5){
	angleTangleObj.ClearCanvas();
	if(angleTangleObj.Level==1)
	{
		angleTangleObj.Angle.drawAngle('compCard',150,40,5,'red',angleTangleObj.Level);	
	}
	if(angleTangleObj.Level==2)
	{
		angleTangleObj.Angle.drawAngle('compCard',150,40,5,'red',angleTangleObj.Level);
	}
	if(angleTangleObj.Level==3)
	angleTangleObj.Angle.drawAngle('compCard',150,40,5,'red',angleTangleObj.Level);
	if(angleTangleObj.Level==4)
	angleTangleObj.Angle.drawAngle('compCard',150,40,5,'red',angleTangleObj.Level);
	if(angleTangleObj.Level==5){
	
	}
	this.studentAngle['compCard'][0]=angle1;
	this.studentAngle['compCard'][1]=angle2;
	this.compCardAngle=angle2-angle1;
	if(QueAnswer==0)
	angleTangleObj.AnswerOffset=Math.PI/9;
	if(QueAnswer==1)
	{
	if(angleTangleObj.AnswerInRow[QueAnswer-1]==1){
	angleTangleObj.AnswerOffset=Math.PI/18;
	}
	else{
	angleTangleObj.AnswerOffset=Math.PI/6;
	}
	}
	if(QueAnswer==2)
	{
		if(angleTangleObj.AnswerInRow[QueAnswer-1]==0 && angleTangleObj.AnswerInRow[QueAnswer-2]==0)
		angleTangleObj.AnswerOffset=Math.PI/5;
		else
		angleTangleObj.AnswerOffset=Math.PI/18;		
	}
		if(angleTangleObj.Level!=1)
		randArm=generateRandomNumber(10,7)/10;
		
		angleTangleObj.Angle.drawOnCanvas(orient,this.compCardAngle+angleTangleObj.AnswerOffset+orient,'blue','studentCard'+CorrectCard+'',randArm);
		angleTangleObj.studentAngle['studentCard'+CorrectCard+''][0]=orient;
		angleTangleObj.studentAngle['studentCard'+CorrectCard+''][1]=this.compCardAngle+angleTangleObj.AnswerOffset+orient;
		angleTangleObj.studentAngle['studentCard'+CorrectCard+''][2]=randArm;
		
		var j=20;
		angleTangleObj.Tocheck['studentCard'+CorrectCard+'']=1;
		for(var a=1;a<=4;a++)
		{
			
			if(a!=CorrectCard){
				angleTangleObj.Tocheck['studentCard'+a+'']=0;
				angleTangleObj.Angle.drawAngle('studentCard'+a+'',(angleTangleObj.compCardAngle/Math.PI)*180-10,(angleTangleObj.compCardAngle/Math.PI)*180-j,5,'blue',angleTangleObj.Level);
				j+=5;
				angleTangleObj.studentAngle['studentCard'+a+''][0]=angle1;
				angleTangleObj.studentAngle['studentCard'+a+''][1]=angle2;
				angleTangleObj.studentAngle['studentCard'+a+''][2]=randArm
			}
		
		}
	}
	else{
	if(this.bonusFlag==0){
	$("#promptBox").html(''+promptArr['prompt11']+'');
	$("#instructBox").html(''+promptArr['prompt11']+'');
	$('#card3').remove();
	$('#computerOpenCard').append('<canvas id="compCard1" class="openCard" width="122px" height="130px"></canvas><canvas id="compCard2" class="openCard" width="122px" height="130px"></canvas>');
	this.bonusFlag=1;
	}
	angleTangleObj.ClearCanvas();
	angleTangleObj.BonusLevel();
	}
	}
	else
	{
		angleTangleObj.GameOver();
	}
}
angle_tangle.prototype.BonusLevel=function(){
	var firstAngle;
	var secondAngle;
	var grt;
	var sml;
	angleTangleObj.Angle.drawAngle('compCard',160,90,5,'red',4);
	firstAngle=angleA;
	this.studentAngle['compCard'][0]=angle1;
	this.studentAngle['compCard'][1]=angle2;
	this.studentAngle['compCard'][2]=randArm;
	angleTangleObj.Angle.drawAngle('compCard2',80,40,5,'red',4);
	secondAngle=angleA;
	this.studentAngle['compCard2'][0]=angle1;
	this.studentAngle['compCard2'][1]=angle2;
	this.studentAngle['compCard2'][2]=randArm;
	if(firstAngle>secondAngle){
	grt=firstAngle;
	sml=secondAngle;
	}
	else{	
	sml=firstAngle;
	grt=secondAngle;
	}
	
	angleTangleObj.Angle.drawAngle('studentCard'+CorrectCard+'',(grt/Math.PI)*180,(sml/Math.PI)*180,5,'blue',4);
	angleTangleObj.Tocheck['studentCard'+CorrectCard+'']=1;
	this.studentAngle['studentCard'+CorrectCard+''][0]=angle1;
	this.studentAngle['studentCard'+CorrectCard+''][1]=angle2;
	this.studentAngle['studentCard'+CorrectCard+''][2]=randArm;
	for(var a=1;a<=4;a++)
		{
			
			if(a!=CorrectCard){
				angleTangleObj.Tocheck['studentCard'+a+'']=0;
				if(Math.random()>.5)
				angleTangleObj.Angle.drawAngle('studentCard'+a+'',180,(grt/Math.PI)*180+10,5,'blue',4);
				else
				angleTangleObj.Angle.drawAngle('studentCard'+a+'',(sml/Math.PI)*180-10,20,5,'blue',4);
				angleTangleObj.studentAngle['studentCard'+a+''][0]=angle1;
				angleTangleObj.studentAngle['studentCard'+a+''][1]=angle2;
				angleTangleObj.studentAngle['studentCard'+a+''][2]=randArm;
			}
		
		}
}
function angle()
{
	this.language;
	this.orientation=0;
	this.increament=0;
	this.timer;
	this.initialAng=0;
	this.FinalAng=0;
	this.armlength=1;
	//this.angle;
}
angle.prototype.drawAngle=function(drawCanvas,maxAngle,minAngle,mult,color,level)
{
	var html='';
	var a;
	randArm=1;
	this.Measure(minAngle,maxAngle,mult);
	if(level==1)
	{
		this.AngType1();
	}
	if(level==2)
	{
		rand=Math.random();
		if(rand>.5){
		this.AngType1();
		randArm=generateRandomNumber(10,7)/10;
		}
		else{
		this.AngType2();
		}
	}
	if(level==3)
	{
		var rand=Math.floor(Math.random()*6);
		var rand2=generateRandomNumber(10,7)/10;
		if(rand%5==0){
		this.AngType1();
		randArm=rand2;
		}
		if(rand%5==1){
		this.AngType2();
		randArm=generateRandomNumber(10,7)/10;
		}
		if(rand%5==2|| rand%5==3 || rand%5==4)
		this.AngType3();
	}
	if(level==4)
	{
		var rand=Math.floor(Math.random()*10);
		if(rand%9==0){
		this.AngType1();
		randArm=generateRandomNumber(10,7)/10;
		}
		if(rand%9==1)
		this.AngType2();

		if(rand%9==2 || rand%9==3 || rand%9==4){
		randArm=generateRandomNumber(10,7)/10;
		this.AngType3();
		}
		if(rand%9==7 || rand%9==5 || rand%9==6 || rand%9==8)
		this.AngType4();
	}
	this.drawOnCanvas(angle1,angle2,color,drawCanvas,randArm); 

}
angle.prototype.AngType1=function()
{
	angle1=0;
	angle2=angleA;
}
angle.prototype.AngType2=function(){

	this.orientation=Math.PI-angleA;
	angle1=this.orientation
	angle2=angleA+this.orientation;
}
angle.prototype.AngType3=function(){
	
	var rand=(Math.random()*80)-40;
	this.orientation=(Math.PI/180)*rand;
	angle1=this.orientation;
	angle2=this.orientation+angleA;
	orient=(Math.PI/180)*(rand+20);
}
angle.prototype.AngType4=function(){
	var rand=Math.random()*240-120;
	this.orientation=(Math.PI/180)*rand;
	angle1=this.orientation;
	angle2=this.orientation+angleA;
	orient=(Math.PI/100)*(rand+40);
}
angle.prototype.drawOnCanvas=function(Angle1,Angle2,color,drawCanvas,alpha)
{
	canvas = document.getElementById(drawCanvas);
     context = canvas.getContext('2d');
	 context.beginPath();
     context.moveTo(angleCenterX,angleCenterY);
	 context.lineTo(angleCenterX,angleCenterY);
	 points(Angle2,angleCenterX,angleCenterY,alpha);
     context.lineTo(x,y);
	 points(Angle1,angleCenterX,angleCenterY,alpha);
	 context.moveTo(angleCenterX,angleCenterY);
	 context.lineTo(x,y);
	 context.lineJoin='miter';
	 context.lineWidth = 2;
	 context.arc(angleCenterX,angleCenterY,20,-Angle1,-Angle2,1);
	 context.strokeStyle=color;
     context.stroke();
}
angle.prototype.draw_rotating_angle=function(functn)
{
	funct=functn;
	this.timer=setInterval("angleTangleObj.Angle.rotating_angle(funct)",2)
}
angle.prototype.rotating_angle=function(functn)
{
	
	if(this.orientation>0)
	this.increament+=.01;
	else
	this.increament-=.01;
	
	if(Math.abs(this.increament)>Math.abs(this.orientation)){
	this.orientation=0;
	this.increament=0;
	clearInterval(this.timer);
	if(functn!='')
	setTimeout(functn,2000);
	else
	{
		if(flag==1){
		flag++;
		angleTangleObj.BonusAni('compCard','red');
		randArm=angleTangleObj.studentAngle['compCard'][2];
		this.draw_rotating_angle('');
		randArm=angleTangleObj.studentAngle['compCard'][2];
		}
		else
		{
		angleTangleObj.BonusAni('compCard2','red');
		flag=1;
		randArm=angleTangleObj.studentAngle['compCard2'][2];
		this.draw_rotating_angle('angleTangleObj.Logic()');
		
		}
	}
}
	else
	{
		
		canvas = document.getElementById(Canvas);
		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.drawOnCanvas(this.increament+this.initialAng,this.increament+this.FinalAng,Color,Canvas,randArm);	
	}

}
points=function(angle,xPos,yPos,alpha)
{
	x=xPos+lineLength*alpha * Math.cos(-angle);
	y=yPos+lineLength*alpha * Math.sin(-angle);
}
angle.prototype.Measure=function(min,max,mult)
{
	var Max=Math.floor(max/mult);
	var Min=Math.floor(min/mult);
	var rand=generateRandomNumber(Max,Min);
	angleA=Math.PI *((rand*mult)/180);
}
function generateRandomNumber(max,min)
{
	return Math.floor(Math.random() * (max-min+1)+min);
}
function resize()
{ 
	/*if(window.innerHeight < 600) {
		scaleFactor = parseFloat(window.innerHeight/600); 
	} else if(window.innerWidth < 800) {
		scaleFactor = parseFloat(window.innerWidth/800);
	} else{
		scaleFactor = 1 ;									
	} */	
	scaleFactor = 1 ;
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});	
	
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
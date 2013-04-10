var OddEvenObj;
var canvas;
var totalTimeTaken=0;
var extraParameters='';
var context;
var timer;
var completed=0;
var rotateDegree=0;
var leftPos;
var bottomPos;
var Crossing_penguin;
var Xcenter;
var Ycenter;
var scaleFactor=1;
var initialCord=new Array(0,0);
var finalCord=new Array(0,0);
var smallCircleR;
var largeCircleR;
var count=0;
var count2=0;
var id;
var sharkCount=0;
var sharkTimer;
var CoverFlag=0;
var random;
var text1;
var text2;
var score1='totalscore_l1(add-0,sub-0,gen-0)';
var score2='totalscore_l1(add-0,sub-0,gen-0)';
function OddEven()
{
	this.language;
	this.operator='';
	this.result=1;
	this.SharkOperator;
	this.increament=0;
	this.CurrentSet=1;
	this.Path='none';
	this.penguinCrossed=0;
	this.penguinDrowned=0;
	this.questionSet=new Array;
	this.questionSet[0]=new Array(0,0);
	this.questionSet[1]=new Array(0,0);
	this.questionSet[2]=new Array(0,0);
	this.questionSet[3]=new Array(0,0);
	this.questionSet[4]=new Array(0,0);
	this.questionSet[5]=new Array(0,0);
	this.generalSet=new Array;
	this.generalSet[0]=0;
	this.generalSet[1]=0;
	this.generalSet[2]=0;
	this.generalSet[3]=0;
	this.generalSet[4]=0;
	this.generalSet[5]=0;
	this.gIndex=0;
	this.AnswerInEachSet=new Array;
	this.AnswerInEachSet['+']=new Array(0,0);
	this.AnswerInEachSet['-']=new Array(0,0);
	this.AnswerInEachSet['g']=new Array(0,0);
	this.scoreInEachlevel=new Array();
	this.scoreInEachlevel['+']=0;
	this.scoreInEachlevel['-']=0;
	this.scoreInEachlevel['g']=0;
	this.Numbers=new Array();
	this.timeUpFlag=0;
	this.index=0;
	this.pass=-1;
	this.CreateFlag=0;
	this.Score=0;
	this.Answer;
	this.gameStart=0;
	this.prevPath='none';
	this.PlayAgain=-1;
	this.OperatorArray=new Array();
	this.OperatorArray['plus']=0;
	this.OperatorArray['minus']=0;
	this.OperatorArray['general']=0;
}
OddEven.prototype.initialise=function()
{
	this.generalSet[0]=0;
	this.generalSet[1]=0;
	this.generalSet[2]=0;
	this.generalSet[3]=0;
	this.generalSet[4]=0;
	this.generalSet[5]=0;
	this.gIndex=0;
	this.AnswerInEachSet['+'][0]=0;
	this.AnswerInEachSet['+'][1]=0;
	this.AnswerInEachSet['-'][0]=0;
	this.AnswerInEachSet['-'][1]=0;
	this.AnswerInEachSet['g'][0]=0;
	this.AnswerInEachSet['g'][1]=0;
	this.scoreInEachlevel['+']=0;
	this.scoreInEachlevel['-']=0;
	this.scoreInEachlevel['g']=0;
	this.prevPath='';
	this.Score=0;
}
OddEven.prototype.Timer=function(functn)
{
	canvas = document.getElementById('Timer');
    context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 30;
	this.increament=0;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#f5f5dc';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'white';
    context.stroke();
	timer=setInterval("OddEvenObj.rotating_angle('')",10);
}
OddEven.prototype.rotating_angle=function(functn)
{
	
	if(this.orientation>=0)
	this.increament+=.00628;
	else
	this.increament-=.00628;
	
	if(Math.abs(this.increament)>2*Math.PI){
	this.increament=0;
	clearInterval(timer);
	if(functn!='')
	setTimeout(functn,2000);
	OddEvenObj.result=0;
	$('#layer').addClass('Cover');
	OddEvenObj.penguinDrowned++;
	$('#penguinDrowned').text(''+OddEvenObj.penguinDrowned+'');
	OddEvenObj.timeUpFlag=1;
	$('#moon').css("background","url(../assets/bkg-2.png) no-repeat -882px -227px");
	OddEvenObj.AnswerInEachSet[OddEvenObj.operator][1]++;
	Xcenter=.48*$('#container').width();
	Ycenter=.43*$('#container').height();
	leftPos=.09*$('#container').width();;
	initialCord[1]=.47*$('#container').height();
	initialCord[0]=.09*$('#container').width();
	finalCord[1]=.47*$('#container').height();
	finalCord[0]=.86*$('#container').width();
	CoverFlag=1;
	OddEvenObj.animation();
	}
	else
	{
		
		canvas = document.getElementById('Timer');
		context = canvas.getContext('2d');
		drawOnCanvas(canvas.height / 2,canvas.height / 2,this.increament+Math.PI/2,'#a52a2a','Timer');	
	}

}
OddEven.prototype.PlayingWindow=function()
{	var html='';
	var xPos;
	var yPos;
	$('#container').css("background","url(../assets/bkg-2.png)");	

	//html+='<div id="Shark" style="bottom:70px;left:540px" > </div>';
	html+='<div id="ButtonBox" ><div id="MainScore" class="score"><div id="scoreText">'+miscArr['score']+' :</div><div id="Val" class="value"></div></div></div>';
	//
	html+='<div id="moon"> </div>';
	html+='<div id="ScoreBoard"><div id="penguinCrossed" class="data" style="top:6px;left:46px"></div><div id="penguinDrowned" class="data" style="top:6px;left:119px"></div></div>';
	html+='<div id="Even" class="iceBerg"><p> sfsdf '+miscArr['Even']+'</p></div><div id="Odd" class="iceBerg">'+miscArr['Odd']+'</div>';
	html+='<canvas id="Timer" width="80px" height="80px"></canvas>';
	html+='<div id="movingBlock"></div>';
	html+='<div id="Shark"> </div>';
	html+='<div id="cloud"><div id="QueBox"></div></div>';
	html+='<div id="penguin1" class="penguins" style="top:257px;right:0px;"></div>';
	html+='<div id="penguin2" class="penguins" style="top:287px;right:-5px;"></div>';
	html+='<div id="penguin3" class="penguins" style="top:307px;right:-15px;"></div>';
	html+='<div id="Text"></div>';
	//html+='<button id="Menu" class="Buttons">'+miscArr["Menu"]+'</button></div>';
	html+='<div id="layer" Class="Cover"></div>';
	$('#container').html(html);
	if(OddEvenObj.PlayAgain>=0)
	{
		$('#container').append('<button id="Menu" class="Buttons">'+miscArr["Menu"]+'</button></div>');
	}
	$('#penguinCrossed').text(''+OddEvenObj.penguinCrossed+'');
	$('#penguinDrowned').text(''+OddEvenObj.penguinDrowned+'');
	$('#Val').text(''+OddEvenObj.penguinCrossed+'');
	sharkTimer=setInterval("OddEvenObj.SharkAni()",80);
	$('#Text').addClass('Inst');
	if(OddEvenObj.operator!='g'){
	text1="You have to save 10 penguins to quickly move to the next path!";
	text2=instArr[OddEvenObj.operator];
	}
	if(OddEvenObj.operator=='g')
	{
	
	text1=instArr['instruction9'];
	text2='';
	}
	
	CoverFlag=1;
	OddEvenObj.writeText(text1,text2);
	$('#Menu').click(function(){
		clearInterval(sharkTimer);
		OddEvenObj.Path='none';
		clearInterval(timer);
		OddEvenObj.chooseOperations();
	});
	//OddEvenObj.Logic();
	$('.iceBerg').click(function(){
	$('#layer').addClass('Cover');
	if(CoverFlag==1)
	{	
		return false;
	}
	if(CoverFlag==0)
	{	
		CoverFlag=1;
	}
	id=$(this).attr('id');
	//alert(id+' '+OddEvenObj.Answer)
	if(id==OddEvenObj.Answer){
	$('#moon').css("background","url(../assets/bkg-2.png) no-repeat -862px -415px");
	OddEvenObj.AnswerInEachSet[OddEvenObj.operator][0]++;
	OddEvenObj.result=1;
	OddEvenObj.penguinCrossed++;
	OddEvenObj.Score+=10;
	OddEvenObj.scoreInEachlevel[OddEvenObj.operator]+=10;
	$('#penguinCrossed').text(''+OddEvenObj.penguinCrossed+'');
	$('#Val').text(''+OddEvenObj.penguinCrossed*10+'');
	}
	else{
	OddEvenObj.AnswerInEachSet[OddEvenObj.operator][1]++;
	OddEvenObj.penguinDrowned++;
	$('#penguinDrowned').text(''+OddEvenObj.penguinDrowned+'');
	$('#moon').css("background","url(../assets/bkg-2.png) no-repeat -882px -227px");
	OddEvenObj.result=0;
	if(OddEvenObj.operator=='g')
	{
		OddEvenObj.generalSet[OddEvenObj.gIndex]++;
	}
	}
	if(id=='Even'){
	Xcenter=.31*$('#container').width();
	Ycenter=.415*$('#container').height();
	}
	else{
	Xcenter=.61*$('#container').width();
	Ycenter=.43*$('#container').height();
	}
	leftPos=.09*$('#container').width();;
	initialCord[1]=.47*$('#container').height();
	initialCord[0]=.09*$('#container').width();
	finalCord[1]=.47*$('#container').height();
	finalCord[0]=.86*$('#container').width();
	clearInterval(timer);
	OddEvenObj.animation();
	});
	
}
OddEven.prototype.loadHome=function()
{
	var html='';
	$('#container').css("background","url(../assets/bkg-1.png) no-repeat ");
	html+='<div id="TextArea1" class="textArea" style="top:50px;left:180px; width:438px; height:50px">'+instArr["instruction1"]+'</div>';
	html+='<button id="bObj1" class="Buttons">'+miscArr["Play"]+'</button>';	
	$('#container').html(html);
	startGameTimer();
	$('#bObj1').click(function()
	{		
		$('#container').empty();
		var inst='';
		inst+='<div id="Icon"></div>';
		inst+='<div id="P2inst1" class="textArea" style="top:100px;left:180px; width:438px; height:50px">'+instArr["instruction8"]+'</div>';
		inst+='<button id="Next" class="Buttons">'+miscArr["Next"]+'</button>';
		$('#container').html(inst);
		$('#Next').click(function(){
		OddEvenObj.chooseOperations();
		})
	});
}
OddEven.prototype.writeText=function(text1,text2)
{
	if(text2!='')
	{
		$('#Text').html(text1);
		setTimeout("OddEvenObj.writeText(text2,'')",5000);
	}
	else{
		$('#Text').html(text1);
		if(OddEvenObj.operator!='g'){
			$('#Text').animate({
			top:535,
			opacity:.7
			},5000,function () {	
			setTimeout("OddEvenObj.Logic()",1000);
			})
			}
		else{
			setTimeout("OddEvenObj.Logic()",5000);
		}
	}
}
OddEven.prototype.chooseOperations=function()
{
	var html='';
	$('#container').css("background","url(../assets/bkg-1.png) no-repeat ");
	html+='<div id="TextArea1" class="textArea" style="top:30px;left:180px; width:438px; height:50px">'+instArr["instruction2"]+'</div>';
	html+='<div id="plus" class="operator" style="top:202px;left:238px">'+miscArr["plus"]+'</div><div id="minus" class="operator" style="top:287px;left:310px">'+miscArr["minus"]+'</div><div id="general" class="operator" style="top:380px;left:250px">'+miscArr["general"]+'</div>';
	html+='<div id="layer"></div>';
	$('#container').html(html);
	
	
	clearInterval(sharkTimer);
	OddEvenObj.timeUpFlag=0;
	OddEvenObj.index=0;
	OddEvenObj.pass=-1;
	OddEvenObj.CreateFlag=0;
	OddEvenObj.CurrentSet=1;
	
	if(OddEvenObj.gameStart==0){
		$('.operator').css("opacity",".4");
		$('#plus').css("opacity","1");
		$('#minus').css("opacity","1");
		$('#minus').click(function(){
			OddEvenObj.Path='minus';
			OddEvenObj.operator='-';
			$('#container').empty();
			OddEvenObj.PlayingWindow();
		});
		$('#plus').click(function(){
			OddEvenObj.Path='plus';
			OddEvenObj.operator='+';
			$('#container').empty();
			OddEvenObj.PlayingWindow();
		})
	OddEvenObj.gameStart=1;
	}
	else{
		
		OddEvenObj.penguinCrossed=0;
		OddEvenObj.penguinDrowned=0;
		if(OddEvenObj.AnswerInEachSet['+'][0]+OddEvenObj.AnswerInEachSet['+'][1]>0)
		$('#plus').append('<div id="plusscore" class="score" style="top:25px;left:30px;"><div id="scoreText">'+miscArr['score']+' :</div><div id="Val1" class="value">'+OddEvenObj.scoreInEachlevel['+']+'</div></div>');
		if(OddEvenObj.AnswerInEachSet['-'][0]+OddEvenObj.AnswerInEachSet['-'][1]>0)
		$('#minus').append('<div id="minusscore" class="score" style="top:25px;left:30px;"><div id="scoreText">'+miscArr['score']+' :</div><div id="Val2" class="value">'+OddEvenObj.scoreInEachlevel['-']+'</div></div>');
		if(OddEvenObj.AnswerInEachSet['g'][0]+OddEvenObj.AnswerInEachSet['g'][1]>0)
		$('#general').append('<div id="generalscore" class="score" style="top:25px;left:30px;"><div id="scoreText">'+miscArr['score']+' :</div><div id="Val3" class="value">'+OddEvenObj.scoreInEachlevel['g']+'</div></div>');
		$('#'+OddEvenObj.prevPath+'').css("opacity",".4")
		if(OddEvenObj.Path!='none')
		{
			$('.operator').css("opacity",".4")
			$('#'+OddEvenObj.Path+'').css("opacity","1")
			$('#'+OddEvenObj.Path+'').addClass('Clickable');
			$('.Clickable').click(function(){
				$('#container').empty();
				OddEvenObj.PlayingWindow();
			});
		}
		else{
		if(OddEvenObj.OperatorArray['plus']==0)
		$('#plus').addClass('Clickable');
		else
		$('#plus').css("opacity",".4")
		if(OddEvenObj.OperatorArray['minus']==0)
		$('#minus').addClass('Clickable');
		else
		$('#minus').css("opacity",".4")
		if(OddEvenObj.OperatorArray['general']==0)
		$('#general').addClass('Clickable');
		else
		$('#general').css("opacity",".4")
		if(OddEvenObj.PlayAgain==3)
			{
				
				$('#layer').addClass('Cover');
				$('.operator').css("opacity",".4");
				$('#container').append('<div id="quitBox"><div id="quitText"></div><button id="Yes" class="btnTy2">'+miscArr['Yes']+'</button><button id="No" class="btnTy2">'+miscArr['No']+'</button></div>');
				$('#quitText').html(''+miscArr['PlayA']+'')
				$('#Yes').click(function(){
					$('.operator').css("opacity","1");
					$('#generalscore').remove();
					$('#minusscore').remove();
					$('#plusscore').remove();
					OddEvenObj.initialise();
					$('#layer').removeClass('Cover');
					$('#quitBox').remove();				
				});
				$('#No').click(function(){
					$('#quitBox').empty();
					$('#quitBox').css("height","70px");
					$('#quitBox').css("font-size","30px");
					$('#quitBox').html(''+miscArr['gameover']+'');
					completed=1;
				});
			}
		else
			{
				if(OddEvenObj.PlayAgain==0)
				{
					$('#layer').addClass('Cover');
					$('#quitBox').remove();
					$('#container').append('<div id="quitBox" style="height:70px"></div>');
					$('#quitBox').html(''+miscArr['gameover']+'');
					completed=1;
				}
				//gameOver;
			}
			if(OddEvenObj.PlayAgain>0)
			{
				$('#container').append('<button id="quit" class="Buttons">'+miscArr['Quit']+'</button>');
			}
			$('#quit').click(function(){
				$('#layer').addClass('Cover');
				$('#quitBox').remove();
				$('#container').append('<div id="quitBox" style="height:70px"></div>');
				$('#quitBox').html(''+miscArr['gameover']+'');
			
			});
			$('.Clickable').click(function(){
				$('#container').empty();
				if($(this).attr("id")=='plus')
				OddEvenObj.operator='+';
				if($(this).attr("id")=='minus')
				OddEvenObj.operator='-';
				if($(this).attr("id")=='general')
				OddEvenObj.operator='g';
				OddEvenObj.Path=$(this).attr("id")
				OddEvenObj.OperatorArray[$(this).attr("id")]=1;
				OddEvenObj.PlayAgain--;
				OddEvenObj.PlayingWindow();
			});
		}
	}
}
OddEven.prototype.Logic=function()
{
	var num1;
	var num2;
	CoverFlag=0;
	//$('#Even').css("disabled",false);
	//$('#Odd').css("disabled",false);
	if(OddEvenObj.operator=='g' && OddEvenObj.AnswerInEachSet['g'][0]+OddEvenObj.AnswerInEachSet['g'][1]==0)
	{
		$('#Text').empty();
		$('#Text').removeClass('Inst');
	}
	$('#layer').removeClass('Cover');
	CoverFlag=0;
	$('#moon').css("background","url(../assets/bkg-2.png) no-repeat -858px -30px");
	$('#'+id+'').html(''+miscArr[id]+'');
	OddEvenObj.Timer('');
	$('#movingBlock').css("left","9%");
	$('#movingBlock').css("bottom","47%");
	$('#movingBlock').css("background","url('../assets/sprite-peguine.png') no-repeat -62px -28px");
	if(OddEvenObj.operator=='+'){
		if(OddEvenObj.AnswerInEachSet['+'][0]<10){
			if(OddEvenObj.AnswerInEachSet['+'][0]+OddEvenObj.AnswerInEachSet['+'][1]<15){
				OddEvenObj.odd_even_Addition();
				$('#QueBox').html(''+OddEvenObj.Numbers[0]+' + '+OddEvenObj.Numbers[1]+'');
				if((OddEvenObj.Numbers[0]+OddEvenObj.Numbers[1])%2==0)
				OddEvenObj.Answer='Even';
				else
				OddEvenObj.Answer='Odd';
				}
			else{
					$('#container').append('<div id="promptBox"><div id="promptText"></div></div>');
					$('#promptText').html(''+promptArr['prompt2a']+' '+OddEvenObj.penguinCrossed+''+promptArr['prompt2b']+'');
					clearInterval(sharkTimer);
					$('#layer').addClass('Cover');
					OddEvenObj.prevPath='plus';
					clearInterval(timer);
					if(OddEvenObj.PlayAgain==-1){
						if(OddEvenObj.AnswerInEachSet['-'][0]+OddEvenObj.AnswerInEachSet['-'][1]==0){
							OddEvenObj.Path='minus';
							OddEvenObj.operator='-';
						}
						else
						{
							OddEvenObj.Path='general';
							OddEvenObj.operator='g';
						}
					}
					else
					OddEvenObj.Path='none';
					setTimeout("OddEvenObj.chooseOperations()",3000);
				}
		}
		else{
			clearInterval(timer);
			OddEvenObj.prevPath='plus';
			if(OddEvenObj.PlayAgain==-1){
				if(OddEvenObj.AnswerInEachSet['-'][0]+OddEvenObj.AnswerInEachSet['-'][1]==0){
					OddEvenObj.Path='minus';
					OddEvenObj.operator='-';
				}
				else
				{
					OddEvenObj.Path='general';
					OddEvenObj.operator='g';
				}
			}
			else
			OddEvenObj.Path='none';
			$('#container').append('<div id="promptBox"><div id="promptText"></div></div>');
			$('#promptText').html(''+promptArr['prompt1']+'');
			clearInterval(sharkTimer);
			setTimeout("OddEvenObj.chooseOperations()",3000);
		}
		//OddEvenObj.operator='-';
		//alert('alok');
	}
	
	else{
		if(OddEvenObj.operator=='-'){
			if(OddEvenObj.AnswerInEachSet['-'][0]<10){
				if(OddEvenObj.AnswerInEachSet['-'][0]+OddEvenObj.AnswerInEachSet['-'][1]<15){
				OddEvenObj.odd_even_Addition();
				if(OddEvenObj.Numbers[0]>OddEvenObj.Numbers[1])
					{
					num1=OddEvenObj.Numbers[0];
					num2=OddEvenObj.Numbers[1];
					}
				else
					{
					num1=OddEvenObj.Numbers[1];
					num2=OddEvenObj.Numbers[0];
					}
				$('#QueBox').html(''+num1+' - '+num2+'');
				if((num1-num2)%2==0)
				OddEvenObj.Answer='Even';
				else
				OddEvenObj.Answer='Odd';
			}
			else{
				clearInterval(sharkTimer);
				$('#layer').addClass('Cover');
				clearInterval(timer);
				OddEvenObj.prevPath='minus';
				$('#container').append('<div id="promptBox"><div id="promptText"></div></div>');
				$('#promptText').html(''+promptArr['prompt2a']+' '+OddEvenObj.penguinCrossed+''+promptArr['prompt2b']+'');
				if(OddEvenObj.PlayAgain==-1){
					if(OddEvenObj.AnswerInEachSet['+'][0]+OddEvenObj.AnswerInEachSet['+'][1]==0){
						OddEvenObj.Path='plus';
						OddEvenObj.operator='+';
					}
					else
					{
						OddEvenObj.Path='general';
						OddEvenObj.operator='g';
					}
				}
				else
				OddEvenObj.Path='none';
				setTimeout("OddEvenObj.chooseOperations()",3000);
			}
			}
			else{
			clearInterval(timer);
			OddEvenObj.prevPath='minus';
			if(OddEvenObj.PlayAgain==-1){
					if(OddEvenObj.AnswerInEachSet['+'][0]+OddEvenObj.AnswerInEachSet['+'][1]==0){
						OddEvenObj.Path='plus';
						OddEvenObj.operator='+';
					}
					else
					{
						OddEvenObj.Path='general';
						OddEvenObj.operator='g';
					}
				}
			else
			OddEvenObj.Path='none';
				$('#container').append('<div id="promptBox"><div id="promptText"></div></div>');
				$('#promptText').html(''+promptArr['prompt1']+'');
				setTimeout("OddEvenObj.chooseOperations()",3000);
			}
			//alert('alok--');
		}
		else{
			if(OddEvenObj.operator=='g')
			{
				if(OddEvenObj.AnswerInEachSet['g'][0]==12 || (OddEvenObj.AnswerInEachSet['g'][0]+OddEvenObj.AnswerInEachSet['g'][1])==25){
				//alert('alok=')
				OddEvenObj.prevPath='general';
				OddEvenObj.Path='none';
				clearInterval(sharkTimer);
				clearInterval(timer);
				$('#cloud').empty();
				if(OddEvenObj.PlayAgain==-1){
				OddEvenObj.PlayAgain=3;
				}
				setTimeout("OddEvenObj.chooseOperations()",3000);
				}
				else{
					OddEvenObj.general();
				}
			}
		}
	}
}
OddEven.prototype.general=function()
{
	if(OddEvenObj.AnswerInEachSet['g'][0]+OddEvenObj.AnswerInEachSet['g'][1]<12){
			if(OddEvenObj.index==0)
			random=Math.floor(Math.random()*100+1);
			OddEvenObj.generalQue((random+OddEvenObj.index)%6);
			OddEvenObj.gIndex=(random+OddEvenObj.index)%6;
			//alert(random);
			
			OddEvenObj.index++;
			if(OddEvenObj.index==6)
			OddEvenObj.index=0;
	}
	else{
		//alert(OddEvenObj.index);
		//alert('alok--+');
		if(OddEvenObj.index==0){
		random=Math.floor(Math.random()*100+1);
	
		}
		for(var a=0;a<6;a++)
		{	
			if(OddEvenObj.generalSet[(random+a)%6]>0)
			{
				//alert(random+a);
				OddEvenObj.generalSet[(random+a)%6]-=1;
				OddEvenObj.generalQue((random+a)%6);
				OddEvenObj.gIndex=(random+a)%6;
				
				break;
			}
			OddEvenObj.index++;
		}
	}
	if((OddEvenObj.Numbers[0]=='Even' && OddEvenObj.Numbers[1]=='Odd') || (OddEvenObj.Numbers[1]=='Even' && OddEvenObj.Numbers[0]=='Odd'))
	OddEvenObj.Answer='Odd';
	else
	OddEvenObj.Answer='Even';
}
OddEven.prototype.generalQue=function(alpha)
{
	
	if(alpha%3==0){
		OddEvenObj.Numbers[0]='Even';
		OddEvenObj.Numbers[1]='Even';		
	}
	if(alpha%3==1)
	{
		OddEvenObj.Numbers[0]='Even';
		OddEvenObj.Numbers[1]='Odd';	
	}
	if(alpha%3==2)
	{
		OddEvenObj.Numbers[0]='Odd';
		OddEvenObj.Numbers[1]='Odd';	
	}
	
			if(alpha%6==0){
			$('#QueBox').html(''+OddEvenObj.Numbers[0]+' + '+OddEvenObj.Numbers[1]+'');
			}
			if(alpha%6==1){
			if(Math.random()>.5)
			$('#QueBox').html(''+OddEvenObj.Numbers[0]+' + '+OddEvenObj.Numbers[1]+'');
			else
			$('#QueBox').html(''+OddEvenObj.Numbers[1]+' + '+OddEvenObj.Numbers[0]+'');
			//OddEvenObj.gindex=1;
			}
			if(alpha%6==2)
			$('#QueBox').html(''+OddEvenObj.Numbers[0]+' + '+OddEvenObj.Numbers[1]+'');
			
			if(alpha%6==3)
			$('#QueBox').html(''+OddEvenObj.Numbers[0]+' - '+OddEvenObj.Numbers[1]+'');
			if(alpha%6==4){
			if(Math.random()>.5)
			$('#QueBox').html(''+OddEvenObj.Numbers[0]+' - '+OddEvenObj.Numbers[1]+'');
			else
			$('#QueBox').html(''+OddEvenObj.Numbers[1]+' - '+OddEvenObj.Numbers[0]+'');
			//OddEvenObj.gindex=1;
			}
			if(alpha%6==5)
			$('#QueBox').html(''+OddEvenObj.Numbers[0]+' - '+OddEvenObj.Numbers[1]+'');
}
OddEven.prototype.generateQue=function(set,flag)
{
	var rand=generateRandomNumber(4,1);
	if(set==1&& flag==0){
		this.questionSet[0][0]=2*rand;
		this.questionSet[0][1]=(6*rand)%10;
		this.questionSet[1][0]=(4*rand)%10;
		this.questionSet[1][1]=(8*rand)%10;
		this.questionSet[2][0]=2*rand+1;
		this.questionSet[2][1]=(8*rand)%10+1;
		this.questionSet[3][0]=(4*rand)%10+1;
		this.questionSet[3][1]=(6*rand)%10+1;
		this.questionSet[4][0]=(8*rand)%10;
		this.questionSet[4][1]=(4*rand)%10+1;
		this.questionSet[5][0]=(6*rand)%10+1;
		this.questionSet[5][1]=2*rand;
	}
	if(flag==1)	{
		this.questionSet[0][0]=2*generateRandomNumber(4,1);
		this.questionSet[0][1]=2*generateRandomNumberT2(49,11);
		this.questionSet[1][0]=2*generateRandomNumber(4,1)+1;
		this.questionSet[1][1]=2*generateRandomNumber(49,11)+1;
		if(Math.random()>.5){
		this.questionSet[2][0]=2*generateRandomNumber(4,1);
		this.questionSet[2][1]=2*generateRandomNumber(49,11)+1;
		}
		else{
		this.questionSet[2][0]=2*generateRandomNumber(4,1)+1;
		this.questionSet[2][1]=2*generateRandomNumberT2(49,11);
		
		}
		//alert('alok2');
	}
	if(flag==2){
		this.questionSet[0][0]=2*generateRandomNumberT2(49,26);
		this.questionSet[0][1]=2*generateRandomNumberT2(25,5);
		this.questionSet[1][0]=2*generateRandomNumberT2(49,34);
		this.questionSet[1][1]=2*generateRandomNumberT2(33,5);
		this.questionSet[2][0]=2*generateRandomNumber(49,31)+1;
		this.questionSet[2][1]=2*generateRandomNumber(30,5)+1;
		this.questionSet[3][0]=2*generateRandomNumber(49,25)+1;
		this.questionSet[3][1]=2*generateRandomNumber(24,5)+1;
		this.questionSet[4][0]=2*generateRandomNumberT2(49,5);
		this.questionSet[4][1]=2*generateRandomNumber(49,5)+1;
		this.questionSet[5][0]=2*generateRandomNumber(49,5)+1;
		this.questionSet[5][1]=2*generateRandomNumberT2(49,5);
	}
}
OddEven.prototype.odd_even_Addition=function()
{
	/*if(this.operator=='-')
	{
		//alert('----'+this.CreateFlag+'-'+this.CurrentSet+'-'+this.AnswerInEachSet[this.operator][0]+'-'+this.AnswerInEachSet[this.operator][1]+'-'+this.index);
	}*/
	if(this.CreateFlag==0 && this.CurrentSet==1)
	{
		this.generateQue(1,0);
		
		random=generateRandomNumber(1,100);
		this.CreateFlag=1
	}
	if(this.CreateFlag==1 && this.CurrentSet==1)
	{
		if(this.AnswerInEachSet[this.operator][0]+this.AnswerInEachSet[this.operator][1]<6 && this.index<6){
		this.Numbers[0]=this.questionSet[(random+this.index)%6][0];
		this.Numbers[1]=this.questionSet[(random+this.index)%6][1];
		this.index++;
		}
		else{
		this.CurrentSet=2;
		this.index=0;
		this.CreateFlag=0;
//alert(this.CurrentSey)
		}
	}
	if(this.CreateFlag==0 && this.CurrentSet==2)
	{
		
		if(this.AnswerInEachSet[this.operator][0]<=4){
		this.generateQue(1,1);
		this.pass=0;
		//alert('alok1');
		}
		else
		{
		this.generateQue(1,2);
		this.pass=1;
		//alert('alok2');
		}
		random=generateRandomNumber(1,100);
		this.CreateFlag=1;
		//alert('alok');
	}
	if(this.CreateFlag==1 && this.CurrentSet==2)
	{
		if(this.pass==1){
			if(this.AnswerInEachSet[this.operator][0]+this.AnswerInEachSet[this.operator][1]<12 && this.index<6)
			{
				this.Numbers[0]=this.questionSet[(random+this.index)%6][0];
				this.Numbers[1]=this.questionSet[(random+this.index)%6][1];
				this.index++;
			}
			else
			{
				this.CreateFlag=0;
				this.index=0;
				this.CurrentSet=3;
			}
		}
		else{
			if(this.AnswerInEachSet[this.operator][0]+this.AnswerInEachSet[this.operator][1]<9 && this.index<3)
			{
				this.Numbers[0]=this.questionSet[(random+this.index)%3][0];
				this.Numbers[1]=this.questionSet[(random+this.index)%3][1];
				this.index++;
			}
			else
			{
				this.CreateFlag=0;
				this.index=0;
				this.CurrentSet=3;
			}
		}
	}
	if(this.CreateFlag==0 && this.CurrentSet==3)
	{
		if(this.pass==1){
		this.generateQue(1,1);
		}
		else
		{
		this.generateQue(1,2);
		}
		random=generateRandomNumber(1,100);
		this.CreateFlag=1
	}
	if(this.CreateFlag==1 && this.CurrentSet==3)
	{
		if(this.pass==1){
			if(this.index<3)
			{
				this.Numbers[0]=this.questionSet[(random+this.index)%6][0];
				this.Numbers[1]=this.questionSet[(random+this.index)%6][1];
				this.index++;
			}
			else
			{
				this.CreateFlag=0;
				this.index=0;
			}
		}
		else{
			if(this.index<6)
			{
				this.Numbers[0]=this.questionSet[(random+this.index)%6][0];
				this.Numbers[1]=this.questionSet[(random+this.index)%6][1];
				this.index++;
			}
			else
			{
				this.CreateFlag=0;
				this.index=0;
			}
		}
	}
}
//----------------------------animation part---------------------------//
OddEven.prototype.animation=function()
{
	smallCircleR=calculateRadius(Xcenter,Ycenter,initialCord[0],initialCord[1]);
	largeCircleR=calculateRadius(Xcenter,Ycenter,finalCord[0],finalCord[1]);
	$('#movingBlock').css("background","url('../assets/sprite-peguine.png') no-repeat -92px -122px");
	Crossing_penguin=setInterval("OddEvenObj.animate_helper(Xcenter,Ycenter)",8);
}
OddEven.prototype.animate_helper=function(Xcenter,Ycenter)
{
	var X;
	var Y;
	var radius;
	rotateDegree+=10;

	
	if(count2%2==0)
	{
			if(isIpad())
			leftPos+=9;	
			else if(isIpadORAndroid())	
			leftPos+=9;	
			else
			leftPos+=5;			
	}	
	else
	OddEvenObj.rotate(rotateDegree,'movingBlock');
	if(leftPos<Xcenter)
	{
	X=(initialCord[0]+Xcenter)/2;
	Y=(initialCord[1]+Ycenter)/2;
	radius=smallCircleR;
	bottomPos=Math.floor((.75*radius)*Math.sqrt(1-(((leftPos-X)*(leftPos-X))/(radius*radius)))+Y);
	}
	else{
	if(OddEvenObj.timeUpFlag==0)
	$('#'+id+'').empty();
	if(OddEvenObj.result==1){
	X=(finalCord[0]+Xcenter)/2;
	Y=(finalCord[1]+Ycenter)/2;
	radius=largeCircleR;

	bottomPos=Math.floor((.75*radius)*Math.sqrt(1-(((leftPos-X)*(leftPos-X))/(radius*radius)))+Y);
	count++;
	}
	else
		{
		
		clearInterval(Crossing_penguin);
		//alert(bottomPos);		
		bottomPos=.43*$('#container').height();
		Crossing_penguin=setInterval("OddEvenObj.animate_helper_1()",20);	
	}
	}
	
	$('#movingBlock').css("bottom",bottomPos);
	$('#movingBlock').css("left",leftPos);
	count2++;
	if(leftPos>.86*$('#container').width())
	{
		clearInterval(Crossing_penguin);
		OddEvenObj.rotate(0,'movingBlock');
		$('#movingBlock').css("bottom","47%");
		$('#movingBlock').css("background","url('../assets/sprite-peguine.png') no-repeat -13px -123px");
		count=0;
		count2=0;
		//alert(bottomPos);
	
		$('#iceBerg').css("background","url('../assets/sprite-peguine1.png') no-repeat -19px -182px");
		setTimeout("OddEvenObj.Logic()",1000);
	}
}
OddEven.prototype.animate_helper_1=function()
{
		rotateDegree+=5;
		if(bottomPos<2)
		{
			if(isIpad())
				leftPos+=6;
			else	
				leftPos+=3;
		}
	if(this.timeUpFlag==0){
		if(count==0)
		{
			$('#'+id+'').css("width","88px");
			$('#'+id+'').css("height","74px");
			if(id=='Even')
			$('#'+id+'').css("left",.29*$('#container').width());
			else
			$('#'+id+'').css("left",.59*$('#container').width());
			$('#'+id+'').css("background","url('../assets/sprite-peguine1.png') no-repeat -606px -15px");
		}
		if(count==3)
		{
			$('#'+id+'').css("width","117px");
			$('#'+id+'').css("height","96px");
			if(id=='Even')
			$('#'+id+'').css("left",.25*$('#container').width());
			else
			$('#'+id+'').css("left",.55*$('#container').width());
			$('#'+id+'').css("background","url('../assets/sprite-peguine1.png') no-repeat -717px 0px");
		}
		if(count==8)
		{
			$('#'+id+'').css("width","194px");
			$('#'+id+'').css("height","120px");
			if(id=='Even')
			$('#'+id+'').css("left",.22*$('#container').width());
			else
			$('#'+id+'').css("left",.52*$('#container').width());
			$('#'+id+'').css("background","url('../assets/sprite-peguine1.png') no-repeat -566px -136px");
		}
	}	
		bottomPos-=5;		
		if(bottomPos>.41*$('#container').height()){
		if(count2%2==0)
		OddEvenObj.rotate(rotateDegree,'movingBlock');
		else
		$('#movingBlock').css("bottom",bottomPos);
		//leftPos+=1;
		$('#movingBlock').css("left",leftPos-5);
		}
		if(bottomPos<=.41*$('#container').height() && bottomPos>=.39*$('#container').height())
		{
			$('#movingBlock').css("opacity",".7");
			//alert('alok');
			$('#movingBlock').css("background","url('../assets/sprite-peguine.png') no-repeat -13px -123px");
		}
		if(count%24==0)		
		OddEvenObj.rotate(0,'movingBlock');
		if(count%24==6)
		OddEvenObj.rotate(10,'movingBlock');
		if(count%24==12)
		OddEvenObj.rotate(0,'movingBlock');
		if(count%24==18)
		OddEvenObj.rotate(-10,'movingBlock');
		
		count++;
		count2++;
		if(bottomPos<.41*$('#container').width())
		$('#movingBlock').css("bottom",bottomPos);
		if(bottomPos<.01*$('#container').width())
		{
		clearInterval(Crossing_penguin);
		OddEvenObj.rotate(0,'movingBlock');
		count=0;
		count2=0;
		this.timeUpFlag=0;
		$('#'+id+'').css("width","78px");
		$('#'+id+'').css("height","70px");
		//$('#iceBerg').css("left","270px");
		if(id=='Even')
		$('#'+id+'').css("left",.3*$('#container').width());
		else
		$('#'+id+'').css("left",.6*$('#container').width());
		$('#'+id+'').css("top",.5*$('#container').height());
		$('#movingBlock').css("opacity","1");
		$('#'+id+'').css("background","url('../assets/sprite-peguine1.png') no-repeat -509px -20px");
		setTimeout("OddEvenObj.Logic()",1000);
		}
	
}
OddEven.prototype.SharkAni=function()
{
	
	var leftP=$('#Shark').position().left;
	if(leftP>500)
	{
		
		$('#Shark').removeClass('flip');
		this.SharkOperator='-';
	}
	if(leftP<180)
	{
		$('#Shark').addClass('flip');
		this.SharkOperator='+';
		//alert('alok');
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
drawOnCanvas=function(X,Y,Angle,color,drawCanvas)
{
	canvas = document.getElementById(drawCanvas);
    context = canvas.getContext('2d');
     context.beginPath();
     context.moveTo(X,Y);
     context.lineTo(X+28*Math.cos(-Angle),Y+28*Math.sin(-Angle));
	 context.lineWidth = 2;
	 context.strokeStyle=color;
     context.stroke();
}
OddEven.prototype.rotate=function(Degree,object)
{    
            $('#'+object).css("transform","rotate("+Degree+"deg)");
            $('#'+object).css("-moz-transform","rotate("+Degree+"deg)");
            $('#'+object).css("-webkit-transform","rotate("+Degree+"deg)");
            $('#'+object).css("-o-transform","rotate("+Degree+"deg)");
			$('#'+object).css("-ms-transform","rotate("+Degree+"deg)");
}
calculateRadius=function(X,Y,X1,Y1){
	return Math.sqrt((X-X1)*(X-X1)+(Y-Y1)*(Y-Y1))/2;
}
function generateRandomNumber(max,min)
{
	return Math.floor(Math.random() * (max-min+1)+min);
}
function generateRandomNumberT2(max,min)
{
	var num=Math.floor(Math.random() * (max-min+1)+min);
	if(num%5==0)
	return (num+1);
	else
	return num;
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

function startGameTimer()
{
	totalTimeTaken++;
	if(OddEvenObj.PlayAgain==-1)
	score1='totalscore_l1(add-'+OddEvenObj.scoreInEachlevel['+']+',sub-'+OddEvenObj.scoreInEachlevel['-']+',gen-'+OddEvenObj.scoreInEachlevel['g']+')';
	else
	score2='totalscore_l1(add-'+OddEvenObj.scoreInEachlevel['+']+',sub-'+OddEvenObj.scoreInEachlevel['-']+',gen-'+OddEvenObj.scoreInEachlevel['g']+')';
	extraParameters=''+score1+','+score2+'';
	window.setTimeout(startGameTimer,1000);
}

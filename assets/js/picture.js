
window.onload = function(){

	var picture=document.getElementById('picture');
	var numli=document.getElementById('num').getElementsByTagName('li');
	  var timeout=timeout1=null;
	var pictureli=picture.getElementsByTagName('li');
	var imgarr=new Array;
	for(var i=0;i<pictureli.length;i++){
	  imgarr.push(pictureli[i].offsetTop+30);
	}
	for(var i=0;i<numli.length;i++){
	  numli[i].index=i;
	  numli[i].onclick=function(){
	    for(var j=0;j<pictureli.length;j++){
	      numli[j].style.background="white";
	    }
	    this.style.background="#9D9D9D";
	    clearInterval(timeout1);
	    show(this.index);
	    if(this.index==(numli.length-1)){
	      turns(this.index-1);
	    }else {
	      turns(this.index);
	    }
	  };
	}
	turns(1);
}


function turns(index){
  var number=index;
  var pan1=0;
  timeout1=setInterval(function(){
    for(var j=0;j<pictureli.length;j++){
      numli[j].style.background="white";
    }
    numli[number].style.background="#9D9D9D";
    show(number);
    if(pan1==0){
      number++;
    }
    if(number>=pictureli.length){
      pan1=1;
      number--;
    }
    if(pan1==1){
      number--;
    }
    if(number<0){
      pan1=0;
      number=1;
    }
  },2000);
}

function show(index){
	clearInterval(timeout);
	var height=-imgarr[index];
	var x=picture.offsetTop;
	timeout=setInterval(function(){
	    if(x>height){
	      if(x>height+300){
	        x-=30;
	      }else if(x<=height+300 && x>height+60){
	        x-=4;
	      }else if(x<=height+60){
	        x--;
	      }
	      if(x<height)x=height;
	    }else {
	      if(x<height-300){
	        x+=30;
	      }else if(x>=height-300&&x<height-60){
	        x+=4;
	      }else if(x>=height-60){
	        x++;
	      }
	      if(x>height)x=height;
	    }
	    picture.style.top=x+"px";
	    if(x==height){clearInterval(timeout);}
	},2);
}

// 暂停几秒
function sleep(numberMillis) { 
	var now = new Date(); 
	var exitTime = now.getTime() + numberMillis; 
	while (true) { 
	now = new Date(); 
	if (now.getTime() > exitTime) 
		return; 		
	} 
}
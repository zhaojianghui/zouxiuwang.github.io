require(['../../config'],function(){
	require(['jquery','reward'],function($,reward){
		var wordReward=$('.word-reward');
		var timer=null;
		var index=0;
		var name=null;
	
	     $('.dial').click(function(){
	     	  
	     	  var time=parseInt(Math.random()*4000+1000);
	     	  //console.log(time)
	     	  timer=setInterval(function(){
	     	  	  	index++;
	     	  	    wordReward.eq(index).addClass('active').siblings().removeClass('active');
	     	  	    if(index>wordReward.length-1){
	     	  	    	index=0;
	     	  	    }
	     	  	    //console.log(index);
	     	  	  },200)
	     	  
	     	  var timer1=setTimeout(function(){
	     	  	  clearInterval(timer);
	     	  	  //console.log(index);
	     	  	  name=$('.word-reward').eq(index).find('img').attr('data-name');
	     	  	  //console.log(name)
	     	  	  alert('恭喜获得'+name+'一把');
	     	  	  var cont='';
	     	  	  var date=new Date();
	     	  	  var m=date.getMonth()+1;
	     	  	  var d=date.getDate();
	     	  	  var h=date.getHours();
	     	  	  var min=date.getMinutes();
	     	  	  h=h<10?'0'+h:h;
	     	  	  min=min<10?'0'+min:min;
	     	  	  var nowTime=''+m+'月'+d+'日'+h+':'+min+'';
	     	  	  var userID=localStorage.getItem('userID')||'[]';
	     	  	  	cont+='<li>'+
				 			
				 			'<span class="username">'+userID+'</span>'+
				 			'<span class="rank">获得<i>'+name+'</i></span>'+
				 			'<span class="reward-time">'+nowTime+'</span>'+
				 			
				 		  '</li>'
	     	  	  
	     	  	  $('.reward-username').prepend(cont);
	     	  },time)
	     	  	   
	     	
	     })
		 $('.list-item').click(function(){
		 	  window.location.href="list.html";
		 })
		
		 $('.exit').click(function(){
		 	  window.location.href="login.html";
		 	  
		 })
	})
})
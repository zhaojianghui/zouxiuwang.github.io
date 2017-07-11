require(['../../config'],function(){
	require(['jquery','login'],function($,login){
		$(function(){
	
     // 登录
      
      $("#btn1").click(function(){

        var user1 = $("#name1").val() ;
	    var password1 = $("#password").val();
        if(user1==''||password1==''){
        	alert('用户名或密码不能为空')
        }else{
        	 $.ajax({
	    	url:"http://datainfo.duapp.com/shopdata/userinfo.php",
	    	type:"POST",
	    	data:{
	    		   status:"login",
	    		   userID:user1,
	    		   password:password1
	    	},
	    	success:function(res){
	    		   $(".node").html("");
                   res = Number(res) ;
                   
                   switch(res){
                   	case 0:$(".node").html("用户不存在") ;break;
                   	
                   	case 2:$(".node").html("用户名与密码不符") ;break;
                   	default:$(".node").html("登陆成功,3秒后自动跳转列表页面") ; 
                   		   localStorage.setItem('userID',user1);
                   	       setTimeout(function(){ window.location.href = "list.html"},3000);break;
                   }
	    	},

	    	
	    })
        }
        
	   


      })


      $("#btn2").click(function(){
      	    window.location.href = "reg.html";
      })
       //第三方登录
        var oauths={};
        var login=$('.login');
        var s;
        var btns;
        if(plus){
        	oauth();
        }else{
        	document.addEventListener("plusready",function(){
        	  oauth();
        },false)
        }
        
        function  oauth(){
        	plus.oauth.getServices(function(services){
        		console.log(JSON.stringify(services));
        		oauths=services;  
        		btns=oauths.map(function(ele,index){
        			return {title:ele.description}
        		})
        		console.log(btns);
        	})
        	plus.nativeUI.actionSheet({title:"登录方式",cancel:"取消",buttons:btns},function(e){
				console.log("User pressed"+e.index);
				//判断按钮的下标不为0
				if(e.index){
					var s = oauths[e.index-1];
				console.log(JSON.stringify(s));
				loginIn(s);
				}
				
			});
        }
      $('#btn3').on('click',function(){
      	  oauth()
      })
      function loginIn(s){
      	  if(s.authResult){
      	  	plus.nativeUI.alert('已经登录')
      	  }else{
      	  	s.login(function(){
      	  		plus.nativeUI.alert('登录成功');
      	  		s.getUserInfo(function(){
      	  			console.log(s.userInfo.nickname)
      	  			localStorage.setItem('userID',s.userInfo.nickname);
      	  			
      	  		},function(){
      	  			
      	  		})
      	  		window.location.href="list.html";
      	  	},function(){
      	  		plus.nativeUI.alert('登录失败')
      	  	})
      	  }
      }
      $('.loginOut').click(function(){
      	  logonOut();
      })
      function logonOut(){
      	for(var attr in oauths){
      		if(oauths[attr].authResult){
      			oauths[attr].logout(function(){
      			 alert('注销成功')
      		},function(){
      			 alert('注销失败')
      		})
      		}
      		
      	}
      }
      
   })
  })
})

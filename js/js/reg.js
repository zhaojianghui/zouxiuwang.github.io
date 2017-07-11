require(['../../config'],function(){
	require(['jquery','reg'],function($,reg){
		$(function(){
	$(".node").html("");
	var passToo = false ;
	// 注册页姓名格式验证
	    $("#name").blur(function(){
	    	 $(".node").html("");
	    	 var oName = $("#name").val(); 
	    	 var reg = /^\w{6,20}$/;
	    	 if(!reg.test(oName)){
	    
	    	 	$(".node").html("请输入6-20位字符的账户名") ;
	    	 }
	    })

    // 注册页密码格式验证
        var pa = 0 ;
	    $("#pass").blur(function(){
	    	 $(".node").html("");
	    	 var oPass = $("#pass").val() ;
	    	 var reg = /^\w{6,20}$/ ;
	    	 if(!reg.test(oPass)){
                $(".node").html("请输入6-20位任意字符的密码") ;	 
	    	 }else{
	    	 	pa = $("#pass").val() ;
	    	 	//console.log(pa) 
	    	 }
	    	 
	    }) 

	    // 注册页确认密码验证
	    $("#passTo").blur(function(){
	    	 $(".node").html("");
	    	 var oPassTo = $("#passTo").val() ;
	    	 if(!(pa==oPassTo)){
                $(".node").html("请再次输入密码") ;
	    	 }else{
                 passToo = true ;
	    	 }
	    })
        $('.return').click(function(){
        	window.location.href="login.html";
        })

     })

	})
})




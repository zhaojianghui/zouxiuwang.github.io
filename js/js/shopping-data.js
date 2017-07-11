 
require(['../../config'],function(){
require(['jquery','shopping-data',"swiper","zepto"],function($,shoppingdata,swiper,Zepto){
	    $(".shopcat").click(function(){
	    	window.location.href = "shoppingCat.html"
	    })
		$('.left').click(function(){
			 window.location.href="list.html"
		})
		var str=window.location.href;
		//console.log(str)
		var str1=str.split('?')[1];
		var str2=str1.split('=')[1];
		var allData;
		$.get('http://datainfo.duapp.com/shopdata/getGoods.php?callback=?&goodsID='+str2,function(data){
			//console.log(data)
			allData=data;			
			var url=JSON.parse(data[0].imgsUrl);
			//console.log(url);
			 var con='';
			 for(var i=0;i<data.length;i++){
			     con+='<div class= "box">'+
					    '<div class="swiper-container">'+
					        '<div class="swiper-wrapper">'+
				            '<div class="swiper-slide"><img src="'+url[0]+'"></div>'+
				            '<div class="swiper-slide"><img src="'+url[1]+'"></div>'+
				            '<div class="swiper-slide"><img src="'+url[2]+'"></div>'+
				            
		               '</div>'+
		       
			         '<div class="swiper-pagination"></div>'+
			        
			         '</div>'+
		            '<div class="circle"></div>'+
		            '</div>'+
		            '<div class = "gooddata">'+			
							'<p>'+data[i].goodsName+'</p>'+
							'<p class= "price"><span>￥'+data[i].price+'</span><s>259</s></p>'+
							'<p>购买人数：<span>'+data[i].buynumber+'</span></p>'+
		            '</div>'	
			     }
			     $('.header').after(con);
			     var swiper = new Swiper('.swiper-container', {
				        pagination: '.swiper-pagination',
				        slidesPerView: 3,
				        paginationClickable: true,
						loop:true
                 });
                
				$('#addtocat').on('click','a',function(){			
					 var id=allData[0].goodsID;	
					 var userID=localStorage.getItem('userID');
					 $.getJSON('http://datainfo.duapp.com/shopdata/updatecar.php?callback=',{userID:userID,goodsID:id,number:1},function(data){
					 	  if(data==1){
					 	  	alert('添加成功')
					 	  }else{
					 	  	alert('添加失败')
					 	  }
					 });
					 //window.location.href="shoppingCat.html?goodsID="+id;
				})
		},'json')
		$('.detail').click(function(){
			window.location.href="good-detail.html?goodID="+str2;
		})
		
	})
})
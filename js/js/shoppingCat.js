
require(['../../config'],function(){
	require(['jquery','shoppingCat'],function($,shoppingCat){
     	    var userID = localStorage.getItem('userID');
			var con='';
			var totalprice=0;
			$.getJSON('http://datainfo.duapp.com/shopdata/getCar.php?callback=?&userID='+userID,function(data){
				for(var i=data.length-1;i>0;i--){
				
				con+='<div class="goods" data-id = "'+data[i].goodsID+'">'+
						'<div class= "left">'+
							'<img src="'+data[i].goodsListImg+'" alt="" />'+
						'</div>'+
						'<div class="center">'+
						'<p>ESPRIT: '+data[i].goodsName+'</p>'+
							'<p>单价：￥<span class="price">'+data[i].price+'</span></p>'+
							'<p class = "number">数量：'+
								'<span class = "reduce">-</span>'+
								'<input type="text" value="1" class="num"/>'+
								'<span class = "plus">+</span>'+
							'</p>'+
						'</div>'+
						'<div class= "right">'+
							'<a href="javascript:;" class="delet">'+
								'<img src="img/9_03.png"/>'+
							'</a>'+
						'</div>'+
					'</div>'
				//console.log(data)
				totalprice +=Number( data[i].price);
				
				$('.priceAll').html('¥'+totalprice);
			}
			    $('.goodsAll').append(con);
			    getTotal();
			})
			
			var goods=$('.goods');
			
			 $(".goodsAll").on("click",".plus",function(){
					 var numb =	Number($(this).parentsUntil(".goods").find("input").val())+1+"";
					 $(this).parentsUntil(".goods").find("input").val(numb);
					 var price=Number($(this).parent().prev().find('.price').html());
					 getTotal();
					 
			})
			$(".goodsAll").on("click",".reduce",function(){
				if(Number($(this).parentsUntil(".goods").find("input").val())>1){
					var numb =	Number($(this).parentsUntil(".goods").find("input").val())-1+"";
			 		$(this).parentsUntil(".goods").find("input").val(numb);
			 		var price=Number($(this).parent().prev().find('.price').html());
			 		getTotal();
					
				}
			
			})
			$(".goodsAll").on("click",".delet",function(){
				//console.log(1)
				var goodsId = $(this).parents(".goods").attr("data-id")
				$(this).parents(".goods").remove();
				$.get('http://datainfo.duapp.com/shopdata/updatecar.php?callback=',{userID:userID,goodsID:goodsId,number:"0"},function(data){
					console.log(data)
					if(data == 1){
						console.log("删除成功")
					}else{
						console.log("删除失败")
					}
					getTotal()
					
				})
				
			})
			function getTotal(){
            //循环计算总金额，和总量
            var totalNumber = 0;
            var totalPrice = 0;
            $('.goodsAll').find(".goods").each(function (index) {
                var number = $(this).find(".num").val();
                var price = $(this).find(".price").html();
                //console.log(number)
                totalNumber+=number*1;
               // console.log(totalNumber)
                totalPrice+=price*number;
            });
			//console.log(totalNumber)
            $('.priceAll').html("¥"+totalPrice);
            $(".goods-tatolnum").html(totalNumber)

        }
		
		  $('.list-item').click(function(){
			var index=$(this).index();
			//console.log($(this).index())
			$(this).addClass('active').siblings().removeClass('active');
			if(index==1){
				window.location.href="list.html"
			}
			if(index==3){
				window.location.href="user.html"
			}
			if(index==4){
				window.location.href="reward.html"
			}
		})
		
		var channel = null;
   		
   		document.addEventListener("plusready",function(){
   			
   			//获取 支付通道
   			plus.payment.getChannels(function(channels){
   				channel = channels[0]//使用支付宝
   				for(var i=0;i<channels.length;i++){
   					console.log(JSON.stringify(channels[i]))
   					
   				}
   				
   			},function(){
   				
   			})
   		},false)
   		//获取支付信息的服务器地址
   		var ALIPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total=';
   		var PAYSERVER='http://demo.dcloud.net.cn/payment/?payid=wxpay';
		$('.settlement').click(function(){
			 var tPrice= $('.priceAll').html();
		
		console.log(tPrice)
			  // 向后台获取订单信息
   			var xhr = new XMLHttpRequest();
	   			xhr.open("get",ALIPAYSERVER+tPrice.substr(1));
	   			xhr.send();
	   			xhr.onreadystatechange=function(){
	   				if(xhr.readyState==4&&xhr.status==200){
	   					console.log(xhr.responseText)//订单信息和签名认证
	   					
	   					//发起支付请求 参数1（通过什么方式支付）参数2（订单信息和签名认证）
	   					plus.payment.request(channel,xhr.responseText,function(){
	   						plus.nativeUI.alert("支付成功")
	   					},function(){
	   						plus.nativeUI.alert("支付失败")
	   					})
	   				}
	   			}
		})
	  

		
	})
})

require(['../../config'],function(){
	require(['jquery','list','iscroll','common'],function($,list,IScroll,common1){
	    var myScroll = new IScroll(".scroll-wrap",{
	    	click:true
	    });
	    var current='1';
	    var Odata=[];
	    var pageCode=0;
	    var linenumber=4;
	    
	    getData();
		$('.shopping').click(function(){
			console.log(1)
			pageCode=0;
			$(this).addClass('active').siblings().removeClass('active');
		    current=$(this).attr('data-classID');
		    getData(current);
		    console.log(current)
	    })
		myScroll.on('scrollEnd',function(){
			//console.log(this.y);
			//console.log(this.maxScrollY);
			if(this.y==this.maxScrollY){
				pageCode++;
				getData();
			}
		})
		$('.list-item').click(function(){
			var index=$(this).index();
			//console.log($(this).index())
			$(this).addClass('active').siblings().removeClass('active');
			if(index==2){
				window.location.href="shoppingCat.html";
			}
			if(index==3){
				window.location.href="user.html"
			}
			if(index==4){
				window.location.href="reward.html"
			}
		})
		function getData(){
			common.showLoading();
			$.getJSON('http://datainfo.duapp.com/shopdata/getGoods.php?callback=?&classID='+current+'&pageCode='+pageCode+'&linenumber='+linenumber,function(data){
			     //console.log(data);
			      Odata=data;
			     var con='';
			     for(var i=0;i<data.length;i++){
			     	con+='<li>'+
			     	'<a href="javascript:;" data-id="'+data[i].goodsID+'">'+
			     	'<img src="'+data[i].goodsListImg+'" alt="" />'+
			     	'</a>'+
			     	'<p>'+data[i].goodsName+'</p>'+
			     	'<p>'+
			     	'<span>¥'+data[i].price+'</span>'+
			     	'<span>¥999</span>'+
			     	'</p></li>';					    																																													    	
			     }
			     if(pageCode==0){
			     	$('.shoping-item').html(con);
			     }else{
			     	$('.shoping-item').html($('.shoping-item').html()+con);
			     }
			     
			    
			     myScroll.refresh();	
			     common.hideLoading()
		})
		}
		$(".toshopCart").click(function(){
			window.location.href="shoppingCat.html"
		})
		$('.shoping-item').on('click','a',function(){
			var id=$(this).attr('data-id');
			//console.log(id);
			var prodata={};
			for(var i=0;i<Odata.length;i++){
            //通过循环，找到当前点击的商品的数据
            if(Odata[i].goodsID==id) {
                prodata = Odata[i];
                break;
            }
           }
            var proHistory = JSON.parse(localStorage.getItem("proHistory")||'[]');
            for(var i=0;i<proHistory.length;i++){

	           if(proHistory[i].goodsID==id){
	               //循环判断，数组里面如果有商品的id ==当前添加的商品id
	               proHistory.splice(i,1) //删除
           }
        }
         //把当前点击的商品信息添加到   历史记录里面
        proHistory.unshift(prodata);
        localStorage.setItem("proHistory",JSON.stringify(proHistory))
	    window.location.href="shopping-data.html?goodsID="+id;
		})
		
		
		var shares=[];
        var s;
        var btns;
        if(plus){
        	share();
        }else{
        	document.addEventListener("plusready",function(){
        	 share();
        },false)
        }
        
        function  share(){
        	plus.share.getServices(function(services){
        		console.log(JSON.stringify(services));
        		shares=services;  
        		btns=shares.map(function(ele,index){
        			return {title:ele.description}
        		})
        		console.log(btns);
        	})
        	plus.nativeUI.actionSheet({title:"分享",cancel:"取消",buttons:btns},function(e){
				console.log("User pressed"+e.index);
				//判断按钮的下标不为0
				if(e.index){
					var s = shares[e.index-1];
				console.log(JSON.stringify(s));
				shareIn(s);
				}
				
			});
        }
      $('.share').on('click',function(){
      	   share();
      }) 
      function shareIn(s){
      	  if(s.authenticated){
   				//直接分享
   				sendMsg(s)
   			}else{
   				//先授权
   				s.authorize(function(){
   					//授权成功  =》分享
   					sendMsg(s)
   				},function(e){
   					//授权失败
   					plus.nativeUI.toast("授权失败")
   				})
   			}
      }
     function sendMsg(s){
   			var msg = {
   				title:"点击进入偶滴世界",
   				thumbs:["img/flower.jpg"],
   				href:"http://zhaojianghui.duapp.com/17045/src/list.html"
   			};
   			s.send(msg,function(){
   				plus.nativeUI.toast("分享成功")
   			},function(err){
   				plus.nativeUI.toast("分享失败")
   				console.log(err.message)
   			})
   		} 
      
		
	})
})
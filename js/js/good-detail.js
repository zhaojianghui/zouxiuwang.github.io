 
require(['../../config'],function(){
require(['jquery','good-detail'],function($,goodDetail){
	    var str=window.location.href;
		var str1=str.split('?')[1];
		var str2=str1.split('=')[1];
		
		$.get('http://datainfo.duapp.com/shopdata/getGoods.php?callback=?&goodsID='+str2,function(data){
			console.log(data);
			var data1=data[0].detail.split('。');
			console.log(data1);
			var con='';
			for(var i=0;i<data.length;i++){
				con+='<img src="'+data[0].goodsListImg+'" alt="" />'+
				'<div class="shop-con">'+
					'<p>'+data1[0]+'</p>'+
					'<p>'+data1[1]+'</p>'+
					'<p>'+data1[2]+'</p>'+
					'<p>'+data1[3]+'</p>'+
				'</div>'
			}
			$('.list-shop').html(con);
		},'json')
		$('.fuhao').click(function(){
			window.location.href="shopping-data.html?goodsID="+str2;
		})
		$('.gwc').on('click','a',function(){
			window.location.href="shoppingCat.html?goodsID="+str2;
		})
	})
})
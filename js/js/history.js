require(['../../config'],function(){
	require(['jquery','history'],function($,history){
		var proHistory = JSON.parse(localStorage.getItem("proHistory"))||'[]';
        var con='';  
        if(proHistory=='[]') return;
         for(var i=0;i<proHistory.length;i++){
         	  con+='<div class="goods">'+
						'<div class= "left">'+
							'<a href="list.html?goodsID="'+proHistory[i].goodsID+'">'+
							'<img src="'+proHistory[i].goodsListImg+'"/></a>'+
						'</div>'+
						'<div class="center">'+
							'<p>ESPRIT: '+proHistory[i].goodsName+'</p>'+
							'<p>单价：￥<span>'+proHistory[i].price+'</span></p>'+
							
						'</div>'+
						'<div class= "right">'+
							'<a href="javascript:;" class="delete">'+
								'<img src="img/9_03.png"/>'+
							'</a>'+
						'</div>'+
					'</div>'
                  
 	}
       $('.goodsAll').html(con);
       $('.return').click(function(){
       	 window.location.href="user.html";
       })
       $('.gwc').click(function(){
       	 window.location.href="shoppingCat.html";
       })
      
       $('.delete').click(function(){
       	   var index=$(this).parents('.goods').index();
       	   console.log(index);
       	   $(this).parents('.goods').remove();
       	   var dataOne=JSON.parse(localStorage.getItem('proHistory'))[index]
       	   //console.log(dataOne)
       	   localStorage.removeItem( dataOne);      	   
       	  
       })
	})
})

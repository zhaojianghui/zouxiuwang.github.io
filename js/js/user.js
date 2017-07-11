require(['../../config'],function(){
	require(['jquery','user'],function($,user){
		
			
		var userID=localStorage.getItem('userID')||'未知';
		//console.log(userID)
		if(userID){
			$('.username').html(userID)
		}
		
		$('.list-item').click(function(){
			var index=$(this).index();
			//console.log($(this).index())
			$(this).addClass('active').siblings().removeClass('active');
			if(index==1){
				window.location.href="list.html"
			}
			if(index==2){
				window.location.href="shoppingCat.html"
			}
			if(index==4){
				window.location.href="reward.html"
			}
		})
		$('.history').click(function(){
			window.location.href="history.html";
		})
		$('.login').click(function(){
			window.location.href="login.html";
		})
		$('.user-img').click(function(){
			$('.filter').css({display:'block'});
		})
	
		
		
    	
    	
   		
		$("#camera").click(function(){
			//原生 ios/android的摄像头
			$('.filter').css({display:'none'});
   			var cmr = plus.camera.getCamera(); //获取摄像头管理对象；
   			
   			//兼容ios和android
   			cmr.captureImage(function(pic){
   				console.log("success: "+pic)
   				//pic 照片的名(URL参数)
   				
   				//需要同io对象获取本地的图片对象
   				plus.io.resolveLocalFileSystemURL(pic,function(entry){
   					//entry 就是本地的照片对象
   					console.log(entry.fullPath)
   					window.localStorage.setItem("user-pic",entry.fullPath)
   					oPic.src = entry.fullPath //让img的 src = 图片的绝对路径
   					savePicture(entry.fullPath);
   				},function(err){
   					
   				})
   				
   			},function(err){
   				console.log("err: "+err)
   			})
		})
		var oPic = document.querySelector(".user-img");
    	var picUrl = window.localStorage.getItem("user-pic");   	
    	oPic.src=picUrl;
    	
    	
    	function savePicture(picUrl){
    		plus.gallery.save(picUrl,function(){
    			alert('保存成功');
    		})
    	}
    	function galleryImg(picUrl){
    		plus.gallery.pick(function(picUrl){
    			console.log(picUrl)
    			window.localStorage.setItem("user-pic",picUrl)
    			oPic.src = picUrl;
    		},function(e){
    			console.log('取消选择照片')
    		},{filter:"image"})
    	}
    	$('#photo').click(function(){
    		$('.filter').css({display:'none'});
    		 galleryImg(picUrl);
    		 oPic.src = picUrl;
    	})
    	oPic.src=picUrl;
	})
})

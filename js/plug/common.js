
var common={
	loading:null,
	showLoading:function(){
		if(this.loading){
			this.loading.show();
		}else{
			this.loading=$("<div id='loading'>loading</div>");
			this.loading.appendTo(document.body);
		}
		
	},
	hideLoading:function(){
		$('#loading').hide();
	}
}

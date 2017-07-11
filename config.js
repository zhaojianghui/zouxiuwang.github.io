require.config({
	baseUrl: 'js',
	paths: {
		"jquery": "lib/jquery",
		"template": "plug/template",
		"list": "js/list",
		"reward":"js/reward",
		"user":"user",
		"reg":"reg",
		"login":"login",
		"shoppingCat":"shoppingCat",
		"shopping-data":"shopping-data",
		"swiper":"plug/swiper.min",
		"zepto":"plug/zepto.min",
		"goodDetail":"js/good-detail",
		"history":"js/history",
		"iscroll":"plug/iscroll",
		"common":"plug/common"
	},
	shim:{
		"common":['jquery']
		
	}

})
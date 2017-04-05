'use strict';

var meta = module.parent.require('./meta');
var user = module.parent.require('./user');
var nconf = require('nconf');

var db = module.parent.require('./database'); // NodeBB / src / database 참고.
var au = module.parent.require('./controllers/authentication'); // NodeBB / src / controllers 참고.

var winston = require('winston');
// 모듈 객체.
var plugin = {};

plugin.init = function (params, callback)	{
	var router = params.router;

	winston.info('Start community..');

	router.get('/community', function ()	{
		console.log(arguments);
	});

	callback();
}

plugin.verifyUser = function (token, callback)	{
	
}

// 이 함수는 NodeBB 에서 어떤 동작 또는 페이지이동 때마다 호출되므로 계속해서 토큰을 받아오고 유저 유효성 검사를 할 것이다.
// 그러므로 함수 첫줄에 세션 확인을 하는 구문을 만들어 같은 세션일 경우 유저 유효성 검사를 넘어가도록 한다.
plugin.addMiddleware = function (req, res, next)	{
	nconf.set('mongo:database', 'biobank-session');
	db.init(function ()	{
		console.log(arguments);
	})
	console.log('login add middle ware!!', req.headers.cookie);
	// 이미 있는 세션일 경우 요청 프로퍼티에 user 와 user 안에 uid 가 존재 한다.
	// TODO.
	// 로그아웃 후 창을 닫고 바이오클라우드에서 다시 커뮤니티로 접속하면 세션관련 리프레쉬가 발생한다.
	// 이 경우 세션이 변경됨을 확인하고 리프레쉬를 해줘야한다.
	var hasSession = req.hasOwnProperty('user') && req.user.hasOwnProperty('uid') && parseInt(req.user.uid, 10) > 10;

};
// 로그아웃 함수.
plugin.doLogout = function (data, callback)	{
	winston.info('Do logout..');

	if (typeof callback === 'function')	{
		callback();	
	} else {
		return true;
	}
}

module.exports = plugin;
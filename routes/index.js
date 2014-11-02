var express = require('express');
var request = require('request');
var router = express.Router();
var endpoint = 'http://wired.com/wp-json';
var moment = require('moment');

router.get( '/', function(req, res) {
	request(
		{ url: endpoint + '/posts/', json: true },
		function( error, response, body ) {
			res.render( 'index', {
				posts: body,
				title: 'Wired',
				subtitle: 'Get in-depth coverage of current and future trends in technology, and how they are shaping business, entertainment, communications, science, politics, and culture at Wired.com.'
			});
		}
	);
});

// Let's add archive pagination
router.get( '/page/:num', function(req, res) {
	var num = req.params.num;
	request(
		{ url: endpoint + '/posts/?page=' + num, json: true },
		function( error, response, body ) {
			res.render( 'archive', {
				posts: body,
				title: 'Wired',
				page: num
			});
		}
	);
});

router.get( '/:year/:month/:slug', function(req, res) {
	var slug = req.params.slug;
	request(
		{ url: endpoint + '/posts/?filter[name]=' + slug, json: true },
		function( error, response, body ) {
			res.render( 'single', {
				post: body[0],
				title: body[0].title,
				subtitle: body[0].excerpt,
				post_time: moment( body[0].date ).format('MMMM Do YYYY, h:mm'),
				link: body[0].link.replace( 'http://wired.com/', '' )
			});
		}
	);
});
module.exports = router;

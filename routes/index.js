var express = require('express');
var request = require('request');
var router = express.Router();
var endpoint = 'http://www.wired.com/wp-json';
var moment = require('moment');
var WP = require( 'wpapi' );
var wp = new WP({ endpoint: endpoint });

router.get( '/', function(req, res) {
	wp.posts().embed().get(function( err, data ) {
		if ( err ) {
			console.log('womp womp');
		}
		res.render( 'index', {
			posts: data,
			post: data[0],
			title: 'WIRED',
			subtitle: 'Get in-depth coverage of current and future trends in technology, and how they are shaping business, entertainment, communications, science, politics, and culture at WIRED.com.',
			page: 0,
			home: true,
		});
	});
});

// Let's add category archives pagination
router.get( '/category/:slug', function(req, res) {
	var slug = req.params.slug;
	wp.posts().filter({category_name: slug}).embed().get(function( err, data ) {
		if ( err ) {
			console.log('womp womp');
		}
		res.render( 'category', {
			posts: data,
			title: 'WIRED',
			slug: slug,
			page: 1
		});
	});
});

// Let's add category archives pagination
router.get( '/category/:slug/page/:num', function(req, res) {
	var num = req.params.num;
	var slug = req.params.slug;
	wp.posts().filter({ category_name: slug }).page( num ).embed().get(function( err, data ) {
		if ( err ) {
			console.log('womp womp');
		}
		res.render( 'category', {
			posts: data,
			title: 'WIRED',
			slug: slug,
			page: num
		});
	});
});

// Let's add archive pagination
router.get( '/page/:num', function(req, res) {
	var num = req.params.num;
	var slug = req.params.slug;
	wp.posts().filter({ category_name: slug }).page( num ).embed().get(function( err, data ) {
		if ( err ) {
			console.log('womp womp');
		}
		res.render( 'archive', {
			posts: data,
			title: 'WIRED',
			slug: slug,
			page: num
		});
	});
});

router.get( '/:year/:month/:slug', function(req, res) {
	var slug = req.params.slug;
	console.log( slug );
	wp.posts().name(slug).embed().get(function( err, data ) {
		console.log( data );
		if ( err ) {
			console.log('womp womp');
		}
		res.render( 'single', {
			post: data[0],
			title: data[0].title.rendered,
		});
	});
});
module.exports = router;

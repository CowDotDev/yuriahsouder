/*
 * skillsAnimation Function
 * Loop through all of the skills in the header.
 * Call skillsAnimation.animateHeadline(parameter) where parameter is the parent element holding the skills.
 */
var skillsAnimation = (function(w, d, pub){
	var animationDelay = 5000;

	pub.animateHeadline = function($headlines) {
		$headlines.each(function(){
			var headline = $(this);
			setTimeout(function(){ pub.hideWord( headline.find('.is-visible') ) }, animationDelay);
		});
	}
	pub.hideWord = function($word) {
		var nextWord = pub.takeNext($word);
		pub.switchWord($word, nextWord);
		setTimeout(function(){ pub.hideWord(nextWord) }, animationDelay);
	}
	pub.takeNext = function($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}
	pub.switchWord = function($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}

	return pub;
})(window, document, {});
/*
 * pageAnimation Function
 * Event handlers for each page so the elements fadeIn/fadeOut appropriately.
 * Call pageAnimation.createEvents() to initiate page animations on scroll.
 */
var pageAnimation = (function(w, d, pub){
	var siteNav = $("#siteNav");
	var nameHeader = $("#nameHeader");

	pub.createEvents = function(){
		indexPage();
		skillsPage();
		contactPage();
	}
	pub.navScroll = function(){
		$(".js-navLink").click(function(e){
			e.preventDefault();
			var id = $(this).attr('href');
			$('html, body').animate({
			    scrollTop: $(id).offset().top
			}, 1000);
		});
	}
	indexPage = function(){
		$("#indexPage").fracs(function(data){
			if(data.visible > .50 && siteNav.hasClass('contact')){
				siteNav.removeClass();
				nameHeader.removeClass();
				nameHeader.addClass('rotateElement');
			}

			var fade = data.visible;
				fade = (fade != 1) ? fade * .75 : 1;
				fade = (fade <= .15) ? 0 : fade,
				yuriah = $("#yuriah");

			yuriah.css('opacity',fade);
			$("#addToTimelineMsg").css('opacity',fade);

			// Hide the Picture from the DOM so it doesn't overlay text on additional page(s)
			if(fade == 0 && yuriah.is(':visible')){
				yuriah.hide();
			}else if(fade > 0 && !yuriah.is(':visible')){
				yuriah.show();
			}
		});
		$("#indexPageAdditional").fracs(function(data){
			if(data.visible > .50 && (siteNav.hasClass('contact') || siteNav.hasClass('skills'))){
				siteNav.removeClass();
				nameHeader.removeClass();
				nameHeader.addClass('rotateElement');
			}

			$("#summary").css('opacity',data.visible);
		});
	}
	skillsPage = function(){
		$("#skillsPage").fracs(function(data){
			if(data.visible > .50 && !siteNav.hasClass('skills')){
				siteNav.removeClass();
				siteNav.addClass('skills');
				nameHeader.removeClass();
				nameHeader.addClass('skills rotateElement');
			}
		});
	}
	contactPage = function(){
		$("#contactPage").fracs(function(data){
			if(data.visible > .50 && !siteNav.hasClass('contact')){
				siteNav.removeClass();
				siteNav.addClass('contact');
				nameHeader.removeClass();
				nameHeader.addClass('contact rotateElement');
			}

			$("#contactForm").css('opacity',data.visible);
		});
	}

	return pub;
})(window, document, {});
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
	pub.createEvents = function(){
		indexPage();
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
			var fade = data.visible;
				fade = (fade != 1) ? fade * .75 : 1;
				fade = (fade <= .15) ? 0 : fade,
				yuriah = $("#yuriah");

			yuriah.css('opacity',fade);
			$("#addToTimeline").css('opacity',fade);

			// Hide the Picture from the DOM so it doesn't overlay text on additional page(s)
			if(fade == 0 && yuriah.is(':visible')){
				yuriah.hide();
			}else if(fade > 0 && !yuriah.is(':visible')){
				yuriah.show();
			}
		});
		$("#indexPageAdditional").fracs(function(data){
			$("#summary").css('opacity',data.visible);
		});
	}

	return pub;
})(window, document, {});
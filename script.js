function randomchick(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function clock() {
    var d = new Date();
    var month_num = d.getMonth()
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря");

    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;

    date_time = day + " " + month[month_num] + " " + d.getFullYear() +
    " в "+ hours + ":" + minutes;
    
    return date_time;
}

function Generator(){
	 this.bind();
}

Generator.prototype = {
	init: function(){
		this.wordbook = {};
        this.article = [];
        this.currentWord = [];
    },

    bind: function () {

        $('.b-btnStart').on('click', function(){
            this.init();
            this.create();
        }.bind(this));

    },

    create: function() {
        $('.b-article__text').text(' ');
        $('.b-article__comment__box').html(' ');
        $('#comments_count').text(0);
        $('.b-articleBox__options').addClass('loader');
        var minAr = parseInt($('#numberArticleMin').val()),
            maxAr = parseInt($('#numberArticleMax').val()),
            minSen = parseInt($('#numberSentenceMin').val()),
            maxSen = parseInt($('#numberSentenceMax').val()),
            minWor = parseInt($('#numberWordsMin').val()),
            maxWor = parseInt($('#numberWordsMax').val());
        var numberArticle = randomchick(minAr,maxAr);
               
        $.get('habr.html', function(data) {
		    var textHabr = data;
            var numberComment = randomchick(1,15);
		    var resultText = textHabr.replace(/<[^>]+>/g,'').replace(/[/.,!?;{}:—()]*/g, '').toLowerCase() ; 

		    var words = resultText.split(/\s/).filter(function(item) {
		        return item !== "";
		    });

			

            for (var i=0; i<numberArticle; i++) {
				$('.b-article__text').append('<p class="b-article__text__p"></p>');
			}

            $('.b-article__text__p').each(function(){
                var numberSentence = randomchick(minSen,maxSen);
                for (var i=0; i<numberSentence; i++) {
                    $(this).append('<span class="b-article__text__span"></span>');
                }
            });

            $('.b-article__text__span').each(function(){
                var numberWords = randomchick(minWor,maxWor);  
                $(this).html('<span>' + words[randomchick(1,words.length)] + '</span>');
                for (var i=1; i<numberWords; i++) {                 
                    $(this).append(' ' + words[randomchick(1,words.length)]);
                }
            });


            for (var i=0; i<numberComment; i++) {
                $('.b-article__comment__box').append('<div class="b-article__comment__item"><div class="b-article__comment__item__info"><img src="/img/comment'+randomchick(1,4)+'.png"><span>'+clock()+'</span></div><p class="b-article__comment__item__text"></p></div>');
                $('#comments_count').text(numberComment);
            }
            $('.b-article__comment__item__text').each(function(){
                for (var i=0; i<randomchick(1,150); i++) {
                    $(this).append(' ' + words[randomchick(1,words.length)]);
                }
            });
            
            $('.b-date').html(clock());
		}).done(function() {
           $('.b-articleBox__options').removeClass('loader');
            $('.b-article').addClass('active');
        });
    }

}

$(document).ready(function(){
    new Generator();
});

function initBoard(){
  $("#bingo tr td:not(.popout), #selected td").click(function(){
    if ($(this).hasClass('greensquare')) {
      $(this).removeClass('greensquare').addClass('redsquare');
    } else if ($(this).hasClass('redsquare')) {
    $(this).removeClass('redsquare').addClass('blank');
    } else if ($(this).hasClass('blank')) {
    $(this).removeClass('blank').addClass('greensquare');
    }
  });
  $("#bingo tr td:not(.popout), #selected td").addClass("blank");


	$("#row1").hover(function() { $(".row1").addClass("hover"); }, function() {	$(".row1").removeClass("hover"); });
	$("#row2").hover(function() { $(".row2").addClass("hover"); }, function() {	$(".row2").removeClass("hover"); });
	$("#row3").hover(function() { $(".row3").addClass("hover"); }, function() {	$(".row3").removeClass("hover"); });
	$("#row4").hover(function() { $(".row4").addClass("hover"); }, function() {	$(".row4").removeClass("hover"); });
	$("#row5").hover(function() { $(".row5").addClass("hover"); }, function() {	$(".row5").removeClass("hover"); });

	$("#col1").hover(function() { $(".col1").addClass("hover"); }, function() {	$(".col1").removeClass("hover"); });
	$("#col2").hover(function() { $(".col2").addClass("hover"); }, function() {	$(".col2").removeClass("hover"); });
	$("#col3").hover(function() { $(".col3").addClass("hover"); }, function() {	$(".col3").removeClass("hover"); });
	$("#col4").hover(function() { $(".col4").addClass("hover"); }, function() {	$(".col4").removeClass("hover"); });
	$("#col5").hover(function() { $(".col5").addClass("hover"); }, function() {	$(".col5").removeClass("hover"); });

	$("#tlbr").hover(function() { $(".tlbr").addClass("hover"); }, function() {	$(".tlbr").removeClass("hover"); });
	$("#bltr").hover(function() { $(".bltr").addClass("hover"); }, function() {	$(".bltr").removeClass("hover"); });

  $("#bingo tr td:not(.blank)").click(function(){
    var line = $(this).attr("id");
    $('.'+ line).each(function(){
      if ($(this).hasClass('greensquare')) {
       $(this).removeClass('greensquare').addClass('redsquare');
      } else if ($(this).hasClass('redsquare')) {
        $(this).removeClass('redsquare').addClass('blank');
      } else if ($(this).hasClass('blank')) {
        $(this).removeClass('blank').addClass('greensquare');
      }
    });
  });

}

var bingo = function(bingoList, size, type, seed) {
	var bingoBoard = seededShuffle(bingoList, seed);

	//var bingoGeneric = _.shuffle(bingoListGeneric);
	var bingoComplete = bingoBoard.slice(0,25);

  // if (conferenceName == "TouhouRember"){
    // bingoGeneric = seededShuffle(bingoListTouhouRember, seed);
	// console.log(bingoGeneric);
  // }
  

	if (conferenceName != "All"){
	//10 generic entries feels like a good number with what we have
	//bingoGeneric = bingoGeneric.slice(0,0);
	//bingoComplete = bingoBoard.slice(0,25);
	}
	$("#bingo tr td:not(.popout), #selected td").removeClass("blank redsquare greensquare");
	$("#bingo tr td:not(.popout), #selected td").addClass("blank");
	
	for (i=0;i<25;i++) {
		$('#slot'+(i+1)).text(bingoComplete[i]);
	}


	return true;
}; // setup

function reseedPage() {
	var qSeed = "?seed=" + Math.ceil(999999 * Math.random());
	window.location = qSeed;
	return false;
}

function seedPage() {
	var searchParams = new URLSearchParams(window.location.search)
	var urlSeed
	urlSeed = $('#seed').val();
	
	var qSeed = "?seed=" + urlSeed;
	window.location = qSeed;
	return false;
}

function copyCommandToCB() {
	let seed = $('#seed').val();
	let copyResult = `!setseed ${seed}`
	
	navigator.clipboard.writeText(copyResult)
	
	$('#copyToolTip').fadeTo(500, 100);
	$('#copyToolTip').fadeTo(10000, 0);
}

// Backwards Compatability 
var srl = { bingo:bingo };

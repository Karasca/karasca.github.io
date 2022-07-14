var conferenceName;
var boardImage = "./images/makimono.png";
var boardExists = false;
function newbingo() {
	//Get 'seed' param from the textbox or the URL and shove it in a variable, 
	//if no seed is provided anywhere randomly generate a new one
	var searchParams = new URLSearchParams(window.location.search)
	var urlSeed
	urlSeed = $('#seed').val();
	var urlStream

	if(urlSeed == ''){
		if(searchParams.has('seed')){
			urlSeed = searchParams.get('seed');
		}else{
			if(searchParams.has('stream')){
				urlStream = searchParams.get('stream')
				reseedPage(urlStream)
			}else{
				reseedPage('naro')
			}
		}
	}
	
	if(isNaN(urlSeed)){
		urlSeed = 999999999
	}
	
	if(urlSeed == 999999999){
		$('#baka').show();
	}
	
	
	var e = document.getElementById("conference");
	conferenceName = e.options[e.selectedIndex].value;
	var shortname = conferenceName.split(' ').join('');
	var bingoList = 'bingoList'+shortname;	

	var random100 = (Math.floor(Math.random() * 100) + 1);
	Touhoubingo();

	  if (boardExists === false){
		initBoard();
		boardExists = true;
	  }
	  srl.bingo(window[bingoList], 5, conferenceName, urlSeed);
	  
	  $('#FreeSpace').attr('src',"./images/"+shortname+".png");
	  $('#koisher').attr('src',"./images/Koish1.png");
	  $('#seed').attr('value', urlSeed);
	  
	  if (conferenceName != "All"){
		if (random100 < 25){
			if(random100 < 13){
				if(random100 == 9){
					$('#FreeSpace').attr('src',"./images/"+shortname+"Cirnium.gif");
				}
				else if(random100 == 10){
					$('#FreeSpace').attr('src',"./images/"+shortname+"Blob.gif");
					$('#koisher').attr('src',"./images/Koish2.png");
				}else{
					$('#FreeSpace').attr('src',"./images/"+shortname+"Ree.gif");
				}

			}
			else{
				$('#FreeSpace').attr('src',"./images/"+shortname+"Orin.gif");
			}
		}
		else{
		  $('#FreeSpace').attr('src',"./images/"+shortname+".png");
		}
	  }
	  
		  
	updateTable();
	
	// change stream links/loc to current streamer
	$('#streamName').text(`${truncate(localStorage.getItem("stream"), 25)}`)
	$('#streamLink').attr("href", `https://twitch.tv/${localStorage.getItem("stream")}`)

}

function truncate(string, n){
	return (string.length > n ) ? string.substr(0, n-1 ) + '...' : string
}
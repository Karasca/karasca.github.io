function updateTable(){	
	const evtSource = new EventSource('https://karasca.com/registrations/')
	var htmlResult = `<tr><th id="th-reg">Username</th><th id="th-reg">Seed</th>`;
	
	let jsonRes = []

	evtSource.onmessage = (e) => {
		jsonRes = JSON.parse(e.data)

		jsonRes.forEach((item) => {
		  	htmlResult += `<tr id="tr-reg"><td>${item.username}</td><td>${item.seed}</td></tr>`
		})
		$('#registrations').html(htmlResult);
		jsonRes = []
	}

	evtSource.addEventListener("clear", (e) => {
		console.log(e.data);

		htmlResult = `<tr><th id="th-reg">Username</th><th id="th-reg">Seed</th>`;
		$('#registrations').html(htmlResult);
		jsonRes = []
	})

	evtSource.addEventListener("open-bingo", (e) => {
		console.log(e.data);
		console.log("Bingo Open!");
	})

	evtSource.addEventListener("close-bingo", (e) => {
		console.log(e.data);
		console.log("Bingo Closed!");
	})

	$(window).on('beforeunload', function(){
		evtSource.close();
	});
	
}

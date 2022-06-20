function updateTable(){		
	const remoteUrl = "https://karasca.com/registrations"
	const localUrl = "http://localhost:3000/registrations"

	const evtSource = new EventSource(remoteUrl);
	
	let jsonRes = []

	evtSource.addEventListener("message", (e) => {
		console.log(e.data)
		jsonRes = JSON.parse(e.data)
		if(Array.isArray(jsonRes)){
			var htmlResult = `<tr><th id="th-reg">Username</th><th id="th-reg">Seed</th>`;
			jsonRes.forEach((item) => {
				  htmlResult += `<tr id="tr-reg"><td>${item.username}</td><td>${item.seed}</td></tr>`
			})
			$('#registrations').html(htmlResult);
			jsonRes = []
		}
	})

	evtSource.addEventListener("clear", (e) => {
		console.log(e.data);
		htmlResult = `<tr><th id="th-reg">Username</th><th id="th-reg">Seed</th>`;
		$('#registrations').html(htmlResult);
		jsonRes = []
	})

	evtSource.addEventListener("open-bingo", (e) => {
		console.log(e.data)
		$('#message-status').html(`Registrations are open, press the <img src="images/copy.png" height = "16"/> icon next to the seed to copy the chat command and register your seed.`);
	})

	evtSource.addEventListener("close-bingo", (e) => {
		console.log(e.data)
		console.log("close event")
		$('#message-status').html(`Registrations are closed!`);

	})
	
	$(window).on('beforeunload', function(){
		evtSource.close();
	});
	
}

function updateTable(){	
	var htmlResult = `<tr><th id="th-reg">Username</th><th id="th-reg">Seed</th>`;
	
	$.getJSON('http://localhost:3001/registrations/', function(data) {
	data.forEach(e => {
		if(e != "undefined"){
			htmlResult += `<tr id="tr-reg"><td>${e.username}</td><td>${e.seed}</td></tr>`
		}
	})
	
	htmlResult+= `</tr>`
	
	$('#registrations').html(htmlResult);
  });
	
}
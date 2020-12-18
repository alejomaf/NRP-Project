function openPage(pageName, elmnt, color) {
	// Hide all elements with class="tabcontent" by default */
	var i, tabcontent, tablinks;
	tabcontent = $(".tabcontent");
	
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Remove the background color of all tablinks/buttons
	tablinks = $(".tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}


	// Show the specific tab content
	$("#" + pageName)[0].style.display = "block";
	// Add the specific color to the button used to open the tab content
	elmnt.style.backgroundColor = color;
}

function openMetrica(pageName, elmnt, color) {
	// Hide all elements with class="tabcontent" by default */
	var i, tabcontent, tablinks;
	tabcontent = $(".tabcontent2");
	
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Remove the background color of all tablinks/buttons
	tablinks = $(".tablink2");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].style.backgroundColor = "";
	}


	// Show the specific tab content
	$("#" + pageName)[0].style.display = "block";
	// Add the specific color to the button used to open the tab content
	elmnt.style.backgroundColor = color;
}


// Get the element with id="defaultOpen" and click on it
$("#defaultOpen").click();

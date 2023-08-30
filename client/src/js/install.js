const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
	window.deferredPrompt = event;
	butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
	console.log("Install Clicked");
	const promptEvent = window.deferredPrompt;
	if (!promptEvent) {
		console.log("Returning - false promptEvent");
		return;
	}
	promptEvent.prompt();
	window.deferredPrompt = null;
	butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
	console.log("appinstalled");
	window.deferredPrompt = null;
});

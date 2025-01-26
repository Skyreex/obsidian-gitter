import { App } from "obsidian";

export class Ribbon {
	plugin: Gitter;
	app: App;

	constructor(app: App, plugin: Gitter) {
		this.app = app;
		this.plugin = plugin;
		this.initIcons();
	}

	initIcons(): void {
		this.plugin.addRibbonIcon("cloud-upload", "Sync", (evt: MouseEvent) =>
			this.pushAction(evt),
		);

		this.plugin.addRibbonIcon("cloud-download", "Pull", (evt: MouseEvent) =>
			this.pullAction(evt),
		);
	}

	pushAction(evt: MouseEvent): void {
		console.log("localStorage", localStorage);
		const ls = spawn("pwd");

		ls.stdout.on("data", (data) => {
			console.log(`stdout: ${data}`);
		});

		ls.stderr.on("data", (data) => {
			console.error(`stderr: ${data}`);
		});

		ls.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
		});

		new Notice("This is a push notice!");
	}

	pullAction(evt: MouseEvent): void {
		new Notice("This is a push notice!");
	}
}

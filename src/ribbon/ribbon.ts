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
		new Notice("This is a push notice!");
	}

	pullAction(evt: MouseEvent): void {
		new Notice("This is a pull notice!");
	}
}

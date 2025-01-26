import { App } from "obsidian";

export class StatusBar {
	protected statutBarItem: unknown;

	constructor(
		protected app: App,
		protected plugin: Gitter,
	) {
		this.app = app;
		this.plugin = plugin;
		this.statutBarItem = this.plugin.addStatusBarItem();
		this.updateText("Ready");
	}

	updateText(text: string): void {
		this.statutBarItem.setText(text);
	}
}

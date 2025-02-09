import { App, PluginSettingTab, Setting } from "obsidian";

export interface ISettingTab {
	basePath: Setting;
	isGitInstalled: Setting;
	isRepoInitialized: Setting;
}

export class SettingTab extends PluginSettingTab {
	constructor(
		protected app: App,
		protected plugin: Gitter,
	) {
		super(app, plugin);
		this.plugin.addSettingTab(this);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		const item = new Setting(containerEl)
			.setName("Initialise Git")
			.addButton((button) =>
				button
					.setButtonText("Initialise")
					.setClass("mod-cta")
					.onClick(() => {
						this.plugin.settingsManager.init(this.plugin);
					}),
			);
		console.log(item);
		console.log(this);
		console.log(containerEl);
	}
}

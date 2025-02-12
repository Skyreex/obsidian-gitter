import { App, PluginSettingTab, Setting } from "obsidian";

export interface ISettingTab {
	gitInit: Setting;
}

export class SettingTab extends PluginSettingTab implements ISettingTab {
	gitInit: Setting;

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

		new Setting(containerEl)
			.setClass(
				this.plugin.settingsManager.isRepoInitialized ? "hidden" : "",
			)
			.setName("Initialise Git")
			.addButton((button) =>
				button
					.setButtonText("Initialise")
					.setClass("mod-cta")
					.onClick(() => {
						this.plugin.settingsManager.init(this.plugin);
					}),
			);
	}
}

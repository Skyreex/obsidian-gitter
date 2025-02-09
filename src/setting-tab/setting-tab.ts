import { App, PluginSettingTab, Setting } from "obsidian";

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

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settingsManager.mySetting)
					.onChange(async (value) => {
						this.plugin.settingsManager.mySetting = value;
						await this.plugin.settingsManager.save(this.plugin);
					}),
			);
	}
}

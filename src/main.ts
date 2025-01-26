import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { Ribbon } from "./ribbon/ribbon";
import { StatusBar } from "./status-bar/status-bar";
import { SettingTab } from "./setting-tab/setting-tab";
import { GitterModal } from "./modal/modal";
import { CommandsManager } from "./commands/commands-manager";
import { SettingsManager } from "./settings/settings-manager";

export default class Gitter extends Plugin {
	SettingsManager: SettingsManager;
	commandsManager: CommandsManager;
	settingTab: SettingTab;
	statusBar: StatusBar;
	ribbon: Ribbon;

	async onload() {
		this.settings = new SettingsManager(this.app, this);
		await this.settings.initialize();

		this.ribbon = new Ribbon(this.app, this);
		this.commandsManager = new CommandsManager(this.app, this);
		this.settingTab = new SettingTab(this.app, this);
		this.statusBar = new StatusBar(this.app, this);

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, "click", (evt: MouseEvent) => {
			console.log("click", evt);
			this.statusBar.updateText(`x: ${evt.x}, y: ${evt.y}`);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000),
		);
	}

	onunload() {}
}

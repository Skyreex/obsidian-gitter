import { App } from "obsidian";

export class SettingsManager implements ISettings {
	private _settings: ISettings;

	constructor(
		protected app: App,
		protected plugin: Gitter,
	) {
		this.app = app;
		this.plugin = plugin;
		this._settings = { ...DEFAULT_SETTINGS };
	}

	async initialize() {
		const loadedSettings = await this.plugin.loadData();
		this._settings = { ...loadedSettings };

		this.basePath = this.app.fileManager.vault.adapter.basePath;
	}

	async save() {
		await this.plugin.saveData(this._settings);
	}

	get basePath(): string {
		return this._settings.basePath;
	}

	set basePath(value: string) {
		this._settings.basePath = value;
	}
}

export interface ISettings {
	basePath: string;
}

export const DEFAULT_SETTINGS: ISettings = {
	basePath: "/",
};

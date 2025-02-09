export interface ISettings {
	basePath: string;
	isRepoInitialized: boolean;
}

export const DEFAULT_SETTINGS: ISettings = {
	basePath: "/",
	isRepoInitialized: false,
};

export class SettingsManager {
	private _settings: ISettings;

	constructor() {
		this._settings = { ...DEFAULT_SETTINGS };
	}

	static async create(
		plugin: Gitter,
		basePath: string,
	): Promise<SettingsManager> {
		const instance = new SettingsManager();
		await instance.loadSettings(plugin, basePath);
		return instance;
	}

	private async loadSettings(
		plugin: Gitter,
		basePath: string,
	): Promise<void> {
		const loadedData = await this.loadData(plugin);
		this._settings = Object.assign({}, DEFAULT_SETTINGS, loadedData);
		this._settings.basePath = basePath;
	}

	private async loadData(plugin: Gitter): Promise<Partial<ISettings>> {
		return plugin.loadData() || {};
	}

	async save(plugin: Gitter): Promise<void> {
		await plugin.saveData(this._settings);
	}

	get basePath(): string {
		return this._settings.basePath;
	}

	set basePath(value: string) {
		this._settings.basePath = value;
	}

	get isRepoInitialized(): boolean {
		return this._settings.isRepoInitialized;
	}

	set isRepoInitialized(value: boolean) {
		this._settings.isRepoInitialized = value;
	}
}

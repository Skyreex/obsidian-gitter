export interface GitterSettings {
	basePath: string;
}

export const DEFAULT_SETTINGS: GitterSettings = {
	basePath: "./",
};

//async loadSettings() {
//		this.settings = Object.assign(
//			{},
//			DEFAULT_SETTINGS,
//			await this.loadData()
//		);
//	}

//console.log("path", this.app.fileManager.vault.adapter.basePath);

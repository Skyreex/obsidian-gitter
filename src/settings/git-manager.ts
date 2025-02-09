import { simpleGit } from "simple-git";

export interface IGitManager {
	git: SimpleGit;
	init(): Promise<boolean>;
}

export class GitManager implements IGitManager {
	git: SimpleGit;

	constructor(path: string) {
		this.git = simpleGit(path);
	}

	async init(): Promise<boolean> {
		const result = await this.git.init();
		return result?.existing;
	}
}

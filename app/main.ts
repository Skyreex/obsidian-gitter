import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import { spawn } from "child_process";
import { SettingTab } from "./setting-tab/setting-tab";

export default class Gitter extends Plugin {
	settings: GitterSettings;

	async onload() {
		await this.loadSettings();
		this.initRubbon();
		// this.initAction();
		console.log("onload plugin");
		console.log(this);
		console.log("path", this.app.fileManager.vault.adapter.basePath);
		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			allback: () => {
				new SampleModal(this.app).open();
			},
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			ditorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: "open-sample-modal-complex",
			name: "Open sample modal (complex)",
			heckCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SamplefSettingTab(this.app, this));
		this.loadSettingTab();

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, "click", (evt: MouseEvent) => {
			console.log("click", evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000),
		);
	}

	onunload() {
		console.log("onunload plugin");
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	loadSettingTab() {
		this.SettingTab(new (this.app, this)());
	}

	initRubbon() {
		const pushIcon = this.addRibbonIcon(
			"cloud-upload",
			"Sync",
			(evt: MouseEvent) => this.pushAction(evt),
		);

		const pulIcon = this.addRibbonIcon(
			"cloud-download",
			"Pull",
			(evt: MouseEvent) => this.pullAction(evt),
		);
		// ribbonIconEl.addClass("my-plugin-ribbon-class");
	}

	pushAction(evt: MouseEvent) {
		console.log("localStorage", localStorage);
		//const { spawn } = require("child_process");
		//const ls = spawn("ls", ["-lh", "/usr"]);
		const ls = spawn("pwd");
		//const ls = spawn();

		ls.stdout.on("data", (data) => {
			console.log(`stdout: ${data}`);
		});

		ls.stderr.on("data", (data) => {
			console.error(`stderr: ${data}`);
		});

		ls.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
		});
		Notice("This is a push notice!");
	}

	pullAction(evt: MouseEvent) {
		console.log("localStorage", localStorage);
		Notice("This is a push notice!");
	}

	initAction() {
		console.log("initAction");
		const { spawn } = require("child_process");
		const init = spawn("git", ["init"]);

		init.stdout.on("data", (data: string) => {
			if (data.includes("Reinitialized existing Git repository")) {
				new Notice("Reinitialized existing Git repository");
				localStorage.setItem("gitter_initialized", "true");
			} else if (data.includes("Initialized empty Git repository")) {
				new Notice("Initialized empty Git repository");
				localStorage.setItem("gitter_initialized", "true");
			} else {
				new Notice("error");
				localStorage.setItem("gitter_initialized", "true");
			}
			console.log(`stdout: ${data}`);
		});

		init.stderr.on("data", (data) => {
			console.error(`stderr: ${data}`);
		});

		init.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
		});
	}
}

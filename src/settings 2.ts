import { App, PluginSettingTab } from 'obsidian';
import BasesKanbanPlugin from './main';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Settings interface is intentionally empty for now, will be populated when plugin settings are added
export interface KanbanSettings {
	// Plugin-level settings can be added here
}

export const DEFAULT_SETTINGS: KanbanSettings = {
};

export class KanbanSettingTab extends PluginSettingTab {
	plugin: BasesKanbanPlugin;

	constructor(app: App, plugin: BasesKanbanPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// Settings will be added here as needed
		containerEl.createEl('p', {
			text: 'Kanban view settings will appear here.',
			cls: 'setting-item-description'
		});
	}
}

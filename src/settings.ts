import { App, PluginSettingTab, Setting } from 'obsidian';
import BasesKanbanPlugin from './main';

export interface KanbanSettings {
	enableTimestamps: boolean;
	createdAtProperty: string;
	updatedAtProperty: string;
	templatePath: string;
	applyTemplateByDefault: boolean;
}

export const DEFAULT_SETTINGS: KanbanSettings = {
	enableTimestamps: false,
	createdAtProperty: 'created_at',
	updatedAtProperty: 'updated_at',
	templatePath: 'Templates/kanban-task.md',
	applyTemplateByDefault: true,
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

		containerEl.createEl('h2', { text: 'Timestamps' });

		new Setting(containerEl)
			.setName('Enable automatic timestamps')
			.setDesc('Automatically set created_at and updated_at properties when cards are modified via kanban actions.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enableTimestamps)
				.onChange(async (value) => {
					this.plugin.settings.enableTimestamps = value;
					await this.plugin.saveSettings();
					this.display();
				}));

		if (this.plugin.settings.enableTimestamps) {
			new Setting(containerEl)
				.setName('Created at property')
				.setDesc('Property name for the creation timestamp. Set when a card is first modified by kanban.')
				.addText(text => text
					.setPlaceholder('created_at')
					.setValue(this.plugin.settings.createdAtProperty)
					.onChange(async (value) => {
						this.plugin.settings.createdAtProperty = value || 'created_at';
						await this.plugin.saveSettings();
					}));

			new Setting(containerEl)
				.setName('Updated at property')
				.setDesc('Property name for the last update timestamp. Updated on every kanban action.')
				.addText(text => text
					.setPlaceholder('updated_at')
					.setValue(this.plugin.settings.updatedAtProperty)
					.onChange(async (value) => {
						this.plugin.settings.updatedAtProperty = value || 'updated_at';
						await this.plugin.saveSettings();
					}));
		}

		containerEl.createEl('h2', { text: 'New Card Template' });

		new Setting(containerEl)
			.setName('Template path')
			.setDesc('Path to the template file for new kanban cards (requires Templater plugin).')
			.addText(text => text
				.setPlaceholder('Templates/kanban-task.md')
				.setValue(this.plugin.settings.templatePath)
				.onChange(async (value) => {
					this.plugin.settings.templatePath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Apply template by default')
			.setDesc('When checked, the "Apply template" checkbox will be enabled by default when creating new cards.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.applyTemplateByDefault)
				.onChange(async (value) => {
					this.plugin.settings.applyTemplateByDefault = value;
					await this.plugin.saveSettings();
				}));
	}
}

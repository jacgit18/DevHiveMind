/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TextWrap
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  quickTagOne: "",
  quickTagTwo: "",
  quickTagThree: ""
};
var TextWrap = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    this.addCommand({
      id: "wrap-text",
      name: "Enter new tags",
      editorCallback: (editor, view) => {
        const selection = editor.getSelection();
        const tagAndText = (tag, text) => {
          editor.replaceSelection(`<${tag}>${text}</${tag}>`);
        };
        new TextWrapModal(this.app, selection, tagAndText).open();
      }
    });
    this.addCommand({
      id: "quick-tag-one",
      name: "Quick Tag One",
      editorCallback: (editor, view) => {
        const selection = editor.getSelection();
        const tag = this.settings.quickTagOne;
        editor.replaceSelection(`<${tag}>${selection}</${tag}>`);
      }
    });
    this.addCommand({
      id: "quick-tag-two",
      name: "Quick Tag Two",
      editorCallback: (editor, view) => {
        const selection = editor.getSelection();
        const tag = this.settings.quickTagTwo;
        editor.replaceSelection(`<${tag}>${selection}</${tag}>`);
      }
    });
    this.addCommand({
      id: "quick-tag-three",
      name: "Quick Tag Three",
      editorCallback: (editor, view) => {
        const selection = editor.getSelection();
        const tag = this.settings.quickTagThree;
        editor.replaceSelection(`<${tag}>${selection}</${tag}>`);
      }
    });
    this.addSettingTab(new SettingTab(this.app, this));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var TextWrapModal = class extends import_obsidian.Modal {
  constructor(app, defaultText, tagAndText) {
    super(app);
    this.modalText = defaultText;
    this.tagAndText = tagAndText;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: "Enter tags" });
    new import_obsidian.Setting(contentEl).setName("Press submit button to send tags").addText((text) => text.onChange((value) => {
      this.modalTag = value;
    }));
    new import_obsidian.Setting(contentEl).addButton((btn) => btn.setButtonText("Submit").setCta().onClick(() => {
      this.tagAndText(this.modalTag, this.modalText);
      this.close();
    }));
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var SettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Customize Quick Tags" });
    containerEl.createEl("p", { text: "Tags will be applied to selected text as: <tagName>selectedText</tagName>" });
    new import_obsidian.Setting(containerEl).setName("Quick Tag One").setDesc("Customize").addText((text) => text.setValue(this.plugin.settings.quickTagOne).onChange(async (value) => {
      this.plugin.settings.quickTagOne = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("Quick Tag Two").setDesc("Customize").addText((text) => text.setValue(this.plugin.settings.quickTagTwo).onChange(async (value) => {
      this.plugin.settings.quickTagTwo = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("Quick Tag Three").setDesc("Customize").addText((text) => text.setValue(this.plugin.settings.quickTagThree).onChange(async (value) => {
      this.plugin.settings.quickTagThree = value;
      await this.plugin.saveSettings();
    }));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBFZGl0b3IsIE1hcmtkb3duVmlldywgTW9kYWwsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbi8vIFJlbWVtYmVyIHRvIHJlbmFtZSB0aGVzZSBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzIVxyXG5cclxuaW50ZXJmYWNlIFRleHRXcmFwU2V0dGluZ3Mge1xyXG5cdHF1aWNrVGFnT25lOiBzdHJpbmc7XHJcblx0cXVpY2tUYWdUd286IHN0cmluZztcclxuXHRxdWlja1RhZ1RocmVlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFRleHRXcmFwU2V0dGluZ3MgPSB7XHJcblx0cXVpY2tUYWdPbmU6IFwiXCIsXHJcblx0cXVpY2tUYWdUd286IFwiXCIsXHJcblx0cXVpY2tUYWdUaHJlZTogXCJcIlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0V3JhcCBleHRlbmRzIFBsdWdpbiB7XHJcblx0c2V0dGluZ3M6IFRleHRXcmFwU2V0dGluZ3M7XHJcblxyXG5cdGFzeW5jIG9ubG9hZCgpIHtcclxuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcblxyXG5cdFx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHRcdC8vIGNvbW1hbmRzIGZvciBjb21tYW5kIHBhbGV0dGVcclxuXHRcdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ3dyYXAtdGV4dCcsXHJcblx0XHRcdG5hbWU6ICdFbnRlciBuZXcgdGFncycsXHJcblxyXG5cdFx0XHRlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yLCB2aWV3OiBNYXJrZG93blZpZXcpID0+IHtcclxuXHRcdFx0XHRjb25zdCBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHRcdGNvbnN0IHRhZ0FuZFRleHQgPSAodGFnOiBzdHJpbmcsIHRleHQ6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oYDwke3RhZ30+JHt0ZXh0fTwvJHt0YWd9PmApO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdG5ldyBUZXh0V3JhcE1vZGFsKHRoaXMuYXBwLCBzZWxlY3Rpb24sIHRhZ0FuZFRleHQpLm9wZW4oKVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICdxdWljay10YWctb25lJyxcclxuXHRcdFx0bmFtZTogJ1F1aWNrIFRhZyBPbmUnLFxyXG5cclxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xyXG5cdFx0XHRcdGNvbnN0IHRhZyA9IHRoaXMuc2V0dGluZ3MucXVpY2tUYWdPbmU7XHJcblx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oYDwke3RhZ30+JHtzZWxlY3Rpb259PC8ke3RhZ30+YClcclxuXHRcdFx0fSxcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ3F1aWNrLXRhZy10d28nLFxyXG5cdFx0XHRuYW1lOiAnUXVpY2sgVGFnIFR3bycsXHJcblxyXG5cdFx0XHRlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yLCB2aWV3OiBNYXJrZG93blZpZXcpID0+IHtcclxuXHRcdFx0XHRjb25zdCBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0Y29uc3QgdGFnID0gdGhpcy5zZXR0aW5ncy5xdWlja1RhZ1R3bztcclxuXHRcdFx0XHRlZGl0b3IucmVwbGFjZVNlbGVjdGlvbihgPCR7dGFnfT4ke3NlbGVjdGlvbn08LyR7dGFnfT5gKVxyXG5cdFx0XHR9LFxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAncXVpY2stdGFnLXRocmVlJyxcclxuXHRcdFx0bmFtZTogJ1F1aWNrIFRhZyBUaHJlZScsXHJcblxyXG5cdFx0XHRlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yLCB2aWV3OiBNYXJrZG93blZpZXcpID0+IHtcclxuXHRcdFx0XHRjb25zdCBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0Y29uc3QgdGFnID0gdGhpcy5zZXR0aW5ncy5xdWlja1RhZ1RocmVlO1xyXG5cdFx0XHRcdGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKGA8JHt0YWd9PiR7c2VsZWN0aW9ufTwvJHt0YWd9PmApXHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cclxuXHR9XHJcblxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRXcmFwTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcblx0bW9kYWxUYWc6IHN0cmluZztcclxuXHRtb2RhbFRleHQ6IHN0cmluZztcclxuXHJcblx0dGFnQW5kVGV4dDogKG1vZGFsVGFnOiBzdHJpbmcsIG1vZGFsVGV4dDogc3RyaW5nKSA9PiB2b2lkO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdGFwcDogQXBwLFxyXG5cdFx0ZGVmYXVsdFRleHQ6IHN0cmluZyxcclxuXHRcdHRhZ0FuZFRleHQ6IChtb2RhbFRhZzogc3RyaW5nLCBtb2RhbFRleHQ6IHN0cmluZykgPT4gdm9pZFxyXG5cdCkge1xyXG5cdFx0c3VwZXIoYXBwKTtcclxuXHRcdHRoaXMubW9kYWxUZXh0ID0gZGVmYXVsdFRleHQ7XHJcblx0XHR0aGlzLnRhZ0FuZFRleHQgPSB0YWdBbmRUZXh0O1xyXG5cdH1cclxuXHJcblx0b25PcGVuKCkge1xyXG5cdFx0Y29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XHJcblxyXG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiBcIkVudGVyIHRhZ3NcIiB9KVxyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcclxuXHRcdFx0LnNldE5hbWUoXCJQcmVzcyBzdWJtaXQgYnV0dG9uIHRvIHNlbmQgdGFnc1wiKVxyXG5cdFx0XHQuYWRkVGV4dCgodGV4dCkgPT5cclxuXHRcdFx0XHR0ZXh0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5tb2RhbFRhZyA9IHZhbHVlO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdCk7XHJcblxyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcclxuXHRcdFx0LmFkZEJ1dHRvbigoYnRuKSA9PlxyXG5cdFx0XHRcdGJ0blxyXG5cdFx0XHRcdFx0LnNldEJ1dHRvblRleHQoXCJTdWJtaXRcIilcclxuXHRcdFx0XHRcdC5zZXRDdGEoKVxyXG5cdFx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnRhZ0FuZFRleHQodGhpcy5tb2RhbFRhZywgdGhpcy5tb2RhbFRleHQpXHJcblx0XHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdFx0XHRcdH0pKTtcclxuXHR9XHJcblxyXG5cclxuXHRvbkNsb3NlKCkge1xyXG5cdFx0Y29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRwbHVnaW46IFRleHRXcmFwO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBUZXh0V3JhcCkge1xyXG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xyXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcclxuXHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ0N1c3RvbWl6ZSBRdWljayBUYWdzJyB9KTtcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywgeyB0ZXh0OiAnVGFncyB3aWxsIGJlIGFwcGxpZWQgdG8gc2VsZWN0ZWQgdGV4dCBhczogPHRhZ05hbWU+c2VsZWN0ZWRUZXh0PC90YWdOYW1lPicgfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdRdWljayBUYWcgT25lJylcclxuXHRcdFx0LnNldERlc2MoJ0N1c3RvbWl6ZScpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5xdWlja1RhZ09uZSlcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5xdWlja1RhZ09uZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnUXVpY2sgVGFnIFR3bycpXHJcblx0XHRcdC5zZXREZXNjKCdDdXN0b21pemUnKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucXVpY2tUYWdUd28pXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MucXVpY2tUYWdUd28gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1F1aWNrIFRhZyBUaHJlZScpXHJcblx0XHRcdC5zZXREZXNjKCdDdXN0b21pemUnKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucXVpY2tUYWdUaHJlZSlcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5xdWlja1RhZ1RocmVlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cclxuXHR9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUFvRjtBQVVwRixJQUFNLG1CQUFxQztBQUFBLEVBQzFDLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLGVBQWU7QUFD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

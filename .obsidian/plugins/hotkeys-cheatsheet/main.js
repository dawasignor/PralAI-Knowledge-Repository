"use strict";
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

// src/ts/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => HotkeysCheatsheetPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian9 = require("obsidian");

// src/ts/settingsTab.ts
var import_obsidian2 = require("obsidian");

// src/ts/i18n/locales/en.json
var en_default = {
  "ribbon.tooltip": "Open Hotkeys Cheatsheet",
  "command.name": "Open Hotkeys Cheatsheet",
  "modal.title": "Hotkeys Cheatsheet",
  "modal.search_placeholder": "Search by name or key...",
  "modal.filter_label": "Filter",
  "modal.filter_conflicts_only": "Conflicts only",
  "modal.filter_modified_only": "Modified only",
  "modal.filter_conflicts_chip": "Conflicts",
  "modal.filter_modified_chip": "Modified",
  "modal.filter_special_keys_only": "Special keys only",
  "modal.filter_special_keys_chip": "Special keys",
  "modal.expand_all": "Expand All",
  "modal.collapse_all": "Collapse All",
  "modal.no_results": "No results",
  "modal.export_label": "Export",
  "modal.export_save_note": "Save as Note",
  "modal.export_save_html": "Save as HTML",
  "modal.export_subtitle": "Exported from Obsidian on {{date}}",
  "modal.export_success": "Saved to {{path}}",
  "modal.export_exists": "{{path}} already exists. Trigger export again to overwrite.",
  "modal.export_failed": "Export failed: {{error}}",
  "modal.export_table_command": "Command",
  "modal.export_table_hotkey": "Hotkey",
  "modal.sort_label": "Sort",
  "modal.sort_most_used_category": "By Most-Used Category",
  "modal.sort_most_used_shortcut": "By Most-Used Shortcut",
  "modal.sort_modifier": "By Modifier",
  "modal.sort_key": "By Key",
  "modal.sort_chip_modifier": "Modifier",
  "modal.sort_chip_key": "Key",
  "modal.sort_chip_most_used_category": "Most-Used Category",
  "modal.sort_chip_most_used_shortcut": "Most-Used Shortcut",
  "modal.sort_no_modifier": "No Modifier",
  "modal.sort_disabled_hint": "Enable shortcut usage tracking in settings to unlock this",
  "modal.no_command": "No command",
  "modal.system_shortcut": "System shortcut",
  "modal.system_shortcut_tooltip": "Handled by the operating system \u2014 can't be bound to a command.",
  "modal.system_shortcut_copy": "Copy",
  "modal.system_shortcut_cut": "Cut",
  "modal.system_shortcut_paste": "Paste",
  "modal.system_shortcut_select_all": "Select All",
  "modal.system_shortcut_line_start": "Move to Line Start",
  "modal.system_shortcut_line_end": "Move to Line End",
  "modal.system_shortcut_doc_start": "Move to Document Start",
  "modal.system_shortcut_doc_end": "Move to Document End",
  "modal.system_shortcut_delete_line_start": "Delete to Line Start",
  "modal.system_shortcut_undo": "Undo",
  "modal.system_shortcut_redo": "Redo",
  "modal.system_shortcut_select_line_start": "Select to Line Start",
  "modal.system_shortcut_select_line_end": "Select to Line End",
  "modal.system_shortcut_word_left": "Move Left One Word",
  "modal.system_shortcut_word_right": "Move Right One Word",
  "modal.system_shortcut_paragraph_up": "Move Up a Paragraph",
  "modal.system_shortcut_paragraph_down": "Move Down a Paragraph",
  "modal.system_shortcut_delete_word": "Delete Previous Word",
  "modal.system_shortcut_select_word_left": "Select Previous Word",
  "modal.system_shortcut_select_word_right": "Select Next Word",
  "category.editing": "Editing",
  "category.navigation": "Navigation",
  "category.search": "Search",
  "category.files_vault": "Files & Vault",
  "category.workspace": "Workspace",
  "category.other": "Other",
  "settings.heading": "Hotkeys Cheatsheet",
  "settings.ribbon.label": "Show ribbon icon",
  "settings.ribbon.desc": "Display the keyboard icon in the ribbon toolbar. Takes effect after reloading Obsidian.",
  "settings.usage_tracking.label": "Track shortcut usage",
  "settings.usage_tracking.desc": "Record how often each modifier+key combination is pressed anywhere in the app, and show usage indicators in the cheatsheet. Not limited to recognized hotkeys. Off by default.",
  "settings.usage_tracking.reset_label": "Reset usage statistics",
  "settings.usage_tracking.reset_desc": "Clear all recorded shortcut usage counts. This cannot be undone.",
  "settings.usage_tracking.reset_confirm": "Click again to confirm: this will permanently clear all recorded shortcut usage.",
  "settings.usage_tracking.reset_success": "Usage statistics cleared.",
  "settings.about.name": "Hotkeys Cheatsheet",
  "settings.about.description": "Display a live, categorised, searchable reference card of your Obsidian hotkeys.",
  "settings.about.author": "Pierre Awaragi"
};

// src/ts/i18n/locales/fr.json
var fr_default = {
  "ribbon.tooltip": "Ouvrir l'aide-m\xE9moire des raccourcis",
  "command.name": "Ouvrir l'aide-m\xE9moire des raccourcis",
  "modal.title": "Aide-m\xE9moire des raccourcis",
  "modal.search_placeholder": "Rechercher par nom ou touche...",
  "modal.filter_label": "Filtre",
  "modal.filter_conflicts_only": "Conflits uniquement",
  "modal.filter_modified_only": "Modifi\xE9s uniquement",
  "modal.filter_conflicts_chip": "Conflits",
  "modal.filter_modified_chip": "Modifi\xE9s",
  "modal.filter_special_keys_only": "Touches sp\xE9ciales uniquement",
  "modal.filter_special_keys_chip": "Touches sp\xE9ciales",
  "modal.expand_all": "Tout d\xE9velopper",
  "modal.collapse_all": "Tout r\xE9duire",
  "modal.no_results": "Aucun r\xE9sultat",
  "modal.export_label": "Exporter",
  "modal.export_save_note": "Enregistrer comme note",
  "modal.export_save_html": "Enregistrer comme HTML",
  "modal.export_subtitle": "Export\xE9 depuis Obsidian le {{date}}",
  "modal.export_success": "Enregistr\xE9 dans {{path}}",
  "modal.export_exists": "{{path}} existe d\xE9j\xE0. Exportez \xE0 nouveau pour \xE9craser.",
  "modal.export_failed": "\xC9chec de l'export : {{error}}",
  "modal.export_table_command": "Commande",
  "modal.export_table_hotkey": "Raccourci",
  "modal.sort_label": "Trier",
  "modal.sort_most_used_category": "Par cat\xE9gorie la plus utilis\xE9e",
  "modal.sort_most_used_shortcut": "Par raccourci le plus utilis\xE9",
  "modal.sort_modifier": "Par modificateur",
  "modal.sort_key": "Par touche",
  "modal.sort_chip_modifier": "Modificateur",
  "modal.sort_chip_key": "Touche",
  "modal.sort_chip_most_used_category": "Cat\xE9gorie la plus utilis\xE9e",
  "modal.sort_chip_most_used_shortcut": "Raccourci le plus utilis\xE9",
  "modal.sort_no_modifier": "Aucun modificateur",
  "modal.sort_disabled_hint": "Activez le suivi d'utilisation des raccourcis dans les param\xE8tres pour d\xE9verrouiller ceci",
  "modal.no_command": "Aucune commande",
  "modal.system_shortcut": "Raccourci syst\xE8me",
  "modal.system_shortcut_tooltip": "G\xE9r\xE9 par le syst\xE8me d'exploitation \u2014 ne peut pas \xEAtre associ\xE9 \xE0 une commande.",
  "modal.system_shortcut_copy": "Copier",
  "modal.system_shortcut_cut": "Couper",
  "modal.system_shortcut_paste": "Coller",
  "modal.system_shortcut_select_all": "Tout s\xE9lectionner",
  "modal.system_shortcut_line_start": "Aller au d\xE9but de la ligne",
  "modal.system_shortcut_line_end": "Aller \xE0 la fin de la ligne",
  "modal.system_shortcut_doc_start": "Aller au d\xE9but du document",
  "modal.system_shortcut_doc_end": "Aller \xE0 la fin du document",
  "modal.system_shortcut_delete_line_start": "Supprimer jusqu'au d\xE9but de la ligne",
  "modal.system_shortcut_undo": "Annuler",
  "modal.system_shortcut_redo": "R\xE9tablir",
  "modal.system_shortcut_select_line_start": "S\xE9lectionner jusqu'au d\xE9but de la ligne",
  "modal.system_shortcut_select_line_end": "S\xE9lectionner jusqu'\xE0 la fin de la ligne",
  "modal.system_shortcut_word_left": "Reculer d'un mot",
  "modal.system_shortcut_word_right": "Avancer d'un mot",
  "modal.system_shortcut_paragraph_up": "Monter d'un paragraphe",
  "modal.system_shortcut_paragraph_down": "Descendre d'un paragraphe",
  "modal.system_shortcut_delete_word": "Supprimer le mot pr\xE9c\xE9dent",
  "modal.system_shortcut_select_word_left": "S\xE9lectionner le mot pr\xE9c\xE9dent",
  "modal.system_shortcut_select_word_right": "S\xE9lectionner le mot suivant",
  "category.editing": "\xC9dition",
  "category.navigation": "Navigation",
  "category.search": "Recherche",
  "category.files_vault": "Fichiers et coffre",
  "category.workspace": "Espace de travail",
  "category.other": "Autre",
  "settings.heading": "Aide-m\xE9moire des raccourcis",
  "settings.ribbon.label": "Afficher l'ic\xF4ne dans le ruban",
  "settings.ribbon.desc": "Affiche l'ic\xF4ne clavier dans la barre de ruban. Prend effet apr\xE8s le rechargement d'Obsidian.",
  "settings.usage_tracking.label": "Suivre l'utilisation des raccourcis",
  "settings.usage_tracking.desc": "Enregistre la fr\xE9quence de chaque combinaison touche de modification + touche utilis\xE9e n'importe o\xF9 dans l'application, et affiche des indicateurs d'utilisation dans l'aide-m\xE9moire. Ne se limite pas aux raccourcis reconnus. D\xE9sactiv\xE9 par d\xE9faut.",
  "settings.usage_tracking.reset_label": "R\xE9initialiser les statistiques d'utilisation",
  "settings.usage_tracking.reset_desc": "Efface tous les compteurs d'utilisation des raccourcis enregistr\xE9s. Cette action est irr\xE9versible.",
  "settings.usage_tracking.reset_confirm": "Cliquez \xE0 nouveau pour confirmer : ceci effacera d\xE9finitivement toute l'utilisation des raccourcis enregistr\xE9e.",
  "settings.usage_tracking.reset_success": "Statistiques d'utilisation effac\xE9es.",
  "settings.about.name": "Aide-m\xE9moire des raccourcis",
  "settings.about.description": "Affiche une fiche de r\xE9f\xE9rence en direct, cat\xE9goris\xE9e et consultable de vos raccourcis Obsidian.",
  "settings.about.author": "Pierre Awaragi"
};

// src/ts/i18n/locales/es.json
var es_default = {
  "ribbon.tooltip": "Abrir hoja de referencia de atajos",
  "command.name": "Abrir hoja de referencia de atajos",
  "modal.title": "Hoja de referencia de atajos",
  "modal.search_placeholder": "Buscar por nombre o tecla...",
  "modal.filter_label": "Filtro",
  "modal.filter_conflicts_only": "Solo conflictos",
  "modal.filter_modified_only": "Solo modificados",
  "modal.filter_conflicts_chip": "Conflictos",
  "modal.filter_modified_chip": "Modificados",
  "modal.filter_special_keys_only": "Solo teclas especiales",
  "modal.filter_special_keys_chip": "Teclas especiales",
  "modal.expand_all": "Expandir todo",
  "modal.collapse_all": "Contraer todo",
  "modal.no_results": "Sin resultados",
  "modal.export_label": "Exportar",
  "modal.export_save_note": "Guardar como nota",
  "modal.export_save_html": "Guardar como HTML",
  "modal.export_subtitle": "Exportado desde Obsidian el {{date}}",
  "modal.export_success": "Guardado en {{path}}",
  "modal.export_exists": "{{path}} ya existe. Exporta de nuevo para sobrescribir.",
  "modal.export_failed": "Error al exportar: {{error}}",
  "modal.export_table_command": "Comando",
  "modal.export_table_hotkey": "Atajo",
  "modal.sort_label": "Ordenar",
  "modal.sort_most_used_category": "Por categor\xEDa m\xE1s usada",
  "modal.sort_most_used_shortcut": "Por atajo m\xE1s usado",
  "modal.sort_modifier": "Por modificador",
  "modal.sort_key": "Por tecla",
  "modal.sort_chip_modifier": "Modificador",
  "modal.sort_chip_key": "Tecla",
  "modal.sort_chip_most_used_category": "Categor\xEDa m\xE1s usada",
  "modal.sort_chip_most_used_shortcut": "Atajo m\xE1s usado",
  "modal.sort_no_modifier": "Sin modificador",
  "modal.sort_disabled_hint": "Activa el seguimiento de uso de atajos en los ajustes para desbloquear esto",
  "modal.no_command": "Sin comando",
  "modal.system_shortcut": "Atajo del sistema",
  "modal.system_shortcut_tooltip": "Gestionado por el sistema operativo: no se puede asignar a un comando.",
  "modal.system_shortcut_copy": "Copiar",
  "modal.system_shortcut_cut": "Cortar",
  "modal.system_shortcut_paste": "Pegar",
  "modal.system_shortcut_select_all": "Seleccionar todo",
  "modal.system_shortcut_line_start": "Ir al inicio de l\xEDnea",
  "modal.system_shortcut_line_end": "Ir al final de l\xEDnea",
  "modal.system_shortcut_doc_start": "Ir al inicio del documento",
  "modal.system_shortcut_doc_end": "Ir al final del documento",
  "modal.system_shortcut_delete_line_start": "Eliminar hasta el inicio de l\xEDnea",
  "modal.system_shortcut_undo": "Deshacer",
  "modal.system_shortcut_redo": "Rehacer",
  "modal.system_shortcut_select_line_start": "Seleccionar hasta el inicio de l\xEDnea",
  "modal.system_shortcut_select_line_end": "Seleccionar hasta el final de l\xEDnea",
  "modal.system_shortcut_word_left": "Mover una palabra a la izquierda",
  "modal.system_shortcut_word_right": "Mover una palabra a la derecha",
  "modal.system_shortcut_paragraph_up": "Subir un p\xE1rrafo",
  "modal.system_shortcut_paragraph_down": "Bajar un p\xE1rrafo",
  "modal.system_shortcut_delete_word": "Eliminar la palabra anterior",
  "modal.system_shortcut_select_word_left": "Seleccionar la palabra anterior",
  "modal.system_shortcut_select_word_right": "Seleccionar la palabra siguiente",
  "category.editing": "Edici\xF3n",
  "category.navigation": "Navegaci\xF3n",
  "category.search": "B\xFAsqueda",
  "category.files_vault": "Archivos y b\xF3veda",
  "category.workspace": "Espacio de trabajo",
  "category.other": "Otro",
  "settings.heading": "Hoja de referencia de atajos",
  "settings.ribbon.label": "Mostrar icono en el panel lateral",
  "settings.ribbon.desc": "Muestra el icono de teclado en la barra del panel lateral. Requiere recargar Obsidian para aplicarse.",
  "settings.usage_tracking.label": "Registrar uso de atajos",
  "settings.usage_tracking.desc": "Registra la frecuencia de cada combinaci\xF3n de tecla modificadora + tecla pulsada en cualquier parte de la aplicaci\xF3n, y muestra indicadores de uso en la hoja de referencia. No se limita a los atajos reconocidos. Desactivado de forma predeterminada.",
  "settings.usage_tracking.reset_label": "Restablecer estad\xEDsticas de uso",
  "settings.usage_tracking.reset_desc": "Borra todos los recuentos de uso de atajos registrados. Esta acci\xF3n no se puede deshacer.",
  "settings.usage_tracking.reset_confirm": "Vuelve a hacer clic para confirmar: esto borrar\xE1 permanentemente todo el uso de atajos registrado.",
  "settings.usage_tracking.reset_success": "Estad\xEDsticas de uso borradas.",
  "settings.about.name": "Hoja de referencia de atajos",
  "settings.about.description": "Muestra una ficha de referencia en vivo, categorizada y con b\xFAsqueda de tus atajos de Obsidian.",
  "settings.about.author": "Pierre Awaragi"
};

// src/ts/i18n/locales/ar.json
var ar_default = {
  "ribbon.tooltip": "\u0641\u062A\u062D \u0648\u0631\u0642\u0629 \u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D",
  "command.name": "\u0641\u062A\u062D \u0648\u0631\u0642\u0629 \u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D",
  "modal.title": "\u0648\u0631\u0642\u0629 \u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D",
  "modal.search_placeholder": "\u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0645\u0641\u062A\u0627\u062D...",
  "modal.filter_label": "\u062A\u0635\u0641\u064A\u0629",
  "modal.filter_conflicts_only": "\u0627\u0644\u062A\u0639\u0627\u0631\u0636\u0627\u062A \u0641\u0642\u0637",
  "modal.filter_modified_only": "\u0627\u0644\u0645\u0639\u062F\u064E\u0651\u0644\u0629 \u0641\u0642\u0637",
  "modal.filter_conflicts_chip": "\u062A\u0639\u0627\u0631\u0636\u0627\u062A",
  "modal.filter_modified_chip": "\u0645\u0639\u062F\u064E\u0651\u0644\u0629",
  "modal.filter_special_keys_only": "\u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0627\u0644\u062E\u0627\u0635\u0629 \u0641\u0642\u0637",
  "modal.filter_special_keys_chip": "\u0645\u0641\u0627\u062A\u064A\u062D \u062E\u0627\u0635\u0629",
  "modal.expand_all": "\u062A\u0648\u0633\u064A\u0639 \u0627\u0644\u0643\u0644",
  "modal.collapse_all": "\u0637\u064A \u0627\u0644\u0643\u0644",
  "modal.no_results": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C",
  "modal.export_label": "\u062A\u0635\u062F\u064A\u0631",
  "modal.export_save_note": "\u062D\u0641\u0638 \u0643\u0645\u0644\u0627\u062D\u0638\u0629",
  "modal.export_save_html": "\u062D\u0641\u0638 \u0643\u0645\u0644\u0641 HTML",
  "modal.export_subtitle": "\u062A\u0645 \u0627\u0644\u062A\u0635\u062F\u064A\u0631 \u0645\u0646 Obsidian \u0628\u062A\u0627\u0631\u064A\u062E {{date}}",
  "modal.export_success": "\u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0641\u064A {{path}}",
  "modal.export_exists": "{{path}} \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644. \u0635\u062F\u0650\u0651\u0631 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0644\u0627\u0633\u062A\u0628\u062F\u0627\u0644.",
  "modal.export_failed": "\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: {{error}}",
  "modal.export_table_command": "\u0627\u0644\u0623\u0645\u0631",
  "modal.export_table_hotkey": "\u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631",
  "modal.sort_label": "\u062A\u0631\u062A\u064A\u0628",
  "modal.sort_most_used_category": "\u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0623\u0643\u062B\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u064B\u0627",
  "modal.sort_most_used_shortcut": "\u062D\u0633\u0628 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631 \u0627\u0644\u0623\u0643\u062B\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u064B\u0627",
  "modal.sort_modifier": "\u062D\u0633\u0628 \u0627\u0644\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u0645\u064F\u0639\u062F\u0650\u0651\u0644",
  "modal.sort_key": "\u062D\u0633\u0628 \u0627\u0644\u0645\u0641\u062A\u0627\u062D",
  "modal.sort_chip_modifier": "\u0627\u0644\u0645\u064F\u0639\u062F\u0650\u0651\u0644",
  "modal.sort_chip_key": "\u0627\u0644\u0645\u0641\u062A\u0627\u062D",
  "modal.sort_chip_most_used_category": "\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0623\u0643\u062B\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u064B\u0627",
  "modal.sort_chip_most_used_shortcut": "\u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631 \u0627\u0644\u0623\u0643\u062B\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u064B\u0627",
  "modal.sort_no_modifier": "\u0628\u0644\u0627 \u0645\u064F\u0639\u062F\u0650\u0651\u0644",
  "modal.sort_disabled_hint": "\u0641\u0639\u0650\u0651\u0644 \u062A\u062A\u0628\u0639 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0644\u0625\u062A\u0627\u062D\u0629 \u0647\u0630\u0627",
  "modal.no_command": "\u0644\u0627 \u064A\u0648\u062C\u062F \u0623\u0645\u0631",
  "modal.system_shortcut": "\u0627\u062E\u062A\u0635\u0627\u0631 \u0627\u0644\u0646\u0638\u0627\u0645",
  "modal.system_shortcut_tooltip": "\u064A\u062A\u0639\u0627\u0645\u0644 \u0645\u0639\u0647 \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0634\u063A\u064A\u0644 \u2014 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0631\u0628\u0637\u0647 \u0628\u0623\u0645\u0631.",
  "modal.system_shortcut_copy": "\u0646\u0633\u062E",
  "modal.system_shortcut_cut": "\u0642\u0635",
  "modal.system_shortcut_paste": "\u0644\u0635\u0642",
  "modal.system_shortcut_select_all": "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644",
  "modal.system_shortcut_line_start": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0633\u0637\u0631",
  "modal.system_shortcut_line_end": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0633\u0637\u0631",
  "modal.system_shortcut_doc_start": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F",
  "modal.system_shortcut_doc_end": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F",
  "modal.system_shortcut_delete_line_start": "\u062D\u0630\u0641 \u062D\u062A\u0649 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0633\u0637\u0631",
  "modal.system_shortcut_undo": "\u062A\u0631\u0627\u062C\u0639",
  "modal.system_shortcut_redo": "\u0625\u0639\u0627\u062F\u0629",
  "modal.system_shortcut_select_line_start": "\u062A\u062D\u062F\u064A\u062F \u062D\u062A\u0649 \u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0633\u0637\u0631",
  "modal.system_shortcut_select_line_end": "\u062A\u062D\u062F\u064A\u062F \u062D\u062A\u0649 \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0633\u0637\u0631",
  "modal.system_shortcut_word_left": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0643\u0644\u0645\u0629 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631",
  "modal.system_shortcut_word_right": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0643\u0644\u0645\u0629 \u0625\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646",
  "modal.system_shortcut_paragraph_up": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0641\u0642\u0631\u0629 \u0644\u0644\u0623\u0639\u0644\u0649",
  "modal.system_shortcut_paragraph_down": "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0641\u0642\u0631\u0629 \u0644\u0644\u0623\u0633\u0641\u0644",
  "modal.system_shortcut_delete_word": "\u062D\u0630\u0641 \u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629",
  "modal.system_shortcut_select_word_left": "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629",
  "modal.system_shortcut_select_word_right": "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629",
  "category.editing": "\u0627\u0644\u062A\u062D\u0631\u064A\u0631",
  "category.navigation": "\u0627\u0644\u062A\u0646\u0642\u0644",
  "category.search": "\u0627\u0644\u0628\u062D\u062B",
  "category.files_vault": "\u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0648\u0627\u0644\u062E\u0632\u0646\u0629",
  "category.workspace": "\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0639\u0645\u0644",
  "category.other": "\u0623\u062E\u0631\u0649",
  "settings.heading": "\u0648\u0631\u0642\u0629 \u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D",
  "settings.ribbon.label": "\u0625\u0638\u0647\u0627\u0631 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0634\u0631\u064A\u0637 \u0627\u0644\u062C\u0627\u0646\u0628\u064A",
  "settings.ribbon.desc": "\u0639\u0631\u0636 \u0623\u064A\u0642\u0648\u0646\u0629 \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0641\u064A \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062C\u0627\u0646\u0628\u064A. \u064A\u0633\u0631\u064A \u0627\u0644\u0645\u0641\u0639\u0648\u0644 \u0628\u0639\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 Obsidian.",
  "settings.usage_tracking.label": "\u062A\u062A\u0628\u0639 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A",
  "settings.usage_tracking.desc": "\u062A\u0633\u062C\u064A\u0644 \u0639\u062F\u062F \u0645\u0631\u0627\u062A \u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u0643\u0644 \u062A\u0631\u0643\u064A\u0628\u0629 \u0645\u0641\u062A\u0627\u062D \u0645\u064F\u0639\u062F\u0650\u0651\u0644 + \u0645\u0641\u062A\u0627\u062D \u0641\u064A \u0623\u064A \u0645\u0643\u0627\u0646 \u0628\u0627\u0644\u062A\u0637\u0628\u064A\u0642\u060C \u0648\u0639\u0631\u0636 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0641\u064A \u0648\u0631\u0642\u0629 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A. \u0644\u0627 \u064A\u0642\u062A\u0635\u0631 \u0639\u0644\u0649 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0648\u0641\u0629. \u0645\u064F\u0639\u0637\u064E\u0651\u0644 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u064B\u0627.",
  "settings.usage_tracking.reset_label": "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645",
  "settings.usage_tracking.reset_desc": "\u0645\u0633\u062D \u062C\u0645\u064A\u0639 \u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u064E\u0651\u0644\u0629. \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621.",
  "settings.usage_tracking.reset_confirm": "\u0627\u0646\u0642\u0631 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0644\u0644\u062A\u0623\u0643\u064A\u062F: \u0633\u064A\u0624\u062F\u064A \u0647\u0630\u0627 \u0625\u0644\u0649 \u0645\u0633\u062D \u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u064E\u0651\u0644\u0629 \u0646\u0647\u0627\u0626\u064A\u064B\u0627.",
  "settings.usage_tracking.reset_success": "\u062A\u0645 \u0645\u0633\u062D \u0625\u062D\u0635\u0627\u0621\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645.",
  "settings.about.name": "\u0648\u0631\u0642\u0629 \u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D",
  "settings.about.description": "\u0639\u0631\u0636 \u0628\u0637\u0627\u0642\u0629 \u0645\u0631\u062C\u0639\u064A\u0629 \u062D\u064A\u0629 \u0648\u0645\u0635\u0646\u064E\u0651\u0641\u0629 \u0648\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0628\u062D\u062B \u0644\u0627\u062E\u062A\u0635\u0627\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0641\u064A Obsidian.",
  "settings.about.author": "Pierre Awaragi"
};

// src/ts/i18n/locales/ja.json
var ja_default = {
  "ribbon.tooltip": "\u30DB\u30C3\u30C8\u30AD\u30FC\u65E9\u898B\u8868\u3092\u958B\u304F",
  "command.name": "\u30DB\u30C3\u30C8\u30AD\u30FC\u65E9\u898B\u8868\u3092\u958B\u304F",
  "modal.title": "\u30DB\u30C3\u30C8\u30AD\u30FC\u65E9\u898B\u8868",
  "modal.search_placeholder": "\u540D\u524D\u307E\u305F\u306F\u30AD\u30FC\u3067\u691C\u7D22...",
  "modal.filter_label": "\u30D5\u30A3\u30EB\u30BF\u30FC",
  "modal.filter_conflicts_only": "\u7AF6\u5408\u306E\u307F",
  "modal.filter_modified_only": "\u5909\u66F4\u6E08\u307F\u306E\u307F",
  "modal.filter_conflicts_chip": "\u7AF6\u5408",
  "modal.filter_modified_chip": "\u5909\u66F4\u6E08\u307F",
  "modal.filter_special_keys_only": "\u7279\u6B8A\u30AD\u30FC\u306E\u307F",
  "modal.filter_special_keys_chip": "\u7279\u6B8A\u30AD\u30FC",
  "modal.expand_all": "\u3059\u3079\u3066\u5C55\u958B",
  "modal.collapse_all": "\u3059\u3079\u3066\u6298\u308A\u305F\u305F\u3080",
  "modal.no_results": "\u7D50\u679C\u304C\u3042\u308A\u307E\u305B\u3093",
  "modal.export_label": "\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8",
  "modal.export_save_note": "\u30CE\u30FC\u30C8\u3068\u3057\u3066\u4FDD\u5B58",
  "modal.export_save_html": "HTML\u3068\u3057\u3066\u4FDD\u5B58",
  "modal.export_subtitle": "{{date}} \u306B Obsidian \u304B\u3089\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8",
  "modal.export_success": "{{path}} \u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F",
  "modal.export_exists": "{{path}} \u306F\u65E2\u306B\u5B58\u5728\u3057\u307E\u3059\u3002\u4E0A\u66F8\u304D\u3059\u308B\u306B\u306F\u3082\u3046\u4E00\u5EA6\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "modal.export_failed": "\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u306B\u5931\u6557\u3057\u307E\u3057\u305F: {{error}}",
  "modal.export_table_command": "\u30B3\u30DE\u30F3\u30C9",
  "modal.export_table_hotkey": "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
  "modal.sort_label": "\u4E26\u3073\u66FF\u3048",
  "modal.sort_most_used_category": "\u3088\u304F\u4F7F\u3046\u30AB\u30C6\u30B4\u30EA\u30FC\u9806",
  "modal.sort_most_used_shortcut": "\u3088\u304F\u4F7F\u3046\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u9806",
  "modal.sort_modifier": "\u4FEE\u98FE\u30AD\u30FC\u9806",
  "modal.sort_key": "\u30AD\u30FC\u9806",
  "modal.sort_chip_modifier": "\u4FEE\u98FE\u30AD\u30FC",
  "modal.sort_chip_key": "\u30AD\u30FC",
  "modal.sort_chip_most_used_category": "\u3088\u304F\u4F7F\u3046\u30AB\u30C6\u30B4\u30EA\u30FC",
  "modal.sort_chip_most_used_shortcut": "\u3088\u304F\u4F7F\u3046\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
  "modal.sort_no_modifier": "\u4FEE\u98FE\u30AD\u30FC\u306A\u3057",
  "modal.sort_disabled_hint": "\u3053\u306E\u6A5F\u80FD\u3092\u4F7F\u3046\u306B\u306F\u3001\u8A2D\u5B9A\u3067\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306E\u4F7F\u7528\u72B6\u6CC1\u306E\u8A18\u9332\u3092\u6709\u52B9\u306B\u3057\u3066\u304F\u3060\u3055\u3044",
  "modal.no_command": "\u30B3\u30DE\u30F3\u30C9\u306A\u3057",
  "modal.system_shortcut": "\u30B7\u30B9\u30C6\u30E0\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
  "modal.system_shortcut_tooltip": "OS\u304C\u51E6\u7406\u3059\u308B\u305F\u3081\u3001\u30B3\u30DE\u30F3\u30C9\u306B\u5272\u308A\u5F53\u3066\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002",
  "modal.system_shortcut_copy": "\u30B3\u30D4\u30FC",
  "modal.system_shortcut_cut": "\u5207\u308A\u53D6\u308A",
  "modal.system_shortcut_paste": "\u8CBC\u308A\u4ED8\u3051",
  "modal.system_shortcut_select_all": "\u3059\u3079\u3066\u9078\u629E",
  "modal.system_shortcut_line_start": "\u884C\u982D\u306B\u79FB\u52D5",
  "modal.system_shortcut_line_end": "\u884C\u672B\u306B\u79FB\u52D5",
  "modal.system_shortcut_doc_start": "\u6587\u66F8\u306E\u5148\u982D\u306B\u79FB\u52D5",
  "modal.system_shortcut_doc_end": "\u6587\u66F8\u306E\u672B\u5C3E\u306B\u79FB\u52D5",
  "modal.system_shortcut_delete_line_start": "\u884C\u982D\u307E\u3067\u524A\u9664",
  "modal.system_shortcut_undo": "\u5143\u306B\u623B\u3059",
  "modal.system_shortcut_redo": "\u3084\u308A\u76F4\u3059",
  "modal.system_shortcut_select_line_start": "\u884C\u982D\u307E\u3067\u9078\u629E",
  "modal.system_shortcut_select_line_end": "\u884C\u672B\u307E\u3067\u9078\u629E",
  "modal.system_shortcut_word_left": "\u5358\u8A9E\u5358\u4F4D\u3067\u5DE6\u306B\u79FB\u52D5",
  "modal.system_shortcut_word_right": "\u5358\u8A9E\u5358\u4F4D\u3067\u53F3\u306B\u79FB\u52D5",
  "modal.system_shortcut_paragraph_up": "\u6BB5\u843D\u5358\u4F4D\u3067\u4E0A\u306B\u79FB\u52D5",
  "modal.system_shortcut_paragraph_down": "\u6BB5\u843D\u5358\u4F4D\u3067\u4E0B\u306B\u79FB\u52D5",
  "modal.system_shortcut_delete_word": "\u524D\u306E\u5358\u8A9E\u3092\u524A\u9664",
  "modal.system_shortcut_select_word_left": "\u524D\u306E\u5358\u8A9E\u3092\u9078\u629E",
  "modal.system_shortcut_select_word_right": "\u6B21\u306E\u5358\u8A9E\u3092\u9078\u629E",
  "category.editing": "\u7DE8\u96C6",
  "category.navigation": "\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3",
  "category.search": "\u691C\u7D22",
  "category.files_vault": "\u30D5\u30A1\u30A4\u30EB\u3068Vault",
  "category.workspace": "\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9",
  "category.other": "\u305D\u306E\u4ED6",
  "settings.heading": "\u30DB\u30C3\u30C8\u30AD\u30FC\u65E9\u898B\u8868",
  "settings.ribbon.label": "\u30EA\u30DC\u30F3\u30A2\u30A4\u30B3\u30F3\u3092\u8868\u793A",
  "settings.ribbon.desc": "\u30EA\u30DC\u30F3\u30C4\u30FC\u30EB\u30D0\u30FC\u306B\u30AD\u30FC\u30DC\u30FC\u30C9\u30A2\u30A4\u30B3\u30F3\u3092\u8868\u793A\u3057\u307E\u3059\u3002Obsidian\u306E\u518D\u8AAD\u307F\u8FBC\u307F\u5F8C\u306B\u6709\u52B9\u306B\u306A\u308A\u307E\u3059\u3002",
  "settings.usage_tracking.label": "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306E\u4F7F\u7528\u72B6\u6CC1\u3092\u8A18\u9332",
  "settings.usage_tracking.desc": "\u30A2\u30D7\u30EA\u5185\u306E\u3069\u3053\u3067\u3082\u62BC\u3055\u308C\u305F\u4FEE\u98FE\u30AD\u30FC+\u30AD\u30FC\u306E\u7D44\u307F\u5408\u308F\u305B\u306E\u983B\u5EA6\u3092\u8A18\u9332\u3057\u3001\u65E9\u898B\u8868\u306B\u4F7F\u7528\u72B6\u6CC1\u30A4\u30F3\u30B8\u30B1\u30FC\u30BF\u30FC\u3092\u8868\u793A\u3057\u307E\u3059\u3002\u8A8D\u8B58\u3055\u308C\u305F\u30DB\u30C3\u30C8\u30AD\u30FC\u306B\u9650\u5B9A\u3055\u308C\u307E\u305B\u3093\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u306F\u30AA\u30D5\u3067\u3059\u3002",
  "settings.usage_tracking.reset_label": "\u4F7F\u7528\u72B6\u6CC1\u306E\u7D71\u8A08\u3092\u30EA\u30BB\u30C3\u30C8",
  "settings.usage_tracking.reset_desc": "\u8A18\u9332\u3055\u308C\u305F\u3059\u3079\u3066\u306E\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u4F7F\u7528\u56DE\u6570\u3092\u6D88\u53BB\u3057\u307E\u3059\u3002\u3053\u306E\u64CD\u4F5C\u306F\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002",
  "settings.usage_tracking.reset_confirm": "\u3082\u3046\u4E00\u5EA6\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u78BA\u8A8D: \u8A18\u9332\u3055\u308C\u305F\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306E\u4F7F\u7528\u72B6\u6CC1\u304C\u3059\u3079\u3066\u5B8C\u5168\u306B\u6D88\u53BB\u3055\u308C\u307E\u3059\u3002",
  "settings.usage_tracking.reset_success": "\u4F7F\u7528\u72B6\u6CC1\u306E\u7D71\u8A08\u3092\u6D88\u53BB\u3057\u307E\u3057\u305F\u3002",
  "settings.about.name": "\u30DB\u30C3\u30C8\u30AD\u30FC\u65E9\u898B\u8868",
  "settings.about.description": "Obsidian\u306E\u30DB\u30C3\u30C8\u30AD\u30FC\u3092\u5206\u985E\u30FB\u691C\u7D22\u53EF\u80FD\u306A\u5F62\u3067\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u306B\u8868\u793A\u3057\u307E\u3059\u3002",
  "settings.about.author": "Pierre Awaragi"
};

// src/ts/i18n/i18n.ts
var locales = { en: en_default, fr: fr_default, es: es_default, ar: ar_default, ja: ja_default };
var RTL_LOCALES = /* @__PURE__ */ new Set(["ar"]);
function detectLocale() {
  var _a, _b;
  if (typeof window === "undefined") return "en";
  const lang = (_b = (_a = window.moment) == null ? void 0 : _a.locale()) != null ? _b : navigator.language;
  const code = lang.split("-")[0].toLowerCase();
  return code in locales ? code : "en";
}
function translate(key, locale2, vars) {
  var _a, _b;
  const strings = (_a = locales[locale2]) != null ? _a : locales["en"];
  let str = (_b = strings[key]) != null ? _b : en_default[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{{${k}}}`, v);
    }
  }
  return str;
}
function t(key, vars) {
  return translate(key, detectLocale(), vars);
}
function locale() {
  return detectLocale();
}
function isRtl(loc) {
  return RTL_LOCALES.has(loc);
}
function compareStrings(a, b, loc = locale()) {
  return a.localeCompare(b, loc);
}

// src/ts/types.ts
var DEFAULT_SETTINGS = {
  showRibbonIcon: true,
  trackShortcutUsage: false
};

// src/ts/usage/usageTracker.ts
var import_obsidian = require("obsidian");
var USAGE_DATA_FILENAME = "usage-data.json";
var FLUSH_INTERVAL_MS = 2e3;
var MODIFIER_ORDER = ["Mod", "Ctrl", "Meta", "Shift", "Alt"];
var MODIFIER_KEYS = /* @__PURE__ */ new Set(["Control", "Shift", "Alt", "Meta"]);
function dedupeModAlias(modifiers) {
  if (!modifiers.includes("Mod")) return modifiers;
  const alias = import_obsidian.Platform.isMacOS ? "Meta" : "Ctrl";
  return modifiers.filter((mod) => mod !== alias);
}
function buildSignature(modifiers, key) {
  const held = new Set(modifiers);
  const ordered = MODIFIER_ORDER.filter((mod) => held.has(mod));
  return [...ordered, key.toUpperCase()].join("+");
}
function parseSignature(signature) {
  const parts = signature.split("+");
  const key = parts[parts.length - 1];
  const modifiers = parts.slice(0, -1);
  return { modifiers, key };
}
function isAsciiAlnum(key) {
  if (key.length !== 1) return false;
  const code = key.charCodeAt(0);
  return code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
function isComposedAltCharacter(evt) {
  if (!evt.altKey || evt.ctrlKey || evt.metaKey) return false;
  return evt.key.length === 1 && !isAsciiAlnum(evt.key);
}
function baseKeyFromCode(code) {
  var _a;
  if (!code) return null;
  const match = /^(?:Key([A-Z])|Digit([0-9]))$/.exec(code);
  if (!match) return null;
  return (_a = match[1]) != null ? _a : match[2];
}
function canonicaliseKeydown(evt) {
  if (evt.repeat) return null;
  if (MODIFIER_KEYS.has(evt.key)) return null;
  if (evt.key === "Dead") return null;
  if (isComposedAltCharacter(evt)) return null;
  const hasModifier = evt.ctrlKey || evt.metaKey || evt.altKey;
  if (!hasModifier) return null;
  const heldModifiers = MODIFIER_ORDER.filter((mod) => import_obsidian.Keymap.isModifier(evt, mod));
  const recoveredKey = evt.altKey && (evt.ctrlKey || evt.metaKey) && !isAsciiAlnum(evt.key) ? baseKeyFromCode(evt.code) : null;
  return buildSignature(dedupeModAlias(heldModifiers), recoveredKey != null ? recoveredKey : evt.key);
}
var counters = {};
var appRef = null;
var usageFilePath = null;
var flushDebounced = null;
var keydownListener = null;
function getUsageFilePath(pluginDir) {
  return (0, import_obsidian.normalizePath)(`${pluginDir}/${USAGE_DATA_FILENAME}`);
}
async function writeUsageData() {
  if (!appRef || !usageFilePath) return;
  const data = { version: 1, counts: { ...counters } };
  try {
    await appRef.vault.adapter.write(usageFilePath, JSON.stringify(data));
  } catch (err) {
    console.error("[Hotkeys Cheatsheet] Failed to write usage data:", err);
  }
}
async function loadUsageData(app, pluginDir) {
  appRef = app;
  counters = {};
  if (!pluginDir) {
    usageFilePath = null;
    flushDebounced = null;
    return false;
  }
  usageFilePath = getUsageFilePath(pluginDir);
  flushDebounced = (0, import_obsidian.debounce)(() => void writeUsageData(), FLUSH_INTERVAL_MS, false);
  if (await appRef.vault.adapter.exists(usageFilePath)) {
    try {
      const parsed = JSON.parse(await appRef.vault.adapter.read(usageFilePath));
      counters = { ...parsed.counts };
    } catch (e) {
      counters = {};
    }
  }
  return true;
}
function getUsageCounts() {
  return { ...counters };
}
function increment(signature) {
  var _a;
  counters[signature] = ((_a = counters[signature]) != null ? _a : 0) + 1;
  flushDebounced == null ? void 0 : flushDebounced();
}
async function resetUsageData() {
  counters = {};
  flushDebounced == null ? void 0 : flushDebounced.cancel();
  await writeUsageData();
}
async function flushUsageData() {
  flushDebounced == null ? void 0 : flushDebounced.cancel();
  await writeUsageData();
}
function handleKeydown(evt) {
  const signature = canonicaliseKeydown(evt);
  if (signature) increment(signature);
}
function startCapture(app) {
  appRef = app;
  if (keydownListener) return;
  keydownListener = handleKeydown;
  window.addEventListener("keydown", keydownListener, { capture: true });
}
function stopCapture() {
  if (!keydownListener) return;
  window.removeEventListener("keydown", keydownListener, { capture: true });
  keydownListener = null;
}

// src/ts/settingsTab.ts
var RESET_CONFIRM_TIMEOUT_MS = 5e3;
var HotkeysCheatsheetSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.resetPending = false;
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    this.resetPending = false;
    new import_obsidian2.Setting(containerEl).setName(t("settings.heading")).setHeading();
    new import_obsidian2.Setting(containerEl).setName(t("settings.ribbon.label")).setDesc(t("settings.ribbon.desc")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.showRibbonIcon).onChange(async (value) => {
        this.plugin.settings.showRibbonIcon = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("settings.usage_tracking.label")).setDesc(t("settings.usage_tracking.desc")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.trackShortcutUsage).onChange(async (value) => {
        this.plugin.settings.trackShortcutUsage = value;
        await this.plugin.saveSettings();
        if (value) {
          startCapture(this.plugin.app);
        } else {
          stopCapture();
        }
      })
    );
    new import_obsidian2.Setting(containerEl).setName(t("settings.usage_tracking.reset_label")).setDesc(t("settings.usage_tracking.reset_desc")).addButton((button) => {
      button.buttonEl.addClass("mod-warning");
      button.setButtonText(t("settings.usage_tracking.reset_label")).onClick(async () => {
        if (!this.resetPending) {
          this.resetPending = true;
          new import_obsidian2.Notice(t("settings.usage_tracking.reset_confirm"), RESET_CONFIRM_TIMEOUT_MS);
          window.setTimeout(() => {
            this.resetPending = false;
          }, RESET_CONFIRM_TIMEOUT_MS);
          return;
        }
        this.resetPending = false;
        await resetUsageData();
        new import_obsidian2.Notice(t("settings.usage_tracking.reset_success"));
      });
    });
    const about = containerEl.createDiv({ cls: "hkc-about" });
    const aboutName = about.createEl("p", { cls: "hkc-about-name" });
    aboutName.createEl("strong", { text: t("settings.about.name") });
    aboutName.appendText(` \u2014 v${this.plugin.manifest.version}`);
    about.createEl("p", {
      text: t("settings.about.description"),
      cls: "hkc-about-desc"
    });
    about.createEl("p", {
      text: t("settings.about.author"),
      cls: "hkc-about-author"
    });
  }
};

// src/ts/modal/cheatsheet.ts
var import_obsidian8 = require("obsidian");

// src/ts/modal/state.ts
var import_obsidian3 = require("obsidian");

// src/ts/hotkeys/categories.ts
var CORE_PREFIX_MAP = {
  editor: "Editing",
  markdown: "Editing",
  properties: "Editing",
  backlink: "Navigation",
  bookmarks: "Navigation",
  "command-palette": "Navigation",
  graph: "Navigation",
  navigate: "Navigation",
  outline: "Navigation",
  starred: "Navigation",
  switcher: "Navigation",
  "tag-pane": "Navigation",
  "global-search": "Search",
  search: "Search",
  "file-explorer": "Files & Vault",
  "file-recovery": "Files & Vault",
  file: "Files & Vault",
  app: "Workspace",
  canvas: "Workspace",
  theme: "Workspace",
  window: "Workspace",
  workspace: "Workspace"
};
var CATEGORY_ORDER = [
  "Editing",
  "Navigation",
  "Search",
  "Files & Vault",
  "Workspace"
];
var OTHER_CATEGORY = "Other";
var SELF_PLUGIN_CATEGORY = "Hotkeys Cheatsheet";
var CATEGORY_LABEL_KEYS = {
  Editing: "category.editing",
  Navigation: "category.navigation",
  Search: "category.search",
  "Files & Vault": "category.files_vault",
  Workspace: "category.workspace",
  [OTHER_CATEGORY]: "category.other",
  [SELF_PLUGIN_CATEGORY]: "settings.about.name"
};
function categoryDisplayLabel(category) {
  const key = CATEGORY_LABEL_KEYS[category];
  return key ? t(key) : category;
}

// src/ts/hotkeys/hotkeyCollector.ts
function signatureSet(bindings) {
  return new Set(bindings.map((hk) => buildSignature(hk.modifiers, hk.key)));
}
function isModifiedFromDefault(id, effective, defaultKeys) {
  if (!(id in defaultKeys)) return true;
  const defaultSet = signatureSet(defaultKeys[id]);
  const effectiveSet = signatureSet(effective);
  if (defaultSet.size !== effectiveSet.size) return true;
  for (const sig of defaultSet) {
    if (!effectiveSet.has(sig)) return true;
  }
  return false;
}
function toTitleCase(str) {
  return str.split(/[-_\s]+/).map((w) => w ? w.charAt(0).toUpperCase() + w.slice(1) : "").join(" ");
}
function categorise(id, displayName) {
  const colonIdx = id.indexOf(":");
  if (colonIdx !== -1) {
    const prefix = id.slice(0, colonIdx);
    if (prefix in CORE_PREFIX_MAP) {
      return CORE_PREFIX_MAP[prefix];
    }
    return toTitleCase(prefix);
  }
  const separatorIdx = displayName.indexOf(": ");
  if (separatorIdx !== -1) {
    return displayName.slice(0, separatorIdx);
  }
  return OTHER_CATEGORY;
}
function stripCategoryPrefix(name, category) {
  const prefix = category + ": ";
  return name.startsWith(prefix) ? name.slice(prefix.length) : name;
}
function buildHotkeyGroups(defaultKeys, customKeys, commands) {
  var _a, _b;
  const allIds = /* @__PURE__ */ new Set([...Object.keys(defaultKeys), ...Object.keys(customKeys)]);
  const entries = [];
  for (const id of allIds) {
    const hotkeys = id in customKeys ? customKeys[id] : (_a = defaultKeys[id]) != null ? _a : [];
    if (hotkeys.length === 0) continue;
    const cmd = commands[id];
    const rawName = (_b = cmd == null ? void 0 : cmd.name) != null ? _b : id;
    const category = categorise(id, rawName);
    const name = stripCategoryPrefix(rawName, category);
    const normalisedHotkeys = hotkeys.map((hk) => ({
      modifiers: hk.modifiers,
      key: hk.key.toUpperCase()
    }));
    entries.push({
      id,
      name,
      category,
      hotkeys: normalisedHotkeys,
      isModifiedFromDefault: isModifiedFromDefault(id, hotkeys, defaultKeys)
    });
  }
  const groupMap = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const bucket = groupMap.get(entry.category);
    if (bucket) {
      bucket.push(entry);
    } else {
      groupMap.set(entry.category, [entry]);
    }
  }
  for (const bucket of groupMap.values()) {
    bucket.sort((a, b) => compareStrings(a.name, b.name));
  }
  const coreCategories = CATEGORY_ORDER.filter((cat) => groupMap.has(cat));
  const pluginCategories = [...groupMap.keys()].filter((cat) => !CATEGORY_ORDER.includes(cat)).sort((a, b) => compareStrings(a, b));
  return [...coreCategories, ...pluginCategories].map((category) => ({
    category,
    entries: groupMap.get(category)
  }));
}
function collectHotkeys(app) {
  var _a;
  const hm = app.hotkeyManager;
  if (!(hm == null ? void 0 : hm.defaultKeys) || !(hm == null ? void 0 : hm.customKeys)) {
    console.warn(
      "[Hotkeys Cheatsheet] hotkeyManager.defaultKeys / customKeys unavailable \u2014 hotkey display is empty."
    );
    return [];
  }
  const commands = (_a = app.commands) == null ? void 0 : _a.commands;
  if (!commands) {
    console.warn("[Hotkeys Cheatsheet] app.commands.commands unavailable.");
    return [];
  }
  return buildHotkeyGroups(hm.defaultKeys, hm.customKeys, commands);
}

// src/ts/usage/systemShortcuts.ts
var MAC_LABEL_KEYS = {
  "Mod+C": "modal.system_shortcut_copy",
  "Mod+X": "modal.system_shortcut_cut",
  "Mod+V": "modal.system_shortcut_paste",
  "Mod+A": "modal.system_shortcut_select_all",
  "Mod+Z": "modal.system_shortcut_undo",
  "Mod+Shift+Z": "modal.system_shortcut_redo",
  "Mod+ARROWLEFT": "modal.system_shortcut_line_start",
  "Mod+ARROWRIGHT": "modal.system_shortcut_line_end",
  "Mod+ARROWUP": "modal.system_shortcut_doc_start",
  "Mod+ARROWDOWN": "modal.system_shortcut_doc_end",
  "Mod+BACKSPACE": "modal.system_shortcut_delete_line_start",
  "Mod+Shift+ARROWLEFT": "modal.system_shortcut_select_line_start",
  "Mod+Shift+ARROWRIGHT": "modal.system_shortcut_select_line_end",
  "Alt+ARROWLEFT": "modal.system_shortcut_word_left",
  "Alt+ARROWRIGHT": "modal.system_shortcut_word_right",
  // Option+Shift+Arrow extends the selection by one word — same concept as
  // Windows/Linux's Ctrl+Shift+Arrow below, so it reuses those label keys.
  "Shift+Alt+ARROWLEFT": "modal.system_shortcut_select_word_left",
  "Shift+Alt+ARROWRIGHT": "modal.system_shortcut_select_word_right"
};
var OTHER_LABEL_KEYS = {
  "Mod+C": "modal.system_shortcut_copy",
  "Mod+X": "modal.system_shortcut_cut",
  "Mod+V": "modal.system_shortcut_paste",
  "Mod+A": "modal.system_shortcut_select_all",
  "Mod+Z": "modal.system_shortcut_undo",
  "Mod+Shift+Z": "modal.system_shortcut_redo",
  "Mod+ARROWLEFT": "modal.system_shortcut_word_left",
  "Mod+ARROWRIGHT": "modal.system_shortcut_word_right",
  "Mod+ARROWUP": "modal.system_shortcut_paragraph_up",
  "Mod+ARROWDOWN": "modal.system_shortcut_paragraph_down",
  "Mod+BACKSPACE": "modal.system_shortcut_delete_word",
  "Mod+Shift+ARROWLEFT": "modal.system_shortcut_select_word_left",
  "Mod+Shift+ARROWRIGHT": "modal.system_shortcut_select_word_right"
};
function systemShortcutLabelKey(signature, isMac) {
  return (isMac ? MAC_LABEL_KEYS : OTHER_LABEL_KEYS)[signature];
}
function isSuspectedSystemShortcut(signature, isMac) {
  return systemShortcutLabelKey(signature, isMac) !== void 0;
}

// src/ts/usage/usageResolver.ts
function resolveUsage(groups, counts, isMac) {
  const matchedSignatures = /* @__PURE__ */ new Set();
  let maxEntryCount = 0;
  let maxCategoryAggregate = 0;
  const resolvedGroups = groups.map((group) => {
    let aggregate = 0;
    const entries = group.entries.map((entry) => {
      var _a;
      let count = 0;
      const bindingCounts = [];
      for (const hk of entry.hotkeys) {
        const signature = buildSignature(hk.modifiers, hk.key);
        const bindingCount = (_a = counts[signature]) != null ? _a : 0;
        if (signature in counts) matchedSignatures.add(signature);
        bindingCounts.push(bindingCount);
        count += bindingCount;
      }
      aggregate += count;
      if (count > maxEntryCount) maxEntryCount = count;
      return { ...entry, count, bindingCounts };
    });
    if (aggregate > maxCategoryAggregate) maxCategoryAggregate = aggregate;
    return { category: group.category, entries, aggregate };
  });
  const orphans = Object.entries(counts).filter(([signature]) => !matchedSignatures.has(signature)).map(([signature, count]) => {
    const { modifiers, key } = parseSignature(signature);
    return {
      signature,
      modifiers,
      key,
      count,
      isSuspectedSystemShortcut: isSuspectedSystemShortcut(signature, isMac)
    };
  });
  return { groups: resolvedGroups, orphans, maxEntryCount, maxCategoryAggregate };
}

// src/ts/hotkeys/conflictDetector.ts
function resolveConflicts(groups) {
  const idsBySignature = /* @__PURE__ */ new Map();
  for (const group of groups) {
    for (const entry of group.entries) {
      for (const hk of entry.hotkeys) {
        const signature = buildSignature(hk.modifiers, hk.key);
        const ids = idsBySignature.get(signature);
        if (ids) {
          ids.add(entry.id);
        } else {
          idsBySignature.set(signature, /* @__PURE__ */ new Set([entry.id]));
        }
      }
    }
  }
  const conflictingIds = /* @__PURE__ */ new Set();
  for (const ids of idsBySignature.values()) {
    if (ids.size > 1) {
      for (const id of ids) conflictingIds.add(id);
    }
  }
  return conflictingIds;
}

// src/ts/modal/state.ts
var EMPTY_USAGE_RESOLUTION = {
  groups: [],
  orphans: [],
  maxEntryCount: 0,
  maxCategoryAggregate: 0
};
var CheatsheetState = class {
  constructor() {
    this.groups = [];
    this.usageResolution = EMPTY_USAGE_RESOLUTION;
    this.conflictingIds = /* @__PURE__ */ new Set();
    this.searchQuery = "";
    this.activeModifiers = /* @__PURE__ */ new Set();
    this.conflictsOnly = false;
    this.modifiedOnly = false;
    this.specialKeysOnly = false;
    this.sortMode = "category";
    this.collapsedSections = /* @__PURE__ */ new Set();
    this.currentGroupLabels = [];
    this.pendingOverwrite = null;
    // Snapshot of collapsedSections taken when search becomes active,
    // restored when search is cleared.
    this.searchSnapshot = null;
  }
  get isSearching() {
    return this.searchQuery !== "";
  }
  /** Loads fresh hotkey/usage data and resets per-open state. Call from onOpen. */
  load(app) {
    this.collapsedSections = /* @__PURE__ */ new Set();
    this.searchSnapshot = null;
    this.pendingOverwrite = null;
    this.sortMode = "category";
    this.groups = collectHotkeys(app);
    this.usageResolution = resolveUsage(this.groups, getUsageCounts(), import_obsidian3.Platform.isMacOS);
    this.conflictingIds = resolveConflicts(this.groups);
    this.currentGroupLabels = this.groups.map((g) => g.category);
  }
  /** Updates the search query, snapshotting/restoring collapse state at the search boundary. */
  setSearchQuery(query) {
    const prev = this.searchQuery;
    this.searchQuery = query;
    if (prev === "" && query !== "") {
      this.searchSnapshot = new Set(this.collapsedSections);
    } else if (query === "" && prev !== "") {
      this.restoreSnapshot();
    }
  }
  clearSearch() {
    this.setSearchQuery("");
  }
  restoreSnapshot() {
    if (this.searchSnapshot !== null) {
      this.collapsedSections = this.searchSnapshot;
      this.searchSnapshot = null;
    }
  }
  setModifierActive(mod, active) {
    if (active) {
      this.activeModifiers.add(mod);
    } else {
      this.activeModifiers.delete(mod);
    }
  }
  setConflictsOnly(active) {
    this.conflictsOnly = active;
  }
  setModifiedOnly(active) {
    this.modifiedOnly = active;
  }
  setSpecialKeysOnly(active) {
    this.specialKeysOnly = active;
  }
  setSortMode(mode) {
    this.sortMode = mode;
    this.collapsedSections.clear();
  }
  setCurrentGroupLabels(labels) {
    this.currentGroupLabels = labels;
  }
  isSectionCollapsed(category) {
    return this.collapsedSections.has(category);
  }
  toggleSection(category) {
    if (this.collapsedSections.has(category)) {
      this.collapsedSections.delete(category);
    } else {
      this.collapsedSections.add(category);
    }
  }
  /** Whether every currently-rendered group is collapsed — drives the expand-all icon. */
  areAllSectionsCollapsed() {
    return this.currentGroupLabels.length > 0 && this.currentGroupLabels.every((label) => this.collapsedSections.has(label));
  }
  toggleCollapseAll() {
    const allCollapsed = this.currentGroupLabels.every(
      (label) => this.collapsedSections.has(label)
    );
    if (allCollapsed) {
      this.collapsedSections.clear();
    } else {
      for (const label of this.currentGroupLabels) {
        this.collapsedSections.add(label);
      }
    }
  }
  /** True if `path` currently has a live overwrite confirmation window open. */
  isOverwriteConfirmed(path) {
    return this.pendingOverwrite !== null && this.pendingOverwrite.path === path && Date.now() < this.pendingOverwrite.expiresAt;
  }
  requestOverwriteConfirm(path, windowMs) {
    this.pendingOverwrite = { path, expiresAt: Date.now() + windowMs };
  }
  clearPendingOverwrite() {
    this.pendingOverwrite = null;
  }
};

// src/ts/modal/toolbar.ts
var import_obsidian5 = require("obsidian");

// src/ts/hotkeys/keyDisplay.ts
var import_obsidian4 = require("obsidian");
var MOD_LABEL_MAC = {
  Mod: "Cmd",
  Meta: "Cmd",
  Ctrl: "Ctrl",
  Shift: "Shift",
  Alt: "Option"
};
var MOD_LABEL_WIN = {
  Mod: "Ctrl",
  Meta: "Win",
  Ctrl: "Ctrl",
  Shift: "Shift",
  Alt: "Alt"
};
var FILTER_LABEL_MAC = {
  Mod: "Cmd",
  Ctrl: "Ctrl",
  Shift: "Shift",
  Alt: "Option"
};
function modLabel(token) {
  var _a, _b;
  return import_obsidian4.Platform.isMacOS ? (_a = MOD_LABEL_MAC[token]) != null ? _a : token : (_b = MOD_LABEL_WIN[token]) != null ? _b : token;
}
function filterLabel(token) {
  var _a;
  if (!import_obsidian4.Platform.isMacOS) return token;
  return (_a = FILTER_LABEL_MAC[token]) != null ? _a : token;
}
var KEY_ICONS = {
  ARROWUP: "\u2191",
  ARROWDOWN: "\u2193",
  ARROWLEFT: "\u2190",
  ARROWRIGHT: "\u2192",
  ENTER: "\u21B5",
  BACKSPACE: "\u232B",
  DELETE: "\u2326",
  TAB: "\u21E5",
  PAGEUP: "PgUp",
  PAGEDOWN: "PgDn",
  HOME: "Home",
  END: "End",
  ESCAPE: "Esc"
};
function keyIcon(key) {
  var _a;
  return (_a = KEY_ICONS[key]) != null ? _a : key;
}
function isSpecialKey(key) {
  return key in KEY_ICONS;
}
var SPECIAL_KEY_ORDER = Object.keys(KEY_ICONS);
function compareKeys(a, b, loc = locale()) {
  const aIndex = SPECIAL_KEY_ORDER.indexOf(a);
  const bIndex = SPECIAL_KEY_ORDER.indexOf(b);
  const aSpecial = aIndex !== -1;
  const bSpecial = bIndex !== -1;
  if (aSpecial && bSpecial) return aIndex - bIndex;
  if (aSpecial !== bSpecial) return aSpecial ? -1 : 1;
  return compareStrings(a, b, loc);
}

// src/ts/modal/toolbar.ts
var SORT_CHIP_KEYS = {
  modifier: "modal.sort_chip_modifier",
  key: "modal.sort_chip_key",
  "most-used-category": "modal.sort_chip_most_used_category",
  "most-used-shortcut": "modal.sort_chip_most_used_shortcut"
};
var Toolbar = class {
  constructor(settings, state, callbacks) {
    this.settings = settings;
    this.state = state;
    this.callbacks = callbacks;
    this.filterOpen = false;
    this.exportOpen = false;
    this.sortCheckboxes = [];
    this.sortOpen = false;
    this.handleOutsideClick = (e) => {
      if (this.filterOpen && !this.filterDropdown.contains(e.target)) {
        this.filterOpen = false;
        this.filterDropdown.addClass("hkc-hidden");
      }
      if (this.exportOpen && !this.exportDropdown.contains(e.target)) {
        this.exportOpen = false;
        this.exportDropdown.addClass("hkc-hidden");
      }
      if (this.sortOpen && !this.sortDropdown.contains(e.target)) {
        this.sortOpen = false;
        this.sortDropdown.addClass("hkc-hidden");
      }
    };
  }
  /**
   * Closes every dropdown. Each toggle button's own click handler stops
   * propagation (so a click inside the dropdown doesn't immediately trigger
   * `handleOutsideClick` and close it right back), which also means that
   * handler never runs for clicks on a *different* toggle button — so each
   * button must close its siblings itself before opening its own dropdown.
   */
  closeDropdowns() {
    this.filterOpen = false;
    this.filterDropdown.addClass("hkc-hidden");
    this.exportOpen = false;
    this.exportDropdown.addClass("hkc-hidden");
    this.sortOpen = false;
    this.sortDropdown.addClass("hkc-hidden");
  }
  attach(doc) {
    doc.addEventListener("click", this.handleOutsideClick);
  }
  detach(doc) {
    doc.removeEventListener("click", this.handleOutsideClick);
  }
  focusSearch() {
    var _a;
    (_a = this.searchInput) == null ? void 0 : _a.focus();
  }
  /** Escape-triggered clear (no focus, no clear-button DOM update — matches the original close() path). */
  applySearchClear() {
    this.searchInput.value = "";
    this.state.clearSearch();
    this.updateToolbarState();
    this.callbacks.onChange();
  }
  build(parent) {
    const toolbar = parent.createDiv({ cls: "hkc-toolbar" });
    const exportWrapper = toolbar.createDiv({ cls: "hkc-export-wrapper" });
    const exportBtn = exportWrapper.createEl("button", { cls: "hkc-export-btn" });
    (0, import_obsidian5.setIcon)(exportBtn, "download");
    exportBtn.setAttribute("aria-label", t("modal.export_label"));
    this.exportDropdown = exportWrapper.createDiv({
      cls: "hkc-export-dropdown hkc-hidden"
    });
    const saveNoteItem = this.exportDropdown.createDiv({ cls: "hkc-export-item" });
    saveNoteItem.setText(t("modal.export_save_note"));
    saveNoteItem.addEventListener("click", () => {
      this.exportOpen = false;
      this.exportDropdown.addClass("hkc-hidden");
      this.callbacks.onExportNote();
    });
    const saveHtmlItem = this.exportDropdown.createDiv({ cls: "hkc-export-item" });
    saveHtmlItem.setText(t("modal.export_save_html"));
    saveHtmlItem.addEventListener("click", () => {
      this.exportOpen = false;
      this.exportDropdown.addClass("hkc-hidden");
      this.callbacks.onExportHtml();
    });
    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const opening = !this.exportOpen;
      this.closeDropdowns();
      this.exportOpen = opening;
      this.exportDropdown.toggleClass("hkc-hidden", !this.exportOpen);
    });
    this.exportDropdown.addEventListener("click", (e) => e.stopPropagation());
    const searchWrapper = toolbar.createDiv({ cls: "hkc-search-wrapper" });
    this.searchInput = searchWrapper.createEl("input", {
      type: "text",
      placeholder: t("modal.search_placeholder"),
      cls: "hkc-search"
    });
    const clearBtn = searchWrapper.createEl("button", { cls: "hkc-search-clear hkc-hidden" });
    (0, import_obsidian5.setIcon)(clearBtn, "x");
    clearBtn.addEventListener("click", () => {
      this.searchInput.value = "";
      this.searchInput.focus();
      clearBtn.addClass("hkc-hidden");
      this.searchInput.classList.remove("hkc-search--active");
      this.state.clearSearch();
      this.updateToolbarState();
      this.callbacks.onChange();
    });
    this.searchInput.addEventListener("input", () => {
      this.state.setSearchQuery(this.searchInput.value);
      clearBtn.toggleClass("hkc-hidden", this.state.searchQuery === "");
      this.searchInput.classList.toggle("hkc-search--active", this.state.searchQuery !== "");
      this.updateToolbarState();
      this.callbacks.onChange();
    });
    const filterWrapper = toolbar.createDiv({ cls: "hkc-filter-wrapper" });
    this.filterBtn = filterWrapper.createEl("button", { cls: "hkc-filter-btn" });
    this.filterDropdown = filterWrapper.createDiv({
      cls: "hkc-filter-dropdown hkc-hidden"
    });
    const modTokens = ["Mod", "Shift", "Alt", "Ctrl"];
    for (const mod of modTokens) {
      const label = this.filterDropdown.createEl("label", {
        cls: "hkc-filter-item"
      });
      const checkbox = label.createEl("input", { type: "checkbox" });
      checkbox.dataset.mod = mod;
      label.appendText(" " + filterLabel(mod));
      checkbox.addEventListener("change", () => {
        this.state.setModifierActive(mod, checkbox.checked);
        this.updateFilterBtn();
        this.callbacks.onChange();
      });
    }
    this.filterDropdown.createDiv({ cls: "hkc-dropdown-divider" });
    const specialKeysLabel = this.filterDropdown.createEl("label", {
      cls: "hkc-filter-item"
    });
    const specialKeysCheckbox = specialKeysLabel.createEl("input", { type: "checkbox" });
    specialKeysLabel.appendText(" " + t("modal.filter_special_keys_only"));
    specialKeysCheckbox.addEventListener("change", () => {
      this.state.setSpecialKeysOnly(specialKeysCheckbox.checked);
      this.updateFilterBtn();
      this.callbacks.onChange();
    });
    this.filterDropdown.createDiv({ cls: "hkc-dropdown-divider" });
    const conflictsLabel = this.filterDropdown.createEl("label", {
      cls: "hkc-filter-item"
    });
    const conflictsCheckbox = conflictsLabel.createEl("input", { type: "checkbox" });
    conflictsLabel.appendText(" " + t("modal.filter_conflicts_only"));
    conflictsCheckbox.addEventListener("change", () => {
      this.state.setConflictsOnly(conflictsCheckbox.checked);
      this.updateFilterBtn();
      this.callbacks.onChange();
    });
    const modifiedLabel = this.filterDropdown.createEl("label", {
      cls: "hkc-filter-item"
    });
    const modifiedCheckbox = modifiedLabel.createEl("input", { type: "checkbox" });
    modifiedLabel.appendText(" " + t("modal.filter_modified_only"));
    modifiedCheckbox.addEventListener("change", () => {
      this.state.setModifiedOnly(modifiedCheckbox.checked);
      this.updateFilterBtn();
      this.callbacks.onChange();
    });
    this.filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const opening = !this.filterOpen;
      this.closeDropdowns();
      this.filterOpen = opening;
      this.filterDropdown.toggleClass("hkc-hidden", !this.filterOpen);
    });
    this.filterDropdown.addEventListener("click", (e) => e.stopPropagation());
    this.updateFilterBtn();
    this.buildSortControl(toolbar);
    this.collapseToggleBtn = toolbar.createEl("button", {
      cls: "hkc-icon-btn"
    });
    this.collapseToggleBtn.addEventListener("click", () => {
      this.state.toggleCollapseAll();
      this.callbacks.onChange();
    });
    this.updateCollapseToggle();
    return toolbar;
  }
  buildSortControl(toolbar) {
    const sortWrapper = toolbar.createDiv({ cls: "hkc-sort-wrapper" });
    this.sortBtn = sortWrapper.createEl("button", { cls: "hkc-sort-btn" });
    this.sortDropdown = sortWrapper.createDiv({
      cls: "hkc-sort-dropdown hkc-hidden"
    });
    const regularModes = [
      { mode: "modifier", labelKey: "modal.sort_modifier" },
      { mode: "key", labelKey: "modal.sort_key" }
    ];
    const usageModes = [
      { mode: "most-used-category", labelKey: "modal.sort_most_used_category" },
      { mode: "most-used-shortcut", labelKey: "modal.sort_most_used_shortcut" }
    ];
    this.sortCheckboxes = [];
    for (const { mode, labelKey } of regularModes) {
      this.buildSortItem(mode, labelKey, false);
    }
    this.sortDropdown.createDiv({ cls: "hkc-dropdown-divider" });
    for (const { mode, labelKey } of usageModes) {
      this.buildSortItem(mode, labelKey, true);
    }
    this.sortBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const opening = !this.sortOpen;
      this.closeDropdowns();
      this.sortOpen = opening;
      this.sortDropdown.toggleClass("hkc-hidden", !this.sortOpen);
    });
    this.sortDropdown.addEventListener("click", (e) => e.stopPropagation());
    this.updateSortCheckboxes();
    this.updateSortBtn();
  }
  /**
   * Sort modes are mutually exclusive but — unlike modifiers/conflicts/modified —
   * never "off": exactly one is always in effect. "By Category" is the default
   * and has no checkbox of its own; it's the implicit state when every checkbox
   * here is unchecked (checking one unchecks the rest; unchecking the active
   * one reverts to it), mirroring the modifier filter's own checkbox pattern.
   */
  buildSortItem(mode, labelKey, usageDependent) {
    const disabled = usageDependent && !this.settings.trackShortcutUsage;
    const label = this.sortDropdown.createEl("label", {
      cls: disabled ? "hkc-filter-item hkc-filter-item--disabled" : "hkc-filter-item"
    });
    const checkbox = label.createEl("input", { type: "checkbox" });
    checkbox.dataset.mode = mode;
    checkbox.disabled = disabled;
    label.appendText(" " + t(labelKey));
    if (disabled) {
      label.setAttribute("aria-label", t("modal.sort_disabled_hint"));
    } else {
      checkbox.addEventListener("change", () => {
        this.state.setSortMode(checkbox.checked ? mode : "category");
        this.updateSortCheckboxes();
        this.updateToolbarState();
        this.updateSortBtn();
        this.callbacks.onChange();
      });
    }
    this.sortCheckboxes.push(checkbox);
  }
  updateSortCheckboxes() {
    for (const checkbox of this.sortCheckboxes) {
      checkbox.checked = checkbox.dataset.mode === this.state.sortMode;
    }
  }
  /** Mirrors `updateFilterBtn`: icon always shown; "By Category" (the default) has no chip, any other mode shows one. */
  updateSortBtn() {
    const btn = this.sortBtn;
    const chipKey = SORT_CHIP_KEYS[this.state.sortMode];
    btn.empty();
    (0, import_obsidian5.setIcon)(btn, "arrow-up-down");
    btn.setAttribute("aria-label", t("modal.sort_label"));
    if (!chipKey) {
      btn.removeClass("hkc-sort-btn--active");
      return;
    }
    btn.createSpan({ text: t(chipKey), cls: "hkc-filter-chip hkc-filter-chip--tag" });
    btn.addClass("hkc-sort-btn--active");
  }
  updateToolbarState() {
    const flatMode = this.state.sortMode === "most-used-shortcut" || this.state.sortMode === "key";
    const disableCollapse = this.state.isSearching || flatMode;
    this.collapseToggleBtn.disabled = disableCollapse;
    this.collapseToggleBtn.toggleClass("hkc-btn-disabled", disableCollapse);
    this.updateCollapseToggle();
  }
  /** Refreshes the collapse/expand-all icon — call after the grid re-renders, since that's when `currentGroupLabels` changes. */
  updateCollapseToggle() {
    if (this.state.areAllSectionsCollapsed()) {
      (0, import_obsidian5.setIcon)(this.collapseToggleBtn, "chevrons-up-down");
      this.collapseToggleBtn.setAttribute("aria-label", t("modal.expand_all"));
    } else {
      (0, import_obsidian5.setIcon)(this.collapseToggleBtn, "chevrons-down-up");
      this.collapseToggleBtn.setAttribute("aria-label", t("modal.collapse_all"));
    }
  }
  updateFilterBtn() {
    const btn = this.filterBtn;
    btn.empty();
    (0, import_obsidian5.setIcon)(btn, "filter");
    btn.setAttribute("aria-label", t("modal.filter_label"));
    const hasModifierChips = this.state.activeModifiers.size > 0;
    const hasOtherActiveFilter = this.state.conflictsOnly || this.state.modifiedOnly || this.state.specialKeysOnly;
    if (!hasModifierChips && !hasOtherActiveFilter) {
      btn.removeClass("hkc-filter-btn--active");
      return;
    }
    for (const mod of ["Mod", "Shift", "Alt", "Ctrl"]) {
      if (this.state.activeModifiers.has(mod)) {
        btn.createEl("kbd", { text: filterLabel(mod), cls: "hkc-filter-chip" });
      }
    }
    if (this.state.specialKeysOnly) {
      btn.createSpan({ text: t("modal.filter_special_keys_chip"), cls: "hkc-filter-chip hkc-filter-chip--tag" });
    }
    if (this.state.conflictsOnly) {
      btn.createSpan({ text: t("modal.filter_conflicts_chip"), cls: "hkc-filter-chip hkc-filter-chip--tag" });
    }
    if (this.state.modifiedOnly) {
      btn.createSpan({ text: t("modal.filter_modified_chip"), cls: "hkc-filter-chip hkc-filter-chip--tag" });
    }
    btn.addClass("hkc-filter-btn--active");
  }
};

// src/ts/modal/grid.ts
var import_obsidian6 = require("obsidian");

// src/ts/hotkeys/filterHotkeys.ts
function hotkeysMatchModifiers(hotkeys, activeModifiers) {
  if (activeModifiers.size === 0) return true;
  return hotkeys.some(
    (hk) => [...activeModifiers].every((m) => hk.modifiers.includes(m))
  );
}
var EMPTY_IDS = /* @__PURE__ */ new Set();
function matchesFilters(entry, query, activeModifiers, flags = {}) {
  var _a;
  if (!hotkeysMatchModifiers(entry.hotkeys, activeModifiers)) return false;
  const {
    conflictsOnly = false,
    modifiedOnly = false,
    specialKeysOnly = false,
    conflictingIds = EMPTY_IDS
  } = flags;
  if (conflictsOnly && !conflictingIds.has((_a = entry.commandId) != null ? _a : entry.id)) return false;
  if (modifiedOnly && !entry.isModifiedFromDefault) return false;
  if (specialKeysOnly && !entry.hotkeys.some((hk) => isSpecialKey(hk.key))) return false;
  if (query) {
    const lowerQuery = query.toLowerCase();
    const nameMatch = entry.name.toLowerCase().includes(lowerQuery);
    const keyMatch = entry.hotkeys.some(
      (hk) => hk.key.toLowerCase() === lowerQuery
    );
    if (!nameMatch && !keyMatch) return false;
  }
  return true;
}
function matchesFlatItem(item, query, activeModifiers, flags = {}) {
  if (!hotkeysMatchModifiers(item.hotkeys, activeModifiers)) return false;
  const {
    conflictsOnly = false,
    modifiedOnly = false,
    specialKeysOnly = false,
    conflictingIds = EMPTY_IDS
  } = flags;
  if (conflictsOnly && !conflictingIds.has(item.commandId)) return false;
  if (modifiedOnly && !item.isModifiedFromDefault) return false;
  if (specialKeysOnly && !item.hotkeys.some((hk) => isSpecialKey(hk.key))) return false;
  if (item.isOrphan) return query === "";
  if (query) {
    const lowerQuery = query.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(lowerQuery);
    const keyMatch = item.hotkeys.some((hk) => hk.key.toLowerCase() === lowerQuery);
    if (!nameMatch && !keyMatch) return false;
  }
  return true;
}

// src/ts/usage/usageGlyph.ts
var GLYPHS = ["\u2581", "\u2582", "\u2583", "\u2584", "\u2585", "\u2586", "\u2587", "\u2588"];
function countToGlyph(count, max) {
  if (max <= 0) {
    return { glyph: GLYPHS[0], level: 0 };
  }
  const ratio = Math.sqrt(count) / Math.sqrt(max);
  const level = Math.min(GLYPHS.length - 1, Math.max(0, Math.round(ratio * GLYPHS.length)));
  return { glyph: GLYPHS[level], level };
}

// src/ts/hotkeys/sortHotkeys.ts
function sortByMostUsedCategory(groups) {
  return [...groups].sort((a, b) => b.aggregate - a.aggregate).map((group) => ({
    ...group,
    entries: [...group.entries].sort((a, b) => b.count - a.count)
  }));
}
function sortByMostUsedShortcut(groups, orphans) {
  const entryItems = groups.flatMap(
    (group) => group.entries.map((entry) => ({
      id: entry.id,
      name: entry.name,
      hotkeys: entry.hotkeys,
      count: entry.count,
      bindingCounts: entry.bindingCounts,
      isOrphan: false,
      isSuspectedSystemShortcut: false,
      isModifiedFromDefault: entry.isModifiedFromDefault,
      commandId: entry.id
    }))
  );
  const orphanItems = orphans.map((orphan) => ({
    id: orphan.signature,
    name: "",
    hotkeys: [{ modifiers: orphan.modifiers, key: orphan.key }],
    count: orphan.count,
    bindingCounts: [orphan.count],
    isOrphan: true,
    isSuspectedSystemShortcut: orphan.isSuspectedSystemShortcut,
    isModifiedFromDefault: false,
    commandId: orphan.signature
  }));
  return [...entryItems, ...orphanItems].sort((a, b) => b.count - a.count);
}
function explodeEntryBindings(groups) {
  return groups.flatMap(
    (group) => group.entries.flatMap(
      (entry) => entry.hotkeys.map((hotkey, index) => ({
        id: `${entry.id}::${index}`,
        name: entry.name,
        hotkey,
        count: entry.bindingCounts[index],
        isModifiedFromDefault: entry.isModifiedFromDefault,
        commandId: entry.id
      }))
    )
  );
}
function modifierComboKey(modifiers) {
  return MODIFIER_ORDER.filter((mod) => modifiers.includes(mod)).join("+");
}
function compareModifiers(a, b) {
  const aOrdered = MODIFIER_ORDER.filter((mod) => a.includes(mod));
  const bOrdered = MODIFIER_ORDER.filter((mod) => b.includes(mod));
  if (aOrdered.length !== bOrdered.length) return aOrdered.length - bOrdered.length;
  for (let i = 0; i < aOrdered.length; i++) {
    const diff = MODIFIER_ORDER.indexOf(aOrdered[i]) - MODIFIER_ORDER.indexOf(bOrdered[i]);
    if (diff !== 0) return diff;
  }
  return 0;
}
function sortByKeyFlat(groups) {
  return explodeEntryBindings(groups).sort((a, b) => {
    const keyDiff = compareKeys(a.hotkey.key, b.hotkey.key);
    if (keyDiff !== 0) return keyDiff;
    const modDiff = compareModifiers(a.hotkey.modifiers, b.hotkey.modifiers);
    if (modDiff !== 0) return modDiff;
    return compareStrings(a.name, b.name);
  }).map((row) => ({
    id: row.id,
    name: row.name,
    hotkeys: [row.hotkey],
    count: row.count,
    bindingCounts: [row.count],
    isOrphan: false,
    isSuspectedSystemShortcut: false,
    isModifiedFromDefault: row.isModifiedFromDefault,
    commandId: row.commandId
  }));
}
function groupByModifier(groups) {
  const byCombo = /* @__PURE__ */ new Map();
  for (const row of explodeEntryBindings(groups)) {
    const combo = modifierComboKey(row.hotkey.modifiers);
    const bucket = byCombo.get(combo);
    if (bucket) {
      bucket.rows.push(row);
    } else {
      byCombo.set(combo, { modifiers: row.hotkey.modifiers, rows: [row] });
    }
  }
  return [...byCombo.entries()].sort(([, a], [, b]) => compareModifiers(a.modifiers, b.modifiers)).map(([combo, { rows }]) => {
    rows.sort((a, b) => {
      const keyDiff = compareKeys(a.hotkey.key, b.hotkey.key);
      if (keyDiff !== 0) return keyDiff;
      return compareStrings(a.name, b.name);
    });
    const entries = rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: combo,
      hotkeys: [row.hotkey],
      count: row.count,
      bindingCounts: [row.count],
      isModifiedFromDefault: row.isModifiedFromDefault,
      commandId: row.commandId
    }));
    return { category: combo, entries, aggregate: sumCounts(entries) };
  });
}
function sumCounts(entries) {
  return entries.reduce((sum, entry) => sum + entry.count, 0);
}

// src/ts/modal/grid.ts
var GridRenderer = class {
  constructor(container, state, settings, callbacks) {
    this.container = container;
    this.state = state;
    this.settings = settings;
    this.callbacks = callbacks;
  }
  render() {
    const el = this.container;
    el.empty();
    const query = this.state.searchQuery.toLowerCase();
    const isSearching = this.state.isSearching;
    const showUsage = this.settings.trackShortcutUsage;
    let totalVisible = 0;
    if (this.state.sortMode === "most-used-shortcut" || this.state.sortMode === "key") {
      const flatItems = this.state.sortMode === "most-used-shortcut" ? sortByMostUsedShortcut(this.state.usageResolution.groups, this.state.usageResolution.orphans) : sortByKeyFlat(this.state.usageResolution.groups);
      const visibleItems = flatItems.filter(
        (item) => matchesFlatItem(item, query, this.state.activeModifiers, {
          conflictsOnly: this.state.conflictsOnly,
          modifiedOnly: this.state.modifiedOnly,
          specialKeysOnly: this.state.specialKeysOnly,
          conflictingIds: this.state.conflictingIds
        })
      );
      totalVisible = visibleItems.length;
      this.state.setCurrentGroupLabels([]);
      if (visibleItems.length > 0) {
        this.renderFlatList(el, visibleItems, query, showUsage);
      }
    } else {
      const orderedGroups = this.state.sortMode === "most-used-category" ? sortByMostUsedCategory(this.state.usageResolution.groups) : this.state.sortMode === "modifier" ? groupByModifier(this.state.usageResolution.groups) : this.state.usageResolution.groups;
      this.state.setCurrentGroupLabels(orderedGroups.map((g) => g.category));
      for (const group of orderedGroups) {
        const visibleEntries = group.entries.filter(
          (entry) => matchesFilters(entry, query, this.state.activeModifiers, {
            conflictsOnly: this.state.conflictsOnly,
            modifiedOnly: this.state.modifiedOnly,
            specialKeysOnly: this.state.specialKeysOnly,
            conflictingIds: this.state.conflictingIds
          })
        );
        if (visibleEntries.length === 0) continue;
        totalVisible += visibleEntries.length;
        const isCollapsed = !isSearching && this.state.isSectionCollapsed(group.category);
        this.renderCategorySection(
          el,
          group.category,
          this.groupHeadingLabel(group.category),
          group.aggregate,
          visibleEntries,
          query,
          isCollapsed,
          isSearching,
          showUsage
        );
      }
    }
    if (totalVisible === 0) {
      el.createDiv({ text: t("modal.no_results"), cls: "hkc-no-results" });
    }
    this.callbacks.onRendered();
  }
  /**
   * Translates a group's raw `category` label into display text. For "By
   * Category"/"By Most-Used Category" the label already is the category name.
   * For "By Modifier" it's the canonical combo string (e.g. "Mod+Shift", or ""
   * for no modifiers), shown as joined platform-aware modifier labels.
   */
  groupHeadingLabel(category) {
    if (this.state.sortMode === "modifier") {
      if (category === "") return t("modal.sort_no_modifier");
      return category.split("+").map(modLabel).join(" + ");
    }
    return categoryDisplayLabel(category);
  }
  renderCategorySection(parent, category, headingLabel, aggregate, entries, query, isCollapsed, isSearching, showUsage) {
    const section = parent.createDiv({ cls: "hkc-section" });
    const heading = section.createEl("h3", {
      cls: "hkc-category-heading"
    });
    const arrow = heading.createSpan({ cls: "hkc-collapse-arrow" });
    arrow.textContent = isCollapsed ? isRtl(locale()) ? "\u25C2" : "\u25B8" : "\u25BE";
    heading.appendText(" " + headingLabel);
    if (showUsage && aggregate > 0) {
      this.renderUsageIndicator(heading, aggregate, this.state.usageResolution.maxCategoryAggregate, "hkc-usage-category");
    }
    if (!isSearching) {
      heading.addClass("hkc-heading-interactive");
      heading.addEventListener("click", () => {
        this.state.toggleSection(category);
        this.render();
      });
    }
    if (isCollapsed) return;
    for (const entry of entries) {
      this.renderHotkeyEntryRow(section, entry.name, entry.hotkeys, entry.bindingCounts, query, showUsage);
    }
  }
  renderFlatList(parent, items, query, showUsage) {
    var _a;
    const section = parent.createDiv({ cls: "hkc-section hkc-flat-list" });
    for (const item of items) {
      const name = item.isSuspectedSystemShortcut ? t(
        (_a = systemShortcutLabelKey(
          buildSignature(item.hotkeys[0].modifiers, item.hotkeys[0].key),
          import_obsidian6.Platform.isMacOS
        )) != null ? _a : "modal.system_shortcut"
      ) : item.isOrphan ? t("modal.no_command") : item.name;
      this.renderHotkeyEntryRow(section, name, item.hotkeys, item.bindingCounts, query, showUsage, {
        muted: item.isOrphan,
        disableKeyHighlight: item.isOrphan,
        system: item.isSuspectedSystemShortcut
      });
    }
  }
  /**
   * Renders one entry row (name + hotkey badges, each with its own usage
   * indicator). Shared by category and flat rendering. `bindingCounts` is
   * parallel to `hotkeys` — each binding shows its own usage count, not a
   * single aggregate shared across every badge (a command bound to two
   * hotkeys used 11 and 5 times shows 11 next to one and 5 next to the
   * other, not 16 next to both).
   */
  renderHotkeyEntryRow(parent, name, hotkeys, bindingCounts, query, showUsage, options = {}) {
    const entryEl = parent.createDiv({ cls: "hkc-entry" });
    const nameEl = entryEl.createDiv({ cls: "hkc-entry-name" });
    if (options.system) {
      nameEl.addClass("hkc-entry-name--muted");
      nameEl.addClass("hkc-entry-name--system");
      nameEl.setAttribute("title", t("modal.system_shortcut_tooltip"));
      (0, import_obsidian6.setIcon)(nameEl.createSpan({ cls: "hkc-entry-name-icon" }), "lock");
      nameEl.createSpan({ text: name });
    } else if (options.muted) {
      nameEl.setText(name);
      nameEl.addClass("hkc-entry-name--muted");
    } else if (query && name.toLowerCase().includes(query)) {
      this.renderHighlighted(nameEl, name, query);
    } else {
      nameEl.textContent = name;
    }
    if (!options.muted) {
      nameEl.addClass("hkc-entry-name--clickable");
      nameEl.addEventListener("click", () => this.callbacks.onJumpToHotkey(name));
    }
    const hotkeysEl = entryEl.createDiv({ cls: "hkc-entry-hotkeys" });
    hotkeys.forEach((hk, index) => {
      const keyMatches = !options.disableKeyHighlight && query.length > 0 && hk.key.toLowerCase() === query;
      const hkRow = hotkeysEl.createDiv({ cls: "hkc-hk-row" });
      const count = bindingCounts[index];
      if (showUsage && count > 0) {
        this.renderUsageIndicator(hkRow, count, this.state.usageResolution.maxEntryCount, "hkc-usage-entry");
      }
      for (const mod of hk.modifiers) {
        hkRow.createEl("kbd", { text: modLabel(mod), cls: "hkc-kbd" });
      }
      const keyEl = hkRow.createEl("kbd", {
        text: keyIcon(hk.key),
        cls: "hkc-kbd"
      });
      if (keyMatches) {
        keyEl.addClass("hkc-kbd-match");
      }
    });
  }
  /** Renders a single glyph+count usage indicator, scaled against `max`. */
  renderUsageIndicator(parent, count, max, extraCls) {
    const { glyph } = countToGlyph(count, max);
    const wrap = parent.createSpan({ cls: `hkc-usage ${extraCls}` });
    wrap.createSpan({ text: glyph, cls: "hkc-usage-glyph" });
    wrap.createSpan({ text: ` ${count}`, cls: "hkc-usage-count" });
  }
  /**
   * Render `text` inside `container`, wrapping the first occurrence of `query`
   * in a `<mark>` for highlighting.
   */
  renderHighlighted(container, text, query) {
    const lower = text.toLowerCase();
    const idx = lower.indexOf(query);
    if (idx === -1) {
      container.textContent = text;
      return;
    }
    if (idx > 0) container.appendText(text.slice(0, idx));
    container.createEl("mark", {
      text: text.slice(idx, idx + query.length),
      cls: "hkc-highlight"
    });
    if (idx + query.length < text.length) {
      container.appendText(text.slice(idx + query.length));
    }
  }
};

// src/ts/modal/export.ts
var import_obsidian7 = require("obsidian");

// src/ts/modal/htmlExportTemplate.ts
var HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="{{LANG}}" dir="{{DIR}}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} \u2014 {{DATE}}</title>
  <style>
    /* \u2500\u2500 Palette \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    :root {
      --bg:         #ffffff;
      --bg-2:       #f4f4f5;
      --border:     #e4e4e7;
      --text:       #18181b;
      --text-muted: #71717a;
      --accent:     #7c3aed;
      --kbd-bg:     #e4e4e7;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg:         #1e1e2e;
        --bg-2:       #2a2a3c;
        --border:     #3f3f52;
        --text:       #cdd6f4;
        --text-muted: #9399b2;
        --accent:     #cba6f7;
        --kbd-bg:     #313244;
      }
    }

    /* \u2500\u2500 Reset / Base \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px 32px 48px;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }

    /* \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .hkc-header {
      margin-bottom: 28px;
      padding-bottom: 16px;
      border-bottom: 2px solid var(--border);
    }
    .hkc-header h1 {
      margin: 0 0 4px;
      font-size: 22px;
      font-weight: 700;
      color: var(--text);
    }
    .hkc-header p {
      margin: 0;
      font-size: 13px;
      color: var(--text-muted);
    }

    /* \u2500\u2500 Grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .hkc-grid {
      columns: 300px;
      column-gap: 20px;
      column-fill: balance;
    }

    /* \u2500\u2500 Section \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .hkc-section {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 20px;
      break-inside: avoid-column;
    }
    .hkc-category-heading {
      margin: 0 0 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent);
      padding-bottom: 4px;
      border-bottom: 1px solid var(--border);
      break-after: avoid;
    }

    /* \u2500\u2500 Entry \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .hkc-entry {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 0;
    }
    .hkc-entry-name {
      flex: 1;
      font-size: 13px;
      color: var(--text);
      line-height: 1.4;
      min-width: 0;
      word-break: break-word;
    }
    .hkc-entry-hotkeys {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
      flex-shrink: 0;
    }
    .hkc-hk-row {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .hkc-hk-separator {
      font-size: 11px;
      color: var(--text-muted);
      padding: 0 3px;
    }

    /* \u2500\u2500 Kbd \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    .hkc-kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--kbd-bg);
      border: 1px solid var(--border);
      border-bottom-width: 2px;
      border-radius: 4px;
      color: var(--text-muted);
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 11px;
      font-weight: 500;
      line-height: 1;
      min-width: 22px;
      padding: 2px 5px;
      white-space: nowrap;
    }

    /* \u2500\u2500 Responsive \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    @media (max-width: 600px) {
      body { padding: 16px; }
      .hkc-grid { columns: 1; }
    }
  </style>
</head>
<body>
  <header class="hkc-header">
    <h1>{{TITLE}}</h1>
    <p>{{DATE}}</p>
  </header>
  <div class="hkc-grid">
    {{CONTENT}}
  </div>
</body>
</html>`;
function fillTemplate(title, date, content, lang, dir) {
  return HTML_TEMPLATE.replaceAll("{{TITLE}}", title).replaceAll("{{DATE}}", date).replaceAll("{{CONTENT}}", content).replaceAll("{{LANG}}", lang).replaceAll("{{DIR}}", dir);
}
function escapeMarkdownTableCell(str) {
  return str.replace(/\|/g, "\\|");
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function renderHtmlSections(groups) {
  const parts = [];
  for (const group of groups) {
    const entries = group.entries.map((entry) => {
      const hotkeysHtml = entry.hotkeys.map((hk) => {
        const badges = [...hk.modifiers.map(modLabel), keyIcon(hk.key)].map((p) => `<kbd class="hkc-kbd">${escapeHtml(p)}</kbd>`).join("");
        return `<div class="hkc-hk-row">${badges}</div>`;
      }).join(`<div class="hkc-hk-row"><span class="hkc-hk-separator">/</span></div>`);
      return `
      <div class="hkc-entry">
        <span class="hkc-entry-name">${escapeHtml(entry.name)}</span>
        <div class="hkc-entry-hotkeys">${hotkeysHtml}</div>
      </div>`;
    });
    parts.push(`
    <div class="hkc-section">
      <h2 class="hkc-category-heading">${escapeHtml(categoryDisplayLabel(group.category))}</h2>
      ${entries.join("")}
    </div>`);
  }
  return parts.join("\n");
}

// src/ts/modal/export.ts
function exportNoteFilename() {
  return `${t("modal.title")}.md`;
}
function exportHtmlFilename() {
  return `${t("modal.title")}.html`;
}
var EXPORT_OVERWRITE_CONFIRM_MS = 5e3;
function generateMarkdown(groups) {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const lines = [
    `# ${t("modal.title")}`,
    ``,
    `*${t("modal.export_subtitle", { date: today })}*`
  ];
  for (const group of groups) {
    lines.push(``, `## ${categoryDisplayLabel(group.category)}`, ``);
    lines.push(`| ${t("modal.export_table_command")} | ${t("modal.export_table_hotkey")} |`);
    lines.push(`|---------|--------|`);
    for (const entry of group.entries) {
      const hotkeyStr = entry.hotkeys.map((hk) => {
        const parts = [...hk.modifiers.map(modLabel), keyIcon(hk.key)];
        return parts.map((p) => `\`${p}\``).join(" + ");
      }).join(" / ");
      lines.push(`| ${escapeMarkdownTableCell(entry.name)} | ${hotkeyStr} |`);
    }
  }
  return lines.join("\n");
}
async function exportNoteToVault(app, groups, state, onSaved) {
  var _a, _b, _c;
  const folder = (_c = (_b = (_a = app.workspace.getActiveFile()) == null ? void 0 : _a.parent) == null ? void 0 : _b.path) != null ? _c : "/";
  const filename = exportNoteFilename();
  const path = folder === "/" ? filename : `${folder}/${filename}`;
  const existing = app.vault.getAbstractFileByPath(path);
  const confirmed = state.isOverwriteConfirmed(path);
  if (existing instanceof import_obsidian7.TFile && !confirmed) {
    state.requestOverwriteConfirm(path, EXPORT_OVERWRITE_CONFIRM_MS);
    new import_obsidian7.Notice(t("modal.export_exists", { path }), EXPORT_OVERWRITE_CONFIRM_MS);
    return;
  }
  const content = generateMarkdown(groups);
  try {
    let savedFile;
    if (existing instanceof import_obsidian7.TFile) {
      await app.vault.modify(existing, content);
      savedFile = existing;
    } else {
      savedFile = await app.vault.create(path, content);
    }
    state.clearPendingOverwrite();
    await onSaved(savedFile);
  } catch (err) {
    new import_obsidian7.Notice(t("modal.export_failed", { error: String(err) }));
  }
}
function generateHtml(groups) {
  const title = t("modal.title");
  const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const content = renderHtmlSections(groups);
  const loc = locale();
  return fillTemplate(title, date, content, loc, isRtl(loc) ? "rtl" : "ltr");
}
function saveHtmlDownload(groups) {
  const html = generateHtml(groups);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = activeDocument.createElement("a");
  a.href = url;
  a.download = exportHtmlFilename();
  a.click();
  URL.revokeObjectURL(url);
}

// src/ts/modal/jumpToHotkey.ts
var HOTKEYS_TAB_ID = "hotkeys";
var HOTKEYS_SEARCH_INPUT_SELECTOR = ".vertical-tab-content-container input[type='search']";
var SETTINGS_MOUNT_DELAY_MS = 50;
var defaultDeps = {
  get doc() {
    return activeDocument;
  },
  scheduleAfterMount: (fn) => window.setTimeout(fn, SETTINGS_MOUNT_DELAY_MS)
};
function jumpToHotkey(app, commandName, deps = defaultDeps) {
  const setting = app.setting;
  if (!setting) return;
  setting.open();
  setting.openTabById(HOTKEYS_TAB_ID);
  deps.scheduleAfterMount(() => {
    const input = deps.doc.querySelector(HOTKEYS_SEARCH_INPUT_SELECTOR);
    if (!input) return;
    input.value = commandName;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

// src/ts/modal/cheatsheet.ts
var CheatsheetModal = class extends import_obsidian8.Modal {
  constructor(app, settings) {
    super(app);
    this.state = new CheatsheetState();
    this.settings = settings;
  }
  /**
   * Override close() so Escape clears an active search before closing.
   * The built-in Obsidian Escape handler calls modal.close().
   */
  close() {
    if (this.state.searchQuery) {
      this.toolbar.applySearchClear();
    } else {
      super.close();
    }
  }
  onOpen() {
    this.modalEl.addClass("hkc-full-modal");
    this.modalEl.setAttribute("dir", isRtl(locale()) ? "rtl" : "ltr");
    this.titleEl.setText(t("modal.title"));
    this.state.load(this.app);
    this.buildUI();
    this.toolbar.attach(activeDocument);
  }
  onClose() {
    this.toolbar.detach(activeDocument);
    this.state.clearPendingOverwrite();
    this.contentEl.empty();
  }
  buildUI() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("hkc-content");
    this.toolbar = new Toolbar(this.settings, this.state, {
      onChange: () => this.gridRenderer.render(),
      onExportNote: () => void this.exportNote(),
      onExportHtml: () => saveHtmlDownload(this.state.groups)
    });
    this.toolbar.build(contentEl);
    const gridEl = contentEl.createDiv({ cls: "hkc-grid" });
    this.gridRenderer = new GridRenderer(gridEl, this.state, this.settings, {
      onRendered: () => this.toolbar.updateCollapseToggle(),
      onJumpToHotkey: (name) => jumpToHotkey(this.app, name)
    });
    this.gridRenderer.render();
    window.setTimeout(() => this.toolbar.focusSearch(), 30);
  }
  async exportNote() {
    await exportNoteToVault(this.app, this.state.groups, this.state, async (file) => {
      super.close();
      await this.app.workspace.getLeaf().openFile(file);
    });
  }
};

// src/ts/main.ts
var HotkeysCheatsheetPlugin = class extends import_obsidian9.Plugin {
  async onload() {
    await this.loadSettings();
    const persistenceAvailable = await loadUsageData(this.app, this.manifest.dir);
    if (this.settings.trackShortcutUsage) {
      if (persistenceAvailable) {
        startCapture(this.app);
      } else {
        console.warn(
          "[Hotkeys Cheatsheet] Usage tracking is enabled but the plugin directory is unavailable \u2014 capture was not started."
        );
      }
    }
    this.addSettingTab(new HotkeysCheatsheetSettingTab(this.app, this));
    if (this.settings.showRibbonIcon) {
      this.addRibbonIcon("keyboard", t("ribbon.tooltip"), () => {
        this.openCheatsheet();
      });
    }
    this.addCommand({
      id: "open",
      name: t("command.name"),
      callback: () => this.openCheatsheet()
    });
  }
  onunload() {
    stopCapture();
    void flushUsageData();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  openCheatsheet() {
    new CheatsheetModal(this.app, this.settings).open();
  }
};

/* nosourcemap */
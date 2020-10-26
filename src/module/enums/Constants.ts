import Utils from "../Utils";

export const CONSTANTS = {
    SETTING_KEYS: {
        TOOLTIP_VISIBILITY: 'tooltipVisibility',
        SHOW_ALL_ON_ALT: 'showAllOnAlt',
        SHOW_TOOLTIP_FOR_HIDDEN_TOKENS: 'showTooltipForHiddenTokens',
        DISPLAY_NAMES_IN_TOOLTIP: 'displayNameInTooltip',
        DEBUG_OUTPUT: 'debugOutput',
        FONT_SIZE: 'fontSize',
        USE_ACCENT_COLOR_FOR_EVERYTHING: 'useAccentColorForEverything',
        ACCENT_COLOR: 'accentColor',
        TOKEN_DISPOSITIONS: 'tokenDispositions',
        TOOLTIP_POSITION: 'tooltipPosition',
        DARK_THEME: 'darkTheme',
        DONT_SHOW: 'dontShow',
        DATA_SOURCE: 'dataSource',
        GM_SETTINGS: 'gmSettings',
        PLAYER_SETTINGS: 'playerSettings',
        TOOLTIP_MANAGER: 'tooltipManager',
        ACTORS: 'actors',

        // old settings
        TOOLTIP_ITEMS: 'tooltipItems',
        HOSTILE_ITEMS: 'hostileItems',
        PORTED: 'ported',
    },

    TEMPLATES: {
        TOOLTIP: `modules/${Utils.moduleName}/templates/tooltip.hbs`,
        SETTINGS_EDITOR_ROW: `modules/${Utils.moduleName}/templates/settings-editor-row.hbs`,
        TOOLTIP_EDITOR_GM: `modules/${Utils.moduleName}/templates/tooltip-editor-gm.hbs`,
        TOOLTIP_EDITOR_PLAYER: `modules/${Utils.moduleName}/templates/tooltip-editor-player.hbs`,
        TOOLTIP_EDITOR_TABLE: `modules/${Utils.moduleName}/templates/tooltip-editor-table.hbs`,
        TOOLTIP_EDITOR_TABLE_ROW: `modules/${Utils.moduleName}/templates/tooltip-editor-table-row.hbs`,
    },

    APPS: {
        TOOLTIP_MANAGER: `modules/${Utils.moduleName}/templates/tooltip-manager.hbs`,
        TOOLTIP_MANAGER_WIDTH: 500,

        TOOLTIP_EDITOR: `modules/${Utils.moduleName}/templates/tooltip-editor.hbs`,
        TOOLTIP_EDITOR_ROW: `modules/${Utils.moduleName}/templates/tooltip-editor-row.hbs`,
        TOOLTIP_EDITOR_WIDTH: 1200,

        TOOLTIP_DEFAULT_ACTOR_ID: 'default',
    },

    SYSTEM_DEFAULT: 'default',
    SYSTEM_DEFAULT_TOOLTIPS: {
        'default': [
            {
                color: '#000000',
                icon: 'fa-heart',
                value: 'attributes.hp',
                expression: false,
                isNumber: false,
            },
        ],
        'dnd5e': [
            {
                color: '#000000',
                icon: 'fa-heart',
                value: 'attributes.hp',
                expression: false,
                isNumber: false,
            },
            {
                color: '#000000',
                icon: 'fa-shield-alt',
                value: 'attributes.ac.value',
                expression: false,
                isNumber: false,
            },
            {
                color: '#000000',
                icon: 'fa-shoe-prints',
                value: 'attributes.speed.value',
                expression: false,
                isNumber: true,
            },
            {
                color: '#000000',
                icon: 'fa-eye',
                value: 'skills.prc.passive',
                expression: false,
                isNumber: false,
            },
            {
                color: '#000000',
                icon: 'fa-search',
                value: 'skills.inv.passive',
                expression: false,
                isNumber: false,
            },
        ],
        'cyphersystem': [
            {
                color: '#ff0000',
                icon: 'fa-fist-raised',
                value: 'pools.might',
                expression: false,
                isNumber: false,
            },
            {
                color: '#00ff00',
                icon: 'fa-running',
                value: 'pools.speed',
                expression: false,
                isNumber: false,
            },
            {
                color: '#0000ff',
                icon: 'fa-brain',
                value: 'pools.intellect',
                expression: false,
                isNumber: false,
            },
        ],
    },
    SYSTEM_DEFAULT_THEMES: {
        'default': 'default',
    },

    TOOLTIP_POSITIONS: ["top", "right", "bottom", "left"],
};

export const getSystemTooltip = (): any => {
    const system = game?.system?.id;
    return CONSTANTS.SYSTEM_DEFAULT_TOOLTIPS[system] || CONSTANTS.SYSTEM_DEFAULT_TOOLTIPS[CONSTANTS.SYSTEM_DEFAULT];
}

export const getSystemTheme = (): any => {
    const system = game?.system?.id;
    return CONSTANTS.SYSTEM_DEFAULT_THEMES[system] || CONSTANTS.SYSTEM_DEFAULT_THEMES[CONSTANTS.SYSTEM_DEFAULT];
}
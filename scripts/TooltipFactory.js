import Tooltip from './Tooltip.js';
import { getSystemTheme, TTAConstants } from './TTAConstants/TTAConstants.js';
import { getSetting } from './TTAFoundryApiIntegration/Settings/TTASettingsUtils.js';
import { MODULE_NAME } from './TTAUtils/TTAUtils.js';

class TooltipFactory {
  constructor() {
    this._tooltips = [];
    this._settingKeys = TTAConstants.SETTING_KEYS;
  }

  static getInstance() {
    if (!TooltipFactory._instance) {
      TooltipFactory._instance = new TooltipFactory();
    }
    return TooltipFactory._instance;
  }

  // get a value from Settings
  _getSetting(setting) {
    return getSetting(setting);
  }

  // get the positioning from settings, and if surprise pick a random possible position
  _getWhere() {
    const where = this._getSetting(this._settingKeys.TOOLTIP_POSITION) || 'right';
    const positions = TTAConstants.TOOLTIP_POSITIONS;
    return where !== 'surprise' ? where : positions[Math.floor(Math.random() * positions.length)];
  }

  // returns some useful info used in the tooltip,
  // if the user is a GM, and the actor type
  _getTooltipInfo(token) {
    return {
      isGM: game?.user?.isGM,
      actorType: token?.actor?.type,
    };
  }

  // create an array of data needed to initialize a tooltip
  _getTooltipData(token) {
    return [
      token,
      this._getSetting(this._settingKeys.DARK_THEME) ? 'dark' : 'light',
      getSystemTheme(),
      parseFloat(this._getSetting(this._settingKeys.FONT_SIZE)) || 1,
      this._getWhere(),
      'none',
      200,
      this._getSetting(this._settingKeys.DATA_SOURCE) || '',
      TTAConstants.TEMPLATES.TOOLTIP,
      $('body.game'),
      this._getTooltipInfo(token),
    ];
  }

  // get settings for <ALT>
  _getAltSettings() {
    return {
      showOnAlt: this._getSetting(this._settingKeys.SHOW_ALL_ON_ALT),
      showAllOnAlt: this._getSetting(this._settingKeys.SHOW_TOOLTIP_FOR_HIDDEN_TOKENS),
    };
  }

  // generates a tooltip if that token doesn't have one and adds it to the array, and shows it
  _addTooltip(token) {
    for (let i = 0; i < this._tooltips.length; i += 1) {
      const t = this._tooltips[i];
      if (t.getTokenId() === token?.id) {
        return null;
      }
    }
    const tooltip = new Tooltip(...this._getTooltipData(token));
    this._tooltips.push(tooltip);
    tooltip.show();
  }

  // generates a tooltip if that token doesn't have one and adds it to the array, and shows it
  _removeTooltip(token) {
    for (let i = 0; i < this._tooltips.length; i += 1) {
      const t = this._tooltips[i];
      if (t.getTokenId() === token?.id) {
        t.hide();
        this._tooltips.splice(i, 1);
        break;
      }
    }
  }

  // determines if a token should display a tooltip or not based on the ACTORS settings
  _shouldActorHaveTooltip(token) {
    const getFlagLoc = token?.document || token;
    const noTooltip = getFlagLoc.getFlag(MODULE_NAME, 'noTooltip');
    if (noTooltip) {
      return false;
    }
    const actorType = token?.actor?.type;
    const actors = this._getSetting(this._settingKeys.ACTORS);
    for (let i = 0; i < actors.length; i += 1) {
      const actor = actors[i];
      if (actor.id === actorType) {
        return actor.enable;
      }
    }
    return true;
  }

  // removes all the tooltips and destroys the objects
  _removeTooltips() {
    while (this._tooltips.length > 0) {
      this._tooltips.pop().hide();
    }
  }

  _isAltPressed() {
    return game?.keyboard?.downKeys?.has?.('AltLeft') || game?.keyboard?.downKeys?.has?.('AltRight');
  }

  // public hook when hovering over a token (more precise when a token is focused)
  async hoverToken(token, isHovering) {
    if (!token?.actor || !this._shouldActorHaveTooltip(token)) {
      return;
    }
    this[isHovering ? '_addTooltip' : '_removeTooltip'](token);
  }

  // public hook to show tooltips when ALT is pressed
  async altPressed() {
    canvas.tokens.placeables.forEach((token) => {
      if (!token?.actor || !this._shouldActorHaveTooltip(token)) {
        return;
      }
      const isAltPressed = this._isAltPressed();
      if (isAltPressed) {
        const altSettings = this._getAltSettings();
        // Foundry doesn't set a token's worldTransform until the token is rendered on the client's screen.
        // This means that while showAllOnAlt is true, hidden tokens that have yet to be viewed all put
        // their tooltips at (0, 0). Given how this is an inconvenient spot on the screen, I implement a
        // check if the token.worldTransform is exactly at (0, 0), assuming it hasn't rendered yet.
        if (
          (altSettings.showAllOnAlt && !(token.worldTransform.tx === 0 && token.worldTransform.ty === 0))
          || (altSettings.showOnAlt && !altSettings.showAllOnAlt && token.isVisible)
        ) {
          this._addTooltip(token);
        }
      }
    });
  }

  // public hook when a token is updated
  // Whenever the token is updated, check it's interaction state for if the token is in dragging state.
  async updateToken(token) {
    if (token.interactionState === MouseInteractionManager.INTERACTION_STATES.DRAG) {
      this._removeTooltip(token);
    }
  }

  // public hook to remove all tooltips
  removeTooltips() {
    this._removeTooltips();
  }
}

export default TooltipFactory.getInstance();

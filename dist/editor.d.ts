import { LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { Energy3dCardConfig, HomeAssistant } from './types';
export declare class Energy3dCardEditor extends LitElement {
    hass: HomeAssistant;
    private _config;
    private _activeTab;
    setConfig(config: Energy3dCardConfig): void;
    private _valueChanged;
    private _entitiesChanged;
    private _dispatchConfigChanged;
    private _getEnergyEntities;
    protected render(): TemplateResult;
    private _renderGeneralTab;
    private _renderGridTab;
    private _renderSolarTab;
    private _renderBatteryTab;
    private _renderAppearanceTab;
    static get styles(): CSSResultGroup;
}
//# sourceMappingURL=editor.d.ts.map
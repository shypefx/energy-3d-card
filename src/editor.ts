import { LitElement, html, css, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Energy3dCardConfig, HomeAssistant } from './types';

@customElement('energy-3d-card-editor')
export class Energy3dCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: Energy3dCardConfig;
  @state() private _activeTab: string = 'general';

  public setConfig(config: Energy3dCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;

    const target = ev.target as any;
    const configValue = target.configValue;
    const value = ev.detail?.value ?? target.value ?? target.checked;

    if (configValue) {
      const newConfig = { ...this._config };

      if (value === '' || value === undefined) {
        delete (newConfig as any)[configValue];
      } else {
        (newConfig as any)[configValue] = value;
      }

      this._config = newConfig;
      this._dispatchConfigChanged();
    }
  }

  private _entitiesChanged(configKey: string, entities: string[]): void {
    const newConfig = { ...this._config, [configKey]: entities };
    this._config = newConfig;
    this._dispatchConfigChanged();
  }

  private _dispatchConfigChanged(): void {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _getEnergyEntities(): { value: string; label: string }[] {
    if (!this.hass) return [];

    return Object.keys(this.hass.states)
      .filter(entityId => {
        const state = this.hass.states[entityId];
        const unit = state.attributes.unit_of_measurement?.toLowerCase() || '';
        return (
          unit.includes('w') ||
          unit.includes('kw') ||
          entityId.includes('power') ||
          entityId.includes('energy') ||
          entityId.includes('consumption')
        );
      })
      .map(entityId => ({
        value: entityId,
        label: this.hass.states[entityId].attributes.friendly_name || entityId,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const energyEntities = this._getEnergyEntities();

    return html`
      <div class="card-config">
        <div class="tabs">
          <button 
            class="tab ${this._activeTab === 'general' ? 'active' : ''}"
            @click=${() => this._activeTab = 'general'}
          >
            ⚙️ General
          </button>
          <button 
            class="tab ${this._activeTab === 'grid' ? 'active' : ''}"
            @click=${() => this._activeTab = 'grid'}
          >
            🔌 Grid
          </button>
          <button 
            class="tab ${this._activeTab === 'solar' ? 'active' : ''}"
            @click=${() => this._activeTab = 'solar'}
          >
            ☀️ Solar
          </button>
          <button 
            class="tab ${this._activeTab === 'battery' ? 'active' : ''}"
            @click=${() => this._activeTab = 'battery'}
          >
            🔋 Battery
          </button>
          <button 
            class="tab ${this._activeTab === 'appearance' ? 'active' : ''}"
            @click=${() => this._activeTab = 'appearance'}
          >
            🎨 Style
          </button>
        </div>

        <div class="tab-content">
          ${this._activeTab === 'general' ? this._renderGeneralTab() : ''}
          ${this._activeTab === 'grid' ? this._renderGridTab(energyEntities) : ''}
          ${this._activeTab === 'solar' ? this._renderSolarTab(energyEntities) : ''}
          ${this._activeTab === 'battery' ? this._renderBatteryTab(energyEntities) : ''}
          ${this._activeTab === 'appearance' ? this._renderAppearanceTab() : ''}
        </div>
      </div>
    `;
  }

  private _renderGeneralTab(): TemplateResult {
    return html`
      <div class="section">
        <h3>📋 General Settings</h3>
        
        <div class="field">
          <label>Card Title</label>
          <input
            type="text"
            .value=${this._config.title || ''}
            .configValue=${'title'}
            @input=${this._valueChanged}
            placeholder="Energy Flow"
          />
        </div>

        <div class="field">
          <label>Custom House Image (URL)</label>
          <input
            type="text"
            .value=${this._config.image || ''}
            .configValue=${'image'}
            @input=${this._valueChanged}
            placeholder="/local/energy-3d-card/house.webp"
          />
          <small>Leave empty for default image</small>
        </div>

        <div class="field checkbox">
          <label>
            <input
              type="checkbox"
              .checked=${this._config.show_details ?? true}
              .configValue=${'show_details'}
              @change=${this._valueChanged}
            />
            Show individual entity details
          </label>
        </div>
      </div>
    `;
  }

  private _renderGridTab(entities: { value: string; label: string }[]): TemplateResult {
    const gridEntities = this._config.grid_entities || [];

    return html`
      <div class="section">
        <h3>🔌 Grid Configuration</h3>
        <p class="description">Configure your grid consumption sensors (smart plugs, meters, etc.)</p>

        <div class="field">
          <label>Display Name</label>
          <input
            type="text"
            .value=${this._config.grid_name || ''}
            .configValue=${'grid_name'}
            @input=${this._valueChanged}
            placeholder="Grid Consumption"
          />
        </div>

        <div class="field">
          <label>Power Entities</label>
          <div class="entities-list">
            ${gridEntities.map((entity, index) => html`
              <div class="entity-row">
                <select
                  .value=${entity}
                  @change=${(e: Event) => {
                    const newEntities = [...gridEntities];
                    newEntities[index] = (e.target as HTMLSelectElement).value;
                    this._entitiesChanged('grid_entities', newEntities);
                  }}
                >
                  <option value="">Select entity...</option>
                  ${entities.map(e => html`
                    <option value=${e.value} ?selected=${e.value === entity}>
                      ${e.label}
                    </option>
                  `)}
                </select>
                <button 
                  class="remove-btn"
                  @click=${() => {
                    const newEntities = gridEntities.filter((_, i) => i !== index);
                    this._entitiesChanged('grid_entities', newEntities);
                  }}
                >
                  ❌
                </button>
              </div>
            `)}
          </div>
          <button 
            class="add-btn"
            @click=${() => this._entitiesChanged('grid_entities', [...gridEntities, ''])}
          >
            ➕ Add Entity
          </button>
        </div>

        <div class="field">
          <label>Value Position X (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            .value=${this._config.grid_value_position?.x ?? 5}
            @input=${(e: Event) => {
              const x = parseFloat((e.target as HTMLInputElement).value);
              const y = this._config.grid_value_position?.y ?? 94;
              this._config = { ...this._config, grid_value_position: { x, y } };
              this._dispatchConfigChanged();
            }}
          />
        </div>

        <div class="field">
          <label>Value Position Y (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            .value=${this._config.grid_value_position?.y ?? 94}
            @input=${(e: Event) => {
              const y = parseFloat((e.target as HTMLInputElement).value);
              const x = this._config.grid_value_position?.x ?? 5;
              this._config = { ...this._config, grid_value_position: { x, y } };
              this._dispatchConfigChanged();
            }}
          />
        </div>
      </div>
    `;
  }

  private _renderSolarTab(entities: { value: string; label: string }[]): TemplateResult {
    const solarEntities = this._config.solar_entities || [];

    return html`
      <div class="section">
        <h3>☀️ Solar Configuration</h3>
        <p class="description">Configure your solar production sensors</p>

        <div class="field">
          <label>Display Name</label>
          <input
            type="text"
            .value=${this._config.solar_name || ''}
            .configValue=${'solar_name'}
            @input=${this._valueChanged}
            placeholder="Solar Production"
          />
        </div>

        <div class="field">
          <label>Power Entities</label>
          <div class="entities-list">
            ${solarEntities.map((entity, index) => html`
              <div class="entity-row">
                <select
                  .value=${entity}
                  @change=${(e: Event) => {
                    const newEntities = [...solarEntities];
                    newEntities[index] = (e.target as HTMLSelectElement).value;
                    this._entitiesChanged('solar_entities', newEntities);
                  }}
                >
                  <option value="">Select entity...</option>
                  ${entities.map(e => html`
                    <option value=${e.value} ?selected=${e.value === entity}>
                      ${e.label}
                    </option>
                  `)}
                </select>
                <button 
                  class="remove-btn"
                  @click=${() => {
                    const newEntities = solarEntities.filter((_, i) => i !== index);
                    this._entitiesChanged('solar_entities', newEntities);
                  }}
                >
                  ❌
                </button>
              </div>
            `)}
          </div>
          <button 
            class="add-btn"
            @click=${() => this._entitiesChanged('solar_entities', [...solarEntities, ''])}
          >
            ➕ Add Entity
          </button>
        </div>
      </div>
    `;
  }

  private _renderBatteryTab(entities: { value: string; label: string }[]): TemplateResult {
    const batteryEntities = this._config.battery_entities || [];

    return html`
      <div class="section">
        <h3>🔋 Battery Configuration</h3>
        <p class="description">Configure your battery sensors</p>

        <div class="field">
          <label>Display Name</label>
          <input
            type="text"
            .value=${this._config.battery_name || ''}
            .configValue=${'battery_name'}
            @input=${this._valueChanged}
            placeholder="Battery"
          />
        </div>

        <div class="field">
          <label>Power Entities</label>
          <div class="entities-list">
            ${batteryEntities.map((entity, index) => html`
              <div class="entity-row">
                <select
                  .value=${entity}
                  @change=${(e: Event) => {
                    const newEntities = [...batteryEntities];
                    newEntities[index] = (e.target as HTMLSelectElement).value;
                    this._entitiesChanged('battery_entities', newEntities);
                  }}
                >
                  <option value="">Select entity...</option>
                  ${entities.map(e => html`
                    <option value=${e.value} ?selected=${e.value === entity}>
                      ${e.label}
                    </option>
                  `)}
                </select>
                <button 
                  class="remove-btn"
                  @click=${() => {
                    const newEntities = batteryEntities.filter((_, i) => i !== index);
                    this._entitiesChanged('battery_entities', newEntities);
                  }}
                >
                  ❌
                </button>
              </div>
            `)}
          </div>
          <button 
            class="add-btn"
            @click=${() => this._entitiesChanged('battery_entities', [...batteryEntities, ''])}
          >
            ➕ Add Entity
          </button>
        </div>
      </div>
    `;
  }

  private _renderAppearanceTab(): TemplateResult {
    return html`
      <div class="section">
        <h3>🎨 Appearance Settings</h3>

        <div class="field">
          <label>Animation Speed</label>
          <select
            .value=${(this._config as any).animation_speed || 'normal'}
            .configValue=${'animation_speed'}
            @change=${this._valueChanged}
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>

        <div class="color-thresholds">
          <label>Power Color Thresholds</label>
          <small>Colors change based on power consumption</small>
          <div class="threshold-preview">
            <span class="color-dot green"></span> 0-500W (Green)
            <span class="color-dot yellow"></span> 500-1000W (Yellow)
            <span class="color-dot orange"></span> 1000-1500W (Orange)
            <span class="color-dot red"></span> 1500W+ (Red)
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        padding: 16px;
      }

      .tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }

      .tab {
        padding: 8px 16px;
        border: none;
        background: var(--primary-background-color, #f5f5f5);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }

      .tab:hover {
        background: var(--secondary-background-color, #e0e0e0);
      }

      .tab.active {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      .section {
        background: var(--card-background-color, white);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 16px;
      }

      .section h3 {
        margin: 0 0 8px 0;
        font-size: 18px;
      }

      .description {
        color: var(--secondary-text-color, #666);
        font-size: 14px;
        margin-bottom: 16px;
      }

      .field {
        margin-bottom: 16px;
      }

      .field label {
        display: block;
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--primary-text-color, #333);
      }

      .field input[type="text"],
      .field input[type="number"],
      .field select {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        font-size: 14px;
        box-sizing: border-box;
        background: var(--primary-background-color, white);
        color: var(--primary-text-color, #333);
      }

      .field input:focus,
      .field select:focus {
        outline: none;
        border-color: var(--primary-color, #03a9f4);
        box-shadow: 0 0 0 2px var(--primary-color, #03a9f4)33;
      }

      .field small {
        display: block;
        margin-top: 4px;
        color: var(--secondary-text-color, #666);
        font-size: 12px;
      }

      .field.checkbox label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .field.checkbox input {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .entities-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 8px;
      }

      .entity-row {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .entity-row select {
        flex: 1;
      }

      .remove-btn {
        padding: 8px 12px;
        border: none;
        background: #ff5252;
        color: white;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
      }

      .remove-btn:hover {
        background: #ff1744;
      }

      .add-btn {
        padding: 10px 16px;
        border: 2px dashed var(--primary-color, #03a9f4);
        background: transparent;
        color: var(--primary-color, #03a9f4);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        width: 100%;
        transition: all 0.2s;
      }

      .add-btn:hover {
        background: var(--primary-color, #03a9f4)11;
      }

      .color-thresholds {
        margin-top: 16px;
      }

      .color-thresholds label {
        display: block;
        font-weight: 500;
        margin-bottom: 4px;
      }

      .color-thresholds small {
        display: block;
        color: var(--secondary-text-color, #666);
        font-size: 12px;
        margin-bottom: 12px;
      }

      .threshold-preview {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 14px;
      }

      .color-dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .color-dot.green { background: #00cc66; }
      .color-dot.yellow { background: #ffb400; }
      .color-dot.orange { background: #ff7800; }
      .color-dot.red { background: #ff0000; }
    `;
  }
}

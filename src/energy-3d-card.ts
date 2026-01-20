import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Energy3dCardConfig, HomeAssistant, EnergyFlowConfig } from './types';

interface FlowState {
  progress: number;
  segmentDistances: number[];
  totalPathLength: number;
}

@customElement('energy-3d-card')
export class Energy3dCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: Energy3dCardConfig;
  @state() private energyFlows: EnergyFlowConfig[] = [];

  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private animationId?: number;
  private flowStates: Map<string, FlowState> = new Map();

  private colorThresholds = [
    { max: 500, color: { r: 0, g: 204, b: 102 }, glow: { r: 0, g: 200, b: 100 }, core: { r: 200, g: 255, b: 220 } },
    { max: 1000, color: { r: 255, g: 180, b: 0 }, glow: { r: 255, g: 160, b: 0 }, core: { r: 255, g: 230, b: 150 } },
    { max: 1500, color: { r: 255, g: 120, b: 0 }, glow: { r: 255, g: 100, b: 0 }, core: { r: 255, g: 200, b: 150 } },
    { max: 2000, color: { r: 255, g: 60, b: 0 }, glow: { r: 255, g: 50, b: 0 }, core: { r: 255, g: 180, b: 150 } },
    { max: Infinity, color: { r: 255, g: 0, b: 0 }, glow: { r: 230, g: 0, b: 0 }, core: { r: 255, g: 150, b: 150 } }
  ];

  // Default paths
  private defaultPaths = {
    grid: [
      { x: 36.1, y: 89.1 },
      { x: 77.7, y: 79 },
      { x: 68.5, y: 74.5 },
      { x: 68.2, y: 73.2 },
      { x: 68.2, y: 66.2 }
    ],
    solar: [
      { x: 50, y: 10 },
      { x: 50, y: 30 },
      { x: 60, y: 45 },
      { x: 68.2, y: 66.2 }
    ],
    battery: [
      { x: 90, y: 70 },
      { x: 80, y: 68 },
      { x: 68.2, y: 66.2 }
    ]
  };

  public static getConfigElement(): HTMLElement {
    return document.createElement('energy-3d-card-editor');
  }

  public static getStubConfig(): object {
    return {
      grid_name: 'Grid',
      grid_entities: [],
      show_details: true
    };
  }

  public setConfig(config: Energy3dCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this.config = config;
    this.buildEnergyFlows();
    this.initializeFlowStates();
  }

  private buildEnergyFlows(): void {
    const flows: EnergyFlowConfig[] = [];

    // Grid flow
    const gridEntities = this.collectEntities('grid');
    if (gridEntities.length > 0) {
      flows.push({
        id: 'grid',
        entities: gridEntities,
        name: this.config.grid_name || 'Grid',
        path: this.config.grid_path || this.defaultPaths.grid,
        valuePosition: this.config.grid_value_position || { x: 5, y: 94 }
      });
    }

    // Solar flow
    const solarEntities = this.collectEntities('solar');
    if (solarEntities.length > 0) {
      flows.push({
        id: 'solar',
        entities: solarEntities,
        name: this.config.solar_name || 'Solar',
        path: this.config.solar_path || this.defaultPaths.solar,
        valuePosition: this.config.solar_value_position || { x: 40, y: 5 }
      });
    }

    // Battery flow
    const batteryEntities = this.collectEntities('battery');
    if (batteryEntities.length > 0) {
      flows.push({
        id: 'battery',
        entities: batteryEntities,
        name: this.config.battery_name || 'Battery',
        path: this.config.battery_path || this.defaultPaths.battery,
        valuePosition: this.config.battery_value_position || { x: 85, y: 65 }
      });
    }

    // Custom flows
    if (this.config.flows) {
      flows.push(...this.config.flows);
    }

    this.energyFlows = flows;
  }

  private collectEntities(type: string): string[] {
    const entities: string[] = [];
    const singleKey = `${type}_entity` as keyof Energy3dCardConfig;
    const arrayKey = `${type}_entities` as keyof Energy3dCardConfig;

    const single = this.config[singleKey] as string | undefined;
    const array = this.config[arrayKey] as string[] | undefined;

    if (single) entities.push(single);
    if (array) entities.push(...array);

    return entities;
  }

  private initializeFlowStates(): void {
    this.flowStates.clear();
    this.energyFlows.forEach(flow => {
      const segmentDistances = this.calculateSegmentDistances(flow.path);
      const totalPathLength = segmentDistances.reduce((a, b) => a + b, 0);
      this.flowStates.set(flow.id, {
        progress: Math.random(),
        segmentDistances,
        totalPathLength
      });
    });
  }

  private calculateSegmentDistances(path: { x: number; y: number }[]): number[] {
    const distances: number[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const dx = path[i + 1].x - path[i].x;
      const dy = path[i + 1].y - path[i].y;
      distances.push(Math.sqrt(dx * dx + dy * dy));
    }
    return distances;
  }

  protected firstUpdated(): void {
    this.setupCanvas();
    this.startAnimation();
  }

  private setupCanvas(): void {
    this.canvas = this.shadowRoot?.querySelector('.layer-canvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')!;
    }
  }

  private handleImageLoad(): void {
    const img = this.shadowRoot?.querySelector('.layer-img') as HTMLImageElement;
    if (img && this.canvas) {
      this.canvas.width = img.naturalWidth;
      this.canvas.height = img.naturalHeight;
    }
  }

  private startAnimation(): void {
    const animate = () => {
      this.updateAnimation();
      this.drawFlows();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  private updateAnimation(): void {
    const speedMultiplier = this.config.animation_speed === 'fast' ? 0.015 : 
                            this.config.animation_speed === 'slow' ? 0.003 : 0.007;

    this.energyFlows.forEach(flow => {
      const state = this.flowStates.get(flow.id);
      if (state) {
        const power = Math.abs(this.getPowerForFlow(flow));
        const speedFactor = Math.max(0.5, Math.min(2, power / 1000));
        state.progress += speedMultiplier * speedFactor;
        if (state.progress > 1) state.progress = 0;
      }
    });
  }

  private drawFlows(): void {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.energyFlows.forEach(flow => {
      const power = this.getPowerForFlow(flow);
      if (Math.abs(power) > 10) {
        this.drawEnergyFlow(flow, power);
      }
    });
  }

  private drawEnergyFlow(flow: EnergyFlowConfig, power: number): void {
    if (!this.ctx || !this.canvas) return;

    const state = this.flowStates.get(flow.id);
    if (!state) return;

    const colors = this.getColorsForPower(Math.abs(power));
    const path = flow.path.map(p => ({
      x: (p.x / 100) * this.canvas!.width,
      y: (p.y / 100) * this.canvas!.height
    }));

    // Draw glow path
    this.ctx.beginPath();
    this.ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      this.ctx.lineTo(path[i].x, path[i].y);
    }
    this.ctx.strokeStyle = `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0.3)`;
    this.ctx.lineWidth = 8;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();

    // Draw particles
    const particleCount = Math.min(8, Math.max(3, Math.floor(power / 300)));
    for (let i = 0; i < particleCount; i++) {
      const particleProgress = (state.progress + i / particleCount) % 1;
      const pos = this.getPositionOnPath(path, particleProgress, state);
      
      // Particle glow
      const gradient = this.ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12);
      gradient.addColorStop(0, `rgba(${colors.core.r}, ${colors.core.g}, ${colors.core.b}, 1)`);
      gradient.addColorStop(0.3, `rgba(${colors.color.r}, ${colors.color.g}, ${colors.color.b}, 0.8)`);
      gradient.addColorStop(1, `rgba(${colors.glow.r}, ${colors.glow.g}, ${colors.glow.b}, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
  }

  private getPositionOnPath(path: { x: number; y: number }[], progress: number, state: FlowState): { x: number; y: number } {
    const targetDistance = progress * state.totalPathLength;
    let coveredDistance = 0;

    for (let i = 0; i < state.segmentDistances.length; i++) {
      if (coveredDistance + state.segmentDistances[i] >= targetDistance) {
        const segmentProgress = (targetDistance - coveredDistance) / state.segmentDistances[i];
        return {
          x: path[i].x + (path[i + 1].x - path[i].x) * segmentProgress,
          y: path[i].y + (path[i + 1].y - path[i].y) * segmentProgress
        };
      }
      coveredDistance += state.segmentDistances[i];
    }

    return path[path.length - 1];
  }

  private getPowerForFlow(flow: EnergyFlowConfig): number {
    let total = 0;
    flow.entities.forEach(entityId => {
      const state = this.hass?.states[entityId];
      if (state) {
        const value = parseFloat(state.state);
        if (!isNaN(value)) total += value;
      }
    });
    return total;
  }

  private getEntityPowers(flow: EnergyFlowConfig): { entity: string; name: string; power: number }[] {
    return flow.entities.map(entityId => {
      const state = this.hass?.states[entityId];
      return {
        entity: entityId,
        name: state?.attributes.friendly_name || entityId.split('.').pop() || entityId,
        power: state ? parseFloat(state.state) || 0 : 0
      };
    });
  }

  private getColorsForPower(power: number) {
    const threshold = this.colorThresholds.find(t => power <= t.max) || this.colorThresholds[this.colorThresholds.length - 1];
    return threshold;
  }

  private getTextColorForPower(power: number): string {
    const colors = this.getColorsForPower(Math.abs(power));
    return `rgb(${colors.color.r}, ${colors.color.g}, ${colors.color.b})`;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`<div class="loading">Loading...</div>`;
    }

    const baseImage = this.config.image || '/local/energy-3d-card/house.webp';
    const showDetails = this.config.show_details ?? true;

    return html`
      <ha-card .header=${this.config.title || ''}>
        <div class="layers-container">
          <img 
            src="${baseImage}" 
            class="layer-img" 
            alt="House" 
            @load=${this.handleImageLoad}
          />
          <canvas class="layer-canvas"></canvas>

          ${this.energyFlows.map(flow => {
            const totalPower = this.getPowerForFlow(flow);
            const entityPowers = this.getEntityPowers(flow);
            const textColor = this.getTextColorForPower(totalPower);
            const isActive = Math.abs(totalPower) > 10;

            return isActive ? html`
              <div 
                class="power-value" 
                style="
                  left: ${flow.valuePosition.x}%;
                  top: ${flow.valuePosition.y}%;
                  color: ${textColor};
                  text-shadow: 0 0 10px ${textColor}66;
                "
              >
                <div class="total-power">
                  ${flow.name}: ${Math.abs(Math.round(totalPower))} W
                </div>
                ${showDetails && entityPowers.length > 1 ? html`
                  <div class="power-details">
                    ${entityPowers.map(ep => html`
                      <div class="power-detail-item">
                        ${ep.name}: ${Math.abs(Math.round(ep.power))} W
                      </div>
                    `)}
                  </div>
                ` : ''}
              </div>
            ` : '';
          })}
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      ha-card {
        background: transparent;
        border: none;
        box-shadow: none;
        overflow: hidden;
      }

      .layers-container {
        position: relative;
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
      }

      .layer-img {
        width: 80%;
        height: auto;
        display: block;
      }

      .layer-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .power-value {
        position: absolute;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: color 0.3s ease, text-shadow 0.3s ease;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
      }

      .total-power {
        font-size: clamp(14px, 3.5vw, 24px);
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .power-details {
        margin-top: 4px;
        padding-top: 4px;
        border-top: 1px solid currentColor;
        opacity: 0.85;
      }

      .power-detail-item {
        font-size: clamp(10px, 2vw, 14px);
        font-weight: 500;
      }

      .loading {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
      }
    `;
  }
}

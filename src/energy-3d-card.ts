import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface EnergyFlow {
  id: string;
  entities: string[];
  name: string;
  path: { x: number; y: number }[];
  valuePosition: { x: number; y: number };
}

interface FlowState {
  progress: number;
  segmentDistances: number[];
  totalPathLength: number;
}

@customElement('energy-3d-card')
export class Energy3dCard extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private config: any;

  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private animationId?: number;

  private flowStates: Map<string, FlowState> = new Map();

  private energyFlows: EnergyFlow[] = [
    {
      id: 'grid',
      entities: [],
      name: 'Grid',
      path: [
        { x: 36.1, y: 89.1 },
        { x: 77.7, y: 79 },
        { x: 68.5, y: 74.5 },
        { x: 68.2, y: 73.2 },
        { x: 68.2, y: 66.2 }
      ],
      valuePosition: { x: 50, y: 105 } // Below the house, centered
    }
  ];

  private colorThresholds = [
    { max: 500, color: { r: 0, g: 204, b: 102 }, glow: { r: 0, g: 200, b: 100 }, core: { r: 200, g: 255, b: 220 }, name: 'green' },
    { max: 1000, color: { r: 255, g: 180, b: 0 }, glow: { r: 255, g: 160, b: 0 }, core: { r: 255, g: 230, b: 150 }, name: 'orange-low' },
    { max: 1500, color: { r: 255, g: 120, b: 0 }, glow: { r: 255, g: 100, b: 0 }, core: { r: 255, g: 200, b: 150 }, name: 'orange-red' },
    { max: 2000, color: { r: 255, g: 60, b: 0 }, glow: { r: 255, g: 50, b: 0 }, core: { r: 255, g: 180, b: 150 }, name: 'red-orange' },
    { max: Infinity, color: { r: 255, g: 0, b: 0 }, glow: { r: 230, g: 0, b: 0 }, core: { r: 255, g: 150, b: 150 }, name: 'red' }
  ];

  protected firstUpdated(): void {
    const img = this.shadowRoot?.querySelector('.layer-img') as HTMLImageElement;
    if (img && img.complete) {
      this.handleImageLoad();
    }
    this.setupCanvas();
  }

  public setConfig(config: any): void {
    if (!config) throw new Error("Configuration invalide");
    this.config = config;

    const gridEntities: string[] = [];

    if (config.grid_entity) {
      gridEntities.push(config.grid_entity);
    }

    if (config.grid_entities && Array.isArray(config.grid_entities)) {
      gridEntities.push(...config.grid_entities);
    }

    this.energyFlows[0].entities = gridEntities;

    if (config.grid_name) {
      this.energyFlows[0].name = config.grid_name;
    }

    if (config.grid_path && Array.isArray(config.grid_path)) {
      this.energyFlows[0].path = config.grid_path;
    }

    if (config.grid_value_position) {
      this.energyFlows[0].valuePosition = config.grid_value_position;
    }

    if (config.flows && Array.isArray(config.flows)) {
      this.energyFlows = config.flows;
    }

    this.initializeFlowStates();
  }

  private initializeFlowStates(): void {
    this.flowStates.clear();

    this.energyFlows.forEach(flow => {
      const segmentDistances: number[] = [];
      let totalPathLength = 0;

      for (let i = 0; i < flow.path.length - 1; i++) {
        const p1 = flow.path[i];
        const p2 = flow.path[i + 1];
        const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        segmentDistances.push(dist);
        totalPathLength += dist;
      }

      this.flowStates.set(flow.id, {
        progress: Math.random() * -0.5,
        segmentDistances,
        totalPathLength
      });
    });
  }

  private getColorForPower(power: number): { color: {r: number, g: number, b: number}, glow: {r: number, g: number, b: number}, core: {r: number, g: number, b: number}, name: string } {
    const absPower = Math.abs(power);

    for (const threshold of this.colorThresholds) {
      if (absPower <= threshold.max) {
        return threshold;
      }
    }

    return this.colorThresholds[this.colorThresholds.length - 1];
  }

  private getTextColorForPower(power: number): string {
    const palette = this.getColorForPower(power);
    return `rgb(${palette.color.r}, ${palette.color.g}, ${palette.color.b})`;
  }

  private getPowerForFlow(flow: EnergyFlow): number {
    let totalPower = 0;

    flow.entities.forEach(entityId => {
      if (this.hass?.states[entityId]) {
        const value = parseFloat(this.hass.states[entityId].state);
        if (!isNaN(value)) {
          totalPower += value;
        }
      }
    });

    return totalPower;
  }

  private getEntityPowers(flow: EnergyFlow): { entity: string; name: string; power: number }[] {
    return flow.entities.map(entityId => {
      const state = this.hass?.states[entityId];
      const power = state ? parseFloat(state.state) || 0 : 0;
      const name = state?.attributes?.friendly_name || entityId.split('.').pop() || entityId;
      return { entity: entityId, name, power };
    });
  }

  private isFlowActive(flow: EnergyFlow): boolean {
    const power = this.getPowerForFlow(flow);
    return Math.abs(power) > 10;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  protected updated(): void {
    if (!this.canvas) {
      this.setupCanvas();
    }
  }

  private setupCanvas(): void {
    this.canvas = this.shadowRoot?.querySelector('.layer-canvas') as HTMLCanvasElement;

    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');

      const img = this.shadowRoot?.querySelector('.layer-img') as HTMLImageElement;

      if (img && img.complete && img.naturalWidth > 0) {
        this.resizeCanvas();
        this.startAnimation();
      } else if (img) {
        img.addEventListener('load', () => {
          this.resizeCanvas();
          this.startAnimation();
        });
      }
    }
  }

  private resizeCanvas(): void {
    const container = this.shadowRoot?.querySelector('.image-wrapper') as HTMLElement;
    const img = this.shadowRoot?.querySelector('.layer-img') as HTMLImageElement;

    if (this.canvas && container && img && img.offsetWidth > 0) {
      this.canvas.width = container.offsetWidth;
      this.canvas.height = container.offsetHeight;
    }
  }

  private startAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.runAnimation();
  }

  private getPointAtProgress(
    t: number, 
    width: number, 
    height: number, 
    path: { x: number; y: number }[],
    flowState: FlowState
  ): { x: number, y: number } | null {
    if (t < 0 || t > 1) return null;

    const targetDist = t * flowState.totalPathLength;
    let accumulated = 0;

    for (let i = 0; i < flowState.segmentDistances.length; i++) {
      if (accumulated + flowState.segmentDistances[i] >= targetDist) {
        const segmentT = (targetDist - accumulated) / flowState.segmentDistances[i];
        const p1 = path[i];
        const p2 = path[i + 1];

        return {
          x: ((p1.x + (p2.x - p1.x) * segmentT) / 100) * width,
          y: ((p1.y + (p2.y - p1.y) * segmentT) / 100) * height
        };
      }
      accumulated += flowState.segmentDistances[i];
    }

    const lastPoint = path[path.length - 1];
    return {
      x: (lastPoint.x / 100) * width,
      y: (lastPoint.y / 100) * height
    };
  }

  private drawFlowPath(
    flow: EnergyFlow,
    flowState: FlowState,
    width: number,
    height: number
  ): void {
    if (!this.ctx) return;

    const power = this.getPowerForFlow(flow);
    const isActive = Math.abs(power) > 10;
    const isReversed = power < 0;

    const colorPalette = this.getColorForPower(power);
    const { color, glow, core } = colorPalette;

    // Draw base cable
    this.ctx.beginPath();
    this.ctx.strokeStyle = isActive ? 'rgba(100, 110, 120, 0.5)' : 'rgba(60, 65, 70, 0.3)';
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    flow.path.forEach((p, i) => {
      const x = (p.x / 100) * width;
      const y = (p.y / 100) * height;
      if (i === 0) this.ctx!.moveTo(x, y);
      else this.ctx!.lineTo(x, y);
    });
    this.ctx.stroke();

    if (!isActive) return;

    const pulseLength = 0.30;
    const speed = 0.005 * (1 + Math.abs(power) / 2000);
    const segments = 25;
    const minWidth = 1;
    const maxWidth = 4;

    flowState.progress += speed;
    if (flowState.progress > 1 + pulseLength) {
      flowState.progress = -pulseLength;
    }

    let pulseStart = Math.max(0, flowState.progress - pulseLength);
    let pulseEnd = Math.min(1, flowState.progress);

    if (isReversed) {
      const tempStart = 1 - pulseEnd;
      pulseEnd = 1 - pulseStart;
      pulseStart = tempStart;
    }

    if (pulseEnd > pulseStart) {
      for (let i = 0; i < segments; i++) {
        const t1 = pulseStart + (pulseEnd - pulseStart) * (i / segments);
        const t2 = pulseStart + (pulseEnd - pulseStart) * ((i + 1) / segments);

        const taperProgress = isReversed ? (segments - i) / segments : i / segments;
        const lineWidth = minWidth + (maxWidth - minWidth) * taperProgress;
        const opacity = 0.3 + 0.7 * taperProgress;

        const p1 = this.getPointAtProgress(t1, width, height, flow.path, flowState);
        const p2 = this.getPointAtProgress(t2, width, height, flow.path, flowState);

        if (p1 && p2) {
          const isNearFront = isReversed ? i <= 2 : i >= segments - 3;
          const capStyle = isNearFront ? 'butt' : 'round';

          // Outer glow
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${glow.r}, ${glow.g}, ${glow.b}, ${opacity * 0.15})`;
          this.ctx.lineWidth = lineWidth + 4;
          this.ctx.lineCap = capStyle;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();

          // Main line
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
          this.ctx.lineWidth = lineWidth;
          this.ctx.lineCap = capStyle;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();

          // Core
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${core.r}, ${core.g}, ${core.b}, ${opacity * 0.5})`;
          this.ctx.lineWidth = Math.max(1, lineWidth * 0.3);
          this.ctx.lineCap = capStyle;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  private runAnimation = (): void => {
    if (!this.ctx || !this.canvas || this.canvas.width === 0) {
      this.animationId = requestAnimationFrame(this.runAnimation);
      return;
    }

    const width = this.canvas.width;
    const height = this.canvas.height;

    this.ctx.clearRect(0, 0, width, height);

    this.energyFlows.forEach(flow => {
      const flowState = this.flowStates.get(flow.id);
      if (flowState) {
        this.drawFlowPath(flow, flowState, width, height);
      }
    });

    this.animationId = requestAnimationFrame(this.runAnimation);
  }

  private handleImageLoad(): void {
    this.resizeCanvas();
    this.startAnimation();
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`<div class="loading">Chargement...</div>`;
    }

    const baseHouse = this.config.image || (
      window.location.hostname === 'localhost' 
        ? "./images/house.webp" 
        : "/local/energy-3d-card/house.webp"
    );

    const showDetails = this.config.show_details !== false;
    const imageSize = this.config.image_size || 90;

    return html`
      <ha-card>
        <div class="card-content">
          <div class="layers-container">
            <div class="image-wrapper" style="width: ${imageSize}%;">
              <img 
                src="${baseHouse}" 
                class="layer-img" 
                alt="House" 
                @load=${this.handleImageLoad}
              />
              <canvas class="layer-canvas"></canvas>
            </div>
          </div>

          <div class="power-values-container">
            ${this.energyFlows.map(flow => {
              const totalPower = this.getPowerForFlow(flow);
              const textColor = this.getTextColorForPower(totalPower);
              const isActive = Math.abs(totalPower) > 10;
              const entityPowers = this.getEntityPowers(flow);

              return isActive ? html`
                <div 
                  class="power-value" 
                  style="color: ${textColor};"
                >
                  <span class="power-icon">⚡</span>
                  <span class="power-label">${flow.name}:</span>
                  <span class="power-number">${Math.abs(Math.round(totalPower))}</span>
                  <span class="power-unit">W</span>
                  ${showDetails && entityPowers.length > 1 ? html`
                    <div class="power-details">
                      ${entityPowers.map(ep => html`
                        <span class="power-detail-item">
                          ${ep.name}: ${Math.abs(Math.round(ep.power))} W
                        </span>
                      `)}
                    </div>
                  ` : ''}
                </div>
              ` : '';
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      ha-card {
        background: var(--ha-card-background, var(--card-background-color, transparent));
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }

      .card-content {
        padding: 16px;
      }

      .layers-container {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .image-wrapper {
        position: relative;
        margin: 0 auto;
      }

      .layer-img {
        width: 100%;
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

      .power-values-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color, rgba(255,255,255,0.1));
      }

      .power-value {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        font-family: 'Segoe UI', Tahoma, sans-serif;
        transition: all 0.3s ease;
      }

      .power-icon {
        font-size: 14px;
      }

      .power-label {
        font-size: 12px;
        font-weight: 500;
        opacity: 0.9;
      }

      .power-number {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      .power-unit {
        font-size: 11px;
        font-weight: 500;
        opacity: 0.8;
      }

      .power-details {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 6px;
        padding-top: 6px;
        border-top: 1px solid currentColor;
        opacity: 0.75;
      }

      .power-detail-item {
        font-size: 10px;
        font-weight: 500;
      }

      .loading {
        padding: 40px;
        text-align: center;
        color: var(--secondary-text-color);
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
  }
}

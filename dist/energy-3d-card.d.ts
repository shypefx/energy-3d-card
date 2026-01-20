import { LitElement, TemplateResult, CSSResultGroup } from 'lit';
import { Energy3dCardConfig, HomeAssistant } from './types';
export declare class Energy3dCard extends LitElement {
    hass: HomeAssistant;
    private config;
    private energyFlows;
    private canvas?;
    private ctx?;
    private animationId?;
    private flowStates;
    private colorThresholds;
    private defaultPaths;
    static getConfigElement(): HTMLElement;
    static getStubConfig(): object;
    setConfig(config: Energy3dCardConfig): void;
    private buildEnergyFlows;
    private collectEntities;
    private initializeFlowStates;
    private calculateSegmentDistances;
    protected firstUpdated(): void;
    private setupCanvas;
    private handleImageLoad;
    private startAnimation;
    private updateAnimation;
    private drawFlows;
    private drawEnergyFlow;
    private getPositionOnPath;
    private getPowerForFlow;
    private getEntityPowers;
    private getColorsForPower;
    private getTextColorForPower;
    disconnectedCallback(): void;
    protected render(): TemplateResult;
    static get styles(): CSSResultGroup;
}
//# sourceMappingURL=energy-3d-card.d.ts.map
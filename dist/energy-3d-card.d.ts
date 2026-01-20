import { LitElement, TemplateResult, CSSResultGroup } from 'lit';
export declare class Energy3dCard extends LitElement {
    hass: any;
    private config;
    private canvas?;
    private ctx?;
    private animationId?;
    private flowStates;
    private energyFlows;
    private colorThresholds;
    protected firstUpdated(): void;
    setConfig(config: any): void;
    private initializeFlowStates;
    private getColorForPower;
    private getTextColorForPower;
    private getPowerForFlow;
    private getEntityPowers;
    private isFlowActive;
    disconnectedCallback(): void;
    protected updated(): void;
    private setupCanvas;
    private resizeCanvas;
    private startAnimation;
    private getPointAtProgress;
    private drawFlowPath;
    private runAnimation;
    private handleImageLoad;
    protected render(): TemplateResult;
    static get styles(): CSSResultGroup;
}
//# sourceMappingURL=energy-3d-card.d.ts.map
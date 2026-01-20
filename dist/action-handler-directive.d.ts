import { AttributePart } from 'lit/directive';
import { ActionHandlerDetail, ActionHandlerOptions } from 'custom-card-helpers/dist/types';
interface ActionHandlerElement extends HTMLElement {
    actionHandler?: boolean;
}
declare global {
    interface HASSDomEvents {
        action: ActionHandlerDetail;
    }
}
export declare const actionHandlerBind: (element: ActionHandlerElement, options?: ActionHandlerOptions) => void;
export declare const actionHandler: (_options?: ActionHandlerOptions | undefined) => import("lit-html/directive").DirectiveResult<{
    new (_partInfo: import("lit-html/directive").PartInfo): {
        update(part: AttributePart, [options]: [_options?: ActionHandlerOptions | undefined]): symbol;
        render(_options?: ActionHandlerOptions): void;
        readonly _$isConnected: boolean;
    };
}>;
export {};
//# sourceMappingURL=action-handler-directive.d.ts.map
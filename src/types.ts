export interface EnergyFlowConfig {
  id: string;
  entities: string[];
  name: string;
  icon?: string;
  path: { x: number; y: number }[];
  valuePosition: { x: number; y: number };
  color?: string;
}

export interface Energy3dCardConfig {
  type: string;
  title?: string;
  image?: string;
  show_details?: boolean;
  
  // Grid configuration
  grid_entity?: string;
  grid_entities?: string[];
  grid_name?: string;
  grid_path?: { x: number; y: number }[];
  grid_value_position?: { x: number; y: number };
  
  // Solar configuration
  solar_entity?: string;
  solar_entities?: string[];
  solar_name?: string;
  solar_path?: { x: number; y: number }[];
  solar_value_position?: { x: number; y: number };
  
  // Battery configuration
  battery_entity?: string;
  battery_entities?: string[];
  battery_name?: string;
  battery_path?: { x: number; y: number }[];
  battery_value_position?: { x: number; y: number };
  
  // Custom flows
  flows?: EnergyFlowConfig[];
  
  // Color thresholds
  color_thresholds?: {
    max: number;
    color: string;
  }[];
}

export interface HomeAssistant {
  states: { [entityId: string]: HassEntity };
  callService: (domain: string, service: string, data?: object) => Promise<void>;
  formatEntityState: (entity: HassEntity) => string;
  localize: (key: string, ...args: any[]) => string;
  language: string;
  themes: any;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    icon?: string;
    [key: string]: any;
  };
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    user_id: string | null;
  };
}

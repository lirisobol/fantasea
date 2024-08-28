import {Element} from "./Element";
import { ElementStat } from "./ElementStat";
import { ElementType } from "./ElementType";
import { Event } from "./Event";
import { Fixture } from "./Fixture";
import { Team } from "./Team";

export default class GeneralInfo {
    public elements: Element[] = [];
    public teams: Team[] = [];
    public element_types: ElementType[] = [];
    public element_stats: ElementStat[] = [];
    public events: Event[] = [];
    public fixtures: Fixture[] = [];

    constructor(data: Partial<GeneralInfo> = {}) {
        Object.assign(this, data);
    };

    public toPlainObject(): Record<string, unknown> {
        return {
            elements: this.elements,
            teams: this.teams,
            element_types: this.element_types,
            element_stats: this.element_stats,
            events: this.events,
            fixtures: this.fixtures
        };
    };
}
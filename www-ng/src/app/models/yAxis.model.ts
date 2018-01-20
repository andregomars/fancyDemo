export class YAxis {
    readonly label: string;
    readonly color: string;
    readonly min: number;
    readonly max: number;
    readonly stepSize: number;

    constructor (label: string, color: string, min: number, max: number, stepSize?: number) {
        this.label = label;
        this.color = color;
        this.min = min;
        this.max = max;
        this.stepSize = stepSize
    }
}
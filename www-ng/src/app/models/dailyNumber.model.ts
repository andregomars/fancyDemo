export class DailyNumber {
    readonly date: Date;
    readonly value: number;

    constructor (date: Date, value: number) {
        this.date = date;
        this.value = value;
    }
}
import { Vehicle } from './vehicle.model';

export class Fleet {

    public id: string;
    public vehicles: Array<Vehicle>;

    constructor(id: string, vehicles: Array<Vehicle>) {
        this.id = id;
        this.vehicles = vehicles;
    }

    
}
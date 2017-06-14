export class VehicleDailyUsage {
  constructor(
    public vid: number,
    public vname: string,
    public fid: number,
    public fname: string,
    public date: Date,
    public mileage: number,
    public soccharged: number,
    public socused: number,
    public energycharged: number,
    public energyused: number,
    public soc_mile: number, 
    public mile_soc: number, 
    public energy_mile: number, 
    public mile_energy: number 
 ) {}
}


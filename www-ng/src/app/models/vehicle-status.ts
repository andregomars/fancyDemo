export class VehicleStatus {
  constructor(
    public vid: number,
    public vname: string,
    public fid: number,
    public fname: string,
    public soc: number,
    public status: number,
    public range: number,
    public mileage: number,
    public voltage: number,
    public current: number,
    public temperature: number,
    public speed: number,
    public remainingenergy: number,
    public updated: Date
  ) {}
}


export class VehicleStatus {
  constructor(
    public dataId: string,
    public vid: number,
    public vname: string,
    public fid: number,
    public fname: string,
    public vtype: string = "bus",
    public lat: number,
    public lng: number,
    public axisx: number,
    public axisy: number,
    public axisz: number,
    public soc: number,
    public status: number,
    public range: number,
    public mileage: number,
    public voltage: number,
    public current: number,
    public temperaturehigh: number,
    public temperaturelow: number,
    public speed: number,
    public remainingenergy: number,
    public actualdistance: number,
    public highvoltagestatus: number, 
    public updated: Date
  ) {}
}


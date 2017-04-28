export class VehicleStatus {
  constructor(
    public vid: number,
    public vname: string,
    public fid: number,
    public fname: string,
    public soc: number,
    public status: string,
    public range: number,
    public mileage: number,
    public voltage: number,
    public current: number,
    public temperature: number,
    public speed: number,
    public updated: Date
  ) {}
}

    // vid: number;
    // vname: string;
    // fid: number;
    // fname: string;
    // soc: number;
    // status: string;
    // range: number;
    // mileage: number;
    // voltage: number;
    // current: number;
    // temperature: number;
    // speed: number;
    // updated: Date;

    // constructor(vid, vname, fid, fname, soc, status, range, mileage, 
    //   voltage, current, temperature, speed, updated) {
    //   this.vid = vid;
    //   this.vname = vname;
    //   this.fid = fid;
    //   this.fname = fname;
    //   this.soc = soc;
    //   this.status = status;
    //   this.range = range;
    //   this.mileage = mileage;
    //   this.voltage = voltage;
    //   this.current = current;
    //   this.temperature = temperature;
    //   this.speed = speed;
    //   this.updated = updated;
    // }

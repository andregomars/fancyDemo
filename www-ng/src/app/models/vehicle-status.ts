export class VehicleStatus {
    vid: string;
    fid: string;
    soc: number;
    status: string;
    range: number;
    mileage: number;
    voltage: number;
    current: number;
    temperature: number;
    speed: number;
    updated: Date;

    constructor(vid, fid, soc, status, range, mileage, 
      voltage, current, temperature, speed, updated) {
      this.vid = vid;
      this.fid = fid;
      this.soc = soc;
      this.status = status;
      this.range = range;
      this.mileage = mileage;
      this.voltage = voltage;
      this.current = current;
      this.temperature = temperature;
      this.speed = speed;
      this.updated = updated;
    }
      
}

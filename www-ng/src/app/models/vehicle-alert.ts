export class VehicleAlert {
  constructor(
    public vid: number,
    public vname: string,
    public fid: number,
    public fname: string,
    public code: string,
    public name: string,
    public value: number,
    public unit: string,
    public updated: Date
  ) {}
}
export class VehicleDailyFile {
  constructor(
    public vid: number,
    public vname: string,
    public fid: number,
    public fname: string,
    public fileid: number,
    public filename: string,
    public filetime: Date,
    public begintime: Date,
    public endtime: Date, 
 ) {}
}
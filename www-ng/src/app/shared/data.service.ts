import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	getFleet(): Promise<any> {
        var url = this.getUrl();
		return this.http.get(url)
			.toPromise()
			.then(response => response.json())
			// .then(response => {console.dir(response);return response.json()})
			.catch(this.handleError);
	}

    getUrl(): string {
        let urls = [
            "http://www.mocky.io/v2/589ebc1f270000ab24ed0efe"
        // "http://www.mocky.io/v2/58789d370f0000a71f0d49ed"
        // ,"http://www.mocky.io/v2/587d44fc0f00004e0c5df626"
        // ,"http://www.mocky.io/v2/587d47d50f0000930c5df627"
        // ,"http://www.mocky.io/v2/587d49050f0000aa0c5df629"
        // ,"http://www.mocky.io/v2/587d49960f0000bd0c5df62a"
        ];
        return urls[Math.floor(Math.random()*urls.length)];
    }

	private handleError(error: any): Promise<any> {
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}

}
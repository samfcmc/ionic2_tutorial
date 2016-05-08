import {Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs} from 'angular2/http';

const BASE_URL = 'http://version1.api.memegenerator.net';
const ENDPOINTS = {
	generators: {
		byNew: 'Generators_Select_ByNew'
	}
};

const DEFAULT_PAGE_SIZE = 12;

@Injectable()
export class MemeAPIClient {
	
	private http: Http;
	
	constructor(http: Http) {
		this.http = http;
	}
	
	private getUrlForEndpoint(endpoint: string) {
		return BASE_URL + '/' + endpoint;
	}
	
	private get(endpoint: string, options: RequestOptionsArgs, success: (response: any) => void, error: (errorThrown) => void) {
		var url = this.getUrlForEndpoint(endpoint);
		this.http.get(url, options).map(response => {
			return response.json();
		})
		.subscribe(json => {
			if(json && json.success) {
				success(json.result);
			}
			else {
				error(json);
			}
		});
	}
	
	public getGeneratorsByNew(page: Number, success: (response: any) => void, error: (errorThrown) => void) {
		var endpoint = ENDPOINTS.generators.byNew;
		var options: RequestOptionsArgs = {
			search: `pageIndex=${page}&pageSize=${DEFAULT_PAGE_SIZE}`
		}; 
		this.get(endpoint, options, success, error);
	}
}
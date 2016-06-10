import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, BaseRequestOptions, URLSearchParams} from '@angular/http';

//const BASE_URL = 'http://version1.api.memegenerator.net';
const BASE_URL = 'http://localhost:3000/api'
const ENDPOINTS = {
	generatorsByNew: 'Generators_Select_ByNew',
	instancesByNew: 'Instances_Select_ByNew',
	createInstance: 'Instance_Create'	
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
	
	private get(endpoint: string, options: RequestOptionsArgs, success: (response: any) => void, error: (errorThrown: any) => void) {
		var url = this.getUrlForEndpoint(endpoint);
		this.http.get(url, options)
		.subscribe(response => {
			var json = response.json();
			if(json.success) {
				success(json.result);	
			}
			else {
				error(json);
			}
		}, errorThrown => {
			error(errorThrown);
		});
	}
	
	private post(endpoint: string, body: string, success: (response) => void, error: (errorThrown) => void) {
		var url = this.getUrlForEndpoint(endpoint);
		this.http.post(url, body)
		.subscribe(response => {
			var json = response.json();
			if(json.success) {
				success(json.result);
			}
			else {
				error(json);
			}
		}, errorThrown => {
			error(errorThrown);
		})
	}
	
	public getGeneratorsByNew(page: number, success: (response: any) => void, error: (errorThrown) => void) {
		var endpoint = ENDPOINTS.generatorsByNew;
		var options = new BaseRequestOptions();
		var search = new URLSearchParams();
		search.set('pageIndex', page + '');
		options.search = search;
		
		this.get(endpoint, options, success, error);
	}
	
	public createMeme(data: any, success: (response:any) => void, error: (errorThrown) => void) {
		var endpoint = ENDPOINTS.createInstance;
		var options = new BaseRequestOptions();
		var search = new URLSearchParams();
		for(var key in data) {
			var value = data[key];
			search.set(key, value);
		}
		options.search = search;
		this.get(endpoint, options, success, error);
	}
	
	public getInstances(page: Number, success: (response: any) => void, error: (errorThrown) => void) {
		var endpoint = ENDPOINTS.instancesByNew;
		var options = new BaseRequestOptions();
		var search = new URLSearchParams();

		search.set('languageCode', 'en');
		search.set('pageIndex', page + '');
		options.search = search;

		this.get(endpoint, options, success, error);
	}
}
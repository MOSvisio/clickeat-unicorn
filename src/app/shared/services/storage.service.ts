import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unicorn } from '../classes/unicorn';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private httpClient: HttpClient) {
    
  }

  getUnicorns() {

    const unicorns = localStorage.getItem("unicorns");
    if (unicorns) {
      return JSON.parse(unicorns);
    }
    return [];
  }
 
  saveUnicorns(data: Unicorn[]) {
    let id = 0;
    for (let i=0; i<data.length; i++) {
      if (data[i].id < 0) {
        id++
        data[i].id = id;
      } else {
        id = data[i].id;
      }
    }

    localStorage.setItem("unicorns", JSON.stringify(data));
  }

}

import { Injectable } from '@angular/core';
import { AllData, Icons, Parts } from './models';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private _allData?: AllData;
  constructor(private readonly _httpClient: HttpClient) { }

  GetAllData(): Observable<AllData> {
    return this._httpClient.get<AllData>('assets/avatar-shop.json').pipe(tap((json) => {
      this._allData = json;
    }));
  }

  GetIcons(): Observable<Icons[]> {
    if (this._allData) {
      return of(this._allData.icons);
    }

    return this.GetAllData().pipe(map((json) => json.icons));
  }

  GetPartsById(partsId: number): Observable<Parts> {
    if (this._allData && this._allData.parts?.length > 0) {
      return of(this._allData.parts.filter((p) => p.partsId === partsId)[0])
    }

    return this.GetAllData().pipe(map((json) => json.parts.filter((p) => p.partsId === partsId)[0]));
  }
}

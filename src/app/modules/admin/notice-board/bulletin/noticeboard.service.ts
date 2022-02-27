import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { NoticeBoard, DeliveryPeople } from 'app/shared/constants/url.config';

@Injectable({
  providedIn: 'root'
})
export class NoticeboardService {

  constructor(private http: HttpClient) { }

  getList(page, limit) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    return this.http.get(`${NoticeBoard.list}`, { params: params });
  }

  deliveryPeopleList() {
    return this.http.get(`${DeliveryPeople.list}`);
  }

  create(data) {
    return this.http.post(`${NoticeBoard.create}`, data);
  }

  update(data, id) {
    return this.http.patch(`${NoticeBoard.create}` + id, data);
  }

  delete(id) {
    return this.http.delete(`${NoticeBoard.create}` + id + '/');
  }

  getById(id) {
    return this.http.get(`${NoticeBoard.getById}` + id);
  }


}

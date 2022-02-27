import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {  SettingsURL } from 'app/shared/constants/url.config';

@Injectable({
    providedIn: 'root'
})
export class SettingsService
{
   


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    
   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    

    getList(page, limit): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('limit', limit);
        return this._httpClient.get(`${SettingsURL.get}`, { params: params });
      }

    create(data): Observable<any>
    {
        return this._httpClient.post(SettingsURL.create, data);
    }
    
    
      update(data, type): Observable<any> {
        return this._httpClient.patch(`${SettingsURL.create}` + type + '/' + SettingsURL.settingId, data);
      }
    
      delete(id): Observable<any> {
        return this._httpClient.delete(`${SettingsURL.create}` + id + '/');
      }
    
      getById(id): Observable<any> {
        return this._httpClient.get(`${SettingsURL.getById}` + id);
      }
    

    /**
     * Get course by id
     */
 /*   getCourseById(id: string): Observable<Course>
    {
        return this._httpClient.get<Course>('api/apps/academy/courses/course', {params: {id}}).pipe(
            map((course) => {

                // Update the course
                this._course.next(course);

                // Return the course
                return course;
            }),
            switchMap((course) => {

                if ( !course )
                {
                    return throwError('Could not found course with id of ' + id + '!');
                }

                return of(course);
            })
        );
    } */
}

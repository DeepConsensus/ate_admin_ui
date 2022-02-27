import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CuisinesModel } from 'app/modules/admin/cuisines/cuisines.types';
import {  CuisinesURL } from 'app/shared/constants/url.config';

@Injectable({
    providedIn: 'root'
})
export class CuisinesService
{
    // Private
    private _cuisines: BehaviorSubject<CuisinesModel[] | null> = new BehaviorSubject(null);
  

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for categories
     */
    get agents$(): Observable<CuisinesModel[]>
    {
        return this._cuisines.asObservable();
    }

   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getAgents(): Observable<CuisinesModel[]>
    {
        return this._httpClient.get<CuisinesModel[]>(CuisinesURL.list).pipe(
            tap((response: any) => {
                this._cuisines.next(response);
            })
        );
    }

    getList(page, limit): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('limit', limit);
        return this._httpClient.get(`${CuisinesURL.get}`, { params: params });
      }

    create(data): Observable<any>
    {
        return this._httpClient.post(CuisinesURL.create, data);
    }
    
    
      update(data, id): Observable<any> {
        return this._httpClient.patch(`${CuisinesURL.create}` + id, data);
      }
    
      delete(id): Observable<any> {
        return this._httpClient.delete(`${CuisinesURL.create}` + id + '/');
      }
    
      getById(id): Observable<any> {
        return this._httpClient.get(`${CuisinesURL.getById}` + id);
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

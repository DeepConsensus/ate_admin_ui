import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Reason } from 'app/modules/admin/reasons/reason.types';
import {  Reasons } from 'app/shared/constants/url.config';

@Injectable({
    providedIn: 'root'
})
export class ReasonService
{
    // Private
    private _reasons: BehaviorSubject<Reason[] | null> = new BehaviorSubject(null);


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
    get agents$(): Observable<Reason[]>
    {
        return this._reasons.asObservable();
    }

   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getAgents(): Observable<Reason[]>
    {
        return this._httpClient.get<Reason[]>(Reasons.list).pipe(
            tap((response: any) => {
                this._reasons.next(response);
            })
        );
    }

    getList(page, limit): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('limit', limit);
        return this._httpClient.get(`${Reasons.get}`, { params: params });
      }

    create(data): Observable<any>
    {
        return this._httpClient.post(Reasons.create, data);
    }
    
    
      update(data, id): Observable<any> {
        return this._httpClient.patch(`${Reasons.create}` + id, data);
      }
    
      delete(id): Observable<any> {
        return this._httpClient.delete(`${Reasons.create}` + id + '/');
      }
    
      getById(id): Observable<any> {
        return this._httpClient.get(`${Reasons.getById}` + id);
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

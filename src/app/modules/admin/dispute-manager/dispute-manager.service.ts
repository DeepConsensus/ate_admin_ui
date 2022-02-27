import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DisputeManagerModel } from 'app/modules/admin/dispute-manager/dispute-manager.types';
import {  DisputeManager } from 'app/shared/constants/url.config';

@Injectable({
    providedIn: 'root'
})
export class DisputeManagerService
{
    // Private
    private _disputes: BehaviorSubject<DisputeManagerModel[] | null> = new BehaviorSubject(null);
  

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
    get agents$(): Observable<DisputeManagerModel[]>
    {
        return this._disputes.asObservable();
    }

   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getAgents(): Observable<DisputeManagerModel[]>
    {
        return this._httpClient.get<DisputeManagerModel[]>(DisputeManager.list).pipe(
            tap((response: any) => {
                this._disputes.next(response);
            })
        );
    }

    getList(page, limit): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('limit', limit);
        return this._httpClient.get(`${DisputeManager.get}`, { params: params });
      }

    create(data): Observable<any>
    {
        return this._httpClient.post(DisputeManager.create, data);
    }
    
    
      update(data, id): Observable<any> {
        return this._httpClient.patch(`${DisputeManager.create}` + id, data);
      }
    
      delete(id): Observable<any> {
        return this._httpClient.delete(`${DisputeManager.create}` + id + '/');
      }
    
      getById(id): Observable<any> {
        return this._httpClient.get(`${DisputeManager.getById}` + id);
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

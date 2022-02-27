import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Agent } from 'app/modules/admin/delivery-agent/delivery-agent.types';
import {  DeliveryPeople } from 'app/shared/constants/url.config';

@Injectable({
    providedIn: 'root'
})
export class DeliveryAgentService
{
    // Private
    private _agents: BehaviorSubject<Agent[] | null> = new BehaviorSubject(null);
  

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
    get agents$(): Observable<Agent[]>
    {
        return this._agents.asObservable();
    }

   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getAgents(): Observable<Agent[]>
    {
        return this._httpClient.get<Agent[]>(DeliveryPeople.list).pipe(
            tap((response: any) => {
                this._agents.next(response);
            })
        );
    }

    getList(page, limit): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('limit', limit);
        return this._httpClient.get(`${DeliveryPeople.get}`, { params: params });
      }

    create(data): Observable<any>
    {
        return this._httpClient.post(DeliveryPeople.create, data);
    }
    
    
      update(data, id): Observable<any> {
        return this._httpClient.patch(`${DeliveryPeople.create}` + id, data);
      }
    
      delete(id): Observable<any> {
        return this._httpClient.delete(`${DeliveryPeople.create}` + id + '/');
      }
    
      getById(id): Observable<any> {
        return this._httpClient.get(`${DeliveryPeople.getById}` + id);
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

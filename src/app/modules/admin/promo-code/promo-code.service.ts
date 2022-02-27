import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PromoCode } from 'app/modules/admin/promo-code/promo-code.types';
import {  PromoCodes } from 'app/shared/constants/url.config';

@Injectable({
    providedIn: 'root'
})
export class PromoCodeService
{
    // Private
    private _agents: BehaviorSubject<PromoCode[] | null> = new BehaviorSubject(null);

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
    get agents$(): Observable<PromoCode[]>
    {
        return this._agents.asObservable();
    }

   

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get categories
     */
    getAgents(): Observable<PromoCode[]>
    {
        return this._httpClient.get<PromoCode[]>(PromoCodes.list).pipe(
            tap((response: any) => {
                this._agents.next(response);
            })
        );
    }

    getList(page, limit): Observable<any> {
        let params = new HttpParams();
        params = params.append('page', page);
        params = params.append('limit', limit);
        return this._httpClient.get(`${PromoCodes.get}`, { params: params });
      }

    create(data): Observable<any>
    {
        return this._httpClient.post(PromoCodes.create, data);
    }
    
    
      update(data, id): Observable<any> {
        return this._httpClient.patch(`${PromoCodes.create}` + id, data);
      }
    
      delete(id): Observable<any> {
        return this._httpClient.delete(`${PromoCodes.create}` + id + '/');
      }
    
      getById(id): Observable<any> {
        return this._httpClient.get(`${PromoCodes.getById}` + id);
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

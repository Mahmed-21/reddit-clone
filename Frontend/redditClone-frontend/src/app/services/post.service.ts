import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceResponse } from './service-response.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5296/Post'; //Will change it later + the routes for the methods below
  constructor(private http: HttpClient) { }

  getPosts(): Observable<ServiceResponse<any[]>> {
    return this.http.get<ServiceResponse<any[]>>(`${this.apiUrl}/posts`);
  }

  getPost(postId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.apiUrl}/posts/${postId}`);
  }

  addPost(newPost: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/post`, newPost, { headers });
  }

  updatePost(postId: number, updatedPost: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/post/${postId}`, updatedPost, { headers });
  }

  deletePost(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/post/${postId}`, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { ServiceResponse } from './service-response.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:5296/Comment'; //Will change it later + the routes for the methods below

  constructor(private http: HttpClient) { }

  getCommentsByPost(postId: number): Observable<ServiceResponse<any[]>> {
    return this.http.get<ServiceResponse<any[]>>(`${this.apiUrl}/post/${postId}/comments`);
  }

  getComment(postId: number, commentId: number): Observable<ServiceResponse<any>> {
    return this.http.get<ServiceResponse<any>>(`${this.apiUrl}/post/${postId}/comment/${commentId}`);
  }

  addComment(newComment: any, postId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `bearer ${token}`
    });
    return this.http.post<any[]>(`${this.apiUrl}/post/${postId}/comment`, newComment, { headers });
  }

  updateComment(postId: number, commentId: number, updatedComment: any): Observable<ServiceResponse<any>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `bearer ${token}`
    });
    return this.http.put<ServiceResponse<any>>(`${this.apiUrl}/post/${postId}/comment/${commentId}`, updatedComment, { headers });
  }

  deleteComment(postId: number, commentId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `bearer ${token}`
    });
    return this.http.delete<any[]>(`${this.apiUrl}/post/${postId}/${commentId}`, { headers });
  }

}

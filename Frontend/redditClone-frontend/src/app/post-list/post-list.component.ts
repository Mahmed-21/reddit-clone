import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ServiceResponse } from '../services/service-response.service';
import { AuthService } from '../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  
  posts: any[];
  newPost: any = { title: '', content: '' };
  isAuth: boolean;
  constructor(private postService: PostService, private authService: AuthService, private router: Router) { } 
  
  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn();
    this.postService.getPosts().subscribe(
      (response: ServiceResponse<any[]>) => {
        this.posts = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  onSubmit() {
    console.log('Submit button clicked');
    this.postService.addPost(this.newPost).subscribe(
      response => {
        console.log('Post added successfully!', response);
        this.newPost = { title: '', content: '' };
        this.router.navigate(['/addPost']);
      },
      error => {
        console.error('Error adding post', error);
      }
    );
  }

  onDeletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(
      response => {
        console.log('Post deleted successfully!', response);
        this.posts = this.posts.filter(post => post.id !== postId);
      },
      error => {
        console.error('Error deleting post', error);
      }
    );
  }

  onEditPost(postId: number) {
    this.router.navigate(['/editPost', postId]);
  }

}

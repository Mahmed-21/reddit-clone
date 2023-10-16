import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{
  postId: number;
  post: any; // Variable to hold the post details
  comments: any[];
  isAuth: boolean;
  newComment = { content: '' };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn();
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('id');
      this.loadPostDetails();
      this.loadComments();
      //console.log(this.route.snapshot.url[0].path + '/' + this.route.snapshot.url[1].path);
    });
  }

  onSubmit() {
    console.log('Submit button clicked');
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('id');
      this.commentService.addComment(this.newComment, this.postId).subscribe(
        response => {
          console.log('Comment added successfully!', response);
          this.newComment = { content: '' };
          this.router.navigate(['/addComment']);
        },
        error => {
          console.error('Error adding comment', error);
        }
      );
    });
  }

  loadPostDetails() {
    // Use the PostService to get the specific post details
    this.postService.getPost(this.postId).subscribe(response => {
      this.post = response.data;
    });
  }

  loadComments() {
    // Use the CommentService to get comments for the specific post
    this.commentService.getCommentsByPost(this.postId).subscribe(response => {
      this.comments = response.data;
    });
  }

  deleteComment(commentId: number) {
    // Get the postId from the route or any other way you have it available
    const postId = this.postId; // Assuming postId is already available
  
    this.commentService.deleteComment(postId, commentId).subscribe(
      response => {
        console.log('Comment deleted successfully!', response);
        // Reload comments or update the comments array
        this.loadComments();
      },
      error => {
        console.error('Error deleting comment', error);
      }
    );
  }

}

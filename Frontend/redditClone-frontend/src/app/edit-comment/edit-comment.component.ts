import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  postId: number;
  commentId: number;
  comment: any = { content: '' };

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('postId');
      this.commentId = +params.get('commentId');
      this.loadComment();
    });
  }

  loadComment() {
    this.commentService.getComment(this.postId, this.commentId).subscribe(response => {
      console.log(response.data);
      this.comment = response.data;
    });
  }

  onSubmit() {
    this.commentService.updateComment(this.postId, this.commentId, this.comment).subscribe(
      response => {
        console.log('Comment updated successfully!', response);
        this.router.navigate(['/post', this.postId]);
      },
      error => {
        console.error('Error updating comment', error);
      }
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ServiceResponse } from '../services/service-response.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{
  
  postId: number;
  post: any = { title: '', content: '' };

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id');

    // Load the post details based on the post ID
    this.postService.getPost(this.postId).subscribe(
      (response: ServiceResponse<any>) => {
        this.post = response.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    this.postService.updatePost(this.postId, this.post).subscribe(
      response => {
        console.log('Post updated successfully!', response);
        this.router.navigate(['']);
        // Optionally, we can navigate to the post details page after editing.
      },
      error => {
        console.error('Error updating post', error);
      }
    );
  }

}

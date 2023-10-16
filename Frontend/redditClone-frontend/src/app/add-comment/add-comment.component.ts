import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  constructor(private location: Location) {}

  ngOnInit() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [CourseService]
})
export class CourseComponent implements OnInit {

  items: Course[];
  constructor(private coursesService: CourseService) { }

  ngOnInit() {
    this.coursesService.getCourses().subscribe(items => {
      this.items = items;
    });
  }

}

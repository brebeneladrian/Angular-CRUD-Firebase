import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [ CourseService ]
})
export class AddCourseComponent implements OnInit {
  courseid: string;
  item: Course;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.courseid = param.get('id');
    });

    if (this.courseid) {
        this.editCourse(this.courseid);
    } else {
      this.item = {
        name: '',
        description: '',
        category: '',
        seqno: 0,
        isactive: true,
        id: ''
      };
    }
}

  onSubmit() {
    if ( this.courseid) {
    if (this.item.name !== '') {
      this.courseService.updateCourse(this.item);
      this.router.navigate(['course']);
    }
    } else {
    if (this.item.name !== '') {
      this.courseService.addCourse(this.item);
      this.router.navigate(['course']);
    }
    }
  }

  editCourse(courseid) {
    // tslint:disable-next-line:only-arrow-functions
    this.afs.doc('course/${courseid}').ref.get().then(function(doc) {
      if (doc.exists) {
        console.log('document exist');
        doc.data();
        const data = doc.data() as any;
        return {courseid, ...data };
      } else {
        console.log (' no such document');
      }
      // tslint:disable-next-line:only-arrow-functions
    }).catch(function( error) {
      console.log('error getting document : ', error);
    }).then(result => {
      this.item = result;
    }).catch(err => {
      console.log('error');
    });
}




}

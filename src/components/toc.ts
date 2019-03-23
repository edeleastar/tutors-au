import { Lo } from '../services/lo';
import { iconColours, icons } from '../services/styles';
import { CourseRepo } from '../services/course-repo';
import { inject } from 'aurelia-framework';

@inject(CourseRepo)
export class Toc {
  los: Lo[];

  constructor(private courseRepo: CourseRepo) {}

  icon(type: string) {
    return icons[type];
  }

  iconStyle(type: string) {
    return iconColours[type];
  }

  attached() {
    this.los = this.courseRepo.course.topicLos;
  }
}
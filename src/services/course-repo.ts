import { HttpClient } from "aurelia-fetch-client";
import { Course } from "./course";
import * as path from "path";
import { findCourseUrls, lastSegment } from "./utils";
import { AuthService } from "./auth-service";
import { Topic } from "./topic";
import { NavigatorProperties } from "../resources/elements/iconography/styles";
import { autoinject } from "aurelia-framework";
import { Lo } from "./lo";
import environment from "../environment";

@autoinject
export class CourseRepo {
  course: Course;
  topic: Topic;
  lab: Lo;
  courseUrl = "";
  topicUrl = "";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private navigatorProperties: NavigatorProperties
  ) {}

  async getCourse(url, complete = false) {
    if (!this.course || this.course.url !== url) {
      this.courseUrl = url;
      this.course = new Course(this.http, url);
      try {
        await this.course.fetchCourse(complete);
        this.navigatorProperties.init(this.course);
      } catch (e) {
        this.courseUrl = "";
        this.course = null;
      }
    }
  }

  async fetchCourse(url: string) {
    await this.getCourse(url);
    // if (this.course.lo.properties.hasOwnProperty('auth') && this.course.lo.properties.auth == 'true') {
    //   this.course.secured = true;
    //   if (!this.authService.isAuthenticated()) {
    //     localStorage.setItem('course_url', url);
    //     this.authService.login();
    //   }
    // }
    return this.course;
  }

  async fetchTopic(url: string) {
    await this.fetchCourse(path.dirname(url));
    this.topic = this.course.topicIndex.get(lastSegment(url));
    return this.topic;
  }

  async fetchLab(url: string) {
    const urls = findCourseUrls(url);
    await this.fetchCourse(urls[0]);
    const topic = await this.fetchTopic(urls[1]);
    let labprefix = "#lab/";
    if (environment.pushState) {
      labprefix = "lab/";
    }
    this.lab = this.course.labIndex.get(labprefix + url);
    this.lab.parent = topic;
    console.log('aboout to return this');
    return this.lab;
  }

  async fetchWall(url: string, type: string) {
    await this.fetchCourse(url);
    return this.course.walls.get(type);
  }

  async fetchCourseProperties(url: string) {
    await this.fetchCourse(url);
    return this.course.lo.properties;
  }

  async fetchCourseFromTalk(url: string) {
    console.log(url);
    const urls = findCourseUrls(url);
    await this.fetchCourse(urls[0]);
    return this.course;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Issue } from '../models/issue';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://localhost:44368/api/issues/';

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  //ToasterService uses Material Toasts for displaying messages

  addIssue(issue: Issue): void {
    this.httpClient.post<Issue>(this.API_URL, issue).subscribe(data => {
      this.dialogData = data;
      // this.toasterService.showToaster('Successfully added', 3000);
      console.log('Successfully added');
    },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message);
      });
  }

  updateIssue(issue: Issue): void {
    this.httpClient.put<Issue>(this.API_URL + issue.id, issue).subscribe(data => {
      this.dialogData = data;
      // this.toasterService.showToaster('Successfully edited', 3000);
      console.log('Successfully edited');
    },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message);

      }
    );
  }

  deleteIssue(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
        // this.toasterService.showToaster('Successfully deleted', 3000);
        console.log('Successfully deleted');
      },
      (err: HttpErrorResponse) => {
        // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message);

      }
    );
  }

}



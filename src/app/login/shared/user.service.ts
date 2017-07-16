import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class UserService {
  private usersUrl = 'api/users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  constructor(private http: Http) {}

  private handleError (error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then( response => response.json().data as User[])
      .catch(this.handleError);
  }

  getUser(user: User): Promise<User> {
    // Get user with matching name and password
    return new Promise((resolve, reject) => {
      this.getUsers().then((users: User[]) => {
        let curUser: User[] = users.filter( usr => usr.name === user.name)
        if(curUser.length === 1) {
          resolve(curUser[0]);
        } else {
          reject({
            message: 'No such user'
          });
        }
      });
    });
  }

  add(user: object): Promise<User> {
    // Generate new salt and hash the password with the salt
    // Store the salt and hash
    return new Promise((resolve, reject) => {
      this.getUsers().then((users: User[]) => {
        let curUser: User[] = users.filter( usr => usr.name === user.name)
        if (curUser.length === 0) {
          this.http
          .post(this.usersUrl, JSON.stringify(user), { headers: this.headers})
          .toPromise()
          .then( res => {
            resolve(res.json().data as User);
          })
          .catch(this.handleError)
        } else {
          reject({
            message: 'A user with the same has been found.'
          });
        }
      });
    });
  }
}


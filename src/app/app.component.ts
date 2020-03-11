import { Component } from '@angular/core';
import {StorageService} from './storageservice.service';
import {variable} from '@angular/compiler/src/output/output_ast';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PagerService } from './PagerService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storageService: StorageService) {}
  title = 'Blog';
  titles = '';
  todayDate = new Date();
  date = this.todayDate;
  text = '';
  category = '';
  query = 'sport';
  formdata;
  i = 0;
  // post: ThoughtObj[] = [
  //   {titles: 'sand', category: 'sport', date: new Date(), text: 'askdasosagasgp'},
  //   {titles: 'dams', category: 'gals', date: new Date(), text: 'askdasogdadasgp'},
  //   {titles: 'koas', category: 'waid', date: new Date(), text: 'askdasosfgasgp'}
  // ];
  post: ThoughtObj[] = this.getService('paw');

  ngOnInit() {
    this.formdata = new FormGroup({
      titles: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9]*')
      ])),
      category: new FormControl('')
    });
  }
  onClickSubmit(data) {this.titles = data.titles; data.titles = ''; }

  private getService(key: string) {
    if (JSON.parse(localStorage.getItem(key)) === null) {
      return [];
    }
    return this.storageService.load('paw');
  }

  add() {
    this.post.push({titles: this.titles, category: this.category, text: this.text, date: new Date()});
    // localStorage.setItem('Th', JSON.stringify(this.thoughts));
    // this.thoughts = JSON.parse(localStorage.getItem('Th'));
    this.storageService.save('paw', this.post);
    this.text = '';
  }

  Enter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.add();
    }
  }

  delete(index) {
    this.post.splice(index , 1);
    this.storageService.save('paw', this.post);
  }

  trackByPost(index: number, item: any) {
    return item.id;
  }

}

class ThoughtObj {
  titles = 'title';
  category = 'sport';
  text = 'saaaaaaaaaaaaaaaasssssssssssssa';
  date = new Date();
}

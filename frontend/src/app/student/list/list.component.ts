import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdapterService } from '../adapter.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  p: number = 1;
  collection: any = [];
  students: any = [];
  filterKey: string = 'firstName';
  options: any = [
    {
      _id: 'firstName',
      key: 'First Name',
    },
    {
      _id: 'lastName',
      key: 'Last Name',
    },
    // {
    //   _id: 'class',
    //   key: 'Class',
    // },
    {
      _id: 'subject',
      key: 'Subject',
    },
  ];

  constructor(private _sharedService: AdapterService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._sharedService.get('student').subscribe((res: any) => {
      try {
        this.students = res;
      } catch (err) {
        throw err;
      }
    });
  }

  filter(filterValue: any) {
    this.filterKey = filterValue.target.value;
    console.log(this.filterKey);
  }

  searchData(searchText: any) {
    let url =
      'student?filterName=' + this.filterKey + '&searchText=' + searchText;
    this._sharedService.get(url).subscribe((res: any) => {
      try {
        this.students = res;
      } catch (err) {
        throw err;
      }
    });
  }

  deleteRecord(id: any) {
    if (confirm('Are you sure to delete ?')) {
      console.log(id);
      this._sharedService.delete('student/' + id).subscribe((res: any) => {
        try {
          this.getList();
        } catch (err) {
          throw err;
        }
      });
    }
  }
}

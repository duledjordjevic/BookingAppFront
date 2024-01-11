import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserBlock } from '../model/user-block';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.css']
})
export class BlockUserComponent {

  dataSource!: MatTableDataSource<UserBlock>;
  displayedColumns: string[] = ['select', 'reported user', 'accommodation', 'reporting user', 'startDate', 'endDate', 'reason'];

  reportedUsers: UserBlock[] = [];
  constructor(private userService:UserService){}

  selection = new SelectionModel<UserBlock>(true, []);

  isBtnDisabled: boolean = true;


  ngOnInit(){
    this.getReportedUsers();
  }

  selectionToggle(row: any) {
    if (this.selection.isSelected(row)) {
      this.selection.deselect(row);
      this.updateButtonState(); 
    } else {
      this.selection.clear();
      this.selection.select(row);
      this.updateButtonState(); 
    }
  }

  updateButtonState() {
    this.isBtnDisabled = !(this.selection.selected.length === 1);
  }

  refreshTable():void {
    this.getReportedUsers();
  }

  getReportedUsers(){
    this.userService.getReportedUserData().subscribe({
      next: (result:UserBlock[]) =>{
        this.reportedUsers = result;
        console.log(this.reportedUsers);
        this.dataSource = new MatTableDataSource<UserBlock>(this.reportedUsers);
      }
    })
  }

  blockUser():void {
    this.userService.blockUser(this.selection.selected[0].reportedUser?.id || 0).subscribe({
      next:(_)=>{
        this.refreshTable();
      }
    })
  }
}

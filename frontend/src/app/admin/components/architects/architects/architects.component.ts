import { Component, OnInit } from '@angular/core';
import { ArchitectClass } from '@weflat/app/core/models/ArchitectClass';
import { findIndexById } from '@weflat/app/core/utils/arrayUtils';
import { ArchitectService } from '@weflat/app/shared/services/architecte.service';

@Component({
  selector: 'app-architects',
  templateUrl: './architects.component.html',
  styleUrls: ['./architects.component.scss']
})
export class ArchitectsComponent implements OnInit {

  architects: ArchitectClass[];
  selectedArchitect: ArchitectClass;

  constructor(private architecteService: ArchitectService) { }

  ngOnInit() {
    this.architecteService.getAll().subscribe(res => {
      this.architects = res;
    });
  }

  architectSelected(architect: ArchitectClass) {
    this.selectedArchitect = architect;
  }

  updated(event: ArchitectClass) {
    this.architects.splice(findIndexById(this.architects)(event.id), 1);
    this.architects = this.architects.concat([event]);
  }

}

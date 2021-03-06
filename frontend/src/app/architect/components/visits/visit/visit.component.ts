import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VisitClass } from '@weflat/app/core/models/VisitClass';
import { VisiteCounterService } from '@weflat/app/core/services/visite-counter.service';
import { LoaderService } from '@weflat/app/shared/services/loader.service';
import { VisitService } from '@weflat/app/shared/services/visit.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

  @Input() visit: VisitClass;
  @Input() enableAcceptRefuseButtons = false;
  @Input() enableReportEditButton = false;
  @Input() enableReportViewButton = false;
  @Input() enableHelpButton = false;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  acceptButtonDisabled = false;
  refuseButtonDisabled = false;
  editButtonDisabled = false;

  constructor(
    private visiteService: VisitService,
    private notificationService: NotificationsService,
    private visiteCounterService: VisiteCounterService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  accept() {
    this.acceptButtonDisabled = true;
    this.loaderService.show();
    this.visiteService.acceptVisit(this.visit.id).subscribe(res => {
      this.notificationService.success(
        'Succès',
        `Vous avez accepté de visiter le bien de ${this.visit.customer.firstName} ${this.visit.customer.lastName}`
      );
      this.acceptButtonDisabled = false;
      this.loaderService.hide();
      this.visitesUpdated();
    }, err => {
      this.notificationService.error('Erreur', 'Une erreur a eu lieu');
      this.acceptButtonDisabled = false;
      this.loaderService.hide();
      this.visitesUpdated();
    });
  }

  refuse() {
    this.refuseButtonDisabled = false;
    this.loaderService.show();
    this.visiteService.refuseVisit(this.visit.id).subscribe(res => {
      this.notificationService.success(
        'Succès',
        `Vous avez refusé de visiter le bien de ${this.visit.customer.firstName} ${this.visit.customer.lastName}`
      );
      this.refuseButtonDisabled = true;
      this.loaderService.hide();
      this.visitesUpdated();
    }, err => {
      this.notificationService.error('Erreur', 'Une erreur a eu lieu');
      this.refuseButtonDisabled = true;
      this.loaderService.hide();
      this.visitesUpdated();
    });
  }

  visitesUpdated() {
    this.updated.emit();
    this.visiteCounterService.announceCount();
  }

  editReport() {
    this.router.navigate([`/architecte/visits/${this.visit.id}/report/edit`]);
  }

  viewReport() {
    this.router.navigate([`/architecte/visits/${this.visit.id}/report`]);
  }
}

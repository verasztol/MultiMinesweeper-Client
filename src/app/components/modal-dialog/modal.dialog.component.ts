import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'modal-dialog',
  templateUrl: './modal.dialog.component.html',
  styleUrls: ['./modal.dialog.component.css']
})
export class ModalDialogComponent implements AfterViewInit {

  @ViewChild('modal')
  modal: ModalComponent;

  ngAfterViewInit(): void {
    this.modal.open();
  }

  close(): void {
    this.modal.close();
  }
}

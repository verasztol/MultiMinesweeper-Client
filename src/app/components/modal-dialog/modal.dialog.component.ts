import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public title: string;
  public text: string;
  public cancel: Function;
  public ok: Function;
  public cancelBtnText: string;
  public okBtnText: string;
}

@Component({
  selector: "custom-modal",
  templateUrl: './modal.dialog.component.html',
  styleUrls: ['./modal.dialog.component.css']
})
export class CustomModalComponent implements CloseGuard, ModalComponent<CustomModalContext> {
  context: CustomModalContext;
  cancelBtnText: string;
  okBtnText: string;

  constructor(public dialog: DialogRef<CustomModalContext>) {
    this.context = dialog.context;
    this.cancelBtnText = dialog.context.cancelBtnText || "Cancel";
    this.okBtnText = dialog.context.okBtnText || "Ok";
    dialog.setCloseGuard(this);
  }

  onCancel(): void {
    this.context.cancel();
    this.dialog.dismiss();
  }

  onOk(): void {
    this.context.ok();
    this.dialog.close();
  }
}

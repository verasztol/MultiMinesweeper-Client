import {Modal} from "./modal.dialog.module";
import {Component} from "@angular/core";
@Component({
  selector: "my-custom-modal",
  templateUrl: './modal.dialog.component.html',
  styleUrls: ['./modal.dialog.component.css']
})
@Modal()
export class CustomModalComponent {
  ok: Function;
  close: Function;
  destroy: Function;
  closeModal: Function;
  title: string = "";
  text: string = "";

  onCancel(): void{
    this.closeModal();
    this.destroy();
    this.close();
  }

  onOk(): void{
    this.closeModal();
    this.destroy();
    this.ok();
  }
}

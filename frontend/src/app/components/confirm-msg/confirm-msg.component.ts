import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'confirm-msg',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirm-msg.component.html',
  styleUrl: './confirm-msg.component.scss',
})
export class ConfirmMsgComponent {
  confirmMsgData: { title: string; message: string } = inject(MAT_DIALOG_DATA);
}

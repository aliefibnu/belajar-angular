import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.html',
})
export class CustomButton {
  text = input<string>('Button');
  type = input<BtnType>('success');
  onClick = output();

  onClickEmit() {
    this.onClick.emit();
  }

  buttonClass = computed(() => {
    switch (this.type()) {
      case 'warning':
        return 'bg-amber-200';
      case 'failure':
        return 'bg-red-200';
      case 'success':
        return 'bg-blue-200';
      case 'info':
        return 'bg-green-200';
      default:
        return 'bg-cyan-200';
    }
  });
}

type BtnType = 'success' | 'warning' | 'failure' | 'info';

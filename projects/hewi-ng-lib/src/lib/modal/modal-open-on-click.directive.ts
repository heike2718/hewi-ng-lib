import { Directive, TemplateRef, ViewContainerRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

@Directive({
  selector: '[hewiModalOpenOnClick]'
})
export class ModalOpenOnClickDirective implements OnInit, OnDestroy {

  private elements: HTMLBaseElement[];

  private clickHandler = (() => {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }).bind(this);
  // ^^ bind(this), damit this innerhalb des clickHandlers sich auf die Direktive bezieht.


  // templateRef is a handle to the template i.e <ng-template></ng-template>
  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.close$.subscribe(
      () => this.viewContainer.clear()
    );
  }

  ngOnDestroy() {
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
  }

  /*
   * Syntax: typescript-Setter mit gleichem Namen wie der selector
   * sorgt dafür, dass in der syntax [hewiModalOpenOnClick]="[domElementRef1,domElementRef2]"
   * die referenz auf ein DOM-element-Array in die Direktive gepflanscht wird.
   */
  @Input()
  set hewiModalOpenOnClick(els: any) {

    // ein oder mehrere elemente durchreichen
    if (els.length) {
      this.elements = els;
    } else {
      this.elements = [els];
    }

    // nicht this.clickHandlet()!!! da der handler sonst sofort ausgeführt wird und die reference anschließend undefined ist.
    this.elements.forEach(el => el.addEventListener('click', this.clickHandler));
  }

}

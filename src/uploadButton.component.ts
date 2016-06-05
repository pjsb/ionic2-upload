import {Component, ElementRef, Input, OnInit, ViewChild, Renderer} from "@angular/core";
import {IONIC_DIRECTIVES} from 'ionic-angular';
/**
 * Upload button component.
 *
 * As native input elements with type file are diffcult to style, it is common practice to hide them
 * and trigger the needed events manually as it done here. A button is is used for user interaction,
 * next to the hidden input.
 *
 *  <code>
 *    @Component({
 *      directives: [UploadButton],
 *    })
 *    class UploadComponent {
 *    	private addCallback: Function = (files: FileList) => {...};
 *    	private icon: String = "add-circle";
 *    }
 *
 *  	<upload-button
 *  		[btnCallback]="addCallback"     <!-- the callback function executes after adding files -->
 *  		[btnStyle]="icon"               <!-- the ionic-icon name to use for button -->
 *  		[logCallback]="console.debug">  <!-- (optional) if needed a logger can be set -->
 *  		[allowMultiple]="false">        <!-- (optional) disable multiple file upload -->
 *  	</upload-button>
 *  </code>
 */
 @Component({
   directives: [IONIC_DIRECTIVES],
   selector: "upload-button",
   template: `<button (click)="callback($event)" clear class="ion-uploadButton">
                <ion-icon name="{{btnStyle}}"></ion-icon>
              </button>
              <input type="file" (change)="filesAdded($event)" style="display: none" {{multiple}} #input />`
 })
export class UploadButtonComponent implements OnInit {

  /**
   * Native upload button (hidden)
   */
  @ViewChild("input")
  private nativeInputBtn: ElementRef;

  /**
   * The callback executed when button pressed, set by parent
   */
  @Input()
  private btnStyle: String;

  /**
   * The callback executed when files are selected, set by parent
   */
  @Input()
  private btnCallback: Function;

  /**
   * (Optional) Can be used to disable adding multiple files
   */
  @Input()
  private allowMultiple: boolean = true;

  /**
   * String used for control multiple uploads
   */
  private multiple: string = "multiple";

  /**
   * (Optional) if needed a logger can be used
   */
  @Input()
  private logCallback: Function;

  /**
   * Constructor
   *
   * @param  {Renderer} renderer for invoking native methods
   * @param  {Log}      logger instance
   */
  constructor(private renderer: Renderer) {
    if (this.allowMultiple === false) {
      this.multiple = "";
    }
  }

  ngOnInit(): void {
    console.log("######################i nininiini");
  }

  /**
   * Callback executed when the visible button is pressed
   *
   * @param {Event} event should be a mouse click event
   */
  public callback(event: Event): void {
    this.log("UploadButton: Callback executed triggerig click event", this.nativeInputBtn.nativeElement);

    // trigger click event of hidden input
    let clickEvent: MouseEvent = new MouseEvent("click", {bubbles: true});
    this.renderer.invokeElementMethod(
        this.nativeInputBtn.nativeElement, "dispatchEvent", [clickEvent]);
  }

  /**
   * Callback which is executed after files from native popup are selected.
   *
   * @param {Event} event change event containing selected files
   */
  public filesAdded(event: Event): void {
    let files: FileList = this.nativeInputBtn.nativeElement.files;
    this.log("UploadButton: Added files", files);
    this.btnCallback(files);
  }

  /**
   * (Optional) If needed for debugging
   *
   * @param {any[]} ...args console.log like paramter <code>log("Error", obj, 1)</code>
   */
  private log(...args: any[]): void {
    if (this.logCallback) {
      this.logCallback(args);
    }
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ionic_angular_1 = require('ionic-angular');
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
var UploadButtonComponent = (function () {
    /**
     * Constructor
     *
     * @param  {Renderer} renderer for invoking native methods
     * @param  {Log}      logger instance
     */
    function UploadButtonComponent(renderer) {
        this.renderer = renderer;
        /**
         * (Optional) Can be used to disable adding multiple files
         */
        this.allowMultiple = true;
        /**
         * String used for control multiple uploads
         */
        this.multiple = "multiple";
        if (this.allowMultiple === false) {
            this.multiple = "";
        }
    }
    UploadButtonComponent.prototype.ngOnInit = function () {
        console.log("######################i nininiini");
    };
    /**
     * Callback executed when the visible button is pressed
     *
     * @param {Event} event should be a mouse click event
     */
    UploadButtonComponent.prototype.callback = function (event) {
        this.log("UploadButton: Callback executed triggerig click event", this.nativeInputBtn.nativeElement);
        // trigger click event of hidden input
        var clickEvent = new MouseEvent("click", { bubbles: true });
        this.renderer.invokeElementMethod(this.nativeInputBtn.nativeElement, "dispatchEvent", [clickEvent]);
    };
    /**
     * Callback which is executed after files from native popup are selected.
     *
     * @param {Event} event change event containing selected files
     */
    UploadButtonComponent.prototype.filesAdded = function (event) {
        var files = this.nativeInputBtn.nativeElement.files;
        this.log("UploadButton: Added files", files);
        this.btnCallback(files);
    };
    /**
     * (Optional) If needed for debugging
     *
     * @param {any[]} ...args console.log like paramter <code>log("Error", obj, 1)</code>
     */
    UploadButtonComponent.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (this.logCallback) {
            this.logCallback(args);
        }
    };
    __decorate([
        core_1.ViewChild("input"), 
        __metadata('design:type', core_1.ElementRef)
    ], UploadButtonComponent.prototype, "nativeInputBtn", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UploadButtonComponent.prototype, "btnStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], UploadButtonComponent.prototype, "btnCallback", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UploadButtonComponent.prototype, "allowMultiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], UploadButtonComponent.prototype, "logCallback", void 0);
    UploadButtonComponent = __decorate([
        core_1.Component({
            directives: [ionic_angular_1.IONIC_DIRECTIVES],
            selector: "upload-button",
            template: "<button (click)=\"callback($event)\" clear class=\"ion-uploadButton\">\n                <ion-icon name=\"{{btnStyle}}\"></ion-icon>\n              </button>\n              <input type=\"file\" (change)=\"filesAdded($event)\" style=\"display: none\" {{multiple}} #input />"
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], UploadButtonComponent);
    return UploadButtonComponent;
}());
exports.UploadButtonComponent = UploadButtonComponent;
//# sourceMappingURL=uploadButton.component.js.map
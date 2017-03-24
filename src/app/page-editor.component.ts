import { Component, OnInit } from '@angular/core';

import { PainterService } from './painter.service';
import { DesignProperty, DesignProperties } from './interfaces';
import { ArtboardClass } from './artboard.class';

@Component({
    selector: 'page-editor',
    templateUrl: '/app/page-editor.component.html',
    styleUrls: ['/app/page-editor.component.css'],
    providers: [PainterService],
    host: {
        '(window:resize)': 'onWindowResize($event)'
    }

})
export class PageEditorComponent {
    designProperties: DesignProperties = {
        text1 : {
            label: "Text 1 Sample",
            type: 'text',
            value : 'Indonesia'
        } ,
        text2: {
            label: "Text 2 Sample",
            type: 'text',
            value : 'Australia'
        } ,
        size1: {
            label: "Text Size",
            type: 'range',
            value : '90',
            min: 50,
            max: 95
        }
    };

    designPropertiesArray: DesignProperty[] = [];

    artboard: ArtboardClass;

    constructor ( private painterService: PainterService ) {
        this.designPropertiesArray = this.painterService.designPropertiesObjectToArray(this.designProperties);

        this.artboard = new ArtboardClass();

        this.artboard
            .setTemplate(
                `
                    <style>
                        div[artboard] {
                            border: solid 1px black,
                        }

                        div[artboardElement] {
                            font-size: {{size1}}px
                        }
                    </style>
                    <div artboard>
                        <div artboardElement>{{text1}}</div>
                        <div artboardElement>{{text2}}</div>
                    </div>
                `
            )
            .init()
            .drawAll(this.designProperties);
    }

    onInputChange(arg: any) {
        // Get designPropertyBinder from the text input for designProperties and its value
        let key = arg.target.getAttribute('designPropertyBinder');
        let value = arg.target.value;

        this.designProperties[key].value = value.toString();
        
        this.artboard.drawAll(this.designProperties);
    }

    onWindowResize(arg: any) {
        console.log(arg)
    }
}
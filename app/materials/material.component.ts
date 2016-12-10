import {Component, OnInit} from '@angular/core';
import {ShareDataService} from './sharedata.service';

@Component({
    template: `
      <router-outlet></router-outlet>
    `,
    providers: [ShareDataService]
})

export class MaterialComponent {
    title = "Material";
}


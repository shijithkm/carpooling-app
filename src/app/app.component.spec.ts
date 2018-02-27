import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

import { CarpoolService } from './carpool.service';
import { UserService } from './user.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        RouterTestingModule,
        MatToolbarModule, 
        MatCardModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule
      ],
      declarations: [
        AppComponent,
        TemplateComponent,
        HeaderComponent,
        FooterComponent
      ],
      providers:[
        CarpoolService,
        UserService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

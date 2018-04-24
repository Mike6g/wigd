import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { Ng2AutoCompleteModule }    from 'ng2-auto-complete';
import { DndModule } from 'ng2-dnd';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { RankingComponent } from './ranking/ranking.component';

import { UserService } from './service/user.service';
import { PersonService } from './service/person.service';
import { UserComponent } from './user/user.component';
import { DeadsComponent } from './deads/deads.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    RankingComponent,
    UserComponent,
    DeadsComponent,
    AboutComponent,
    DashboardComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    Ng2AutoCompleteModule,
    DndModule.forRoot(),
    ToastModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user/:id', component: UserComponent },
      { path: 'rules',     component: RulesComponent },
      { path: 'about',     component: AboutComponent }
    ])
  ],
  exports: [RouterModule],
  providers: [
    UserService,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

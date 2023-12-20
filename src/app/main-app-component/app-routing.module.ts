import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { ContactsComponent } from '../pages/contacts/contacts.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { RegisterComponent } from '../pages/register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent },
  {path: 'contacts/:id', component: ContactsComponent},
  {path: 'chat/:userId/:contactId', component: ChatComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

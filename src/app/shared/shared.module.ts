import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { PrimeUiModule } from './primeUi/prime-ui.module';
// import { NullPipe } from './pipes/nullpipe/null.pipe';
// import { TruefalsePipe } from './pipes/trueFalse/truefalse.pipe';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
//   declarations: [NullPipe, TruefalsePipe],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      // disableTimeOut:true,
      resetTimeoutOnDuplicate: true,
      preventDuplicates: true,
      positionClass: 'toast-top-right',
      closeButton: false,
    }),
    HttpClientModule,
  ],
  exports: [PrimeUiModule, ComponentsModule],
})
export class SharedModule {}

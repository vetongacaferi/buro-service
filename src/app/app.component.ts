import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BuroService';
  selectedLanguage: string  = '';

  languageList: any[] = [
    {
      code: 'en', label:'English',
    },
    {
      code: 'de', label: "Deutsch"
    },
    {
      code: 'sq', label: "Shqip"
    }
  ];

  constructor(public translateService: TranslateService) {
    const defaultLang = this.translateService.defaultLang;
    
    console.log('defaultLang:', defaultLang)
    if(defaultLang)
    {
      this.selectedLanguage = this.languageList.find(x => x.code === defaultLang)?.code;
    }
  }



  public onLanguageChange(event: string): void{
    this.selectedLanguage = event;
    if(this.selectedLanguage){
      this.translateService.use(this.selectedLanguage);
    }
  }

}

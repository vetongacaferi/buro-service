import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'BuroService';
  selectedLanguage: string  = '';
  
  myModal: any = null;

  modalContent: string = '';


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

  contentCategories: any[] = [
    {
      id: 'rrogatId',
      name: 'Rrogat',
      icon: 'icon',
      content: "Gjithqka rreth rrogav blah blah"
    },
    {
      id: 'tatimetId',
      name: 'Tatimet',
      icon: 'icon',
      content: "Gjithqka rreth tatimev blah blah"
    },
    {
      id: 'menaxhimiOrganizativId',
      name: 'Menaxhimi Organizativ',
      icon: 'icon',
      content: "Menaxhimi Organizativ blah blah"
    },
    {
      id: 'ndihmePerVizaId',
      name: 'Ndihme per Viza',
      icon: 'icon',
      content: "Ndihme per Viza blah blah"
    },
    {
      id: 'organizimTeFemijveId',
      name: 'Ndihme per organizim te femijve',
      icon: 'icon',
      content: "Ndihme per organizim te femijve"
    }
  ]

  constructor(public translateService: TranslateService) {
    const defaultLang = this.translateService.defaultLang;
    
    console.log('defaultLang:', defaultLang)
    if(defaultLang)
    {
      this.selectedLanguage = this.languageList.find(x => x.code === defaultLang)?.code;
    }
  }
  ngOnInit(): void {
    this.myModal = new (window as any).bootstrap.Modal('#exampleModal', {
      keyboard: false
    });
  }



  public onLanguageChange(event: string): void{
    this.selectedLanguage = event;
    if(this.selectedLanguage){
      this.translateService.use(this.selectedLanguage);
    }
  }

  public openModal(id: string): void{
    const content = this.contentCategories.find(x => x.id === id)?.content;
    this.modalContent = content;
    this.myModal.show();

    //a.toglle();
    //a.show();
    //a.hide();
    //a.dispose();
  }

}

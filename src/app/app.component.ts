import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faFileInvoice, faWallet, faListCheck, faPassport, faChildren } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
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
      icon: faWallet,
      content: "Gjithqka rreth rrogav blah blah"
    },
    {
      id: 'tatimetId',
      name: 'Tatimet',
      icon: faFileInvoice,
      content: "Gjithqka rreth tatimev blah blah"
    },
    {
      id: 'menaxhimiOrganizativId',
      name: 'Menaxhimi Organizativ',
      icon: faListCheck,
      content: "Menaxhimi Organizativ blah blah"
    },
    {
      id: 'ndihmePerVizaId',
      name: 'Ndihme per Viza',
      icon: faPassport,
      content: "Ndihme per Viza blah blah"
    },
    {
      id: 'organizimTeFemijveId',
      name: 'Ndihme per organizim te femijve',
      icon: faChildren,
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
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit:')
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');

    window.onscroll = () => {
      sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                links.parentElement?.classList.remove('nav-item-active');
                
                var findNav = document.querySelector('header nav a[href*=' + id + ']');
                if(findNav){
                  findNav.classList.add('active');
                  console.log(' findNav.parentElement?:',  findNav.parentElement);
                  findNav.parentElement?.classList.add('nav-item-active')
                }
            });
        };
    });
  };
  }
  ngOnInit(): void {
    this.myModal = new (window as any).bootstrap.Modal('#exampleModal', {
      keyboard: false
    });

    // this.ngAfterViewInit();
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

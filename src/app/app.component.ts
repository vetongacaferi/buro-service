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

  // modal data
  modalTitle: string = '';
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
      titleKey: "content.invoiceTitle",
      contentKey: "content.invoiceContent"
    },
    {
      id: 'tatimetId',
      name: 'Tatimet',
      icon: faFileInvoice,
      titleKey: "content.taxesTitle",
      contentKey: "content.taxesContent"
    },
    {
      id: 'menaxhimiOrganizativId',
      name: 'Menaxhimi Organizativ',
      icon: faListCheck,
      titleKey: "content.digitalAccountingTitle",
      contentKey: "content.digitalAccountingContent"
    },
    {
      id: 'ndihmePerVizaId',
      name: 'Ndihme per Viza',
      icon: faPassport,
      titleKey: "content.appointmentTitle",
      contentKey: "content.appointmentContent"
    },
    {
      id: 'taxId',
      name: 'Pergatitje per taxa',
      icon: faPassport, // TODO:
      titleKey: "content.taxTitle",
      contentKey: "content.taxContent"
    },
    {
      id: 'salaryId',
      name: 'Salary',
      icon: faPassport, // TODO:
      titleKey: "content.salaryTitle",
      contentKey: "content.salaryContent"
    },
    {
      id: 'organisationId',
      name: 'Organisation',
      icon: faPassport, // TODO:
      titleKey: "content.organisationTitle",
      contentKey: "content.organisationContent"
    },
    {
      id: 'imigrationId',
      name: 'Imigration',
      icon: faPassport, // TODO:
      titleKey: "content.immigrationTitle",
      contentKey: "content.immigrationContent"
    },
    {
      id: 'kidsId',
      name: 'Kids',
      icon: faPassport, // TODO:
      titleKey: "content.kidsTitle",
      contentKey: "content.kidsContent"
    },
    {
      id: 'logoId',
      name: 'Logo',
      icon: faPassport, // TODO:
      titleKey: "content.logoTitle",
      contentKey: "content.logoContent"
    },
    {
      id: 'startupId',
      name: 'Startup',
      icon: faPassport, // TODO:
      titleKey: "content.startupTitle",
      contentKey: "content.startupContent"
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
    const selectedKategory = this.contentCategories.find(x => x.id === id);
    this.modalTitle = selectedKategory.titleKey;
    this.modalContent = selectedKategory.contentKey;
    this.myModal.show();
  }
}

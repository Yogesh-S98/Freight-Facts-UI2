import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { RateSearchService } from 'src/app/modules/ratelookup/services/rate-search.service';
import { Links } from './side-nav.config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
// import { UserProfileInfoService } from '../../services/user-profile-info.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  organizationRoleName: string;
  urls = Links;
  sideBarVisible = true;
  toggleStatus = false;
  showInLargeScreen = false;
  screenWidth: number;
  detectScreenWidthStatus = false;
  checkMaxresponsive = 1;
  checkMinresponsive = 1;
  sideItemClickStatus: boolean;
  activateProfile: boolean = false;
  profileForm: FormGroup;
  userProfile: any = {
    imageUrl: '',
    name: '',
    label: '',
  };

  constructor(
    private router: Router,
    private service: AuthService,
    // private userService :UserProfileInfoService,
    // private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.detectScreenSize();
    };
    this.profileForm = this.fb.group({
      imageUrl: [''],
      name: [''],
    });
  }

  ngOnInit(): void {
    this.detectScreenSize();
    this.checkProfileIsActive();
    // this.getUserProfile();

    // alert("Hi");
    const {
      AppRole: appRoleName,
      orgnizations: {
        OrgRole: organizationRoleName,
        OrgType: organizationTypeName,
      },
    } = JSON.parse(localStorage.getItem('Roles'));
    this.organizationRoleName = organizationRoleName;
    // switch (appRoleName) {
    //   case 'Admin':
    //     this.urls = AdminRoutingUrls;
    //     return;
    //   case 'Member':
    //     this.urls = MemberRoutingUrls;
    //     return;

    //   case 'User':
    //     if (
    //       organizationRoleName === 'Owner' ||
    //       organizationRoleName === 'Pricing Admin' ||
    //       organizationRoleName === 'Member'
    //     ) {
    //       switch (organizationTypeName) {
    //         case 'Brokerage':
    //           this.urls = BrokerRoutingUrls;
    //           return;
    //         case 'Carrier':
    //           this.ShowContracts(CarrierRoutingUrls, organizationRoleName);
    //           return;
    //         case 'Shipper':
    //           this.ShowContracts(ShipperRoutingUrls, organizationRoleName);
    //           return;
    //       }
    //       return;
    //     } else {
    //       this.urls = UserRoutingUrls;
    //     }
    //     return;

    //   default:
    //     this.router.navigate(['/auth/signIn']);
    //     this.urls = [];
    //     localStorage.clear();
    //     return;
    // }
  }

  // getUserProfile() {    
  //   this.authService.getUserProfile().subscribe((user: any) => {      
  //     this.userProfile.name =
  //       user?.data?.firstName  + ' ' + user?.data?.lastName ;
  //     this.userProfile.label =
  //       user?.data?.firstName?.charAt(0).toUpperCase() 
  //     this.userProfile.imageUrl = user?.data?.profilePicture
      
  //   });
  // }

  checkProfileIsActive() {
    let url = this.router.url.split('/')[2];
    url === 'settings'
      ? (this.activateProfile = true)
      : (this.activateProfile = false);
  }

  ShowContracts(data, role) {
    if (role === 'Member') {
      this.urls = data.filter(
        (item) => item.value !== 'Lanes' && item.value !== 'Contract Lanes'
      );
    } else {
      this.urls = data;
    }
  }

  detectScreenSize() {
    // the below code for this function hitted every pixel change in screen multiple times calling the toggleSideBar()
    // only one time called if continusley true and also if continously false and if came true after false or false after true it will call toggleSideBar()
    if (window.innerWidth >= 1024) {
      this.checkMaxresponsive += 1;
      this.checkMinresponsive = 1;
    } else {
      this.checkMinresponsive += 1;
      this.checkMaxresponsive = 1;
    }
    // alert("Hi");

    if (window.innerWidth >= 1024 && this.checkMaxresponsive == 2) {
      if (this.sideItemClickStatus || this.sideItemClickStatus == undefined) {
        this.toggleSideBar(true);
      } else {
        this.detectScreenWidthStatus = true;
        this.toggleSideBar(false);
      }
    } else if (window.innerWidth <= 1023 && this.checkMinresponsive == 2) {
      this.detectScreenWidthStatus = false;
      this.toggleSideBar(false);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/signIn');
  }

  minimizeSidenav() {
    this.sideItemClickStatus = true;
    if (window.innerWidth < 1024 && this.showInLargeScreen) {
      this.showInLargeScreen = false;
      this.toggleSideBar(true);
    }
  }

  applyCSSVariableData(data) {
    this.service.setPropertyValuesToCSSVariables(
      '--sidebar-width',
      data.sidBarWidth
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-dashboard-sidebar-width',
      data.rateDashBoardSideNavWidth
    );
    this.service.setPropertyValuesToCSSVariables(
      '--sidebar-z-index',
      data.zIndex
    );
    this.service.setPropertyValuesToCSSVariables(
      '--sidebar-list-width',
      data.sidebarListWidth
    );
    this.service.setPropertyValuesToCSSVariables(
      '--tabview-accessorial-display-status',
      data.tabviewScrollIconStatus
    );
    this.service.setPropertyValuesToCSSVariables(
      '--maincontainer-pointer-event-status',
      data.pointerEventStatus
    );
    this.service.setPropertyValuesToCSSVariables(
      '--blurMainContent',
      data.makeBlurStatus
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-button',
      data.ratelookupButtonsWidth
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-baserate-container-width',
      data.baseRateContainerWidth
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-rate-providers-container-width',
      data.rateProvidersWidth
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-targetPay-tooltip',
      data.targetpayTooltip
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-targetPay-tooltip-pointer',
      data.targetpayTooltipPointer
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-avgpay-tooltip',
      data.avgpayTooltip
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-avgpay-tooltip-pointer',
      data.avgpayTooltipPointer
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-avgpay-tooltip-after-1200px',
      data.avgpayTooltiplg2
    );
    this.service.setPropertyValuesToCSSVariables(
      '--rate-lookup-avgpay-tooltip-pointer-after-1200px',
      data.avgpayTooltipPointerlg2
    );
  }

  //check screen  and toggle side bar
  sideNav = {
    largeScreen: {
      OPEN: () => {
        if (
          this.sideItemClickStatus ||
          this.sideItemClickStatus === undefined
        ) {
          this.showInLargeScreen = true;
          this.sideItemClickStatus = false;
        } else {
          setTimeout(() => {
            this.showInLargeScreen = true;
          }, 350);
        }

        const cssVariblesInfo1 = {
          sidBarWidth: '250px',
          rateDashBoardSideNavWidth: '250px',
          zIndex: '0',
          sidebarListWidth: '230px',
          tabviewScrollIconStatus: 'initial',
          pointerEventStatus: 'auto',
          makeBlurStatus: 'none',
          ratelookupButtonsWidth: '95%',
          baseRateContainerWidth: '95%',
          rateProvidersWidth: '60%',
          targetpayTooltip: '8px',
          targetpayTooltipPointer: '45px',
          avgpayTooltip: '-31px',
          avgpayTooltipPointer: '114px',
          avgpayTooltiplg2: '-31px',
          avgpayTooltipPointerlg2: '114px',
        };
        this.applyCSSVariableData(cssVariblesInfo1);
      },
      CLOSE: () => {
        const cssVariblesInfo = {
          sidBarWidth: '80px',
          rateDashBoardSideNavWidth: '80px',
          zIndex: '0',
          sidebarListWidth: '40px',
          tabviewScrollIconStatus: 'none',
          pointerEventStatus: 'auto',
          makeBlurStatus: 'none',
          ratelookupButtonsWidth: 'fit-content',
          baseRateContainerWidth: '65%',
          rateProvidersWidth: '35%',
          targetpayTooltip: '-5px',
          targetpayTooltipPointer: '58px',
          avgpayTooltip: '-66px',
          avgpayTooltipPointer: '148px',
          avgpayTooltiplg2: '-31px',
          avgpayTooltipPointerlg2: '114px',
        };
        this.applyCSSVariableData(cssVariblesInfo);
        this.showInLargeScreen = false;
      },
    },
    smallScreen: {
      OPEN: () => {
        setTimeout(() => {
          this.showInLargeScreen = true;
        }, 350);

        const cssVariblesInfo2 = {
          sidBarWidth: '80px',
          rateDashBoardSideNavWidth: '300px',
          zIndex: '9999',
          sidebarListWidth: '270px',
          tabviewScrollIconStatus: 'none',
          pointerEventStatus: 'none',
          makeBlurStatus: 'blur(1px)',
          ratelookupButtonsWidth: '100%',
          baseRateContainerWidth: '65%',
          rateProvidersWidth: '35%',
          targetpayTooltip: '-106px',
          targetpayTooltipPointer: '220px',
        };
        this.applyCSSVariableData(cssVariblesInfo2);
      },
      CLOSE: () => {
        this.showInLargeScreen = false;
        const cssVariblesInfo3 = {
          sidBarWidth: '80px',
          rateDashBoardSideNavWidth: '80px',
          zIndex: '0',
          sidebarListWidth: '40px',
          tabviewScrollIconStatus: 'initial',
          pointerEventStatus: 'auto',
          makeBlurStatus: 'none',
          ratelookupButtonsWidth: '100%',
          baseRateContainerWidth: '65%',
          rateProvidersWidth: '35%',
          targetpayTooltip: '-106px',
          targetpayTooltipPointer: '220px',
        };
        this.applyCSSVariableData(cssVariblesInfo3);
      },
    },
  };

  toggleSideBar(clickStatus) {
    this.toggleStatus = clickStatus
      ? !this.toggleStatus
      : this.detectScreenWidthStatus;
    this.screenWidth = window.innerWidth;
    const screen = window.innerWidth >= 1024 ? 'largeScreen' : 'smallScreen';
    const toggle = this.toggleStatus ? 'OPEN' : 'CLOSE';
    this.sideNav[screen][toggle]();
  }

  openProfile() {
    this.router.navigate(['RE/settings']);
  }
  activateProfilestatus(status) {
    this.activateProfile = status;
  }

  changeprofilealignments() {
    this.showInLargeScreen
      ? this.service.setPropertyValuesToCSSVariables(
          '--profile-box-margin-left',
          '11%'
        )
      : this.service.setPropertyValuesToCSSVariables(
          '--profile-box-margin-left',
          '4%'
        );
  }
}

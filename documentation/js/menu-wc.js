'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">lost-and-found-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' :
                                            'id="xs-controllers-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' :
                                        'id="xs-injectables-links-module-AdminModule-33bccb68b4b00e8ad67e450db6ce42313bfce9c85cc7e7fcf3e5df12d612e0c469c117e30e24f20947e8ccf10e8cf4495796c60ac7e123b666e55c28610c8c0a"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AnalyticsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnalyticsProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' :
                                            'id="xs-controllers-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' :
                                        'id="xs-injectables-links-module-AppModule-9f3cca2bd871e9136a8a562ac3158f473b6586ffdb38ab51e62f32588cf30012c14a69a1f7538a72ed46dd702473537e2315191d2575e10511870c4a947cea11"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' :
                                            'id="xs-controllers-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GoogleAuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' :
                                        'id="xs-injectables-links-module-AuthModule-07db73a72707a56a80e10d7e9d91352241b9e5ac882fbb8963b57afa307af20e0e0c2fa80199e8d2f664028ada570419815aaa56c6c3fc89d001453b0aaaeb7a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClaimsModule.html" data-type="entity-link" >ClaimsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' : 'data-bs-target="#xs-controllers-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' :
                                            'id="xs-controllers-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' }>
                                            <li class="link">
                                                <a href="controllers/ClaimsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClaimsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' : 'data-bs-target="#xs-injectables-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' :
                                        'id="xs-injectables-links-module-ClaimsModule-d30cec496c177fd53569d37bef115d474381194a620d32949247fa5305a51d1ed538f4f767c708b84a56b8aa80bdc4693ba0e05041c96e8be8af25a289321b42"' }>
                                        <li class="link">
                                            <a href="injectables/ClaimsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClaimsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemsModule.html" data-type="entity-link" >ItemsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' : 'data-bs-target="#xs-controllers-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' :
                                            'id="xs-controllers-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' }>
                                            <li class="link">
                                                <a href="controllers/ItemsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' : 'data-bs-target="#xs-injectables-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' :
                                        'id="xs-injectables-links-module-ItemsModule-57e099cb0fd61df7d68bff1e258c0728d5e6e0e93461a6852393e9f2efae36b173775864d7f71739779c07bcb39a0412c53bcbc3c0ec48e733649d3df5073bc3"' }>
                                        <li class="link">
                                            <a href="injectables/ItemsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' : 'data-bs-target="#xs-controllers-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' :
                                            'id="xs-controllers-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' : 'data-bs-target="#xs-injectables-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' :
                                        'id="xs-injectables-links-module-MailModule-d65c04137139f208ad63383addf2dc4c3ed3f90293c8211ba40116be96689928e2976d9fbb60cc7ce70beef6358e6b6a5640561eb042e437cb800fced82c5128"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailjetProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailjetProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-ff07c19630c13221a7241ed730569aca17c30ef2fd263ee8e39a1a27f4cf88767905e109d2a6d749f51e902cc8c2df4fb4daadf2b8fa7376141ca7b7d1930cdc"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-ff07c19630c13221a7241ed730569aca17c30ef2fd263ee8e39a1a27f4cf88767905e109d2a6d749f51e902cc8c2df4fb4daadf2b8fa7376141ca7b7d1930cdc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-ff07c19630c13221a7241ed730569aca17c30ef2fd263ee8e39a1a27f4cf88767905e109d2a6d749f51e902cc8c2df4fb4daadf2b8fa7376141ca7b7d1930cdc"' :
                                        'id="xs-injectables-links-module-PaginationModule-ff07c19630c13221a7241ed730569aca17c30ef2fd263ee8e39a1a27f4cf88767905e109d2a6d749f51e902cc8c2df4fb4daadf2b8fa7376141ca7b7d1930cdc"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadsModule.html" data-type="entity-link" >UploadsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' : 'data-bs-target="#xs-controllers-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' :
                                            'id="xs-controllers-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' }>
                                            <li class="link">
                                                <a href="controllers/UploadsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' : 'data-bs-target="#xs-injectables-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' :
                                        'id="xs-injectables-links-module-UploadsModule-c97fd8bcaac6276c44016eb60fc0042854a2e72243d5ac5763c6843662406cbe32db5685bf9c97865ec752697f57461a23986313e92934a2b20edb1caf1e1aab"' }>
                                        <li class="link">
                                            <a href="injectables/UploadToAwsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadToAwsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' :
                                            'id="xs-controllers-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' :
                                        'id="xs-injectables-links-module-UsersModule-0f3ac2908398008f655c6eb99a721e1ac0dac2d14294fc6a36b0cdff12d621041ce064572e31c62d5c5fdab7909d80ef8a6633b3ba66355ef45f4993a1851c59"' }>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Claim.html" data-type="entity-link" >Claim</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Item.html" data-type="entity-link" >Item</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Upload.html" data-type="entity-link" >Upload</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateClaimDto.html" data-type="entity-link" >CreateClaimDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateItemDto.html" data-type="entity-link" >CreateItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetClaimsBaseDto.html" data-type="entity-link" >GetClaimsBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetClaimsParamDto.html" data-type="entity-link" >GetClaimsParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetClaimsQueryDto.html" data-type="entity-link" >GetClaimsQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetItemsBaseDto.html" data-type="entity-link" >GetItemsBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetItemsParamDto.html" data-type="entity-link" >GetItemsParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetItemsQueryDto.html" data-type="entity-link" >GetItemsQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersBaseDto.html" data-type="entity-link" >GetUsersBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersQueryDto.html" data-type="entity-link" >GetUsersQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleTokenDto.html" data-type="entity-link" >GoogleTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchClaimDto.html" data-type="entity-link" >PatchClaimDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchItemDto.html" data-type="entity-link" >PatchItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyEmailDto.html" data-type="entity-link" >VerifyEmailDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemsAnalyticsProvider.html" data-type="entity-link" >ItemsAnalyticsProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ErrorResponse.html" data-type="entity-link" >ErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleUser.html" data-type="entity-link" >GoogleUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IActiveUser.html" data-type="entity-link" >IActiveUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SuccessResponse.html" data-type="entity-link" >SuccessResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadFile.html" data-type="entity-link" >UploadFile</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
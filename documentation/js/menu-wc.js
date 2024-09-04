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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' : 'data-bs-target="#xs-controllers-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' :
                                            'id="xs-controllers-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' :
                                        'id="xs-injectables-links-module-AppModule-a7f9c3c4cfb17883b6a29cb911fc86c38593d204649d6ed747ab76a452f3cb6e09c8419477b3b4748a99253778356961eaccc569dbc23494d8127bf04f791932"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' :
                                            'id="xs-controllers-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' :
                                        'id="xs-injectables-links-module-AuthModule-5d6befe82335eebb86ad359fffc4d03bcf72ae73390fecaf0773568ec35863d112f27908ffd5423c4fcc4b7b33e725f1dcd1402d62a6fae3b4c235895f4fd873"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
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
                                            'data-bs-target="#controllers-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' : 'data-bs-target="#xs-controllers-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' :
                                            'id="xs-controllers-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' }>
                                            <li class="link">
                                                <a href="controllers/ClaimsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClaimsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' : 'data-bs-target="#xs-injectables-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' :
                                        'id="xs-injectables-links-module-ClaimsModule-22fec2e22a96cecdb7407ac9b886adb7482c602e2c5d07792ce2c25cf1707463e156ddf38dae18ea1ab96c17850eff9fb84830b03f7d5857e3e7f8dfdd35ffc3"' }>
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
                                            'data-bs-target="#controllers-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' : 'data-bs-target="#xs-controllers-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' :
                                            'id="xs-controllers-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' }>
                                            <li class="link">
                                                <a href="controllers/ItemsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' : 'data-bs-target="#xs-injectables-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' :
                                        'id="xs-injectables-links-module-ItemsModule-0241b9d5d5639b92ccfbe993e86cc6a570e5ac130222211c8949fbfa565fd7fca4a1b870246f2ac78dd3a0849a0b95ac95226e81034e6fc6de16a4d9717d59a8"' }>
                                        <li class="link">
                                            <a href="injectables/ItemsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsService</a>
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
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' :
                                            'id="xs-controllers-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' :
                                        'id="xs-injectables-links-module-UsersModule-e60851e04cff11aa790cc980851f587001ca57bcd8cf1d2c16069f04cda3e06707a4b103c939e1b5e2ebde5d5a77a7dfab5b49180eb592f848df0dea516c07c3"' }>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailProvider</a>
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
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
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
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
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
                                <a href="interfaces/IActiveUser.html" data-type="entity-link" >IActiveUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SuccessResponse.html" data-type="entity-link" >SuccessResponse</a>
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
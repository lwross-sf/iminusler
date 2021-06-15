const infoBar = `
<!-- Info Bar -->
<section id="alert_message" class="slds-size_1-of-1" style="margin-top: 3.875rem;">
  <div class="slds-notify slds-notify_alert slds-theme_alt-inverse" role="alert">
    <div class="">
      <h2 class="slds-text-body_regular slds-truncate"><strong>Interaction Studio Demo Tools Now Available!</strong></h2>
      <div class="slds-text-body_small is-markdown">
        <p>Catalog Builder and Hero Builder have just been released, and it's a game changer! Read the user guide to find out more. </p>
      </div>
    </div>
  </div>
</section>
<!-- // Info Bar -->
`;
const menu = `
<!-- Navigation -->
<nav id="navigation_panel" class="slds-panel slds-size_medium slds-panel_docked slds-panel_docked-left slds-is-fixed">
  <section class="slds-panel__header slds-p-horizontal_medium">
    <div class="slds-form-element slds-container_fluid slds-m-vertical_x-small">
      <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
        <svg aria-hidden="true" class="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
        </svg>
        <input type="text" id="text-input_search-nav" placeholder="Search" class="slds-input" disabled>
      </div>
    </div>
  </section>
  <section class="slds-panel__body slds-p-horizontal_medium">
    <div class="slds-grid slds-grid_vertical">
      <div class="slds-col">
        <div class="slds-media slds-m-vertical_medium">
          <div class="slds-media__figure">
            <a href="/" target="_self">
              <span title="Description of icon when needed" class="slds-icon_container" style="background-color: #16325c;">
                <svg aria-hidden="true" class="slds-icon slds-icon_small">
                  <use xlink:href="/app/ui/icons/custom-icons-sprite.svg#Q"></use>
                </svg>
                <span class="slds-assistive-text">Q Central for Marketing Cloud</span>
              </span>
            </a>
          </div>
          <div class="slds-media__body slds-p-top_xxx-small">
            <a href="/" target="_self" class="slds-text-link_reset slds-show slds-text-heading_small">
              <strong>ADLER Home</strong>
            </a>
          </div>
        </div>
      </div>
      <div class="slds-col slds-m-vertical_x-small">
        <article class="slds-m-vertical_x-small">
          <h2 class="slds-text-title_caps">Interaction Studio Tools</h2>
          <div class="slds-media slds-m-vertical_medium">
            <div class="slds-media__figure">
              <a href="/interactionstudio/catalog-builder" class="">
                <span title="Catalogs Builder" class="slds-icon_container slds-icon-standard-all">
                  <svg aria-hidden="true" class="slds-icon slds-icon_small">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#catalog"></use>
                  </svg>
                  <span class="slds-assistive-text">Catalogs Builder</span>
                </span>
              </a>
            </div>
            <div class="slds-media__body slds-p-top_xxx-small">
              <a href="/interactionstudio/catalog-builder" class="slds-text-link_reset slds-text-heading_small">
                <span>Catalog Builder</span>
              </a>
            </div>
          </div>
          <div class="slds-media slds-m-vertical_medium">
            <div class="slds-media__figure">
              <a href="/interactionstudio/data-cannon" class="">
                <span title="Dummy User Generator" class="slds-icon_container slds-icon-standard-all">
                  <svg aria-hidden="true" class="slds-icon slds-icon_small">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#bot"></use>
                  </svg>
                  <span class="slds-assistive-text">Dummy User Generator</span>
                </span>
              </a>
            </div>
            <div class="slds-media__body slds-p-top_xxx-small">
              <a href="/interactionstudio/data-cannon" class="slds-text-link_reset slds-text-heading_small">
                <span>Dummy User Generator</span>
              </a>
            </div>
          </div>
          <div class="slds-media slds-m-vertical_medium">
            <div class="slds-media__figure">
              <a href="/interactionstudio/hero-builder" class="">
                <span title="Catalogs Builder" class="slds-icon_container slds-icon-standard-all">
                  <svg aria-hidden="true" class="slds-icon slds-icon_small">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#customer_360"></use>
                  </svg>
                  <span class="slds-assistive-text">Hero Builder</span>
                </span>
              </a>
            </div>
            <div class="slds-media__body slds-p-top_xxx-small">
              <a href="/interactionstudio/hero-builder" class="slds-text-link_reset slds-text-heading_small">
                <span>Hero Builder</span>
              </a>
            </div>
          </div>
          <div class="slds-media slds-m-vertical_medium">
            <div class="slds-media__figure">
              <a href="https://sf-is-demobuilder.herokuapp.com/" class="">
                <span title="UCP Builder (Pro)" class="slds-icon_container slds-icon-standard-all">
                  <svg aria-hidden="true" class="slds-icon slds-icon_small">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#employee_job"></use>
                  </svg>
                  <span class="slds-assistive-text">UCP Builder (Pro)</span>
                </span>
              </a>
            </div>
            <div class="slds-media__body slds-p-top_xxx-small">
              <a href="https://sf-is-demobuilder.herokuapp.com/" class="slds-text-link_reset slds-text-heading_small">
                <span>UCP Builder (Pro)</span>
              </a>
            </div>
          </div>
          <!-- <div class="slds-media slds-m-vertical_medium">
            <div class="slds-media__figure">
              <a href="/interactionstudio/ucp-builder" class="">
                <span title="Profiles Builder" class="slds-icon_container slds-icon-standard-all">
                  <svg aria-hidden="true" class="slds-icon slds-icon_small">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#customer_360"></use>
                  </svg>
                  <span class="slds-assistive-text">Profiles Builder</span>
                </span>
              </a>
            </div>
            <div class="slds-media__body slds-p-top_xxx-small">
              <a href="/interactionstudio/ucp-builder" class="slds-text-link_reset slds-text-heading_small">
                <span>Profiles Builder</span>
              </a>
            </div>
          </div>
          <div class="slds-media slds-m-vertical_medium">
            <div class="slds-media__figure">
              <a href="/interactionstudio/demo" class="">
                <span title="Profiles Builder" class="slds-icon_container slds-icon-standard-all">
                  <svg aria-hidden="true" class="slds-icon slds-icon_small">
                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#iot_orchestrations"></use>
                  </svg>
                  <span class="slds-assistive-text">Demo Experience Builder</span>
                </span>
              </a>
            </div>
            <div class="slds-media__body slds-p-top_xxx-small">
              <a href="/interactionstudio/demo" class="slds-text-link_reset slds-text-heading_small">
                <span>Demo Experience Builder</span>
              </a>
            </div>
          </div> -->
        </article>
      </div>
    </div>
  </section>
</nav>
<!-- // Navigation -->
`;

$(menu).insertAfter($("#page-header"));
$(infoBar).insertAfter($("#navigation_panel"));
function toggleNav(){
  $('#navigation_panel').toggleClass('slds-is-open');
  if($('#navigation_panel').hasClass('slds-is-open')==true){
    $('#nav_button').find('use').attr('xlink:href','/assets/icons/utility-sprite/svg/symbols.svg#close')
  } else {
    $('#nav_button').find('use').attr('xlink:href','/assets/icons/utility-sprite/svg/symbols.svg#rows')
  }
}
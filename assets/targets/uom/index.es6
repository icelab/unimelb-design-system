import {
  components,
  initComponent,
  initAllComponents,
  registerComponents
} from '../../shared/component-manager.es6';

import * as utils from '../../utils/index.es6';
import cssesc from 'cssesc';
import WebFont from 'webfontloader';

import Accordion from '../../components/accordion';
import Announcement from '../../components/announcement/index.es6';
import Checklist from '../../components/checklist';
import CheckboxHelper from '../../components/checklist/checkboxhelper';
import FilteredListing from '../../components/filtered-listings';
import FancySelect from '../../components/forms/fancyselect';
import Flash from '../../components/notices/flash';
import IconHelper from '../../components/icons';
import ImageGallery from '../../components/gallery';
import InPageNavigation from '../../components/inpage-navigation';
import JumpNav from '../../components/inpage-navigation/jumpnav';
import MobileTableHelper from '../../components/tables';
import Modal from '../../components/modal';
import SidebarTabs from '../../components/tabs/sidebar-tabs';
import SortableTable from '../../components/tables/sortable';
import Tabs from '../../components/tabs';
import ValidateForm from '../../components/forms';

// Polyfills
require('es6-promise').polyfill();
require('classlist-polyfill');

// Build API object
window.uom = {
  // component manager
  components,
  initComponent,
  initAllComponents,
  registerComponents,

  // utilities and third-party dependencies
  utils,
  vendor: {
    cssesc,
    WebFont
  }
};

// Register the design system's components
window.uom.registerComponents([
  Accordion,
  Announcement,
  Checklist,
  CheckboxHelper,
  FilteredListing,
  FancySelect,
  Flash,
  IconHelper,
  ImageGallery,
  InPageNavigation,
  JumpNav,
  MobileTableHelper,
  Modal,
  SidebarTabs,
  SortableTable,
  Tabs,
  ValidateForm
]);

// Toggle JS classes on document root
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Load custom fonts
const fonts = 'Roboto:400,300,100,700,100italic,300italic,400italic,700italic:latin';
WebFont.load({ google: { families: [fonts] } });

document.addEventListener('DOMContentLoaded', window.uom.initAllComponents, false);


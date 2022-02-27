/* eslint-disable */
import { FuseNavigationItem } from "@fuse/components/navigation";

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: "dashboards",
    title: "Dashboards",
    subtitle: "Unique dashboard designs",
    type: "group",
    icon: "heroicons_outline:home",
    children: [
      {
        id: "dashboards.project",
        title: "Project",
        type: "basic",
        icon: "heroicons_outline:clipboard-check",
        link: "/dashboards/project",
      },
      {
        id: "dashboards.analytics",
        title: "Analytics",
        type: "basic",
        icon: "heroicons_outline:chart-pie",
        link: "/dashboards/analytics",
      },
    ],
  },
  {
    id: "admin",
    title: "Admnin",
    subtitle: "Manage Admin Module",
    type: "group",
    icon: "heroicons_outline:office-building",
    children: [    
      {
        id: "inventory.noticeboard",
        title: "Notice Board",
        type: "basic",
        icon: "heroicons_outline:shopping-bag",
        link: "/inventory/noticeboard/list",
      }, 
      {
        id: "admin.reasons",
        title: "Reason",
        type: "basic",
        icon: "heroicons_outline:chat-alt",
        link: "/inventory/reasons/list",
      },
      {
        id: "admin.promocodes",
        title: "Promo Codes",
        type: "basic",
        icon: "heroicons_outline:currency-dollar",
        link: "/inventory/promocode/list",
      },
      {
        id: "admin.disputemanager",
        title: "Dispute Manager",
        type: "basic",
        icon: "heroicons_outline:users",
        link: "/inventory/dispute-manager/list",
      }, 
      {
        id: "admin.cuisines",
        title: "Cuisines",
        type: "basic",
        icon: "heroicons_outline:color-swatch",
        link: "/inventory/cuisines/list",
      },
      {
        id: "admin.settings",
        title: "Settings",
        type: "basic",
        icon: "heroicons_outline:cog",
        link: "/pages/settings",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders",
    subtitle: "Manage Orders",
    type: "group",
    icon: "heroicons_outline:collection",
    children: [
      {
        id: "orders.dispatcher",
        title: "Dispatcher",
        type: "basic",
        icon: "heroicons_outline:desktop-computer",
        link: "/orders/dispatcher",
      },
      {
        id: "orders.deliveries",
        title: "Deliveries",
        type: "basic",
        icon: "heroicons_outline:document-duplicate",
        link: "/orders/deliveries",
      },
    ],
  },
  {
    id: "inventory",
    title: "Inventory",
    subtitle: "Manage Inventory",
    type: "group",
    icon: "heroicons_outline:server",
    children: [
      {
        id: "inventory.addons",
        title: "Addons",
        type: "basic",
        icon: "heroicons_outline:shopping-bag",
        link: "/inventory/addons/list",
      },
      {
        id: "inventory.cateogry",
        title: "Category",
        type: "basic",
        icon: "heroicons_outline:color-swatch",
        link: "/inventory/category/list",
      },
      {
        id: "inventory.products",
        title: "Products",
        type: "basic",
        icon: "heroicons_outline:shopping-bag",
        link: "/inventory/products/list",
      },
    ],
  },
  {
    id: "delivery_people",
    title: "Delivery People",
    subtitle: "Manage Delivery People & Shifts",
    type: "group",
    icon: "mat_outline:delivery_dining",
    children: [
      {
        id: "delivery_people.delivery_people",
        title: "Delivery People",
        type: "basic",
        icon: "heroicons_outline:users",
        link: "/delivery-people/list",
      },
      {
        id: "delivery_people.shift_details",
        title: "Shift Details",
        type: "basic",
        icon: "heroicons_outline:identification",
        link: "/delivery-people/shift-details",
      },
    ],
  },
  {
    id: "restaurant",
    title: "Restaurant",
    subtitle: "Manage Restaurant Detail",
    type: "group",
    icon: "heroicons_outline:office-building",
    children: [
      {
        id: "restaurant.restaurantdetail",
        title: "Restaurant Detail",
        type: "basic",
        icon: "heroicons_outline:office-building",
        link: "/restaurant/restaurant-detail",
      },
      {
        id: "restaurant.settings",
        title: "Settings",
        type: "basic",
        icon: "heroicons_outline:cog",
        link: "/shop/settings",
      },
    ],
  },
  {
    id: "others",
    title: "Others",
    subtitle: "Manage Others",
    type: "group",
    icon: "heroicons_outline:view-boards",
    children: [
      {
        id: "others.notice_board",
        title: "Notice Board",
        type: "basic",
        icon: "heroicons_outline:clipboard",
        link: "/others/notice-board",
      },
      {
        id: "others.stripe_connect",
        title: "Stripe Connect",
        type: "basic",
        icon: "heroicons_outline:currency-dollar",
        link: "/others/stripe-connect",
      },
    ],
  },
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id: "dashboards",
    title: "Dashboards",
    type: "aside",
    icon: "heroicons_outline:home",
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: "orders",
    title: "Orders",
    type: "aside",
    icon: "heroicons_outline:collection",
    children: [],
  },
  {
    id: "inventory",
    title: "Inventory",
    type: "aside",
    icon: "heroicons_outline:server",
    children: [],
  },
  {
    id: "delivery_people",
    title: "Delivery People",
    type: "aside",
    icon: "mat_outline:delivery_dining",
    children: [],
  },
  {
    id: "shop",
    title: "Shop",
    type: "aside",
    icon: "heroicons_outline:office-building",
    children: [],
  },
  {
    id: "others",
    title: "Others",
    type: "aside",
    icon: "heroicons_outline:view-boards",
    children: [],
  },
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id: "dashboards",
    title: "DASHBOARDS",
    type: "group",
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: "orders",
    title: "ORDERS",
    type: "group",
    children: [],
  },
  {
    id: "inventory",
    title: "INVENTORY",
    type: "group",
    children: [],
  },
  {
    id: "delivery_people",
    title: "DELIVERY PEOPLE",
    type: "group",
    children: [],
  },
  {
    id: "shop",
    title: "SHOP",
    type: "group",
    children: [],
  },
  {
    id: "others",
    title: "OTHERS",
    type: "group",
    children: [],
  },
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id: "dashboards",
    title: "Dashboards",
    type: "group",
    icon: "heroicons_outline:home",
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: "orders",
    title: "Orders",
    type: "group",
    icon: "heroicons_outline:collection",
    children: [],
  },
  {
    id: "inventory",
    title: "Inventory",
    type: "aside",
    icon: "heroicons_outline:server",
    children: [],
  },
  {
    id: "delivery_people",
    title: "Delivery People",
    type: "aside",
    icon: "mat_outline:delivery_dining",
    children: [],
  },
  {
    id: "shop",
    title: "Shop",
    type: "group",
    icon: "heroicons_outline:office-building",
    children: [],
  },
  {
    id: "others",
    title: "Others",
    type: "aside",
    icon: "heroicons_outline:view-boards",
    children: [],
  },
];

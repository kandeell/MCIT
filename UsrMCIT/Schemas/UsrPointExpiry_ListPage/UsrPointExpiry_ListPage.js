define("UsrPointExpiry_ListPage", /**SCHEMA_DEPS*/["UsrMCITPointExpiryNativeRuntime","css!UsrMCITPointExpiryCSS"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(runtime)/**SCHEMA_ARGS*/ {
 return {
 viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
  {
    "operation": "remove",
    "name": "MainHeader"
  },
  {
    "operation": "remove",
    "name": "TitleContainer"
  },
  {
    "operation": "remove",
    "name": "PageTitle"
  },
  {
    "operation": "remove",
    "name": "ActionButtonsContainer"
  },
  {
    "operation": "remove",
    "name": "AddButton"
  },
  {
    "operation": "remove",
    "name": "DataImportButton"
  },
  {
    "operation": "remove",
    "name": "MenuItem_ImportFromExcel"
  },
  {
    "operation": "remove",
    "name": "OpenLandingDesigner"
  },
  {
    "operation": "remove",
    "name": "ActionButton"
  },
  {
    "operation": "remove",
    "name": "MenuItem_ExportToExcel"
  },
  {
    "operation": "remove",
    "name": "MainContainer"
  },
  {
    "operation": "remove",
    "name": "MainFilterContainer"
  },
  {
    "operation": "remove",
    "name": "LeftFilterContainer"
  },
  {
    "operation": "remove",
    "name": "LeftFilterContainerInner"
  },
  {
    "operation": "remove",
    "name": "FolderTreeActions"
  },
  {
    "operation": "remove",
    "name": "FiltersMenu"
  },
  {
    "operation": "remove",
    "name": "LookupQuickFilterByTag"
  },
  {
    "operation": "remove",
    "name": "SearchFilter"
  },
  {
    "operation": "remove",
    "name": "RightFilterContainer"
  },
  {
    "operation": "remove",
    "name": "DataTable_Summaries"
  },
  {
    "operation": "remove",
    "name": "RefreshButton"
  },
  {
    "operation": "remove",
    "name": "MainButtonToggleGroup"
  },
  {
    "operation": "remove",
    "name": "ContentContainer"
  },
  {
    "operation": "remove",
    "name": "FolderTree"
  },
  {
    "operation": "remove",
    "name": "Filters"
  },
  {
    "operation": "remove",
    "name": "SectionContentWrapper"
  },
  {
    "operation": "remove",
    "name": "MainTabPanel"
  },
  {
    "operation": "remove",
    "name": "ListTabContainer"
  },
  {
    "operation": "remove",
    "name": "ListContainer"
  },
  {
    "operation": "remove",
    "name": "DataTable"
  },
  {
    "operation": "remove",
    "name": "DashboardsTabContainer"
  },
  {
    "operation": "remove",
    "name": "DashboardsContainer"
  },
  {
    "operation": "remove",
    "name": "Dashboards"
  },
  {
    "operation": "insert",
    "name": "ExpiryRoot",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-dashboard"
      ]
    },
    "parentName": "Main",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryTitle",
    "values": {
      "type": "crt.Label",
      "caption": "Point Expiry",
      "labelType": "headline-1",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-title"
      ]
    },
    "parentName": "ExpiryRoot",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpirySubtitle",
    "values": {
      "type": "crt.Label",
      "caption": "Monitor restored points and upcoming expirations across all authorized contracts.",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-subtitle"
      ]
    },
    "parentName": "ExpiryRoot",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryMetrics",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(0, 1fr)",
        "minmax(0, 1fr)",
        "minmax(0, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "classes": [
        "mcit-pe-metrics"
      ]
    },
    "parentName": "ExpiryRoot",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryCardTotalRemaining",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-card",
        "mcit-pe-purple"
      ],
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryMetrics",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryCardTotalRemainingTitle",
    "values": {
      "type": "crt.Label",
      "caption": "Remaining Restored Points",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-kpi-label"
      ]
    },
    "parentName": "ExpiryCardTotalRemaining",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryCardTotalRemainingValue",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryTotalRemaining",
      "labelType": "headline-1",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-kpi-value"
      ]
    },
    "parentName": "ExpiryCardTotalRemaining",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryCardExpiring30Days",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-card",
        "mcit-pe-red"
      ],
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryMetrics",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryCardExpiring30DaysTitle",
    "values": {
      "type": "crt.Label",
      "caption": "Expiring in 30 days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-kpi-label"
      ]
    },
    "parentName": "ExpiryCardExpiring30Days",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryCardExpiring30DaysValue",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryExpiring30Days",
      "labelType": "headline-1",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-kpi-value"
      ]
    },
    "parentName": "ExpiryCardExpiring30Days",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryCardExpiring90Days",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-card",
        "mcit-pe-amber"
      ],
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryMetrics",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryCardExpiring90DaysTitle",
    "values": {
      "type": "crt.Label",
      "caption": "Expiring in 90 days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-kpi-label"
      ]
    },
    "parentName": "ExpiryCardExpiring90Days",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryCardExpiring90DaysValue",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryExpiring90Days",
      "labelType": "headline-1",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-kpi-value"
      ]
    },
    "parentName": "ExpiryCardExpiring90Days",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryNotice",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryNoticeText",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-notice"
      ]
    },
    "parentName": "ExpiryRoot",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryTablePanel",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-table"
      ]
    },
    "parentName": "ExpiryRoot",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryTableTitle",
    "values": {
      "type": "crt.Label",
      "caption": "Restored Points Expiry Schedule",
      "labelType": "headline-1",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-table-title"
      ]
    },
    "parentName": "ExpiryTablePanel",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryFilter",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(210px, 1.8fr)",
        "minmax(145px, 1fr)",
        "minmax(155px, 1fr)",
        "minmax(155px, 1fr)",
        "minmax(145px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "classes": [
        "mcit-pe-filter"
      ]
    },
    "parentName": "ExpiryTablePanel",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSearchGroup",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-filter-group"
      ],
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryFilter",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSearchCaption",
    "values": {
      "type": "crt.Label",
      "caption": "Search",
      "labelType": "caption",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-filter-caption"
      ]
    },
    "parentName": "ExpiryInputSearchGroup",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSearchRoundedFrame",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-rounded-frame",
        "mcit-pe-text-frame"
      ]
    },
    "parentName": "ExpiryInputSearchGroup",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSearch",
    "values": {
      "type": "crt.Input",
      "label": "Search",
      "control": "$ExpirySearch",
      "placeholder": "Search contract, VM or reference",
      "labelPosition": "hidden",
      "appearance": "outline",
      "classes": [
        "mcit-pe-input",
        "mcit-pe-text-field"
      ],
      "ariaLabel": "Search"
    },
    "parentName": "ExpiryInputSearchRoundedFrame",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputStatusGroup",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-filter-group"
      ],
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryFilter",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryInputStatusCaption",
    "values": {
      "type": "crt.Label",
      "caption": "Status",
      "labelType": "caption",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-filter-caption"
      ]
    },
    "parentName": "ExpiryInputStatusGroup",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputStatusRoundedFrame",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-rounded-frame",
        "mcit-pe-sort-frame",
        "mcit-pe-status-frame"
      ]
    },
    "parentName": "ExpiryInputStatusGroup",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryInputStatus",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryStatusCaption",
      "color": "default",
      "size": "large",
      "clickMode": "menu",
      "displayType": "text",
      "classes": [
        "mcit-pe-sort-menu",
        "mcit-pe-status-menu"
      ],
      "menuItems": []
    },
    "parentName": "ExpiryInputStatusRoundedFrame",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryStatusMenu0",
    "values": {
      "type": "crt.MenuItem",
      "caption": "All statuses",
      "clicked": {
        "request": "usr.ExpirySelectStatus",
        "params": {
          "status": ""
        }
      }
    },
    "parentName": "ExpiryInputStatus",
    "propertyName": "menuItems",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryStatusMenu1",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Pending expiration",
      "clicked": {
        "request": "usr.ExpirySelectStatus",
        "params": {
          "status": "Pending expiration"
        }
      }
    },
    "parentName": "ExpiryInputStatus",
    "propertyName": "menuItems",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryStatusMenu2",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Partially consumed",
      "clicked": {
        "request": "usr.ExpirySelectStatus",
        "params": {
          "status": "Partially consumed"
        }
      }
    },
    "parentName": "ExpiryInputStatus",
    "propertyName": "menuItems",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryStatusMenu3",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Fully consumed",
      "clicked": {
        "request": "usr.ExpirySelectStatus",
        "params": {
          "status": "Fully consumed"
        }
      }
    },
    "parentName": "ExpiryInputStatus",
    "propertyName": "menuItems",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryStatusMenu4",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Overdue",
      "clicked": {
        "request": "usr.ExpirySelectStatus",
        "params": {
          "status": "Overdue"
        }
      }
    },
    "parentName": "ExpiryInputStatus",
    "propertyName": "menuItems",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryStatusMenu5",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Expired",
      "clicked": {
        "request": "usr.ExpirySelectStatus",
        "params": {
          "status": "Expired"
        }
      }
    },
    "parentName": "ExpiryInputStatus",
    "propertyName": "menuItems",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryInputFromGroup",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-filter-group"
      ],
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryFilter",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryInputFromCaption",
    "values": {
      "type": "crt.Label",
      "caption": "Expiry from",
      "labelType": "caption",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-filter-caption"
      ]
    },
    "parentName": "ExpiryInputFromGroup",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputFromRoundedFrame",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-rounded-frame",
        "mcit-pe-date-frame"
      ]
    },
    "parentName": "ExpiryInputFromGroup",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryInputFrom",
    "values": {
      "type": "crt.DateTimePicker",
      "label": "Expiry from",
      "control": "$ExpiryFrom",
      "placeholder": "Select date",
      "labelPosition": "hidden",
      "appearance": "outline",
      "classes": [
        "mcit-pe-input",
        "mcit-pe-calendar"
      ],
      "ariaLabel": "Expiry from",
      "pickerType": "date",
      "readonly": false
    },
    "parentName": "ExpiryInputFromRoundedFrame",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputToGroup",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-filter-group"
      ],
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryFilter",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryInputToCaption",
    "values": {
      "type": "crt.Label",
      "caption": "Expiry to",
      "labelType": "caption",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-filter-caption"
      ]
    },
    "parentName": "ExpiryInputToGroup",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputToRoundedFrame",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-rounded-frame",
        "mcit-pe-date-frame"
      ]
    },
    "parentName": "ExpiryInputToGroup",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryInputTo",
    "values": {
      "type": "crt.DateTimePicker",
      "label": "Expiry to",
      "control": "$ExpiryTo",
      "placeholder": "Select date",
      "labelPosition": "hidden",
      "appearance": "outline",
      "classes": [
        "mcit-pe-input",
        "mcit-pe-calendar"
      ],
      "ariaLabel": "Expiry to",
      "pickerType": "date",
      "readonly": false
    },
    "parentName": "ExpiryInputToRoundedFrame",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSortGroup",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-filter-group"
      ],
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      }
    },
    "parentName": "ExpiryFilter",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSortCaption",
    "values": {
      "type": "crt.Label",
      "caption": "Sort",
      "labelType": "caption",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "classes": [
        "mcit-pe-filter-caption"
      ]
    },
    "parentName": "ExpiryInputSortGroup",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSortRoundedFrame",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-rounded-frame",
        "mcit-pe-sort-frame"
      ]
    },
    "parentName": "ExpiryInputSortGroup",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryInputSort",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpirySortCaption",
      "color": "default",
      "size": "large",
      "clickMode": "menu",
      "displayType": "text",
      "classes": [
        "mcit-pe-sort-menu"
      ],
      "menuItems": []
    },
    "parentName": "ExpiryInputSortRoundedFrame",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpirySortMenuExpiration",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Expiration date",
      "clicked": {
        "request": "usr.ExpirySelectSort",
        "params": {
          "sort": "expiration"
        }
      }
    },
    "parentName": "ExpiryInputSort",
    "propertyName": "menuItems",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpirySortMenuRemaining",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Remaining points",
      "clicked": {
        "request": "usr.ExpirySelectSort",
        "params": {
          "sort": "remaining"
        }
      }
    },
    "parentName": "ExpiryInputSort",
    "propertyName": "menuItems",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpirySortMenuRestoration",
    "values": {
      "type": "crt.MenuItem",
      "caption": "Restoration date",
      "clicked": {
        "request": "usr.ExpirySelectSort",
        "params": {
          "sort": "restoration"
        }
      }
    },
    "parentName": "ExpiryInputSort",
    "propertyName": "menuItems",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryTableScroll",
    "values": {
      "type": "crt.FlexContainer",
      "direction": "column",
      "items": [],
      "classes": [
        "mcit-pe-scroll"
      ]
    },
    "parentName": "ExpiryTablePanel",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryTable",
    "values": {
      "type": "crt.FlexContainer",
      "items": [],
      "classes": [
        "mcit-pe-table-content"
      ],
      "direction": "column"
    },
    "parentName": "ExpiryTableScroll",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryTableHead",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "classes": [
        "mcit-pe-table-header"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadContract",
    "values": {
      "type": "crt.Label",
      "caption": "Contract",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadVM",
    "values": {
      "type": "crt.Label",
      "caption": "Virtual machine",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadReference",
    "values": {
      "type": "crt.Label",
      "caption": "Restoration reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadRestored",
    "values": {
      "type": "crt.Label",
      "caption": "Restoration date",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadExpires",
    "values": {
      "type": "crt.Label",
      "caption": "Expiry date",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadOriginal",
    "values": {
      "type": "crt.Label",
      "caption": "Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadConsumed",
    "values": {
      "type": "crt.Label",
      "caption": "Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadExpired",
    "values": {
      "type": "crt.Label",
      "caption": "Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadRemaining",
    "values": {
      "type": "crt.Label",
      "caption": "Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadType",
    "values": {
      "type": "crt.Label",
      "caption": "Restoration type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadStatus",
    "values": {
      "type": "crt.Label",
      "caption": "Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryHeadDays",
    "values": {
      "type": "crt.Label",
      "caption": "Days left",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-head"
      ]
    },
    "parentName": "ExpiryTableHead",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord0",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord0Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow0Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 0,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow0VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 0,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow0Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow0Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord0",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord1",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord1Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow1Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 1,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow1VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 1,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow1Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow1Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord1",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord2",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord2Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow2Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 2,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow2VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 2,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow2Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow2Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord2",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord3",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord3Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow3Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 3,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow3VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 3,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow3Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow3Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord3",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord4",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord4Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow4Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 4,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow4VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 4,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow4Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow4Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord4",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord5",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord5Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow5Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 5,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow5VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 5,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow5Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow5Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord5",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord6",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord6Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow6Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 6,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow6VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 6,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow6Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow6Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord6",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord7",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord7Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow7Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 7,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow7VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 7,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow7Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow7Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord7",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord8",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord8Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow8Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 8,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow8VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 8,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow8Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow8Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord8",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord9",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord9Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow9Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 9,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow9VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 9,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow9Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow9Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord9",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord10",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord10Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow10Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 10,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow10VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 10,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow10Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow10Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord10",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord11",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord11Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 12
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow11Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 11,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow11VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 11,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow11Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow11Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord11",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord12",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord12Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 13
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow12Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 12,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow12VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 12,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow12Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow12Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord12",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord13",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord13Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 14
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow13Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 13,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow13VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 13,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow13Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow13Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord13",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord14",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord14Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 15
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow14Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 14,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow14VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 14,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow14Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow14Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord14",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord15",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord15Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 16
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow15Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 15,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow15VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 15,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow15Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow15Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord15",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord16",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord16Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 17
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow16Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 16,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow16VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 16,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow16Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow16Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord16",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord17",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord17Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 18
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow17Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 17,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow17VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 17,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow17Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow17Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord17",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord18",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord18Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 19
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow18Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 18,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow18VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 18,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow18Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow18Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord18",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord19",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord19Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 20
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow19Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 19,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow19VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 19,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow19Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow19Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord19",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord20",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord20Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 21
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow20Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 20,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow20VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 20,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow20Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow20Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord20",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord21",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord21Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 22
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow21Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 21,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow21VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 21,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow21Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow21Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord21",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord22",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord22Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 23
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow22Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 22,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow22VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 22,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow22Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow22Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord22",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord23",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord23Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 24
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow23Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 23,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow23VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 23,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow23Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow23Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord23",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryRecord24",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(180px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(180px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(115px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(92px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(150px, 1fr)",
        "minmax(145px, 1fr)",
        "minmax(75px, 1fr)"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "visible": "$ExpiryRecord24Visible",
      "classes": [
        "mcit-pe-record"
      ]
    },
    "parentName": "ExpiryTable",
    "propertyName": "items",
    "index": 25
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Contract",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow24Contract",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 24,
          "kind": "Contract"
        }
      }
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24VM",
    "values": {
      "type": "crt.Button",
      "caption": "$ExpiryRow24VM",
      "color": "default",
      "size": "small",
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-link"
      ],
      "clicked": {
        "request": "usr.ExpiryOpenRecord",
        "params": {
          "index": 24,
          "kind": "VM"
        }
      }
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Reference",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Reference",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 2
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Restored",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Restored",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 4,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Expires",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Expires",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 5,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 4
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Original",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Original",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 6,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 5
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Consumed",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Consumed",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 7,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 6
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Expired",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Expired",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 8,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 7
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Remaining",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Remaining",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 9,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-remaining"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 8
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Type",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Type",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 10,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 9
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Status",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Status",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 11,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-status"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 10
  },
  {
    "operation": "insert",
    "name": "ExpiryRow24Days",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryRow24Days",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 12,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-cell",
        "mcit-pe-days"
      ]
    },
    "parentName": "ExpiryRecord24",
    "propertyName": "items",
    "index": 11
  },
  {
    "operation": "insert",
    "name": "ExpiryActions",
    "values": {
      "type": "crt.GridContainer",
      "columns": [
        "minmax(0, 1fr)",
        "max-content",
        "max-content"
      ],
      "rows": "minmax(max-content, 32px)",
      "items": [],
      "classes": [
        "mcit-pe-footer"
      ]
    },
    "parentName": "ExpiryTablePanel",
    "propertyName": "items",
    "index": 3
  },
  {
    "operation": "insert",
    "name": "ExpiryPageLabel",
    "values": {
      "type": "crt.Label",
      "caption": "$ExpiryPageText",
      "labelType": "body",
      "labelThickness": "default",
      "labelEllipsis": false,
      "labelColor": "auto",
      "labelBackgroundColor": "transparent",
      "labelTextAlign": "start",
      "headingLevel": "label",
      "layoutConfig": {
        "column": 1,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-page-count"
      ]
    },
    "parentName": "ExpiryActions",
    "propertyName": "items",
    "index": 0
  },
  {
    "operation": "insert",
    "name": "ExpiryActionPrevious",
    "values": {
      "type": "crt.Button",
      "caption": "Previous",
      "color": "default",
      "size": "medium",
      "clicked": {
        "request": "usr.ExpiryPageRequest",
        "params": {
          "step": -1
        }
      },
      "layoutConfig": {
        "column": 2,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-pager-button"
      ],
      "visible": "$ExpiryHasPrevious"
    },
    "parentName": "ExpiryActions",
    "propertyName": "items",
    "index": 1
  },
  {
    "operation": "insert",
    "name": "ExpiryActionNext",
    "values": {
      "type": "crt.Button",
      "caption": "Next",
      "color": "default",
      "size": "medium",
      "clicked": {
        "request": "usr.ExpiryPageRequest",
        "params": {
          "step": 1
        }
      },
      "layoutConfig": {
        "column": 3,
        "colSpan": 1,
        "row": 1,
        "rowSpan": 1
      },
      "classes": [
        "mcit-pe-pager-button"
      ],
      "visible": "$ExpiryHasNext"
    },
    "parentName": "ExpiryActions",
    "propertyName": "items",
    "index": 2
  }
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
 viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
  {
    "operation": "merge",
    "path": [
      "attributes"
    ],
    "values": {
      "ExpiryTotalRemaining": {
        "value": "—"
      },
      "ExpiryExpiring30Days": {
        "value": "—"
      },
      "ExpiryExpiring90Days": {
        "value": "—"
      },
      "ExpirySearch": {
        "value": ""
      },
      "ExpiryStatus": {
        "value": ""
      },
      "ExpiryFrom": {
        "dataValueType": 8,
        "value": null
      },
      "ExpiryTo": {
        "dataValueType": 8,
        "value": null
      },
      "ExpirySort": {
        "value": "expiration"
      },
      "ExpirySortCaption": {
        "value": "Expiration date"
      },
      "ExpiryNoticeText": {
        "value": "Loading authorized ledger…"
      },
      "ExpiryPageText": {
        "value": "No data loaded"
      },
      "ExpiryRecord0Visible": {
        "value": false
      },
      "ExpiryRow0Contract": {
        "value": ""
      },
      "ExpiryRow0VM": {
        "value": ""
      },
      "ExpiryRow0Reference": {
        "value": ""
      },
      "ExpiryRow0Restored": {
        "value": ""
      },
      "ExpiryRow0Expires": {
        "value": ""
      },
      "ExpiryRow0Original": {
        "value": ""
      },
      "ExpiryRow0Consumed": {
        "value": ""
      },
      "ExpiryRow0Expired": {
        "value": ""
      },
      "ExpiryRow0Remaining": {
        "value": ""
      },
      "ExpiryRow0Type": {
        "value": ""
      },
      "ExpiryRow0Status": {
        "value": ""
      },
      "ExpiryRow0Days": {
        "value": ""
      },
      "ExpiryRecord1Visible": {
        "value": false
      },
      "ExpiryRow1Contract": {
        "value": ""
      },
      "ExpiryRow1VM": {
        "value": ""
      },
      "ExpiryRow1Reference": {
        "value": ""
      },
      "ExpiryRow1Restored": {
        "value": ""
      },
      "ExpiryRow1Expires": {
        "value": ""
      },
      "ExpiryRow1Original": {
        "value": ""
      },
      "ExpiryRow1Consumed": {
        "value": ""
      },
      "ExpiryRow1Expired": {
        "value": ""
      },
      "ExpiryRow1Remaining": {
        "value": ""
      },
      "ExpiryRow1Type": {
        "value": ""
      },
      "ExpiryRow1Status": {
        "value": ""
      },
      "ExpiryRow1Days": {
        "value": ""
      },
      "ExpiryRecord2Visible": {
        "value": false
      },
      "ExpiryRow2Contract": {
        "value": ""
      },
      "ExpiryRow2VM": {
        "value": ""
      },
      "ExpiryRow2Reference": {
        "value": ""
      },
      "ExpiryRow2Restored": {
        "value": ""
      },
      "ExpiryRow2Expires": {
        "value": ""
      },
      "ExpiryRow2Original": {
        "value": ""
      },
      "ExpiryRow2Consumed": {
        "value": ""
      },
      "ExpiryRow2Expired": {
        "value": ""
      },
      "ExpiryRow2Remaining": {
        "value": ""
      },
      "ExpiryRow2Type": {
        "value": ""
      },
      "ExpiryRow2Status": {
        "value": ""
      },
      "ExpiryRow2Days": {
        "value": ""
      },
      "ExpiryRecord3Visible": {
        "value": false
      },
      "ExpiryRow3Contract": {
        "value": ""
      },
      "ExpiryRow3VM": {
        "value": ""
      },
      "ExpiryRow3Reference": {
        "value": ""
      },
      "ExpiryRow3Restored": {
        "value": ""
      },
      "ExpiryRow3Expires": {
        "value": ""
      },
      "ExpiryRow3Original": {
        "value": ""
      },
      "ExpiryRow3Consumed": {
        "value": ""
      },
      "ExpiryRow3Expired": {
        "value": ""
      },
      "ExpiryRow3Remaining": {
        "value": ""
      },
      "ExpiryRow3Type": {
        "value": ""
      },
      "ExpiryRow3Status": {
        "value": ""
      },
      "ExpiryRow3Days": {
        "value": ""
      },
      "ExpiryRecord4Visible": {
        "value": false
      },
      "ExpiryRow4Contract": {
        "value": ""
      },
      "ExpiryRow4VM": {
        "value": ""
      },
      "ExpiryRow4Reference": {
        "value": ""
      },
      "ExpiryRow4Restored": {
        "value": ""
      },
      "ExpiryRow4Expires": {
        "value": ""
      },
      "ExpiryRow4Original": {
        "value": ""
      },
      "ExpiryRow4Consumed": {
        "value": ""
      },
      "ExpiryRow4Expired": {
        "value": ""
      },
      "ExpiryRow4Remaining": {
        "value": ""
      },
      "ExpiryRow4Type": {
        "value": ""
      },
      "ExpiryRow4Status": {
        "value": ""
      },
      "ExpiryRow4Days": {
        "value": ""
      },
      "ExpiryRecord5Visible": {
        "value": false
      },
      "ExpiryRow5Contract": {
        "value": ""
      },
      "ExpiryRow5VM": {
        "value": ""
      },
      "ExpiryRow5Reference": {
        "value": ""
      },
      "ExpiryRow5Restored": {
        "value": ""
      },
      "ExpiryRow5Expires": {
        "value": ""
      },
      "ExpiryRow5Original": {
        "value": ""
      },
      "ExpiryRow5Consumed": {
        "value": ""
      },
      "ExpiryRow5Expired": {
        "value": ""
      },
      "ExpiryRow5Remaining": {
        "value": ""
      },
      "ExpiryRow5Type": {
        "value": ""
      },
      "ExpiryRow5Status": {
        "value": ""
      },
      "ExpiryRow5Days": {
        "value": ""
      },
      "ExpiryRecord6Visible": {
        "value": false
      },
      "ExpiryRow6Contract": {
        "value": ""
      },
      "ExpiryRow6VM": {
        "value": ""
      },
      "ExpiryRow6Reference": {
        "value": ""
      },
      "ExpiryRow6Restored": {
        "value": ""
      },
      "ExpiryRow6Expires": {
        "value": ""
      },
      "ExpiryRow6Original": {
        "value": ""
      },
      "ExpiryRow6Consumed": {
        "value": ""
      },
      "ExpiryRow6Expired": {
        "value": ""
      },
      "ExpiryRow6Remaining": {
        "value": ""
      },
      "ExpiryRow6Type": {
        "value": ""
      },
      "ExpiryRow6Status": {
        "value": ""
      },
      "ExpiryRow6Days": {
        "value": ""
      },
      "ExpiryRecord7Visible": {
        "value": false
      },
      "ExpiryRow7Contract": {
        "value": ""
      },
      "ExpiryRow7VM": {
        "value": ""
      },
      "ExpiryRow7Reference": {
        "value": ""
      },
      "ExpiryRow7Restored": {
        "value": ""
      },
      "ExpiryRow7Expires": {
        "value": ""
      },
      "ExpiryRow7Original": {
        "value": ""
      },
      "ExpiryRow7Consumed": {
        "value": ""
      },
      "ExpiryRow7Expired": {
        "value": ""
      },
      "ExpiryRow7Remaining": {
        "value": ""
      },
      "ExpiryRow7Type": {
        "value": ""
      },
      "ExpiryRow7Status": {
        "value": ""
      },
      "ExpiryRow7Days": {
        "value": ""
      },
      "ExpiryRecord8Visible": {
        "value": false
      },
      "ExpiryRow8Contract": {
        "value": ""
      },
      "ExpiryRow8VM": {
        "value": ""
      },
      "ExpiryRow8Reference": {
        "value": ""
      },
      "ExpiryRow8Restored": {
        "value": ""
      },
      "ExpiryRow8Expires": {
        "value": ""
      },
      "ExpiryRow8Original": {
        "value": ""
      },
      "ExpiryRow8Consumed": {
        "value": ""
      },
      "ExpiryRow8Expired": {
        "value": ""
      },
      "ExpiryRow8Remaining": {
        "value": ""
      },
      "ExpiryRow8Type": {
        "value": ""
      },
      "ExpiryRow8Status": {
        "value": ""
      },
      "ExpiryRow8Days": {
        "value": ""
      },
      "ExpiryRecord9Visible": {
        "value": false
      },
      "ExpiryRow9Contract": {
        "value": ""
      },
      "ExpiryRow9VM": {
        "value": ""
      },
      "ExpiryRow9Reference": {
        "value": ""
      },
      "ExpiryRow9Restored": {
        "value": ""
      },
      "ExpiryRow9Expires": {
        "value": ""
      },
      "ExpiryRow9Original": {
        "value": ""
      },
      "ExpiryRow9Consumed": {
        "value": ""
      },
      "ExpiryRow9Expired": {
        "value": ""
      },
      "ExpiryRow9Remaining": {
        "value": ""
      },
      "ExpiryRow9Type": {
        "value": ""
      },
      "ExpiryRow9Status": {
        "value": ""
      },
      "ExpiryRow9Days": {
        "value": ""
      },
      "ExpiryRecord10Visible": {
        "value": false
      },
      "ExpiryRow10Contract": {
        "value": ""
      },
      "ExpiryRow10VM": {
        "value": ""
      },
      "ExpiryRow10Reference": {
        "value": ""
      },
      "ExpiryRow10Restored": {
        "value": ""
      },
      "ExpiryRow10Expires": {
        "value": ""
      },
      "ExpiryRow10Original": {
        "value": ""
      },
      "ExpiryRow10Consumed": {
        "value": ""
      },
      "ExpiryRow10Expired": {
        "value": ""
      },
      "ExpiryRow10Remaining": {
        "value": ""
      },
      "ExpiryRow10Type": {
        "value": ""
      },
      "ExpiryRow10Status": {
        "value": ""
      },
      "ExpiryRow10Days": {
        "value": ""
      },
      "ExpiryRecord11Visible": {
        "value": false
      },
      "ExpiryRow11Contract": {
        "value": ""
      },
      "ExpiryRow11VM": {
        "value": ""
      },
      "ExpiryRow11Reference": {
        "value": ""
      },
      "ExpiryRow11Restored": {
        "value": ""
      },
      "ExpiryRow11Expires": {
        "value": ""
      },
      "ExpiryRow11Original": {
        "value": ""
      },
      "ExpiryRow11Consumed": {
        "value": ""
      },
      "ExpiryRow11Expired": {
        "value": ""
      },
      "ExpiryRow11Remaining": {
        "value": ""
      },
      "ExpiryRow11Type": {
        "value": ""
      },
      "ExpiryRow11Status": {
        "value": ""
      },
      "ExpiryRow11Days": {
        "value": ""
      },
      "ExpiryRecord12Visible": {
        "value": false
      },
      "ExpiryRow12Contract": {
        "value": ""
      },
      "ExpiryRow12VM": {
        "value": ""
      },
      "ExpiryRow12Reference": {
        "value": ""
      },
      "ExpiryRow12Restored": {
        "value": ""
      },
      "ExpiryRow12Expires": {
        "value": ""
      },
      "ExpiryRow12Original": {
        "value": ""
      },
      "ExpiryRow12Consumed": {
        "value": ""
      },
      "ExpiryRow12Expired": {
        "value": ""
      },
      "ExpiryRow12Remaining": {
        "value": ""
      },
      "ExpiryRow12Type": {
        "value": ""
      },
      "ExpiryRow12Status": {
        "value": ""
      },
      "ExpiryRow12Days": {
        "value": ""
      },
      "ExpiryRecord13Visible": {
        "value": false
      },
      "ExpiryRow13Contract": {
        "value": ""
      },
      "ExpiryRow13VM": {
        "value": ""
      },
      "ExpiryRow13Reference": {
        "value": ""
      },
      "ExpiryRow13Restored": {
        "value": ""
      },
      "ExpiryRow13Expires": {
        "value": ""
      },
      "ExpiryRow13Original": {
        "value": ""
      },
      "ExpiryRow13Consumed": {
        "value": ""
      },
      "ExpiryRow13Expired": {
        "value": ""
      },
      "ExpiryRow13Remaining": {
        "value": ""
      },
      "ExpiryRow13Type": {
        "value": ""
      },
      "ExpiryRow13Status": {
        "value": ""
      },
      "ExpiryRow13Days": {
        "value": ""
      },
      "ExpiryRecord14Visible": {
        "value": false
      },
      "ExpiryRow14Contract": {
        "value": ""
      },
      "ExpiryRow14VM": {
        "value": ""
      },
      "ExpiryRow14Reference": {
        "value": ""
      },
      "ExpiryRow14Restored": {
        "value": ""
      },
      "ExpiryRow14Expires": {
        "value": ""
      },
      "ExpiryRow14Original": {
        "value": ""
      },
      "ExpiryRow14Consumed": {
        "value": ""
      },
      "ExpiryRow14Expired": {
        "value": ""
      },
      "ExpiryRow14Remaining": {
        "value": ""
      },
      "ExpiryRow14Type": {
        "value": ""
      },
      "ExpiryRow14Status": {
        "value": ""
      },
      "ExpiryRow14Days": {
        "value": ""
      },
      "ExpiryRecord15Visible": {
        "value": false
      },
      "ExpiryRow15Contract": {
        "value": ""
      },
      "ExpiryRow15VM": {
        "value": ""
      },
      "ExpiryRow15Reference": {
        "value": ""
      },
      "ExpiryRow15Restored": {
        "value": ""
      },
      "ExpiryRow15Expires": {
        "value": ""
      },
      "ExpiryRow15Original": {
        "value": ""
      },
      "ExpiryRow15Consumed": {
        "value": ""
      },
      "ExpiryRow15Expired": {
        "value": ""
      },
      "ExpiryRow15Remaining": {
        "value": ""
      },
      "ExpiryRow15Type": {
        "value": ""
      },
      "ExpiryRow15Status": {
        "value": ""
      },
      "ExpiryRow15Days": {
        "value": ""
      },
      "ExpiryRecord16Visible": {
        "value": false
      },
      "ExpiryRow16Contract": {
        "value": ""
      },
      "ExpiryRow16VM": {
        "value": ""
      },
      "ExpiryRow16Reference": {
        "value": ""
      },
      "ExpiryRow16Restored": {
        "value": ""
      },
      "ExpiryRow16Expires": {
        "value": ""
      },
      "ExpiryRow16Original": {
        "value": ""
      },
      "ExpiryRow16Consumed": {
        "value": ""
      },
      "ExpiryRow16Expired": {
        "value": ""
      },
      "ExpiryRow16Remaining": {
        "value": ""
      },
      "ExpiryRow16Type": {
        "value": ""
      },
      "ExpiryRow16Status": {
        "value": ""
      },
      "ExpiryRow16Days": {
        "value": ""
      },
      "ExpiryRecord17Visible": {
        "value": false
      },
      "ExpiryRow17Contract": {
        "value": ""
      },
      "ExpiryRow17VM": {
        "value": ""
      },
      "ExpiryRow17Reference": {
        "value": ""
      },
      "ExpiryRow17Restored": {
        "value": ""
      },
      "ExpiryRow17Expires": {
        "value": ""
      },
      "ExpiryRow17Original": {
        "value": ""
      },
      "ExpiryRow17Consumed": {
        "value": ""
      },
      "ExpiryRow17Expired": {
        "value": ""
      },
      "ExpiryRow17Remaining": {
        "value": ""
      },
      "ExpiryRow17Type": {
        "value": ""
      },
      "ExpiryRow17Status": {
        "value": ""
      },
      "ExpiryRow17Days": {
        "value": ""
      },
      "ExpiryRecord18Visible": {
        "value": false
      },
      "ExpiryRow18Contract": {
        "value": ""
      },
      "ExpiryRow18VM": {
        "value": ""
      },
      "ExpiryRow18Reference": {
        "value": ""
      },
      "ExpiryRow18Restored": {
        "value": ""
      },
      "ExpiryRow18Expires": {
        "value": ""
      },
      "ExpiryRow18Original": {
        "value": ""
      },
      "ExpiryRow18Consumed": {
        "value": ""
      },
      "ExpiryRow18Expired": {
        "value": ""
      },
      "ExpiryRow18Remaining": {
        "value": ""
      },
      "ExpiryRow18Type": {
        "value": ""
      },
      "ExpiryRow18Status": {
        "value": ""
      },
      "ExpiryRow18Days": {
        "value": ""
      },
      "ExpiryRecord19Visible": {
        "value": false
      },
      "ExpiryRow19Contract": {
        "value": ""
      },
      "ExpiryRow19VM": {
        "value": ""
      },
      "ExpiryRow19Reference": {
        "value": ""
      },
      "ExpiryRow19Restored": {
        "value": ""
      },
      "ExpiryRow19Expires": {
        "value": ""
      },
      "ExpiryRow19Original": {
        "value": ""
      },
      "ExpiryRow19Consumed": {
        "value": ""
      },
      "ExpiryRow19Expired": {
        "value": ""
      },
      "ExpiryRow19Remaining": {
        "value": ""
      },
      "ExpiryRow19Type": {
        "value": ""
      },
      "ExpiryRow19Status": {
        "value": ""
      },
      "ExpiryRow19Days": {
        "value": ""
      },
      "ExpiryRecord20Visible": {
        "value": false
      },
      "ExpiryRow20Contract": {
        "value": ""
      },
      "ExpiryRow20VM": {
        "value": ""
      },
      "ExpiryRow20Reference": {
        "value": ""
      },
      "ExpiryRow20Restored": {
        "value": ""
      },
      "ExpiryRow20Expires": {
        "value": ""
      },
      "ExpiryRow20Original": {
        "value": ""
      },
      "ExpiryRow20Consumed": {
        "value": ""
      },
      "ExpiryRow20Expired": {
        "value": ""
      },
      "ExpiryRow20Remaining": {
        "value": ""
      },
      "ExpiryRow20Type": {
        "value": ""
      },
      "ExpiryRow20Status": {
        "value": ""
      },
      "ExpiryRow20Days": {
        "value": ""
      },
      "ExpiryRecord21Visible": {
        "value": false
      },
      "ExpiryRow21Contract": {
        "value": ""
      },
      "ExpiryRow21VM": {
        "value": ""
      },
      "ExpiryRow21Reference": {
        "value": ""
      },
      "ExpiryRow21Restored": {
        "value": ""
      },
      "ExpiryRow21Expires": {
        "value": ""
      },
      "ExpiryRow21Original": {
        "value": ""
      },
      "ExpiryRow21Consumed": {
        "value": ""
      },
      "ExpiryRow21Expired": {
        "value": ""
      },
      "ExpiryRow21Remaining": {
        "value": ""
      },
      "ExpiryRow21Type": {
        "value": ""
      },
      "ExpiryRow21Status": {
        "value": ""
      },
      "ExpiryRow21Days": {
        "value": ""
      },
      "ExpiryRecord22Visible": {
        "value": false
      },
      "ExpiryRow22Contract": {
        "value": ""
      },
      "ExpiryRow22VM": {
        "value": ""
      },
      "ExpiryRow22Reference": {
        "value": ""
      },
      "ExpiryRow22Restored": {
        "value": ""
      },
      "ExpiryRow22Expires": {
        "value": ""
      },
      "ExpiryRow22Original": {
        "value": ""
      },
      "ExpiryRow22Consumed": {
        "value": ""
      },
      "ExpiryRow22Expired": {
        "value": ""
      },
      "ExpiryRow22Remaining": {
        "value": ""
      },
      "ExpiryRow22Type": {
        "value": ""
      },
      "ExpiryRow22Status": {
        "value": ""
      },
      "ExpiryRow22Days": {
        "value": ""
      },
      "ExpiryRecord23Visible": {
        "value": false
      },
      "ExpiryRow23Contract": {
        "value": ""
      },
      "ExpiryRow23VM": {
        "value": ""
      },
      "ExpiryRow23Reference": {
        "value": ""
      },
      "ExpiryRow23Restored": {
        "value": ""
      },
      "ExpiryRow23Expires": {
        "value": ""
      },
      "ExpiryRow23Original": {
        "value": ""
      },
      "ExpiryRow23Consumed": {
        "value": ""
      },
      "ExpiryRow23Expired": {
        "value": ""
      },
      "ExpiryRow23Remaining": {
        "value": ""
      },
      "ExpiryRow23Type": {
        "value": ""
      },
      "ExpiryRow23Status": {
        "value": ""
      },
      "ExpiryRow23Days": {
        "value": ""
      },
      "ExpiryRecord24Visible": {
        "value": false
      },
      "ExpiryRow24Contract": {
        "value": ""
      },
      "ExpiryRow24VM": {
        "value": ""
      },
      "ExpiryRow24Reference": {
        "value": ""
      },
      "ExpiryRow24Restored": {
        "value": ""
      },
      "ExpiryRow24Expires": {
        "value": ""
      },
      "ExpiryRow24Original": {
        "value": ""
      },
      "ExpiryRow24Consumed": {
        "value": ""
      },
      "ExpiryRow24Expired": {
        "value": ""
      },
      "ExpiryRow24Remaining": {
        "value": ""
      },
      "ExpiryRow24Type": {
        "value": ""
      },
      "ExpiryRow24Status": {
        "value": ""
      },
      "ExpiryRow24Days": {
        "value": ""
      },
      "ExpiryHasPrevious": {
        "value": false
      },
      "ExpiryHasNext": {
        "value": false
      },
      "ExpiryStatusCaption": {
        "value": "All statuses"
      }
    }
  }
]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
 modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
  {
    "operation": "merge",
    "path": [
      "dataSources",
      "PDS",
      "config"
    ],
    "values": {
      "entitySchemaName": "UsrDashboard"
    }
  }
]/**SCHEMA_MODEL_CONFIG_DIFF*/,
 handlers: /**SCHEMA_HANDLERS*/[
 {request:"crt.HandleViewModelInitRequest",handler:async(request,next)=>{const result=await next?.handle(request);await runtime.init(request.$context);return result;}},
 {request:"crt.HandleViewModelDestroyRequest",handler:(request,next)=>{runtime.dispose(request.$context);return next?.handle(request);}},
 {request:"crt.HandleViewModelAttributeChangeRequest",handler:async(request,next)=>{const result=await next?.handle(request);runtime.attributeChanged(request.$context,request.attributeName);return result;}},
 {request:"usr.ExpirySelectSort",handler:async request=>runtime.selectSort(request.$context,request)},
 {request:"usr.ExpirySelectStatus",handler:async request=>runtime.selectStatus(request.$context,request)},
 {request:"usr.ExpiryPageRequest",handler:async request=>runtime.page(request.$context,request)},
 {request:"usr.ExpiryOpenRecord",handler:async request=>runtime.openRecord(request.$context,request)}
]/**SCHEMA_HANDLERS*/,
 converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
 validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
 };
});

define("UsrTEOpsDashboard_ListPage", /**SCHEMA_DEPS*/[
    "UsrMCITTeOpsNativeDashboardRuntime",
    "css!UsrMCITTeOpsDashboardCSS"
]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(runtime)/**SCHEMA_ARGS*/ {
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
				"name": "TeOpsRoot",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-dashboard"
					]
				},
				"parentName": "Main",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsHeader",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(0, 1fr)",
						"max-content"
					],
					"rows": "auto",
					"items": [],
					"classes": [
						"mcit-teops-header"
					]
				},
				"parentName": "TeOpsRoot",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsTitleBlock",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-title"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "TeOpsHeader",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Label_w5djqsr",
				"values": {
					"type": "crt.Label",
					"caption": "TE Operations Dashboard",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsTitleBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsSubtitle",
				"values": {
					"type": "crt.Label",
					"caption": "TE Operations · Operational overview",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsTitleBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsActions",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"max-content",
						"max-content"
					],
					"rows": "auto",
					"items": [],
					"classes": [
						"mcit-teops-actions",
						"mcit-teops-header-actions"
					],
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "TeOpsHeader",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Button_wnf25g3",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "Export Report",
					"color": "default",
					"size": "medium",
					"iconPosition": "left-icon",
					"icon": "download-button-icon",
					"clicked": {
						"request": "usr.TeOpsExportRequest"
					},
					"visible": "$TeOpsCanExport"
				},
				"parentName": "TeOpsActions",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Button_ju6rdk4",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Button",
					"caption": "Refresh",
					"color": "default",
					"size": "medium",
					"iconPosition": "left-icon",
					"icon": "image-update",
					"clicked": {
						"request": "usr.TeOpsRefreshRequest"
					}
				},
				"parentName": "TeOpsActions",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsContractSelector",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"max-content",
						"minmax(0, 1fr)",
						"max-content",
						"max-content"
					],
					"rows": "auto",
					"items": [],
					"classes": [
						"mcit-teops-actions",
						"mcit-teops-contract-selector"
					]
				},
				"parentName": "TeOpsRoot",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsContractSelectorPrevious",
				"values": {
					"type": "crt.Button",
					"caption": "Previous",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "usr.TeOpsContractRequest",
						"params": {
							"step": -1
						}
					},
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "TeOpsContractSelector",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsContractSelectorName",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsContractName",
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
						"mcit-teops-contract-name"
					]
				},
				"parentName": "TeOpsContractSelector",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsContractSelectorNext",
				"values": {
					"type": "crt.Button",
					"caption": "Next",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "usr.TeOpsContractRequest",
						"params": {
							"step": 1
						}
					},
					"layoutConfig": {
						"column": 3,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "TeOpsContractSelector",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "TeOpsContractSelectorAll",
				"values": {
					"type": "crt.Button",
					"caption": "All contracts",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "usr.TeOpsContractRequest",
						"params": {
							"all": true
						}
					},
					"layoutConfig": {
						"column": 4,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"iconPosition": "only-text"
				},
				"parentName": "TeOpsContractSelector",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "TeOpsNotice",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-notice"
					]
				},
				"parentName": "TeOpsRoot",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "TeOpsNoticeLabel",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsNoticeText",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsNotice",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_527rpk7",
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
						"mcit-teops-metrics"
					]
				},
				"parentName": "TeOpsRoot",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "TeOpsCardAwaitingReview",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-purple"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionAwaitingReview",
				"values": {
					"type": "crt.Label",
					"caption": "Awaiting Review",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardAwaitingReview",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueAwaitingReview",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsAwaitingReview",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardAwaitingReview",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardFinancialQueue",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-violet"
					],
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionFinancialQueue",
				"values": {
					"type": "crt.Label",
					"caption": "Financial Queue",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardFinancialQueue",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueFinancialQueue",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsFinancialQueue",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardFinancialQueue",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardTechnicalQueue",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-blue"
					],
					"layoutConfig": {
						"column": 3,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionTechnicalQueue",
				"values": {
					"type": "crt.Label",
					"caption": "Technical Queue",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardTechnicalQueue",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueTechnicalQueue",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsTechnicalQueue",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardTechnicalQueue",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardAwaitingMCIT",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-amber"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionAwaitingMCIT",
				"values": {
					"type": "crt.Label",
					"caption": "Awaiting MCIT",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardAwaitingMCIT",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueAwaitingMCIT",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsAwaitingMCIT",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardAwaitingMCIT",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardApproachingSLA",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-amber"
					],
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionApproachingSLA",
				"values": {
					"type": "crt.Label",
					"caption": "Approaching SLA",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardApproachingSLA",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueApproachingSLA",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsApproachingSLA",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardApproachingSLA",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardOverdue",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-red"
					],
					"layoutConfig": {
						"column": 3,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionOverdue",
				"values": {
					"type": "crt.Label",
					"caption": "Overdue",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardOverdue",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueOverdue",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsOverdue",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardOverdue",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardProvisioningQueue",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-green"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionProvisioningQueue",
				"values": {
					"type": "crt.Label",
					"caption": "Provisioning Queue",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardProvisioningQueue",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueProvisioningQueue",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsProvisioningQueue",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardProvisioningQueue",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardFailedProvisions",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-red"
					],
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionFailedProvisions",
				"values": {
					"type": "crt.Label",
					"caption": "Failed Provisions",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardFailedProvisions",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueFailedProvisions",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsFailedProvisions",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardFailedProvisions",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsCardCompletedToday",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-card",
						"mcit-teops-deep-green"
					],
					"layoutConfig": {
						"column": 3,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_527rpk7",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "TeOpsCaptionCompletedToday",
				"values": {
					"type": "crt.Label",
					"caption": "Completed Today",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardCompletedToday",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsValueCompletedToday",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsCompletedToday",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsCardCompletedToday",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_TeOpsCharts",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(0, 2fr)",
						"minmax(0, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": [],
					"classes": [
						"mcit-teops-charts"
					]
				},
				"parentName": "TeOpsRoot",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "TeOpsChartPanel1",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-chart",
						"mcit-teops-stage-panel"
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_TeOpsCharts",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TeOpsChartTitle1",
				"values": {
					"type": "crt.Label",
					"caption": "Active Work by Stage",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsChartPanel1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ChartWidget_bh4b4i2",
				"values": {
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(ChartWidget_bh4b4i2_title)#",
						"color": "vivid-purple",
						"theme": "without-fill",
						"scales": {
							"stacked": false,
							"xAxis": {
								"name": "#ResourceString(ChartWidget_bh4b4i2_xAxis)#",
								"formatting": {
									"type": "string",
									"maxLinesCount": 2,
									"maxLineLength": 10
								}
							},
							"yAxis": {
								"name": "#ResourceString(ChartWidget_bh4b4i2_yAxis)#",
								"formatting": {
									"type": "number",
									"thousandAbbreviation": {
										"enabled": true
									}
								}
							}
						},
						"series": [
							{
								"color": "burnt-coral",
								"type": "horizontal-bar",
								"label": "#ResourceString(ChartWidget_bh4b4i2_series_0)#",
								"legend": {
									"enabled": false
								},
								"data": {
									"providing": {
										"attribute": "ChartWidget_bh4b4i2_SeriesData_go252cn",
										"schemaName": "UsrRequestApproval",
										"filters": {
											"filter": {
												"items": {
													"5a736b07-5d2f-43f3-981e-da24e46890b6": {
														"filterType": 1,
														"comparisonType": 3,
														"isEnabled": true,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrIsCompleted"
														},
														"isAggregative": false,
														"dataValueType": 12,
														"rightExpression": {
															"expressionType": 2,
															"parameter": {
																"dataValueType": 12,
																"value": false
															}
														}
													},
													"aef8c8b7-667f-4530-97af-45ad82c5f968": {
														"filterType": 4,
														"comparisonType": 3,
														"isEnabled": true,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrRequest.UsrStatus"
														},
														"isAggregative": false,
														"dataValueType": 10,
														"referenceSchemaName": "UsrMCITRequestStatus",
														"rightExpressions": [
															{
																"expressionType": 2,
																"parameter": {
																	"dataValueType": 10,
																	"value": {
																		"Name": "Under TE Review",
																		"Id": "5d87de31-758b-4218-929b-2a8363d01f32",
																		"value": "5d87de31-758b-4218-929b-2a8363d01f32",
																		"displayValue": "Under TE Review"
																	}
																}
															}
														]
													},
													"77415bf7-4a92-4a7e-80f1-28aad43efcc5": {
														"filterType": 1,
														"comparisonType": 3,
														"isEnabled": true,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrRequest.UsrIsArchived"
														},
														"isAggregative": false,
														"dataValueType": 12,
														"rightExpression": {
															"expressionType": 2,
															"parameter": {
																"dataValueType": 12,
																"value": false
															}
														}
													},
													"columnIsNotNullFilter": {
														"comparisonType": 2,
														"filterType": 2,
														"isEnabled": true,
														"isNull": false,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrStage"
														}
													}
												},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "UsrRequestApproval"
											},
											"filterAttributes": []
										},
										"aggregation": {
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 1,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													},
													"functionType": 2,
													"aggregationType": 1,
													"aggregationEvalType": 2
												}
											}
										},
										"dependencies": [],
										"rowCount": 50,
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "UsrStage"
												}
											}
										}
									},
									"formatting": {
										"type": "number",
										"decimalSeparator": ".",
										"decimalPrecision": 0,
										"thousandSeparator": ","
									}
								},
								"dataLabel": {
									"display": true
								}
							}
						],
						"seriesOrder": {
							"type": "by-grouping-value",
							"direction": 1
						},
						"layout": {}
					},
					"visible": "$TeOpsStageChartVisible",
					"sectionBindingColumnRecordId": "$Id"
				},
				"parentName": "TeOpsChartPanel1",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsChartNotice1",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsStageText",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsChartPanel1",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "TeOpsChartPanel2",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "column",
					"items": [],
					"classes": [
						"mcit-teops-chart",
						"mcit-teops-sla-panel"
					],
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					}
				},
				"parentName": "GridContainer_TeOpsCharts",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsChartTitle2",
				"values": {
					"type": "crt.Label",
					"caption": "SLA Compliance",
					"labelType": "headline-1",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsChartPanel2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ChartWidget_rtt5ovt",
				"values": {
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(ChartWidget_rtt5ovt_title)#",
						"color": "dark-blue",
						"theme": "without-fill",
						"scales": {
							"stacked": false,
							"xAxis": {
								"name": "",
								"formatting": {
									"type": "string",
									"maxLinesCount": 2,
									"maxLineLength": 10
								}
							},
							"yAxis": {
								"name": "",
								"formatting": {
									"type": "number",
									"thousandAbbreviation": {
										"enabled": true
									}
								}
							}
						},
						"series": [
							{
								"type": "doughnut",
								"label": "#ResourceString(ChartWidget_rtt5ovt_series_0)#",
								"legend": {
									"enabled": false
								},
								"data": {
									"providing": {
										"attribute": "ChartWidget_rtt5ovt_SeriesData_9y9nlvi",
										"schemaName": "UsrRequestApproval",
										"filters": {
											"filter": {
												"items": {
													"e31827f2-bcd9-4e54-b057-e94eceaadf91": {
														"filterType": 1,
														"comparisonType": 3,
														"isEnabled": true,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrIsCompleted"
														},
														"isAggregative": false,
														"dataValueType": 12,
														"rightExpression": {
															"expressionType": 2,
															"parameter": {
																"dataValueType": 12,
																"value": false
															}
														}
													},
													"92746016-e925-4c55-8fb2-5cd6dc8ea65c": {
														"filterType": 4,
														"comparisonType": 3,
														"isEnabled": true,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrRequest.UsrStatus"
														},
														"isAggregative": false,
														"dataValueType": 10,
														"referenceSchemaName": "UsrMCITRequestStatus",
														"rightExpressions": [
															{
																"expressionType": 2,
																"parameter": {
																	"dataValueType": 10,
																	"value": {
																		"Name": "Under TE Review",
																		"Id": "5d87de31-758b-4218-929b-2a8363d01f32",
																		"value": "5d87de31-758b-4218-929b-2a8363d01f32",
																		"displayValue": "Under TE Review"
																	}
																}
															}
														]
													},
													"3e396735-00a6-458a-867f-9860f9b31e41": {
														"filterType": 1,
														"comparisonType": 3,
														"isEnabled": true,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrRequest.UsrIsArchived"
														},
														"isAggregative": false,
														"dataValueType": 12,
														"rightExpression": {
															"expressionType": 2,
															"parameter": {
																"dataValueType": 12,
																"value": false
															}
														}
													},
													"columnIsNotNullFilter": {
														"comparisonType": 2,
														"filterType": 2,
														"isEnabled": true,
														"isNull": false,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "UsrSLAStatus"
														}
													}
												},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "UsrRequestApproval"
											},
											"filterAttributes": []
										},
										"aggregation": {
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 1,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													},
													"functionType": 2,
													"aggregationType": 1,
													"aggregationEvalType": 2
												}
											}
										},
										"dependencies": [],
										"rowCount": 50,
										"grouping": {
											"type": "by-value",
											"column": {
												"orderDirection": 0,
												"orderPosition": -1,
												"isVisible": true,
												"expression": {
													"expressionType": 0,
													"columnPath": "UsrSLAStatus"
												}
											}
										}
									},
									"formatting": {
										"type": "number",
										"decimalSeparator": ".",
										"decimalPrecision": 0,
										"thousandSeparator": ","
									}
								},
								"dataLabel": {
									"display": false
								}
							}
						],
						"seriesOrder": {
							"type": "by-grouping-value",
							"direction": 1
						},
						"layout": {}
					},
					"visible": "$TeOpsSlaChartVisible",
					"sectionBindingColumnRecordId": "$Id"
				},
				"parentName": "TeOpsChartPanel2",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TeOpsChartNotice2",
				"values": {
					"type": "crt.Label",
					"caption": "$TeOpsSlaText",
					"labelType": "body",
					"labelThickness": "default",
					"labelEllipsis": false,
					"labelColor": "auto",
					"labelBackgroundColor": "transparent",
					"labelTextAlign": "start",
					"headingLevel": "label"
				},
				"parentName": "TeOpsChartPanel2",
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
					"TeOpsNoticeText": {
						"value": "Loading dashboard…"
					},
					"TeOpsAwaitingReview": {
						"value": "—"
					},
					"TeOpsFinancialQueue": {
						"value": "—"
					},
					"TeOpsTechnicalQueue": {
						"value": "—"
					},
					"TeOpsAwaitingMCIT": {
						"value": "—"
					},
					"TeOpsApproachingSLA": {
						"value": "—"
					},
					"TeOpsOverdue": {
						"value": "—"
					},
					"TeOpsProvisioningQueue": {
						"value": "—"
					},
					"TeOpsFailedProvisions": {
						"value": "—"
					},
					"TeOpsCompletedToday": {
						"value": "—"
					},
					"TeOpsContractName": {
						"value": "All authorized contracts"
					},
					"TeOpsStageSeries": {
						"value": [
							[]
						]
					},
					"TeOpsSlaSeries": {
						"value": [
							[]
						]
					},
					"TeOpsStageText": {
						"value": "Waiting for authorized data."
					},
					"TeOpsSlaText": {
						"value": "Waiting for authorized SLA data."
					},
					"TeOpsCanExport": {
						"value": false
					},
					"TeOpsStageChartVisible": {
						"value": false
					},
					"TeOpsSlaChartVisible": {
						"value": false
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "remove",
				"path": [],
				"properties": [
					"dependencies"
				]
			},
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
            {request: "crt.HandleViewModelInitRequest", handler: async (request, next) => {
                const result = await next?.handle(request); await runtime.init(request.$context); return result;
            }},
            {request: "usr.TeOpsRefreshRequest", handler: async request => runtime.refresh(request.$context)},
            {request: "usr.TeOpsExportRequest", handler: async request => runtime.exportReport(request.$context)},
            {request: "usr.TeOpsContractRequest", handler: async request => runtime.select(request.$context, request)}
        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
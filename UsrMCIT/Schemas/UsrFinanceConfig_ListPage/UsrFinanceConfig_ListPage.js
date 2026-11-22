define("UsrFinanceConfig_ListPage", /**SCHEMA_DEPS*/["@creatio-devkit/common"]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/(sdk)/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "AddButton",
				"values": {
					"caption": "New Version",
					"size": "large"
				}
			},
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrContractConfigVersion"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "MainContainer",
				"values": {
					"color": "#F8FAFC",
					"wrap": "nowrap"
				}
			},
			{
				"operation": "move",
				"name": "MainFilterContainer",
				"parentName": "UsrFinanceVersionsTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "LeftFilterContainer",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 3,
						"rowSpan": 1
					}
				}
			},
			{
				"operation": "remove",
				"name": "RightFilterContainer",
				"properties": [
					"layoutConfig"
				]
			},
			{
				"operation": "move",
				"name": "RightFilterContainer",
				"parentName": "LeftFilterContainerInner",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "remove",
				"name": "FolderTree",
				"properties": [
					"layoutConfig"
				]
			},
			{
				"operation": "move",
				"name": "FolderTree",
				"parentName": "UsrFinanceVersionsTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"rootSchemaName": "UsrContractConfigVersion"
				}
			},
			{
				"operation": "remove",
				"name": "Filters",
				"properties": [
					"layoutConfig"
				]
			},
			{
				"operation": "move",
				"name": "Filters",
				"parentName": "UsrFinanceVersionsTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "Filters",
				"values": {
					"stretch": false
				}
			},
			{
				"operation": "merge",
				"name": "SectionContentWrapper",
				"values": {
					"direction": "row"
				}
			},
			{
				"operation": "move",
				"name": "SectionContentWrapper",
				"parentName": "UsrFinanceVersionsTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "remove",
				"name": "ListContainer"
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "f252f581-0ccf-44ac-b7c9-c00df2ad9919",
							"code": "PDS_UsrName",
							"caption": "Configuration name",
							"dataValueType": 1
						},
						{
							"id": "6d36ec7b-19bc-41a9-8817-372021eb7f31",
							"code": "PDS_UsrContract",
							"caption": "Contract",
							"dataValueType": 10
						},
						{
							"id": "de6957c8-9e66-4884-a186-8a3d50ae0f92",
							"code": "PDS_UsrVersionNumber",
							"caption": "Version number",
							"dataValueType": 1
						},
						{
							"id": "abc418bc-4520-4505-9654-ac3a172efa41",
							"code": "PDS_UsrConfigVersionStatus",
							"caption": "Status",
							"dataValueType": 10
						},
						{
							"id": "fb55fc03-cdf1-4fea-86ce-247099fdb8b7",
							"code": "PDS_UsrEffectiveFrom",
							"caption": "Effective from",
							"dataValueType": 7
						},
						{
							"id": "2a5478b5-c412-490f-a3b3-cab89b6842de",
							"code": "PDS_UsrEffectiveTo",
							"caption": "Effective to",
							"dataValueType": 7
						},
						{
							"id": "c8689d78-80ba-4e71-8cf2-fa478e3be5bc",
							"code": "PDS_CreatedOn",
							"caption": "Created on",
							"dataValueType": 7
						},
						{
							"id": "fd4b3485-a46e-4219-b775-adef1210fe51",
							"code": "PDS_CreatedBy",
							"caption": "Created by",
							"dataValueType": 10
						}
					],
					"layoutConfig": {
						"column": 1,
						"colSpan": 4,
						"row": 1,
						"rowSpan": 14
					}
				}
			},
			{
				"operation": "move",
				"name": "DataTable",
				"parentName": "GridContainer_bw297bz",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "UsrContractConfigVersion",
						"dependencies": [
							{
								"attributePath": "Id",
								"relationPath": "PDS.Id"
							}
						],
						"filters": []
					}
				}
			},
			{
				"operation": "insert",
				"name": "FlexContainer_f2avkan",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"padding": {
						"top": "large",
						"right": "large",
						"bottom": "large",
						"left": "large"
					},
					"color": "#F8FAFC",
					"borderRadius": "small",
					"justifyContent": "center",
					"gap": "large"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_2df1nqy",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_2df1nqy_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_2df1nqy_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null,
							"providing": {
								"attribute": "IndicatorWidget_2df1nqy_Data",
								"schemaName": "UsrContractConfigVersion",
								"filters": {
									"filter": {
										"items": {
											"ed0a3dca-cde0-4190-9c62-9ef210a2f8be": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrConfigVersionStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrConfigVersionStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Draft",
																"Id": "d153cb20-1a9c-44bf-8ced-1a53f88eed22",
																"value": "d153cb20-1a9c-44bf-8ced-1a53f88eed22",
																"displayValue": "Draft"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrContractConfigVersion"
									},
									"filterAttributes": [
										{
											"attribute": "QuickFilter_ghstixv_IndicatorWidget_2df1nqy_Data",
											"loadOnChange": true
										}
									]
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
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_2df1nqy_hint)#"
					},
					"layoutConfig": {
						"width": 202.390625
					}
				},
				"parentName": "FlexContainer_f2avkan",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_hzkxiee",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_hzkxiee_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_hzkxiee_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null,
							"providing": {
								"attribute": "IndicatorWidget_hzkxiee_Data",
								"schemaName": "UsrContractConfigVersion",
								"filters": {
									"filter": {
										"items": {
											"0b90afa8-619f-465d-ac85-4f8f631121c2": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrConfigVersionStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrConfigVersionStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Scheduled",
																"Id": "1cd0011f-6971-49b3-a5b8-04d46130daee",
																"value": "1cd0011f-6971-49b3-a5b8-04d46130daee",
																"displayValue": "Scheduled"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrContractConfigVersion"
									},
									"filterAttributes": [
										{
											"attribute": "QuickFilter_ghstixv_IndicatorWidget_hzkxiee_Data",
											"loadOnChange": true
										}
									]
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
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_hzkxiee_hint)#"
					},
					"layoutConfig": {
						"width": 173.359375
					}
				},
				"parentName": "FlexContainer_f2avkan",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_so5fw0r",
				"values": {
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_so5fw0r_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_so5fw0r_config_text_template)#",
							"metricMacros": "{0}",
							"labelPosition": "above-under",
							"fontSizeMode": "medium"
						},
						"data": {
							"formatting": {
								"type": "number",
								"decimalPrecision": 0,
								"decimalSeparator": ".",
								"thousandSeparator": ","
							},
							"comparisonProviding": null,
							"providing": {
								"attribute": "IndicatorWidget_so5fw0r_Data",
								"schemaName": "UsrContractConfigVersion",
								"filters": {
									"filter": {
										"items": {
											"0fce6e57-280e-445f-acfb-7107e3bbf905": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrConfigVersionStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrConfigVersionStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Active",
																"Id": "e7d05248-9d33-41c3-b688-c0b172b039cc",
																"value": "e7d05248-9d33-41c3-b688-c0b172b039cc",
																"displayValue": "Active"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrContractConfigVersion"
									},
									"filterAttributes": [
										{
											"attribute": "QuickFilter_ghstixv_IndicatorWidget_so5fw0r_Data",
											"loadOnChange": true
										}
									]
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
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_so5fw0r_hint)#"
					},
					"layoutConfig": {
						"width": 219.78125
					}
				},
				"parentName": "FlexContainer_f2avkan",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrFinanceRatesTabs",
				"values": {
					"type": "crt.TabPanel",
					"items": [],
					"styleType": "default",
					"mode": "tab",
					"selectedTab": {
						"value": "UsrFinanceVersionsTab"
					},
					"stretch": true,
					"bodyBackgroundColor": "primary-contrast-500",
					"underlineSelectedTabColor": "crt-color-navy-blue",
					"selectedTabTitleColor": "#4F43C1",
					"tabTitleColor": "#4F43C1",
					"headerBackgroundColor": "auto",
					"allowToggleClose": true
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrFinanceVersionsTab",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Configuration Versions",
					"iconPosition": "only-text"
				},
				"parentName": "UsrFinanceRatesTabs",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "QuickFilter_ghstixv",
				"values": {
					"type": "crt.QuickFilter",
					"config": {
						"caption": "#ResourceString(QuickFilter_ghstixv_config_caption)#",
						"hint": "",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"defaultValue": [],
						"entitySchemaName": "UsrMCITContract",
						"recordsFilter": null,
						"defaultValueListSorting": null,
						"recordsSorting": null
					},
					"_filterOptions": {
						"expose": [
							{
								"attribute": "QuickFilter_ghstixv_Items",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "Items",
													"filterColumn": "UsrContract"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "QuickFilter_ghstixv_Value"
					},
					"filterType": "lookup"
				},
				"parentName": "LeftFilterContainerInner",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "QuickFilter_g9wucbw",
				"values": {
					"type": "crt.QuickFilter",
					"config": {
						"caption": "#ResourceString(QuickFilter_g9wucbw_config_caption)#",
						"hint": "",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"defaultValue": [],
						"entitySchemaName": "UsrConfigVersionStatus",
						"recordsFilter": null,
						"defaultValueListSorting": null
					},
					"_filterOptions": {
						"expose": [
							{
								"attribute": "QuickFilter_g9wucbw_Items",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "Items",
													"filterColumn": "UsrConfigVersionStatus"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "QuickFilter_g9wucbw_IndicatorWidget_2df1nqy_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "IndicatorWidget_2df1nqy_Data",
													"filterColumn": "UsrConfigVersionStatus"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "QuickFilter_g9wucbw_IndicatorWidget_hzkxiee_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "IndicatorWidget_hzkxiee_Data",
													"filterColumn": "UsrConfigVersionStatus"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							},
							{
								"attribute": "QuickFilter_g9wucbw_IndicatorWidget_so5fw0r_Data",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "IndicatorWidget_so5fw0r_Data",
													"filterColumn": "UsrConfigVersionStatus"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "QuickFilter_g9wucbw_Value"
					},
					"filterType": "lookup"
				},
				"parentName": "LeftFilterContainerInner",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GridContainer_bw297bz",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": []
				},
				"parentName": "ListTabContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrFinanceResourceRatesTab",
				"values": {
					"type": "crt.TabContainer",
					"items": [],
					"caption": "Resource Rates",
					"iconPosition": "only-text"
				},
				"parentName": "UsrFinanceRatesTabs",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrResourceRatePanel",
				"values": {
					"type": "crt.FlexContainer",
					"items": [],
					"direction": "column",
					"gap": "medium",
					"padding": {
						"top": "large",
						"right": "large",
						"bottom": "large",
						"left": "large"
					},
					"color": "primary-contrast-500",
					"borderRadius": "medium"
				},
				"parentName": "UsrFinanceResourceRatesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrResourceRateTitle",
				"values": {
					"type": "crt.Label",
					"caption": "Configuration Resource Rates",
					"labelType": "headline-2"
				},
				"parentName": "UsrResourceRatePanel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrResourceRateNote",
				"values": {
					"type": "crt.Label",
					"caption": "Resource rates belong to a specific configuration version. Filter by version, then add or update the contracted unit prices and points.",
					"labelType": "body"
				},
				"parentName": "UsrResourceRatePanel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrResourceRatesTools",
				"values": {
					"type": "crt.FlexContainer",
					"items": [],
					"direction": "row",
					"gap": "medium",
					"alignItems": "center"
				},
				"parentName": "UsrResourceRatePanel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrResourceVersionQuickFilter",
				"values": {
					"type": "crt.QuickFilter",
					"config": {
						"caption": "Configuration Version",
						"hint": "Filter Resource Rates by configuration version",
						"icon": "filter-column-icon",
						"iconPosition": "left-icon",
						"defaultValue": [],
						"entitySchemaName": "UsrContractConfigVersion",
						"recordsFilter": null,
						"defaultValueListSorting": null
					},
					"_filterOptions": {
						"expose": [
							{
								"attribute": "UsrResourceRateVersionFilter",
								"converters": [
									{
										"converter": "crt.QuickFilterAttributeConverter",
										"args": [
											{
												"target": {
													"viewAttributeName": "UsrResourceRateItems",
													"filterColumn": "UsrConfigVersion"
												},
												"quickFilterType": "lookup"
											}
										]
									}
								]
							}
						],
						"from": "UsrResourceRateVersionFilterValue"
					},
					"filterType": "lookup"
				},
				"parentName": "UsrResourceRatesTools",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrNewResourceRateButton",
				"values": {
					"type": "crt.Button",
					"caption": "Add Resource Rate",
					"color": "primary",
					"size": "medium",
					"icon": "add-button-icon",
					"iconPosition": "left-icon",
					"clicked": {
						"request": "usr.MCITOpenRateEditor",
						"params": {}
					}
				},
				"parentName": "UsrResourceRatesTools",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrResourceRateReloadButton",
				"values": {
					"type": "crt.Button",
					"caption": "Refresh",
					"color": "default",
					"size": "medium",
					"clicked": {
						"request": "crt.LoadDataRequest",
						"params": {
							"dataSourceName": "UsrResourceRateDS",
							"config": {
								"loadType": "reload",
								"useLastLoadParameters": true
							}
						}
					}
				},
				"parentName": "UsrResourceRatesTools",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrResourceRateGrid",
				"values": {
					"type": "crt.DataGrid",
					"items": "$UsrResourceRateItems",
					"primaryColumnName": "UsrResourceRateDS_Id",
					"columns": [
						{
							"id": "49694169-e5fb-5cfc-85bc-779bb5fad927",
							"code": "UsrResourceRateDS_UsrName",
							"caption": "Rate name",
							"dataValueType": 1
						},
						{
							"id": "be51c7db-f797-56f7-b43d-dbee5d69e77b",
							"code": "UsrResourceRateDS_UsrConfigVersion",
							"caption": "Configuration version",
							"dataValueType": 10
						},
						{
							"id": "348307b8-607f-53e7-8103-e17fae55f3c2",
							"code": "UsrResourceRateDS_UsrResourceType",
							"caption": "Resource type",
							"dataValueType": 10
						},
						{
							"id": "c755d27b-25af-5f8c-b68f-86c654285f5d",
							"code": "UsrResourceRateDS_UsrPricingUnitLookup",
							"caption": "Pricing unit",
							"dataValueType": 10
						},
						{
							"id": "720cb379-12ea-58c8-8c00-625daa515077",
							"code": "UsrResourceRateDS_UsrAmountPerUnit",
							"caption": "Amount per unit",
							"dataValueType": 5
						},
						{
							"id": "d8b252a3-a2a8-564d-9096-81ac90acd982",
							"code": "UsrResourceRateDS_UsrCurrency",
							"caption": "Currency",
							"dataValueType": 10
						},
						{
							"id": "c8658276-a872-5434-9522-a53ddc9558a7",
							"code": "UsrResourceRateDS_UsrPointsPerUnit",
							"caption": "Points per unit",
							"dataValueType": 5
						}
					],
					"features": {
						"editable": false,
						"rows": {
							"toolbar": true
						}
					},
					"placeholder": false,
					"fitContent": false
				},
				"parentName": "UsrResourceRatePanel",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"UsrResourceRateItems": {
						"isCollection": true,
						"modelConfig": {
							"path": "UsrResourceRateDS",
							"filterAttributes": [
								{
									"name": "UsrResourceRateVersionFilter",
									"loadOnChange": true
								}
							],
							"pagingConfig": {
								"rowCount": 50
							},
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrName",
										"direction": "asc"
									}
								]
							}
						},
						"viewModelConfig": {
							"attributes": {
								"UsrResourceRateDS_Id": {
									"modelConfig": {
										"path": "UsrResourceRateDS.Id"
									}
								},
								"UsrResourceRateDS_UsrName": {
									"modelConfig": {
										"path": "UsrResourceRateDS.UsrName"
									}
								},
								"UsrResourceRateDS_UsrConfigVersion": {
									"modelConfig": {
										"path": "UsrResourceRateDS.UsrConfigVersion"
									}
								},
								"UsrResourceRateDS_UsrResourceType": {
									"modelConfig": {
										"path": "UsrResourceRateDS.UsrResourceType"
									}
								},
								"UsrResourceRateDS_UsrPricingUnitLookup": {
									"modelConfig": {
										"path": "UsrResourceRateDS.UsrPricingUnitLookup"
									}
								},
								"UsrResourceRateDS_UsrAmountPerUnit": {
									"modelConfig": {
										"path": "UsrResourceRateDS.UsrAmountPerUnit"
									}
								},
								"UsrResourceRateDS_UsrCurrency": {
									"modelConfig": {
										"path": "UsrResourceRateDS.UsrCurrency"
									}
								},
								"UsrResourceRateDS_UsrPointsPerUnit": {
									"modelConfig": {
										"path": "UsrResourceRateDS.UsrPointsPerUnit"
									}
								}
							}
						}
					},
					"UsrResourceRateVersionFilter": {},
					"UsrResourceRateVersionFilterValue": {}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Items",
					"viewModelConfig",
					"attributes"
				],
				"values": {
					"PDS_UsrName": {
						"modelConfig": {
							"path": "PDS.UsrName"
						}
					},
					"PDS_UsrContract": {
						"modelConfig": {
							"path": "PDS.UsrContract"
						}
					},
					"PDS_UsrVersionNumber": {
						"modelConfig": {
							"path": "PDS.UsrVersionNumber"
						}
					},
					"PDS_UsrConfigVersionStatus": {
						"modelConfig": {
							"path": "PDS.UsrConfigVersionStatus"
						}
					},
					"PDS_UsrEffectiveFrom": {
						"modelConfig": {
							"path": "PDS.UsrEffectiveFrom"
						}
					},
					"PDS_UsrEffectiveTo": {
						"modelConfig": {
							"path": "PDS.UsrEffectiveTo"
						}
					},
					"PDS_CreatedOn": {
						"modelConfig": {
							"path": "PDS.CreatedOn"
						}
					},
					"PDS_CreatedBy": {
						"modelConfig": {
							"path": "PDS.CreatedBy"
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"attributes",
					"Items",
					"modelConfig"
				],
				"values": {
					"filterAttributes": [
						{
							"loadOnChange": true,
							"name": "FolderTree_active_folder_filter"
						},
						{
							"loadOnChange": true,
							"name": "Items_PredefinedFilter"
						},
						{
							"loadOnChange": true,
							"name": "LookupQuickFilterByTag_Items"
						},
						{
							"loadOnChange": true,
							"name": "SearchFilter_Items"
						},
						{
							"loadOnChange": true,
							"name": "Filters_Filter"
						},
						{
							"loadOnChange": true,
							"name": "QuickFilter_ghstixv_Items"
						},
						{
							"loadOnChange": true,
							"name": "QuickFilter_g9wucbw_Items"
						}
					]
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
					"dataSources"
				],
				"values": {
					"UsrResourceRateDS": {
						"type": "crt.EntityDataSource",
						"scope": "viewElement",
						"config": {
							"entitySchemaName": "UsrConfigResourceRate",
							"attributes": {
								"Id": {
									"path": "Id"
								},
								"UsrName": {
									"path": "UsrName"
								},
								"UsrConfigVersion": {
									"path": "UsrConfigVersion"
								},
								"UsrResourceType": {
									"path": "UsrResourceType"
								},
								"UsrPricingUnitLookup": {
									"path": "UsrPricingUnitLookup"
								},
								"UsrAmountPerUnit": {
									"path": "UsrAmountPerUnit"
								},
								"UsrCurrency": {
									"path": "UsrCurrency"
								},
								"UsrPointsPerUnit": {
									"path": "UsrPointsPerUnit"
								}
							}
						}
					}
				}
			},
			{
				"operation": "merge",
				"path": [
					"dataSources",
					"PDS",
					"config"
				],
				"values": {
					"entitySchemaName": "UsrContractConfigVersion",
					"attributes": {
						"UsrName": {
							"path": "UsrName"
						},
						"UsrContract": {
							"path": "UsrContract"
						},
						"UsrVersionNumber": {
							"path": "UsrVersionNumber"
						},
						"UsrConfigVersionStatus": {
							"path": "UsrConfigVersionStatus"
						},
						"UsrEffectiveFrom": {
							"path": "UsrEffectiveFrom"
						},
						"UsrEffectiveTo": {
							"path": "UsrEffectiveTo"
						},
						"CreatedOn": {
							"path": "CreatedOn"
						},
						"CreatedBy": {
							"path": "CreatedBy"
						}
					}
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[
            {
                request: "usr.MCITOpenRateEditor",
                handler: async (request) => {
                    await usrOpenRateEditor(request.$context);
                }
            }
        ]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
	};
});
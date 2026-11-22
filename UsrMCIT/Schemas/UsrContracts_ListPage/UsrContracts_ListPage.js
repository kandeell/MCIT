define("UsrContracts_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "MainHeader",
				"values": {
					"color": "#F8FAFC",
					"padding": {
						"top": "large",
						"right": "large",
						"bottom": "large",
						"left": "large"
					}
				}
			},
			{
				"operation": "merge",
				"name": "AddButton",
				"values": {
					"caption": "#ResourceString(AddButton_caption)#",
					"size": "large",
					"styles": {
						"background-color": "#5B21A5",
						"color": "#FFFFFF"
					},
					"clickMode": "default"
				}
			},
			{
				"operation": "merge",
				"name": "MenuItem_ImportFromExcel",
				"values": {
					"clicked": {
						"request": "crt.ImportDataRequest",
						"params": {
							"entitySchemaName": "UsrMCITContract"
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
				"operation": "merge",
				"name": "MainFilterContainer",
				"values": {
					"color": "transparent"
				}
			},
			{
				"operation": "merge",
				"name": "LookupQuickFilterByTag",
				"values": {
					"config": {
						"caption": "#ResourceString(LookupQuickFilterByTag_config_caption)#",
						"hint": "#ResourceString(LookupQuickFilterByTag_config_hint)#",
						"icon": "tag-icon",
						"iconPosition": "left-icon",
						"entitySchemaName": "Tag_Virtual_Schema",
						"defaultValue": null,
						"recordsFilter": null,
						"defaultValueListSorting": null
					}
				}
			},
			{
				"operation": "merge",
				"name": "DataTable_Summaries",
				"values": {
					"expanded": "$DataTable_Summaries_Expanded"
				}
			},
			{
				"operation": "merge",
				"name": "FolderTree",
				"values": {
					"rootSchemaName": "UsrMCITContract"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "f252f581-0ccf-44ac-b7c9-c00df2ad9919",
							"code": "PDS_UsrName",
							"caption": "#ResourceString(PDS_UsrName)#",
							"dataValueType": 1
						},
						{
							"id": "c8689d78-80ba-4e71-8cf2-fa478e3be5bc",
							"code": "PDS_CreatedOn",
							"caption": "#ResourceString(PDS_CreatedOn)#",
							"dataValueType": 7
						},
						{
							"id": "fd4b3485-a46e-4219-b775-adef1210fe51",
							"code": "PDS_CreatedBy",
							"caption": "#ResourceString(PDS_CreatedBy)#",
							"dataValueType": 10
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Dashboards",
				"values": {
					"_designOptions": {
						"entitySchemaName": "UsrMCITContract",
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
				"name": "FlexContainer_9ruea39",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"wrap": "nowrap",
					"items": [],
					"padding": {
						"top": "small",
						"right": "small",
						"bottom": "small",
						"left": "small"
					},
					"color": "#F8FAFC",
					"alignItems": "flex-end",
					"justifyContent": "center",
					"gap": "extra-small"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_gy2ok74",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": [],
					"color": "#F8FAFC",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "FlexContainer_9ruea39",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_18t1d6x",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"rowSpan": 4,
						"row": 1
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_18t1d6x_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_18t1d6x_config_text_template)#",
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
								"attribute": "IndicatorWidget_18t1d6x_Data",
								"schemaName": "UsrMCITContract",
								"filters": {
									"filter": {
										"items": {
											"09792579-5232-47e6-a7ee-7fda18cee2ba": {
												"filterType": 4,
												"comparisonType": 4,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrMCITContractStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Closed",
																"Id": "4808d6f7-6a63-421c-bd32-751535f0b029",
																"value": "4808d6f7-6a63-421c-bd32-751535f0b029",
																"displayValue": "Closed"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrMCITContract"
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
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_18t1d6x_hint)#"
					}
				},
				"parentName": "GridContainer_gy2ok74",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_9bgkwq9",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": [],
					"color": "#F8FAFC",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "FlexContainer_9ruea39",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_42xyo1n",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 4
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_42xyo1n_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_42xyo1n_config_text_template)#",
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
								"attribute": "IndicatorWidget_42xyo1n_Data",
								"schemaName": "UsrMCITContract",
								"filters": {
									"filter": {
										"items": {
											"8babb090-5fb8-45ca-adc1-abcb9111eaca": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrMCITContractStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Active",
																"Id": "5f9739e9-4f5c-42ba-8157-d1e2468a27e4",
																"value": "5f9739e9-4f5c-42ba-8157-d1e2468a27e4",
																"displayValue": "Active"
															}
														}
													}
												]
											},
											"c3b8ec79-a158-428a-b5f0-51b41100ccf1": {
												"filterType": 1,
												"comparisonType": 8,
												"isEnabled": true,
												"trimDateTimeParameterToDate": true,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrEndDate"
												},
												"isAggregative": false,
												"dataValueType": 8,
												"rightExpression": {
													"expressionType": 1,
													"functionType": 1,
													"macrosType": 4
												}
											},
											"57e159d3-8f6f-42a0-9dde-f04b40a5a4f0": {
												"filterType": 1,
												"comparisonType": 6,
												"isEnabled": true,
												"trimDateTimeParameterToDate": true,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrEndDate"
												},
												"isAggregative": false,
												"dataValueType": 8,
												"rightExpression": {
													"expressionType": 1,
													"functionType": 1,
													"macrosType": 11
												}
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrMCITContract"
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
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_42xyo1n_hint)#"
					}
				},
				"parentName": "GridContainer_9bgkwq9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_6q2q6nh",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": [],
					"color": "#F8FAFC",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "FlexContainer_9ruea39",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_g7hve3d",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 4
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_g7hve3d_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_g7hve3d_config_text_template)#",
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
								"attribute": "IndicatorWidget_g7hve3d_Data",
								"schemaName": "UsrMCITContract",
								"filters": null,
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
						"hint": "#ResourceString(IndicatorWidget_g7hve3d_hint)#"
					}
				},
				"parentName": "GridContainer_6q2q6nh",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_7aqks71",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": [],
					"color": "#F8FAFC",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "FlexContainer_9ruea39",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_vk3knbn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 4
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_vk3knbn_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_vk3knbn_config_text_template)#",
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
								"attribute": "IndicatorWidget_vk3knbn_Data",
								"schemaName": "UsrPointTransaction",
								"filters": {
									"filter": {
										"items": {
											"eb62ebc2-c6bd-4540-9e40-3d771d907d6f": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrTransactionType"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrPointTransactionType",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Consumption",
																"Id": "cce3062d-a79e-4adb-bafe-f731ca2b3340",
																"value": "cce3062d-a79e-4adb-bafe-f731ca2b3340",
																"displayValue": "Consumption"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrPointTransaction"
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
												"columnPath": "UsrQuantity"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 0
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
						"hint": "#ResourceString(IndicatorWidget_vk3knbn_hint)#"
					}
				},
				"parentName": "GridContainer_7aqks71",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_qpgc0ek",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": [],
					"color": "#F8FAFC",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "FlexContainer_9ruea39",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_utpntv2",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 4
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_utpntv2_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_utpntv2_config_text_template)#",
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
								"attribute": "IndicatorWidget_utpntv2_Data",
								"schemaName": "UsrPointTransaction",
								"filters": {
									"filter": {
										"items": {
											"9f00ba99-74d5-4fe2-a48b-38e24cf99ebe": {
												"filterType": 4,
												"comparisonType": 3,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrTransactionType"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrPointTransactionType",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Restoration",
																"Id": "a73d30e6-e5e0-4ddb-a62c-ca1a29eb2bf9",
																"value": "a73d30e6-e5e0-4ddb-a62c-ca1a29eb2bf9",
																"displayValue": "Restoration"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrPointTransaction"
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
												"columnPath": "UsrQuantity"
											},
											"functionType": 2,
											"aggregationType": 2,
											"aggregationEvalType": 0
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
						"hint": "#ResourceString(IndicatorWidget_utpntv2_hint)#"
					}
				},
				"parentName": "GridContainer_qpgc0ek",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GridContainer_vcfx6cz",
				"values": {
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": [],
					"color": "#F8FAFC",
					"padding": {
						"top": "medium",
						"bottom": "medium",
						"right": "medium",
						"left": "medium"
					}
				},
				"parentName": "FlexContainer_9ruea39",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "IndicatorWidget_efonh4t",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"rowSpan": 4,
						"row": 1
					},
					"type": "crt.IndicatorWidget",
					"config": {
						"title": "#ResourceString(IndicatorWidget_efonh4t_title)#",
						"theme": "without-fill",
						"layout": {
							"color": "violet"
						},
						"text": {
							"template": "#ResourceString(IndicatorWidget_efonh4t_config_text_template)#",
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
								"attribute": "IndicatorWidget_efonh4t_Data",
								"schemaName": "UsrMCITContract",
								"filters": {
									"filter": {
										"items": {
											"09792579-5232-47e6-a7ee-7fda18cee2ba": {
												"filterType": 4,
												"comparisonType": 4,
												"isEnabled": true,
												"trimDateTimeParameterToDate": false,
												"leftExpression": {
													"expressionType": 0,
													"columnPath": "UsrStatus"
												},
												"isAggregative": false,
												"dataValueType": 10,
												"referenceSchemaName": "UsrMCITContractStatus",
												"rightExpressions": [
													{
														"expressionType": 2,
														"parameter": {
															"dataValueType": 10,
															"value": {
																"Name": "Closed",
																"Id": "4808d6f7-6a63-421c-bd32-751535f0b029",
																"value": "4808d6f7-6a63-421c-bd32-751535f0b029",
																"displayValue": "Closed"
															}
														}
													}
												]
											}
										},
										"logicalOperation": 0,
										"isEnabled": true,
										"filterType": 6,
										"rootSchemaName": "UsrMCITContract"
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
								"dependencies": []
							}
						},
						"comparison": {
							"type": null,
							"text": ""
						},
						"hint": "#ResourceString(IndicatorWidget_efonh4t_hint)#"
					}
				},
				"parentName": "GridContainer_vcfx6cz",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"DataTable_Summaries_Expanded": {
						"value": true
					}
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
					"modelConfig",
					"sortingConfig"
				],
				"values": {
					"default": [
						{
							"direction": "asc",
							"columnName": "UsrName"
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
					"dataSources",
					"PDS",
					"config"
				],
				"values": {
					"entitySchemaName": "UsrMCITContract"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
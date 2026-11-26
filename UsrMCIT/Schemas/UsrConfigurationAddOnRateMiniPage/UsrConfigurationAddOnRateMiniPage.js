define("UsrConfigurationAddOnRateMiniPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "insert",
				"name": "ComboBox_ttbc945",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrAddOn_iaz4o2j",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrConfigAddOnRateDS_UsrAddOn_iaz4o2j"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "addRecord_1hlsvm0",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_1hlsvm0_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_ttbc945",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberInput_ig2k6vj",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 2,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrUnitPrice_com1lhl",
					"control": "$UsrConfigAddOnRateDS_UsrUnitPrice_com1lhl",
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ComboBox_ztm26m5",
				"values": {
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrCurrency_ao6gn7n",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrConfigAddOnRateDS_UsrCurrency_ao6gn7n",
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 3,
						"rowSpan": 1
					}
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "addRecord_aafg663",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_aafg663_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_ztm26m5",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Input_5fzdtyn",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 4,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrUnit_1qc2maw",
					"control": "$UsrConfigAddOnRateDS_UsrUnit_1qc2maw",
					"placeholder": "",
					"tooltip": "",
					"multiline": false,
					"labelPosition": "above"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NumberInput_98im1vg",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 5,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrMinQuantity_r3orhw5",
					"control": "$UsrConfigAddOnRateDS_UsrMinQuantity_r3orhw5",
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NumberInput_8e6nn2l",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 6,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrMaxQuantity_kxr3zrk",
					"control": "$UsrConfigAddOnRateDS_UsrMaxQuantity_kxr3zrk",
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NumberInput_e31xgmk",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 7,
						"rowSpan": 1
					},
					"type": "crt.NumberInput",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrIncrement_kt0u8p1",
					"control": "$UsrConfigAddOnRateDS_UsrIncrement_kt0u8p1",
					"placeholder": "",
					"labelPosition": "above",
					"tooltip": ""
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "GridContainer_ou06dxy",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 8,
						"rowSpan": 1
					},
					"type": "crt.GridContainer",
					"columns": [
						"minmax(32px, 1fr)",
						"minmax(32px, 1fr)"
					],
					"rows": "minmax(max-content, 32px)",
					"items": []
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "ComboBox_mexhtam",
				"values": {
					"layoutConfig": {
						"column": 1,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrConfigVersion_v0hjng5",
					"ariaLabel": "",
					"isAddAllowed": true,
					"showValueAsLink": true,
					"labelPosition": "above",
					"controlActions": [],
					"listActions": [],
					"tooltip": "",
					"control": "$UsrConfigAddOnRateDS_UsrConfigVersion_v0hjng5"
				},
				"parentName": "GridContainer_ou06dxy",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "addRecord_068e0py",
				"values": {
					"code": "addRecord",
					"type": "crt.ComboboxSearchTextAction",
					"icon": "combobox-add-new",
					"caption": "#ResourceString(addRecord_068e0py_caption)#",
					"clicked": {
						"request": "crt.CreateRecordFromLookupRequest",
						"params": {}
					}
				},
				"parentName": "ComboBox_mexhtam",
				"propertyName": "listActions",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Checkbox_6hnd2c8",
				"values": {
					"layoutConfig": {
						"column": 2,
						"colSpan": 1,
						"row": 1,
						"rowSpan": 1
					},
					"type": "crt.Checkbox",
					"value": true,
					"inversed": false,
					"label": "$Resources.Strings.UsrConfigAddOnRateDS_UsrActive_27bbngc",
					"ariaLabel": "",
					"labelPosition": "above",
					"tooltip": "",
					"control": "$UsrConfigAddOnRateDS_UsrActive_27bbngc"
				},
				"parentName": "GridContainer_ou06dxy",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [
					"attributes"
				],
				"values": {
					"UsrConfigAddOnRateDS_UsrAddOn_iaz4o2j": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrAddOn"
						}
					},
					"UsrConfigAddOnRateDS_UsrAddOn_iaz4o2j_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrName",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrConfigAddOnRateDS_UsrUnitPrice_com1lhl": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrUnitPrice"
						}
					},
					"UsrConfigAddOnRateDS_UsrCurrency_ao6gn7n": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrCurrency"
						}
					},
					"UsrConfigAddOnRateDS_UsrCurrency_ao6gn7n_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "Name",
										"direction": "asc"
									}
								]
							}
						}
					},
					"UsrConfigAddOnRateDS_UsrUnit_1qc2maw": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrUnit"
						}
					},
					"UsrConfigAddOnRateDS_UsrMinQuantity_r3orhw5": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrMinQuantity"
						}
					},
					"UsrConfigAddOnRateDS_UsrMaxQuantity_kxr3zrk": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrMaxQuantity"
						}
					},
					"UsrConfigAddOnRateDS_UsrIncrement_kt0u8p1": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrIncrement"
						}
					},
					"UsrConfigAddOnRateDS_UsrActive_27bbngc": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrActive"
						}
					},
					"UsrConfigAddOnRateDS_UsrConfigVersion_v0hjng5": {
						"modelConfig": {
							"path": "UsrConfigAddOnRateDS.UsrConfigVersion"
						}
					},
					"UsrConfigAddOnRateDS_UsrConfigVersion_v0hjng5_List": {
						"isCollection": true,
						"modelConfig": {
							"sortingConfig": {
								"default": [
									{
										"columnName": "UsrName",
										"direction": "asc"
									}
								]
							}
						}
					}
				}
			}
		]/**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/,
		modelConfigDiff: /**SCHEMA_MODEL_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"path": [],
				"values": {
					"dataSources": {
						"UsrConfigAddOnRateDS": {
							"type": "crt.EntityDataSource",
							"scope": "page",
							"config": {
								"entitySchemaName": "UsrConfigAddOnRate",
								"loadParameters": {
									"options": {
										"pagingConfig": {
											"rowCount": 1,
											"rowsOffset": -1
										},
										"sortingConfig": {
											"columns": []
										}
									}
								},
								"allowCopyingRecords": false
							}
						}
					},
					"primaryDataSourceName": "UsrConfigAddOnRateDS"
				}
			}
		]/**SCHEMA_MODEL_CONFIG_DIFF*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});
/*
 * TE-MCIT / My Tasks v5 — native Freedom UI (Page Designer-friendly).
 * Entire editable view, grid and bindings live HERE.
 * Runtime/controller lives in the separate Client Module UsrMyTasksRuntime.
 * Page Designer save: verify AMD dependency and proxy handlers remain intact.
 * Financial/Technical forms and their existing BPMN are NOT modified.
 * v5: Compact, evenly spaced columns in the native DataTable; Request ID
 *     is rendered in its own bound native column, immediately before Task ID.
 *     Avoid the duplicate Request ID track that created blank spacers.
 *     Action dock, role-filtered reviewer picker, filters and real data unchanged.
 *     Priority deliberately not shown until a verified column is available.
 */
define("UsrMyTasks_ListPage", /**SCHEMA_DEPS*/["UsrMyTasksRuntime"]/**SCHEMA_DEPS*/,
    function/**SCHEMA_ARGS*/(mtRuntime)/**SCHEMA_ARGS*/ {
    "use strict";
    return {
        viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
    {
        "operation": "merge",
        "name": "TitleContainer",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "ActionButtonsContainer",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "AddButton",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "DataImportButton",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "MainFilterContainer",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "LeftFilterContainer",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "RightFilterContainer",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "FolderTree",
        "values": {
            "visible": false,
            "rootSchemaName": "UsrRequestApproval"
        }
    },
    {
        "operation": "merge",
        "name": "Dashboards",
        "values": {
            "visible": false
        }
    },
    {
        "operation": "merge",
        "name": "MenuItem_ImportFromExcel",
        "values": {
            "clicked": {
                "request": "crt.ImportDataRequest",
                "params": {
                    "entitySchemaName": "UsrRequestApproval"
                }
            }
        }
    },
    {
        "operation": "merge",
        "name": "DataTable",
        "values": {
            "visible": true,
            "primaryColumnName": "PDS_Id",
            "columns": [
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000002",
                    "code": "PDS_UsrRequest_UsrNumber",
                    "caption": "Request ID",
                    "dataValueType": 1
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000001",
                    "code": "PDS_UsrName",
                    "caption": "Task ID",
                    "dataValueType": 1
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000003",
                    "code": "PDS_UsrStage",
                    "caption": "Task Type",
                    "dataValueType": 10
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000004",
                    "code": "PDS_UsrRequest_UsrContract",
                    "caption": "Contract",
                    "dataValueType": 10
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000005",
                    "code": "PDS_UsrRequest_UsrAccount",
                    "caption": "Authority",
                    "dataValueType": 10
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000006",
                    "code": "PDS_UsrRequest_UsrProject",
                    "caption": "Project",
                    "dataValueType": 10
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000007",
                    "code": "PDS_CreatedOn",
                    "caption": "Queue Arrival",
                    "dataValueType": 7
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000008",
                    "code": "PDS_UsrAssignedTo",
                    "caption": "Assigned To",
                    "dataValueType": 10
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000009",
                    "code": "PDS_UsrDueOn",
                    "caption": "SLA",
                    "dataValueType": 7
                },
                {
                    "id": "7734b98a-0091-4a27-a81f-000000000010",
                    "code": "PDS_UsrDecision",
                    "caption": "Status / Decision",
                    "dataValueType": 10
                }
            ],
            "classes": [
                "usr-mt-datagrid"
            ],
            "rowToolbarItems": [
                {
                    "type": "crt.MenuItem",
                    "caption": "Open",
                    "icon": "open-button-icon",
                    "clicked": {
                        "request": "usr.MTOpen",
                        "params": {
                            "itemsAttributeName": "Items",
                            "taskId": "$Items.PDS_Id"
                        }
                    }
                },
                {
                    "type": "crt.MenuItem",
                    "caption": "Assign to Me",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.MTAssignToMe",
                        "params": {
                            "itemsAttributeName": "Items",
                            "taskId": "$Items.PDS_Id"
                        }
                    }
                },
                {
                    "type": "crt.MenuItem",
                    "caption": "Reassign",
                    "icon": "edit-row-action",
                    "clicked": {
                        "request": "usr.MTReassign",
                        "params": {
                            "itemsAttributeName": "Items",
                            "taskId": "$Items.PDS_Id"
                        }
                    }
                }
            ],
            "rowDoubleClick": {
                "request": "usr.MTOpen",
                "params": {
                    "taskId": "$Items.PDS_Id"
                },
                "useRelativeContext": true
            },
            "features": {
                "editable": {
                    "enable": false,
                    "itemsCreation": false,
                    "floatingEditPanel": false
                }
            }
        }
    },
    {
        "operation": "merge",
        "name": "Dashboards",
        "values": {
            "_designOptions": {
                "entitySchemaName": "UsrRequestApproval",
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
        "name": "MT_Root",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-mt-root"
            ]
        },
        "parentName": "SectionContentWrapper",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_Header",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-mt-header"
            ]
        },
        "parentName": "MT_Root",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_TitleGroup",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "classes": [
                "usr-mt-title-group"
            ]
        },
        "parentName": "MT_Header",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_Title",
        "values": {
            "type": "crt.Label",
            "caption": "My Tasks",
            "labelType": "headline-1-small",
            "labelThickness": "semibold",
            "labelColor": "#111B32",
            "classes": [
                "usr-mt-title"
            ]
        },
        "parentName": "MT_TitleGroup",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_Subtitle",
        "values": {
            "type": "crt.Label",
            "caption": "Unified worklist across all review queues and provisioning",
            "labelType": "body",
            "labelColor": "#64748B",
            "classes": [
                "usr-mt-subtitle"
            ]
        },
        "parentName": "MT_TitleGroup",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_Refresh",
        "values": {
            "type": "crt.Button",
            "caption": "Refresh",
            "color": "outline",
            "size": "small",
            "displayType": "contained",
            "clicked": {
                "request": "usr.MTRefresh"
            },
            "classes": [
                "usr-mt-refresh"
            ]
        },
        "parentName": "MT_Header",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_SearchPanel",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "classes": [
                "usr-mt-search-panel"
            ]
        },
        "parentName": "MT_Root",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_SearchRow",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-mt-search-row"
            ]
        },
        "parentName": "MT_SearchPanel",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_SearchInput",
        "values": {
            "type": "crt.Input",
            "control": "$MT_SearchText",
            "labelPosition": "hidden",
            "placeholder": "Search tasks, request ID, authority...",
            "classes": [
                "usr-mt-search"
            ]
        },
        "parentName": "MT_SearchRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_TypeTrigger",
        "values": {
            "type": "crt.Button",
            "caption": "$MT_TypeCaption",
            "color": "outline",
            "size": "medium",
            "displayType": "contained",
            "clicked": {
                "request": "usr.MTToggleTypeMenu"
            },
            "classes": [
                "usr-mt-type-trigger"
            ]
        },
        "parentName": "MT_SearchRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_TypeOptions",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "visible": "$MT_TypeMenuVisible",
            "classes": [
                "usr-mt-type-options"
            ]
        },
        "parentName": "MT_SearchPanel",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_Type_0",
        "values": {
            "type": "crt.Button",
            "caption": "All Task Types",
            "color": "default",
            "size": "small",
            "displayType": "text",
            "clicked": {
                "request": "usr.MTSelectType",
                "params": {
                    "taskType": "all"
                }
            },
            "classes": [
                "usr-mt-type-option"
            ]
        },
        "parentName": "MT_TypeOptions",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_Type_1",
        "values": {
            "type": "crt.Button",
            "caption": "Financial Review",
            "color": "default",
            "size": "small",
            "displayType": "text",
            "clicked": {
                "request": "usr.MTSelectType",
                "params": {
                    "taskType": "financial"
                }
            },
            "classes": [
                "usr-mt-type-option"
            ]
        },
        "parentName": "MT_TypeOptions",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_Type_2",
        "values": {
            "type": "crt.Button",
            "caption": "Technical Review",
            "color": "default",
            "size": "small",
            "displayType": "text",
            "clicked": {
                "request": "usr.MTSelectType",
                "params": {
                    "taskType": "technical"
                }
            },
            "classes": [
                "usr-mt-type-option"
            ]
        },
        "parentName": "MT_TypeOptions",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "MT_Type_3",
        "values": {
            "type": "crt.Button",
            "caption": "Provisioning",
            "color": "default",
            "size": "small",
            "displayType": "text",
            "clicked": {
                "request": "usr.MTSelectType",
                "params": {
                    "taskType": "provisioning"
                }
            },
            "classes": [
                "usr-mt-type-option"
            ]
        },
        "parentName": "MT_TypeOptions",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "MT_FilterRow",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "wrap": "wrap",
            "items": [],
            "classes": [
                "usr-mt-chips"
            ]
        },
        "parentName": "MT_SearchPanel",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "MT_Filter_mine",
        "values": {
            "type": "crt.Button",
            "caption": "$MT_Chip_mine",
            "color": "primary",
            "size": "small",
            "displayType": "$MT_Style_mine",
            "clicked": {
                "request": "usr.MTSelectFilter",
                "params": {
                    "filter": "mine"
                }
            },
            "classes": [
                "usr-mt-chip",
                "usr-mt-chip-mine"
            ]
        },
        "parentName": "MT_FilterRow",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_Filter_unassigned",
        "values": {
            "type": "crt.Button",
            "caption": "$MT_Chip_unassigned",
            "color": "primary",
            "size": "small",
            "displayType": "$MT_Style_unassigned",
            "clicked": {
                "request": "usr.MTSelectFilter",
                "params": {
                    "filter": "unassigned"
                }
            },
            "classes": [
                "usr-mt-chip",
                "usr-mt-chip-unassigned"
            ]
        },
        "parentName": "MT_FilterRow",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_Filter_team",
        "values": {
            "type": "crt.Button",
            "caption": "$MT_Chip_team",
            "color": "primary",
            "size": "small",
            "displayType": "$MT_Style_team",
            "clicked": {
                "request": "usr.MTSelectFilter",
                "params": {
                    "filter": "team"
                }
            },
            "classes": [
                "usr-mt-chip",
                "usr-mt-chip-team"
            ]
        },
        "parentName": "MT_FilterRow",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "MT_Filter_approaching",
        "values": {
            "type": "crt.Button",
            "caption": "$MT_Chip_approaching",
            "color": "primary",
            "size": "small",
            "displayType": "$MT_Style_approaching",
            "clicked": {
                "request": "usr.MTSelectFilter",
                "params": {
                    "filter": "approaching"
                }
            },
            "classes": [
                "usr-mt-chip",
                "usr-mt-chip-approaching"
            ]
        },
        "parentName": "MT_FilterRow",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "MT_Filter_overdue",
        "values": {
            "type": "crt.Button",
            "caption": "$MT_Chip_overdue",
            "color": "primary",
            "size": "small",
            "displayType": "$MT_Style_overdue",
            "clicked": {
                "request": "usr.MTSelectFilter",
                "params": {
                    "filter": "overdue"
                }
            },
            "classes": [
                "usr-mt-chip",
                "usr-mt-chip-overdue"
            ]
        },
        "parentName": "MT_FilterRow",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "MT_Filter_completed",
        "values": {
            "type": "crt.Button",
            "caption": "$MT_Chip_completed",
            "color": "primary",
            "size": "small",
            "displayType": "$MT_Style_completed",
            "clicked": {
                "request": "usr.MTSelectFilter",
                "params": {
                    "filter": "completed"
                }
            },
            "classes": [
                "usr-mt-chip",
                "usr-mt-chip-completed"
            ]
        },
        "parentName": "MT_FilterRow",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "MT_Notice",
        "values": {
            "type": "crt.Label",
            "caption": "$MT_Notice",
            "labelType": "body",
            "labelColor": "#8A6A2C",
            "classes": [
                "usr-mt-notice"
            ]
        },
        "parentName": "MT_Root",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "move",
        "name": "DataTable",
        "parentName": "MT_Root",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "MT_Footer",
        "values": {
            "type": "crt.Label",
            "caption": "$MT_Footer",
            "labelType": "body",
            "labelColor": "#64748B",
            "classes": [
                "usr-mt-footer"
            ]
        },
        "parentName": "MT_Root",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "MT_ModalOverlay",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "visible": "$MT_AssignVisible",
            "classes": [
                "usr-mt-modal-overlay"
            ]
        },
        "parentName": "MT_Root",
        "propertyName": "items",
        "index": 5
    },
    {
        "operation": "insert",
        "name": "MT_ModalCard",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "items": [],
            "classes": [
                "usr-mt-modal-card"
            ]
        },
        "parentName": "MT_ModalOverlay",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_ModalHeading",
        "values": {
            "type": "crt.Label",
            "caption": "$MT_AssignHeading",
            "labelType": "headline-1-small",
            "labelThickness": "semibold",
            "classes": [
                "usr-mt-modal-heading"
            ]
        },
        "parentName": "MT_ModalCard",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_ModalDescription",
        "values": {
            "type": "crt.Label",
            "caption": "$MT_AssignDetail",
            "labelType": "body",
            "classes": [
                "usr-mt-modal-detail"
            ]
        },
        "parentName": "MT_ModalCard",
        "propertyName": "items",
        "index": 1
    },
    {
        "operation": "insert",
        "name": "MT_ModalSelected",
        "values": {
            "visible": false,
            "type": "crt.Label",
            "caption": "$MT_SelectedPerson",
            "labelType": "body",
            "classes": [
                "usr-mt-modal-selected"
            ]
        },
        "parentName": "MT_ModalCard",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "MT_ModalChoose",
        "values": {
            "visible": false,
            "type": "crt.Button",
            "caption": "Select reviewer from role",
            "color": "outline",
            "displayType": "contained",
            "clicked": {
                "request": "usr.MTPickReviewer"
            },
            "classes": [
                "usr-mt-modal-choose"
            ]
        },
        "parentName": "MT_ModalCard",
        "propertyName": "items",
        "index": 3
    },
    {
        "operation": "insert",
        "name": "MT_ReviewerList",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "column",
            "wrap": "nowrap",
            "items": [],
            "classes": [
                "usr-mt-reviewer-list"
            ]
        },
        "parentName": "MT_ModalCard",
        "propertyName": "items",
        "index": 2
    },
    {
        "operation": "insert",
        "name": "MT_ModalFooter",
        "values": {
            "type": "crt.FlexContainer",
            "direction": "row",
            "items": [],
            "classes": [
                "usr-mt-modal-footer"
            ]
        },
        "parentName": "MT_ModalCard",
        "propertyName": "items",
        "index": 4
    },
    {
        "operation": "insert",
        "name": "MT_ModalCancel",
        "values": {
            "type": "crt.Button",
            "caption": "Cancel",
            "color": "default",
            "displayType": "text",
            "clicked": {
                "request": "usr.MTCancelAssign"
            },
            "classes": [
                "usr-mt-modal-cancel"
            ]
        },
        "parentName": "MT_ModalFooter",
        "propertyName": "items",
        "index": 0
    },
    {
        "operation": "insert",
        "name": "MT_ModalConfirm",
        "values": {
            "type": "crt.Button",
            "caption": "Assign",
            "color": "accent",
            "displayType": "contained",
            "clicked": {
                "request": "usr.MTCommitAssign"
            },
            "classes": [
                "usr-mt-modal-confirm"
            ]
        },
        "parentName": "MT_ModalFooter",
        "propertyName": "items",
        "index": 1
    }
]/**SCHEMA_VIEW_CONFIG_DIFF*/,
        viewModelConfigDiff: /**SCHEMA_VIEW_MODEL_CONFIG_DIFF*/[
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
            "PDS_UsrRequest_UsrNumber": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrNumber"
                }
            },
            "PDS_UsrStage": {
                "modelConfig": {
                    "path": "PDS.UsrStage"
                }
            },
            "PDS_UsrRequest_UsrContract": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrContract"
                }
            },
            "PDS_UsrRequest_UsrAccount": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrAccount"
                }
            },
            "PDS_UsrRequest_UsrProject": {
                "modelConfig": {
                    "path": "PDS.UsrRequest_UsrProject"
                }
            },
            "PDS_CreatedOn": {
                "modelConfig": {
                    "path": "PDS.CreatedOn"
                }
            },
            "PDS_UsrAssignedTo": {
                "modelConfig": {
                    "path": "PDS.UsrAssignedTo"
                }
            },
            "PDS_UsrDueOn": {
                "modelConfig": {
                    "path": "PDS.UsrDueOn"
                }
            },
            "PDS_UsrDecision": {
                "modelConfig": {
                    "path": "PDS.UsrDecision"
                }
            }
        }
    },
    {
        "operation": "merge",
        "path": [
            "attributes"
        ],
        "values": {
            "MT_SearchText": {
                "value": ""
            },
            "MT_TypeCaption": {
                "value": "All Task Types ▾"
            },
            "MT_TypeMenuVisible": {
                "value": false
            },
            "MT_Notice": {
                "value": "Loading review tasks..."
            },
            "MT_Footer": {
                "value": ""
            },
            "MT_AssignVisible": {
                "value": false
            },
            "MT_AssignHeading": {
                "value": "Assign Task"
            },
            "MT_AssignDetail": {
                "value": ""
            },
            "MT_SelectedPerson": {
                "value": "No reviewer selected"
            },
            "MT_SelectedPersonId": {
                "value": ""
            },
            "MT_Chip_mine": {
                "value": "Assigned to Me 0"
            },
            "MT_Style_mine": {
                "value": "contained"
            },
            "MT_Chip_unassigned": {
                "value": "Unassigned 0"
            },
            "MT_Style_unassigned": {
                "value": "text"
            },
            "MT_Chip_team": {
                "value": "My Team 0"
            },
            "MT_Style_team": {
                "value": "text"
            },
            "MT_Chip_approaching": {
                "value": "Approaching SLA 0"
            },
            "MT_Style_approaching": {
                "value": "text"
            },
            "MT_Chip_overdue": {
                "value": "Overdue 0"
            },
            "MT_Style_overdue": {
                "value": "text"
            },
            "MT_Chip_completed": {
                "value": "Completed 0"
            },
            "MT_Style_completed": {
                "value": "text"
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
            "entitySchemaName": "UsrRequestApproval",
            "attributes": {
                "UsrName": {
                    "path": "UsrName"
                },
                "UsrRequest_UsrNumber": {
                    "path": "UsrRequest.UsrNumber"
                },
                "UsrStage": {
                    "path": "UsrStage"
                },
                "UsrRequest_UsrContract": {
                    "path": "UsrRequest.UsrContract"
                },
                "UsrRequest_UsrAccount": {
                    "path": "UsrRequest.UsrAccount"
                },
                "UsrRequest_UsrProject": {
                    "path": "UsrRequest.UsrProject"
                },
                "CreatedOn": {
                    "path": "CreatedOn"
                },
                "UsrAssignedTo": {
                    "path": "UsrAssignedTo"
                },
                "UsrDueOn": {
                    "path": "UsrDueOn"
                },
                "UsrDecision": {
                    "path": "UsrDecision"
                }
            }
        }
    }
]/**SCHEMA_MODEL_CONFIG_DIFF*/,
        handlers: /**SCHEMA_HANDLERS*/[
            {request: "crt.HandleViewModelInitRequest", handler: (req, next) => mtRuntime.handle("crt.HandleViewModelInitRequest", req, next)},
            {request: "crt.LoadDataRequest", handler: (req, next) => mtRuntime.handle("crt.LoadDataRequest", req, next)},
            {request: "crt.HandleViewModelAttributeChangeRequest", handler: (req, next) => mtRuntime.handle("crt.HandleViewModelAttributeChangeRequest", req, next)},
            {request: "usr.MTSelectFilter", handler: (req, next) => mtRuntime.handle("usr.MTSelectFilter", req, next)},
            {request: "usr.MTToggleTypeMenu", handler: (req, next) => mtRuntime.handle("usr.MTToggleTypeMenu", req, next)},
            {request: "usr.MTSelectType", handler: (req, next) => mtRuntime.handle("usr.MTSelectType", req, next)},
            {request: "usr.MTOpen", handler: (req, next) => mtRuntime.handle("usr.MTOpen", req, next)},
            {request: "usr.MTAssignToMe", handler: (req, next) => mtRuntime.handle("usr.MTAssignToMe", req, next)},
            {request: "usr.MTReassign", handler: (req, next) => mtRuntime.handle("usr.MTReassign", req, next)},
            {request: "usr.MTPickReviewer", handler: (req, next) => mtRuntime.handle("usr.MTPickReviewer", req, next)},
            {request: "usr.MTCommitAssign", handler: (req, next) => mtRuntime.handle("usr.MTCommitAssign", req, next)},
            {request: "usr.MTCancelAssign", handler: (req, next) => mtRuntime.handle("usr.MTCancelAssign", req, next)},
            {request: "usr.MTRefresh", handler: (req, next) => mtRuntime.handle("usr.MTRefresh", req, next)},
            {request: "crt.HandleViewModelResumeRequest", handler: (req, next) => mtRuntime.handle("crt.HandleViewModelResumeRequest", req, next)},
            {request: "crt.HandleViewModelDestroyRequest", handler: (req, next) => mtRuntime.handle("crt.HandleViewModelDestroyRequest", req, next)}
        ]/**SCHEMA_HANDLERS*/,
        converters: /**SCHEMA_CONVERTERS*/{} /**SCHEMA_CONVERTERS*/,
        validators: /**SCHEMA_VALIDATORS*/{} /**SCHEMA_VALIDATORS*/
    };
});

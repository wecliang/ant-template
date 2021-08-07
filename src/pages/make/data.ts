export default [
  {
    name: '列表页面',
    list: [
      {
        "namespace": "PageContainer",
        "renderProps": {},
        "renderParentProps": {},
        "children": [
          {
            "namespace": "Container",
            "isNotDrop": true,
            "renderProps": {},
            "renderParentProps": {},
            "children": [
              {
                "namespace": "ProTable",
                "renderProps": {
                  "dataScoure": [],
                  "style": {
                    "marginTop": "20px"
                  },
                  "tableLayout": "fixed",
                  "columns": [
                    {
                      "title": "创建时间",
                      "dataIndex": "showTime",
                      "valueType": "dateTime",
                      "hideInSearch": true
                    },
                    {
                      "title": "标题",
                      "dataIndex": "title",
                      "fieldProps": {
                        "autoComplete": "off",
                        "placeholder": "请输入标题"
                      },
                      "order": 6
                    },
                    {
                      "title": "状态",
                      "dataIndex": "status",
                      "valueType": "select",
                      "fieldProps": {
                        "placeholder": "请选择状态"
                      },
                      "order": 5
                    },
                    {
                      "title": "标签",
                      "dataIndex": "babel",
                      "order": 3,
                      "valueType": "select",
                      "fieldProps": {
                        "placeholder": "请选择标签"
                      }
                    },
                    {
                      "title": "日期",
                      "dataIndex": "date",
                      "valueType": "date",
                      "fieldProps": {
                        "placeholder": "请选择日期"
                      },
                      "order": 4
                    },
                    {
                      "title": "操作",
                      "dataIndex": "id",
                      "valueType": "option",
                      "hideInSearch": true
                    }
                  ],
                  "dataSource": [
                    {
                      "id": "遽摉墱砂黐瞬傄敁盃狂脮",
                      "title": "鰶拮诨庄厈电",
                      "status": "量傡解鷳毓痖邀",
                      "babel": "猅嚎症瑿鸅颛泷笺砏娓窔餱",
                      "date": 1690169222993,
                      "showTime": 1740934894619
                    },
                    {
                      "id": "奦襂环巇鬤麺癄煴栁荤",
                      "title": "咝槭锦莝剻讵匪践删曒鷡",
                      "status": "姶朜敆稏玧狥陞垲埞",
                      "babel": "鍝鑽貎旚颎飌醻瞎勃蹇勋",
                      "date": 1483869936527,
                      "showTime": 1609014999514
                    }
                  ]
                },
                "renderParentProps": {},
                "children": [
                  {
                    "namespace": "Button",
                    "isNotDrop": true,
                    "renderProps": {
                      "data-children": "toolBarRender",
                      "text": "新增",
                      "type": "primary",
                      "icon": {
                        "type": "Plus",
                        "iconType": "Outlined"
                      }
                    },
                    "renderParentProps": {}
                  }
                ]
              }
            ]
          },
          {
            "namespace": "Text",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "content",
              "text": "列表查看页面"
            },
            "renderParentProps": {}
          }
        ]
      }
    ]
  },
  {
    name: '列表页面2',
    list: [
      {
        "namespace": "PageContainer",
        "renderProps": {
          "tabList": [
            {
              "tab": "基本信息",
              "key": "1"
            },
            {
              "tab": "更多内容",
              "key": "2"
            }
          ],
          "title": "列表页面"
        },
        "renderParentProps": {},
        "children": [
          {
            "namespace": "Container",
            "isNotDrop": true,
            "renderProps": {},
            "renderParentProps": {},
            "children": [
              {
                "namespace": "ProTable",
                "renderProps": {
                  "dataScoure": [],
                  "style": {
                    "marginTop": "20px"
                  },
                  "tableLayout": "fixed",
                  "columns": [
                    {
                      "title": "排名",
                      "dataIndex": "orderIndex",
                      "valueType": "indexBorder"
                    },
                    {
                      "title": "应用名称",
                      "dataIndex": "appName",
                      "fieldProps": {
                        "autoComplete": "off",
                        "placeholder": "请输入应用名称"
                      }
                    },
                    {
                      "title": "创建者",
                      "dataIndex": "userName",
                      "fieldProps": {
                        "autoComplete": "off",
                        "placeholder": "请输入创建者"
                      }
                    },
                    {
                      "title": "状态",
                      "dataIndex": "status",
                      "fieldProps": {
                        "autoComplete": "off",
                        "placeholder": "请输入状态"
                      }
                    },
                    {
                      "title": "创建时间",
                      "dataIndex": "dataTime",
                      "fieldProps": {
                        "autoComplete": "off",
                        "placeholder": "请输入创建时间"
                      }
                    },
                    {
                      "title": "备注",
                      "dataIndex": "remark",
                      "fieldProps": {
                        "autoComplete": "off",
                        "placeholder": "请输入备注"
                      }
                    },
                    {
                      "title": "操作",
                      "dataIndex": "id",
                      "valueType": "option"
                    }
                  ],
                  "dataSource": [
                    {
                      "id": "芪韶坕忮搴嬍蠞珋倖",
                      "orderIndex": "粂所樭汐娲喁娱娈醔煽鯃",
                      "appName": "咿郔鳕瓬淼沚絶吺袥",
                      "userName": "跹鶸温韱嗿妇撌鴂霻胭",
                      "status": "靊辑姓邪傍殃",
                      "dataTime": "庁樧佲迓谥涕鍊戴着鸅缄",
                      "remark": "犓岋睸蕦较鐻"
                    },
                    {
                      "id": "麹晿筯绺蹻唦壕倐堄敋杩",
                      "orderIndex": "杆雓追謷逐擣嗷居乊酐",
                      "appName": "氃锽削鹕缶慈芦弰雱港馇镶",
                      "userName": "镬郧侀偩瘣邪晤璪",
                      "status": "槲頀颤戨雇嚂暃续瑥頖",
                      "dataTime": "饨伤蚬酊攞罒踋瞒",
                      "remark": "整撠趷鷐千戒珣脤镐"
                    },
                    {
                      "id": "副鰚敔兘铺紑撕",
                      "orderIndex": "瓙莶崚躩篦根盶惊焢",
                      "appName": "炼馪綔站王朏芌颺",
                      "userName": "裦翕遤焺伖瞶袋隔窃",
                      "status": "鬜旨疡涞銍迉惖壛藗擦頳",
                      "dataTime": "飁菜酏侚紎执雨稆踄潜媦",
                      "remark": "祁漼柶娽氲酥"
                    }
                  ]
                },
                "renderParentProps": {}
              }
            ]
          },
          {
            "namespace": "Descriptions",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "content",
              "column": 2,
              "style": {
                "width": "600px"
              }
            },
            "renderParentProps": {},
            "children": [
              {
                "namespace": "Text",
                "renderProps": {
                  "text": "张三"
                },
                "renderParentProps": {
                  "descItemProps": {
                    "label": "创建人"
                  }
                }
              },
              {
                "namespace": "A",
                "renderProps": {
                  "text": "这是链接",
                  "target": "_blank",
                  "href": "https://www.baidu.com"
                },
                "renderParentProps": {
                  "descItemProps": {
                    "label": "关联地址"
                  }
                }
              },
              {
                "namespace": "Text",
                "renderProps": {
                  "text": "1234"
                },
                "renderParentProps": {
                  "descItemProps": {
                    "label": "关联表单"
                  }
                }
              },
              {
                "namespace": "Text",
                "renderProps": {
                  "text": "浙江杭州市下航路"
                },
                "renderParentProps": {
                  "descItemProps": {
                    "label": "单据备注"
                  }
                }
              }
            ]
          },
          {
            "namespace": "Statistic",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "extra",
              "value": "28",
              "title": "有效天数",
              "loading": false,
              "precision": 0,
              "valueStyle": {
                "textAlign": "right"
              }
            },
            "renderParentProps": {}
          }
        ]
      }
    ]
  },
  {
    name: '创建编辑页面',
    list: [
      {
        "namespace": "PageContainer",
        "renderProps": {},
        "renderParentProps": {},
        "children": [
          {
            "namespace": "Container",
            "isNotDrop": true,
            "renderProps": {},
            "renderParentProps": {},
            "children": [
              {
                "namespace": "Div",
                "renderProps": {
                  "style": {
                    "backgroundColor": "#fff",
                    "padding": "20px"
                  }
                },
                "renderParentProps": {},
                "children": [
                  {
                    "namespace": "Form",
                    "renderProps": {
                      "labelCol": {
                        "span": 6
                      },
                      "style": {
                        "width": "600px",
                        "margin": "0 auto"
                      }
                    },
                    "renderParentProps": {},
                    "children": [
                      {
                        "namespace": "Input",
                        "renderProps": {
                          "placeholder": "请输入标题",
                          "autoComplete": "off",
                          "isForm": true,
                          "isFormItem": true,
                          "formProps": {
                            "label": "标题",
                            "name": "title",
                            "rules": [
                              {
                                "required": true,
                                "whitespace": true,
                                "message": "请输入标题"
                              }
                            ]
                          }
                        },
                        "renderParentProps": {}
                      },
                      {
                        "namespace": "Select",
                        "renderProps": {
                          "placeholder": "请选择标签",
                          "isForm": true,
                          "isFormItem": true,
                          "formProps": {
                            "label": "标签",
                            "name": "label",
                            "rules": [
                              {
                                "required": true,
                                "message": "请选择标签"
                              }
                            ]
                          }
                        },
                        "renderParentProps": {}
                      },
                      {
                        "namespace": "DatePicker",
                        "renderProps": {
                          "isForm": true,
                          "isFormItem": true,
                          "placeholder": "请选择日期",
                          "formProps": {
                            "label": "日期",
                            "name": "date"
                          }
                        },
                        "renderParentProps": {}
                      },
                      {
                        "namespace": "Input",
                        "renderProps": {
                          "placeholder": "请输入备注",
                          "autoComplete": "off",
                          "isForm": true,
                          "ControlTypes": "Input.TextArea",
                          "isFormItem": true,
                          "formProps": {
                            "label": "备注",
                            "name": "description"
                          }
                        },
                        "renderParentProps": {}
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "namespace": "Text",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "content",
              "text": "这里可以添加XX数据"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Button",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "footer",
              "event": "goBack",
              "text": "取消"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Button",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "footer",
              "event": "submit",
              "text": "提交",
              "type": "primary"
            },
            "renderParentProps": {}
          }
        ]
      }
    ]
  },
  {
    name: '查看详情页面',
    list: [
      {
        "namespace": "PageContainer",
        "renderProps": {},
        "renderParentProps": {},
        "children": [
          {
            "namespace": "Container",
            "isNotDrop": true,
            "renderProps": {},
            "renderParentProps": {},
            "children": [
              {
                "namespace": "Card",
                "renderProps": {
                  "title": "基本信息"
                },
                "renderParentProps": {},
                "children": [
                  {
                    "namespace": "Descriptions",
                    "renderProps": {},
                    "renderParentProps": {},
                    "children": [
                      {
                        "namespace": "Text",
                        "renderProps": {
                          "text": "BUG"
                        },
                        "renderParentProps": {
                          "descItemProps": {
                            "label": "标题"
                          }
                        }
                      },
                      {
                        "namespace": "Text",
                        "renderProps": {
                          "text": "为解决"
                        },
                        "renderParentProps": {
                          "descItemProps": {
                            "label": "状态"
                          }
                        }
                      },
                      {
                        "namespace": "Tag",
                        "renderProps": {
                          "color": "error",
                          "closable": false,
                          "text": "未解决"
                        },
                        "renderParentProps": {
                          "descItemProps": {
                            "label": "标签"
                          }
                        }
                      },
                      {
                        "namespace": "Text",
                        "renderProps": {
                          "text": "2020-05-21"
                        },
                        "renderParentProps": {
                          "descItemProps": {
                            "label": "日期"
                          }
                        }
                      },
                      {
                        "namespace": "Text",
                        "renderProps": {
                          "text": "2020-05-22 13:25:01"
                        },
                        "renderParentProps": {
                          "descItemProps": {
                            "label": "创建时间",
                            "span": 2
                          }
                        }
                      },
                      {
                        "namespace": "Text",
                        "renderProps": {
                          "text": "这是BUG描述，这是BUG描述"
                        },
                        "renderParentProps": {
                          "descItemProps": {
                            "label": "描述信息",
                            "span": 3
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "namespace": "Text",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "content",
              "text": "这里可以查看当前数据详细内容"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Button",
            "isNotDrop": true,
            "renderProps": {
              "data-children": "extra",
              "text": "返回",
              "event": "goBack"
            },
            "renderParentProps": {}
          }
        ]
      }
    ]
  },
  {
    name: '组件调试',
    list: [
      {
        "namespace": "Div",
        "renderProps": {
          "hidden": true
        },
        "renderParentProps": {},
        "children": [
          {
            "namespace": "Span",
            "renderProps": {
              "text": "span"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Icon",
            "renderProps": {
              "icon": {
                "type": "AntCloud",
                "iconType": "Outlined"
              },
              "style": {
                "color": "red"
              }
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Text",
            "renderProps": {
              "text": "Text"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Button",
            "renderProps": {
              "shape": "round",
              "type": "primary"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Button",
            "renderProps": {},
            "renderParentProps": {}
          },
          {
            "namespace": "Typography",
            "renderProps": {
              "ControlTypes": "Text",
              "text": "文本内容一"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Typography",
            "renderProps": {
              "ControlTypes": "Title",
              "text": "文本内容一"
            },
            "renderParentProps": {}
          },
          {
            "namespace": "Typography",
            "renderProps": {
              "ControlTypes": "Paragraph",
              "text": "文本内容一",
              "code": true
            },
            "renderParentProps": {}
          },
          {
            "namespace": "P",
            "renderProps": {},
            "renderParentProps": {},
            "children": [
              {
                "namespace": "Text",
                "renderProps": {
                  "text": "通用组件调试"
                },
                "renderParentProps": {}
              }
            ]
          }
        ]
      },
      {
        "namespace": "Form",
        "renderProps": {},
        "renderParentProps": {},
        "children": [
          {
            "namespace": "Grid",
            "renderProps": {
              "gutter": [
                16,
                0
              ]
            },
            "renderParentProps": {},
            "children": [
              {
                "namespace": "Input",
                "renderProps": {
                  "placeholder": "请输入你好",
                  "autoComplete": "off",
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "你好",
                    "name": "哈哈哈"
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Input",
                "renderProps": {
                  "placeholder": "请输入你好",
                  "autoComplete": "off",
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "你好",
                    "name": "哈哈哈"
                  },
                  "ControlTypes": "Input.TextArea"
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Input",
                "renderProps": {
                  "placeholder": "请输入你好",
                  "autoComplete": "off",
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "你好",
                    "name": "哈哈哈"
                  },
                  "ControlTypes": "Input.Search"
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Input",
                "renderProps": {
                  "placeholder": "请输入你好",
                  "autoComplete": "off",
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "你好",
                    "name": "哈哈哈"
                  },
                  "ControlTypes": "Input.Password"
                },
                "renderParentProps": {}
              },
              {
                "namespace": "InputNumber",
                "renderProps": {
                  "placeholder": "请输入数值",
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "数值",
                    "name": 131
                  },
                  "style": {
                    "width": "100%"
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Checkbox",
                "renderProps": {
                  "options": [
                    {
                      "text": "选项一",
                      "value": "1"
                    },
                    {
                      "text": "选项二",
                      "value": "2"
                    },
                    {
                      "text": "选项三",
                      "value": "3"
                    }
                  ],
                  "isForm": true,
                  "group": false,
                  "isFormItem": true,
                  "text": "1131",
                  "formProps": {
                    "label": "单选",
                    "name": 123
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Checkbox",
                "renderProps": {
                  "options": [
                    {
                      "text": "选项一",
                      "value": "1"
                    },
                    {
                      "text": "选项二",
                      "value": "2"
                    },
                    {
                      "text": "选项三",
                      "value": "3"
                    }
                  ],
                  "isForm": true,
                  "group": true,
                  "isFormItem": true,
                  "text": "1131",
                  "formProps": {
                    "label": "多选",
                    "name": 345
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "DatePicker",
                "renderProps": {
                  "isForm": true,
                  "isFormItem": true,
                  "placeholder": "请选择日期",
                  "formProps": {
                    "label": "日期",
                    "name": "date16545"
                  },
                  "isRange": true,
                  "picker": "date"
                },
                "renderParentProps": {}
              },
              {
                "namespace": "DatePicker",
                "renderProps": {
                  "isForm": true,
                  "isFormItem": true,
                  "placeholder": "请选择月份",
                  "formProps": {
                    "label": "日期",
                    "name": "date"
                  },
                  "isRange": false,
                  "picker": "month"
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Radio",
                "renderProps": {
                  "options": [
                    {
                      "text": "选项一",
                      "value": "1"
                    },
                    {
                      "text": "选项二",
                      "value": "2"
                    },
                    {
                      "text": "选项三",
                      "value": "3"
                    }
                  ],
                  "isForm": true,
                  "text": "werwerwer",
                  "isFormItem": true,
                  "group": false,
                  "formProps": {
                    "label": "单选一",
                    "name": 234
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Radio",
                "renderProps": {
                  "options": [
                    {
                      "text": "选项一",
                      "value": "1"
                    },
                    {
                      "text": "选项二",
                      "value": "2"
                    },
                    {
                      "text": "选项三",
                      "value": "3"
                    }
                  ],
                  "isForm": true,
                  "text": "werwerwer",
                  "isFormItem": true,
                  "group": true,
                  "formProps": {
                    "label": "单选s",
                    "name": 2344
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Rate",
                "renderProps": {
                  "isForm": true,
                  "allowHalf": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "评分",
                    "name": "pf"
                  },
                  "count": 6
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Select",
                "renderProps": {
                  "placeholder": "请选择多选",
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "多选",
                    "name": "选择框"
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Slider",
                "renderProps": {
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "滑块",
                    "name": "hk"
                  },
                  "range": true,
                  "disabled": false
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Switch",
                "renderProps": {
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "开关",
                    "name": "switch"
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "TimePicker",
                "renderProps": {
                  "isForm": true,
                  "isFormItem": true,
                  "placeholder": "请选择时间",
                  "formProps": {
                    "label": "时间",
                    "name": "time"
                  }
                },
                "renderParentProps": {}
              },
              {
                "namespace": "TreeSelect",
                "renderProps": {
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "多级选择",
                    "name": "dj"
                  },
                  "placeholder": "请选择多级选择",
                  "disabled": false
                },
                "renderParentProps": {}
              },
              {
                "namespace": "Transfer",
                "renderProps": {
                  "isForm": true,
                  "isFormItem": true,
                  "formProps": {
                    "label": "穿梭框",
                    "name": 12
                  },
                  "rowKey": "id",
                  "title1": "这是标题一",
                  "title2": "这是标题二"
                },
                "renderParentProps": {
                  "colProps": {
                    "span": 24
                  }
                }
              },
              {
                "namespace": "Upload",
                "renderProps": {
                  "isForm": true
                },
                "renderParentProps": {},
                "children": [
                  {
                    "namespace": "Button",
                    "renderProps": {
                      "text": "上传文件",
                      "icon": {
                        "type": "Upload",
                        "iconType": "Outlined"
                      }
                    },
                    "renderParentProps": {}
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
] as { name: string, list:any[] }[];


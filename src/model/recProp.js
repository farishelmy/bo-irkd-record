const searchAttr = [
  {
    text: "Text Search",
    iconCls: "string",
    children: [
      {
        text: "Title Word",
        iconCls: "title",
        _format: "string",
        _searchCriteria: "&&Title Word"
      },
      {
        text: "Notes Word",
        iconCls: "note",
        _format: "string",
        _searchCriteria: "&&Notes Word"
      },
      {
        text: "Any Word",
        iconCls: "string",
        _format: "string",
        _searchCriteria: "&&Any Word"
      },
      {
        text: "Document Content",
        iconCls: "txt",
        _format: "string",
        _searchCriteria: "&&Document Content"
      },
      {
        text: "Classification Word",
        iconCls: "classification",
        _format: "string",
        _searchCriteria: "&&Classification Word"
      }
    ]
  },
  {
    text: "Linked Navigation",
    iconCls: "related-rec",
    children: [
      {
        text: "Related Records",
        iconCls: "related-rec",
        _format: "string",
        _searchCriteria: "&&Related Records"
      },
      {
        text: "Latest Part",
        iconCls: "part",
        _format: "string",
        _searchCriteria: "&&Latest Part"
      },
      {
        text: "All Parts",
        iconCls: "part",
        _format: "string",
        _searchCriteria: "&&All Parts"
      },
      {
        text: "Container Of",
        iconCls: "container",
        _format: "string",
        _searchCriteria: "&&Container Of"
      },
      {
        text: "Contained Within",
        iconCls: "contained",
        _format: "string",
        _searchCriteria: "&&Contained Within"
      },
      {
        text: "All Versions",
        iconCls: "revision",
        _format: "string",
        _searchCriteria: "&&All Versions"
      }
    ]
  },
  {
    text: "Reference and Control Numbers",
    iconCls: "number",
    children: [
      {
        text: "Record Number",
        iconCls: "number",
        _format: "string",
        _searchCriteria: "&&Record Number"
      },
      {
        text: "Classification",
        iconCls: "classification",
        _format: "classification",
        _searchCriteria: "&&Classification"
      }
    ]
  },
  {
    text: "Document Management",
    iconCls: "doc",
    children: [
      {
        text: "Date Modified",
        iconCls: "date",
        _format: "date",
        _searchCriteria: "&&Date Modified"
      },
      {
        text: "Electronic Document Type",
        iconCls: "doc",
        _format: "string",
        _searchCriteria: "&&Electronic Document Type(s)"
      }
    ]
  },
  {
    text: "Dates and Times",
    iconCls: "calendar",
    children: [
      {
        text: "Date Registered",
        iconCls: "date",
        _format: "date",
        _searchCriteria: "&&Date Registered"
      },
      {
        text: "Date Created",
        iconCls: "date",
        _format: "date",
        _searchCriteria: "&&Date Created"
      },
      {
        text: "Date Closed",
        iconCls: "date",
        _format: "date",
        _searchCriteria: "&&Date Closed"
      }
    ]
  },
  {
    text: "Contacts, People and Places",
    iconCls: "user-group",
    children: [
      {
        text: "Assignee",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Assignee"
      },
      {
        text: "Home Location",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Home Location"
      },
      {
        text: "Owner Location",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Owner Location"
      },
      {
        text: "Creator",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Creator"
      },
      {
        text: "Contact",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Contact"
      },
      {
        text: "Representative",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Representative"
      },
      {
        text: "Addressee",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Addressee"
      },
      {
        text: "Author",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Author"
      },
      {
        text: "Client",
        iconCls: "user",
        _format: "location",
        _searchCriteria: "&&Client"
      }
    ]
  },
  {
    text: "Security and Audit",
    iconCls: "security",
    children: [
      {
        text: "Security Level",
        iconCls: "list-security",
        _format: "seclevel",
        _searchCriteria: "&&Security Level"
      },
      {
        text: "Security Caveat",
        iconCls: "caveat",
        _format: "seccaveat",
        _searchCriteria: "&&Security Caveat"
      },
      {
        text: "Access Control",
        iconCls: "access",
        _format: "accesscontrol",
        _searchCriteria: "&&Access Control"
      }
    ]
  },
  {
    id: "add-fields",
    text: "Additional Fields",
    iconCls: "add-field",
    children: []
  }
]

export { searchAttr }
